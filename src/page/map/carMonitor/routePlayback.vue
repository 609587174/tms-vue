<template>
  <div>
    <div>
      <div>
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row :gutter="0">
            <el-col :span="24">
              <el-select v-model="value9" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getCarList" :loading="carloading">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="4">
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div id="map-container"></div>
  </div>
</template>
<script>
let pathSimplifierIns;
export default {
  name: 'routePlayback',
  computed: {
    id: function() {
      console.log('this.$route.params', this.$route.params.id);
      return this.$route.params.id;
    }
  },
  data() {
    return {
      map: '', //地图实列
      pathSimplifierIns: '', //轨迹实列
      totalDataResult: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后的总数据集合
      dataResult: [], //接口请求返回数据，
      resultPath: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后经纬度集合
      path: [], //接口请求返回数据，过滤后只包含经纬度信息。
      pathNavigatorStyle: {},
      currentPage: 1,
      pageSize: 1000,
      navg1: '',
      distanceMile: '', //总里程
      driveringTime: 5, //巡航时间
      startMarker: '',
      endMarker: '',
      deviceDetail: '',

    }
  },
  methods: {
    getCarList: function() {

    },
    getTripRecords: function() {
      return new Promise((resolve, reject) => {
        this.dataResult = [];
        this.path = [];

        let postData = {
          id: this.id,
          page: this.currentPage,
          page_size: this.pageSize,
          start_time: '2018-06-01 00:00:00',
        };
        this.$$http('getTripRecords', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0 && results.data.data) {
            console.log('results.data.data', results.data.data);
            this.dataResult = results.data.data.trip_results;
            for (let i in this.dataResult) {
              this.path[i] = [this.dataResult[i].location.longitude, this.dataResult[i].location.latitude];
            }
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    /* 从点数组中选择点,用于计算距离,这里recursiveNum默认为10,取10个点 */
    choosePositionForDistance: function(positionArray, pointNum = 10) {
      let resultPositionArray = [];
      let positionArrayLenght = positionArray.length;

      if (positionArrayLenght <= pointNum) {
        resultPositionArray = positionArray;
      } else {
        resultPositionArray.push(positionArray[0]);

        for (let i = 1; i < pointNum; i++) {
          let choosedPointIndex = Math.floor(positionArrayLenght / pointNum * i);
          resultPositionArray.push(positionArray[choosedPointIndex]);
        }
      }

      return resultPositionArray;

    },
    /* 计算距离 */
    calculateDistance: function(positionArray) {
      let i = 0;
      let totalDistance = 0;

      while (i < positionArray.length - 1) {
        let lnglat1 = new AMap.LngLat(positionArray[i][0], positionArray[i][1]);
        let lnglat2 = new AMap.LngLat(positionArray[i + 1][0], positionArray[i + 1][1]);
        totalDistance += lnglat1.distance(lnglat2);
        i++;
      }

      return totalDistance;

    },
    renderPath: function(data) {
      let _this = this;
      let allowTime = 20;
      if (pathSimplifierIns) {
        if (_this.path.length) {
          /* 如果有数据的情况下 */
          //拼接数据
          _this.totalDataResult = [..._this.totalDataResult, ..._this.dataResult]
          _this.resultPath = [..._this.resultPath, ..._this.path];

          console.log('_this.pathSimplifierIns', pathSimplifierIns);
          //设置数据，绘制轨迹
          pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: _this.resultPath
          }]);

        } else {
          /* 如果没有轨迹数据展示提示，并清空轨迹展示 */
          _this.$message({
            message: '无车辆信息',
            type: 'success'
          });

          _this.navg1.destroy();

          pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: []
          }]);

        }

        _this.startMarker.setPosition(_this.resultPath[0]);

        if (Math.ceil(data.data.data.count / _this.pageSize)) {
          /* 一次只拿1000条数据，如果数据没有拿完则继续去获取数据 */
          if (_this.currentPage < Math.ceil(data.data.data.count / _this.pageSize)) {

            _this.currentPage++;

            _this.searchAndRender();
          } else {
            /* 如果数据已经获取完成 */

            let pointArray = [];
            let speed = 0;

            //对第一条线路（即索引 0）创建一个巡航器
            _this.navg1 = pathSimplifierIns.createPathNavigator(0, _this.pathNavigatorStyle);

            /* 计算里程 */
            pointArray = _this.choosePositionForDistance(_this.resultPath, 20); //选取点
            _this.distanceMile = _this.calculateDistance(pointArray); //计算里程
            speed = _this.distanceMile / _this.driveringTime; //计算巡航速度

            let endMarkerIndex = _this.resultPath.length - 1;
            _this.endMarker.setPosition(_this.resultPath[endMarkerIndex]);

            _this.navg1.setSpeed(speed);

            _this.navg1.start();
          }

        }
      } else {
        if (allowTime > 0) {
          /* 防止代码出错无限调用renderPath */
          allowTime--;
          /* 这里发现pathSimplifierIns有时还没初始化好,所以如果没有初始化好则再次执行renderPath */
          setTimeout(() => {
            console.log('xxxx');
            _this.renderPath(data);
          }, 200)
        }

      }

    },
    getDeviceDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getDeviceDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.deviceDetail = results.data.data;
            console.log('deviceDetail', this.deviceDetail);
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    searchAndRender: function() {
      let _this = this;
      _this.getTripRecords().then((data) => {
        _this.renderPath(data);
      })
    },
    initPath: function() {
      let _this = this;
      AMapUI.loadUI(['misc/PathSimplifier', 'overlay/SimpleInfoWindow', 'overlay/SimpleMarker'], function(PathSimplifier, SimpleInfoWindow, SimpleMarker) {

        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }

        //初始化信息窗口
        let infoWindow = new SimpleInfoWindow({
          infoTitle: '<div class="fs-16">点位置信息</div>',
          infoBody: ''
        });
        //初始化起点icon
        _this.startMarker = new SimpleMarker({
          map: _this.map,
          iconStyle: {
            src: require('../../../assets/img/origin.png'),
            style: {
              width: '20px',
              height: '25px',
            },

          },
          offset: new AMap.Pixel(-9, -24),
        });
        //初始化终点icon
        _this.endMarker = new SimpleMarker({
          map: _this.map,
          iconStyle: {
            src: require('../../../assets/img/finish.png'),
            style: {
              width: '22px',
              height: '27px',
            }
          },
          offset: new AMap.Pixel(-10, -26),
        });
        //初始化轨迹
        pathSimplifierIns = new PathSimplifier({
          zIndex: 100,

          map: _this.map, //所属的地图实例

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

        console.log('_this.pathSimplifierInsccc', pathSimplifierIns);

        _this.pathNavigatorStyle = {

          loop: true, //循环播放

          speed: 1000000, //巡航速度，单位千米/小时

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
        //轨迹点添加事件
        pathSimplifierIns.on('pointMouseover pointClick', function(e, info) {

          let pointMsgStr = '';
          pointMsgStr = '<div class="fs-13">定位时间：' + _this.totalDataResult[info.pointIndex].create_time +
            '</div><div class="fs-13">行驶速度：' + _this.totalDataResult[info.pointIndex].speed +
            'km/h</div>';

          infoWindow.setInfoBody(pointMsgStr);

          infoWindow.open(_this.map, info.pathData.path[info.pointIndex]);

        });





      });

      console.log('_this.pathSimplifierInscccttt', pathSimplifierIns);


    }
  },
  created() {

  },
  mounted() {
    /* 创建地图 */
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });
    this.initPath();
    this.searchAndRender();
    console.log('this.$route.params', this.$route.params);
  },
}

</script>
<style scoped lang="less">
#map-container {
  width: 100%;
  height: 600px;
}

</style>
