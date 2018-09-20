<template>
  <div class="out-contain">
    <div class="map-loading" v-loading="pageLoading"></div>
    <div id="map-container"></div>
    <div class="bottom-operate">
      <div class="display-distance">{{distanceMile}}公里</div>
      <div class="startAndPause text-center"><img v-show="!isDisplay" @click="resumeDriving" src="@/assets/img/play.png" /><img v-show="isDisplay" @click="pauseDriving" src="@/assets/img/suspend.png" /></div>
      <div class="speed-control">
        <input class="speedRange" type="range" min="1000" max="200000" step="5000" v-model="speed" @change="changeSpeed">
        <span>{{speed}}km/h</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'routePlaybackOfStandard',
  components: {

  },
  computed: {
    fluidName: function() {
      return this.$route.query.fluidName;
    },
    siteName: function() {
      return this.$route.query.siteName;
    },
    planId: function() {
      return this.$route.query.planId;
    },
  },
  data() {
    return {
      pageLoading: false,
      map: '', //地图实列
      pathSimplifierIns: '', //轨迹实列
      infoWindow: '', //简单信息窗体实列
      totalDataResult: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后的总数据集合
      resultPath: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后经纬度集合
      pathNavigatorStyle: {}, //巡航样式
      navg1: '', //巡航
      distanceMile: 0, //总里程
      speed: 0, //巡航的展示速度
      driveringTime: 10, //巡航时间
      startMarker: '', //起点标记
      endMarker: '', //终点标记

      deviceDetail: '', //设备详情，获取设备详情是为了页面初始化的时候，获取绑定车辆信息carNumber
      carNumber: '', //绑定车辆信息
      masterDriver: '',
      choosedDeviceId: '', //筛选所选择的车辆所绑定的设备id，所有轨迹信息是通过设备id来获取

      isDisplay: false,

      mapCenter: '',
      distance: '',
    }
  },
  methods: {
    init() {
      /* 创建地图 */
      this.map = new AMap.Map('map-container', {
        zoom: 5
      });
      this.initPath();

      this.loadCoordinateOfWaybill().then(results => {
        this.renderPath();
      })

    },
    /* 触发搜索时，需要初始化一些数据 */
    initData: function() {
      if (this.navg1) {
        this.navg1.stop();
      }
      this.totalDataResult = [];
      this.resultPath = [];

    },

    loadCoordinateOfWaybill: function() {
      return new Promise((resolve, reject) => {
        this.pageLoading = true;

        this.$$http('loadTripOfPlanId', {
          fluid_name: this.fluidName,
          station_name: this.siteName,
          planid: this.planId,
        }).then(results => {
          this.pageLoading = false;

          if (results.data && results.data.code == 0) {
            this.totalDataResult = results.data.data.coord;

            this.carNumber = results.data.data.truck_no;

            this.resultPath = this.totalDataResult.map(item => {
              return item.lnglat.split(',');
            })
            resolve(results);
          } else {
            reject(results);
          }
        }).catch(err => {
          this.pageLoading = false;
          reject(err);
        })
      })

    },

    //初始化轨迹
    initPathSimplifier: function(PathSimplifier) {
      return new PathSimplifier({
        zIndex: 100,

        map: this.map, //所属的地图实例

        getPath: function(pathData, pathIndex) {

          return pathData.path;
        },
        getHoverTitle: function(pathData, pathIndex, pointIndex) {
          return
        },

        renderOptions: {

          renderAllPointsIfNumberBelow: 1000, //绘制路线节点，如不需要可设置为-1

          pathLineStyle: {
            strokeStyle: 'rgb(255,0,0)',
            lineWidth: 5,
            dirArrowStyle: true,
          },
        },

        autoSetFitView: true, //页面自适应

      });
    },
    //轨迹点添加事件回调
    pathSimplifierEventCallback: function(info) {

      let pointMsgStr = '';
      pointMsgStr = '<div class="fs-13 md-5">车牌号：' + this.carNumber +
        '</div><div class="fs-13 md-5">定位时间：' + this.totalDataResult[info.pointIndex].create_time +
        '</div><div class="fs-13 md-5">定位地址：' + this.totalDataResult[info.pointIndex].detail_address +
        '</div>';


      this.infoWindow.setInfoBody(pointMsgStr);

      this.infoWindow.open(this.map, info.pathData.path[info.pointIndex]);
    },
    //初始化巡航样式
    initPathNavigatorStyle: function(PathSimplifier) {
      return {

        loop: false, //循环播放

        speed: 100, //巡航速度，单位千米/小时

        pathNavigatorStyle: {
          width: 20,
          height: 20,
          content: PathSimplifier.Render.Canvas.getImageContent(require('../../../assets/img/direction_1.png')), //使用图片
          initRotateDegree: -90,
          pathLinePassedStyle: {
            lineWidth: 5,
            strokeStyle: '#087ec4',
          }
        },

        keyPointOnSelectedPathLineStyle: {
          radius: 10,
          fillStyle: 'rgb(244,18,71)',
        }

      }
    },
    /*  轨迹地图初始化相关end  */

    /* 初始化地图内的各种需要的控件 */
    initPath: function() {
      AMapUI.loadUI(['misc/PathSimplifier', 'overlay/SimpleInfoWindow', 'misc/MarkerList', 'overlay/SimpleMarker'], (PathSimplifier, SimpleInfoWindow, MarkerList, SimpleMarker) => {

        //初始化起点icon
        this.startMarker = new SimpleMarker({
          map: this.map,
          iconStyle: {
            src: require('../../../assets/img/lng_2.png'),
            style: {
              width: '20px',
              height: '20px',
            },
            visible: true,
          },
          offset: new AMap.Pixel(-9, -24),
          label: {
            content: this.fluidName,
            offset: new AMap.Pixel(30, 0)
          }
        });

        //初始化终点icon
        this.endMarker = new SimpleMarker({
          map: this.map,
          iconStyle: {
            src: require('../../../assets/img/l_2.png'),
            style: {
              width: '20px',
              height: '20px',
            }
          },
          offset: new AMap.Pixel(-10, -26),
          visible: true,
          label: {
            content: this.siteName,
            offset: new AMap.Pixel(30, 0)
          }
        });

        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }
        //初始化信息窗口
        this.infoWindow = new SimpleInfoWindow({
          infoTitle: '<div class="fs-16 text-center">点位置信息</div>',
          infoBody: ''
        });
        //初始化轨迹
        this.pathSimplifierIns = this.initPathSimplifier(PathSimplifier);
        //轨迹点添加事件
        this.pathSimplifierIns.on('pointMouseover pointClick', (e, info) => {
          this.pathSimplifierEventCallback(info);
        });
        //初始化巡航样式
        this.pathNavigatorStyle = this.initPathNavigatorStyle(PathSimplifier);

      });

    },
    /* 这里巡航时，实时展示点信息时，设置点信息 */
    setCurrentInfo: function() {
      let cursor = this.navg1.getCursor(); //获取当前点信息，见高德api
      if (Number(cursor.idx) >= 0) {
        let pointMsgStr = '';
        pointMsgStr = '<div class="fs-13 md-5">车牌号：' + this.carNumber +
          '</div><div class="fs-13 md-5">定位时间：' + this.totalDataResult[cursor.idx].create_time +
          '</div><div class="fs-13 md-5">定位地址：' + this.totalDataResult[cursor.idx].detail_address +
          '</div>';

        this.infoWindow.setInfoBody(pointMsgStr);
        this.infoWindow.setPosition(this.resultPath[cursor.idx]);

      }

      if (cursor.idx == (this.totalDataResult.length - 1)) {
        this.isDisplay = false;
      }

    },
    renderPath: function() {
      let allowTime = 20;
      if (this.pathSimplifierIns) {
        if (this.resultPath.length) { //如果有数据
          //设置数据，绘制轨迹
          this.pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: this.resultPath
          }]);
        } else {
          /* 如果没有轨迹数据展示提示，并清空轨迹展示 */
          this.$message({
            message: '无轨迹信息',
            type: 'success'
          });

          if (this.navg1) {
            this.navg1.destroy();
          }

          this.pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: []
          }]);

          return;
        }

        this.startMarker.show();
        this.startMarker.setPosition(this.resultPath[0]);


        /*对第一条线路（即索引 0）创建一个巡航器,这里就只有一条路线。*/
        this.navg1 = this.pathSimplifierIns.createPathNavigator(0, this.pathNavigatorStyle);

        /*获取查看地标的数据*/
        this.mapCenter = this.map.getCenter();
        let bounds = this.map.getBounds();
        let lnglat1 = new AMap.LngLat(bounds.northeast.lng, bounds.northeast.lat);
        let lnglat2 = new AMap.LngLat(bounds.northeast.lng, bounds.southwest.lat);
        this.distance = Math.floor(lnglat1.distance(lnglat2));

        if (this.resultPath.length) {
          /* 计算里程
           **利用高德地图getMovedDistance方法计算里程，详情请查看“UI组件库－轨迹展示api”
           */
          this.navg1.moveToPoint(this.resultPath.length - 1);
          this.distanceMile = Math.ceil(this.navg1.getMovedDistance() / 1000);
          /*计算巡航速度*/
          this.speed = Math.floor(this.distanceMile / this.driveringTime * 3600);
          /*设置终点marker*/
          let endMarkerIndex = this.resultPath.length - 1;
          this.endMarker.show();
          this.endMarker.setPosition(this.resultPath[endMarkerIndex]);
          /*监测巡航move事件（调用moveByDistance（动画过程会调用该方法）， moveToPoint 时触发），实时展示轨迹点信息。
           **这里有个问题是，moveByDistance，moveToPoint才出发move事件，导致轨迹点信息展示只能在导航到达点时才获取信息。没有实时跟着导航移动，需要优化。
           */
        }

        this.navg1.on('move', () => {
          this.setCurrentInfo();
        })

      } else {
        if (allowTime > 0) {
          /* 防止代码出错无限调用renderPath */
          allowTime--;
          /* 这里发现pathSimplifierIns有时还没初始化好,所以如果没有初始化好则再次执行renderPath */
          setTimeout(() => {
            this.renderPath();
          }, 200)
        }

      }

    },

    pauseDriving: function() { //暂停
      this.isDisplay = false;
      this.navg1.pause();
    },
    resumeDriving: function() { //恢复
      if (this.navg1) {
        this.isDisplay = true;
        let naviStatus = this.navg1.getNaviStatus();
        if (naviStatus === 'stop') {
          this.infoWindow.open(this.map, this.resultPath[0]);
          this.navg1.setSpeed(this.speed);
          this.navg1.start();
        } else {
          let cursor = this.navg1.getCursor();
          if (cursor.idx == (this.totalDataResult.length - 1)) {
            this.navg1.setSpeed(this.speed);
            this.navg1.start();
          } else {
            this.navg1.resume();
          }
        }
      }

    },
    changeSpeed: function() {
      this.navg1 && this.navg1.setSpeed(this.speed);
    },
  },
  created() {

  },

  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (this.navg1) {
      this.navg1.destroy();
    }
  }
}

</script>
<style scoped lang="less">
.out-contain {

  position: relative;
  #map-container {
    width: 100%;
    height: 700px;
    .amap-logo {
      right: 0px !important;
      left: auto !important;
      display: none;
    }

    .amap-copyright {
      right: 0px !important;
      left: auto !important;
      display: none;
    }
  }
  .map-loading {
    position: absolute;
    height: 50px;
    width: 100%;
    left: 0;
    top: 140px;
    /deep/ .el-loading-mask {
      background-color: rgba(250, 250, 250, 0);
    }
  }

  .bottom-operate {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: relative;
    font-size: 14px;
    .display-distance {
      position: absolute;
      top: 0;
      left: 10px;
      line-height: 50px;
      width: 100px;
    }
    .landmark-operate {
      position: absolute;
      top: 11px;
      left: 110px;
      width: 100px;
    }
    .startAndPause {
      width: 50px;
      padding-top: 9px;
      margin: 0 auto;
      img {
        cursor: pointer;
      }
    }

    .speed-control {
      position: absolute;
      top: 0;
      right: 10px;
      line-height: 50px;
      width: 250px;
    }
  }
}

</style>
