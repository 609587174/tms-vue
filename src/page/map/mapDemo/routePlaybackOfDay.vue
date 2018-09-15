<template>
  <div class="nav-tab">
    <div class="tab-screen border-top">
      <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input placeholder="请输入车牌号" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
              <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务状态:">
              <el-select v-model="searchFilters.waybillStatus" @change="startSearch" placeholder="请选择">
                <el-option v-for="(item,key) in waybillStatusSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="map-out-container mt-25">
      <div class="map-loading" v-loading="pageLoading"></div>
      <div class="total-data">
        <div class="total-data-item">全部({{monitorData.total_count}})</div>
        <div class="total-data-item"><span><img src="@/assets/img/direction_1.png" class="float-left" /></span><span class="float-left">行驶中({{monitorData.driving_count}})</span></div>
        <div class="total-data-item"><span><img src="@/assets/img/direction_2.png" class="float-left" /></span><span class="float-left">停留({{monitorData.stopping_count}})</span></div>
        <div class="total-data-item"><span><img src="@/assets/img/direction_4.png" class="float-left" /></span><span class="float-left">离线({{monitorData.offline_count}})</span></div>
        <div class="total-data-item">空闲({{monitorData.free_count}})</div>
        <div class="total-data-item">任务中({{monitorData.tasking_count}})</div>
      </div>
      <div id="map-container"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'routePlaybackOfDay',
  data() {
    return {
      map: '',
      markerList: '',
      allMakers: '',
      cluster: '',
      pageLoading: false,
      monitorData: {},
      carList: [],
      deviceDetail: {},
      searchFilters: {
        keyword: '',
        field: '',
        waybillStatus: '',
      },
      typeSelect: [],

    };
  },
  computed: {
    waybillStatusSelect: function() {
      return this.$store.getters.getIncludeAllSelect.map_waybill_vehicle_status;
    }
  },
  methods: {

    getRoutePlaybackOfDay: function() {
      return new Promise((resolve, reject) => {
        this.pageLoading = true;

        axios.get('http://192.168.0.31:8011/api/v1/loadCoordinateOfDay').then(results => {
          console.log('results', results);
          if (results.data && results.data.code === '200') {
            let resultsData = results.data.msg;
            resultsData.map(item => {
              let path = item.coord_list.map(pathItem => {
                return [pathItem.longitude, pathItem.latitude]
              })
              console.log('path', path);
            })
          }
        }).catch(err => {

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
      AMap.plugin('AMap.Geocoder', () => {
        let lnglat = [this.totalDataResult[info.pointIndex].location.longitude, this.totalDataResult[info.pointIndex].location.latitude]
        let geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: ''
        })
        geocoder.getAddress(lnglat, (status, data) => {
          if (status === 'complete' && data.info === 'OK') {
            let pointMsgStr = '';
            let speed = this.totalDataResult[info.pointIndex].speed ? this.totalDataResult[info.pointIndex].speed : '0';
            let addressDetail = data.regeocode.formattedAddress;
            pointMsgStr = '<div class="fs-13 md-5">主驾驶员：' + this.masterDriver +
              '</div><div class="fs-13 md-5">车牌号：' + this.carNumber +
              '</div><div class="fs-13 md-5">定位时间：' + this.totalDataResult[info.pointIndex].create_time +
              '</div><div class="fs-13 md-5">行驶速度：' + speed +
              'km/h</div><div class="fs-13 md-5">定位地址：' + addressDetail +
              '</div>';


            this.infoWindow.setInfoBody(pointMsgStr);

            this.infoWindow.open(this.map, info.pathData.path[info.pointIndex]);
          }
        })
      })
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

    initPath: function() {
      AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {

        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }

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


    /* 获取车辆数据 */
    getMonitorList: function() {
      return new Promise((resolve, reject) => {
        this.pageLoading = true;
        let postData = {

        };
        if (this.searchFilters.keyword.length) {
          postData.plate_number = this.searchFilters.keyword;
        }
        if (this.searchFilters.waybillStatus) {
          postData.waybill_vehicle_status = this.searchFilters.waybillStatus;
        }
        this.$$http('realTimeMonitor', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.monitorData = results.data.data;
            this.carList = results.data.data.data;

            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {

          this.pageLoading = false;
          reject(err);
        })

      })
    },
    startSearch: function() {
      this.getMonitorList().then((data) => {
        this.renderMarker();
      });
    },
    getIconSrc: function(item) {
      let src = ''
      if (item.speed) {
        src = 'direction_1.png'
      } else {
        if (item.device_status && item.device_status.key) {
          if (item.device_status.key === 'OFF_LINE') {
            src = 'direction_4.png'
          } else {
            src = 'direction_2.png'
          }
        }
      }
      return src;
    },
    /* 获取设备详情，在获取列表时没有返回设备数据，必须单独获取 */
    getDeviceDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getDeviceDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.deviceDetail = results.data.data;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    /* 初始化标注列表，详见高德地图标注列表api */
    initMarkList: function() {

      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        (MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) => {

          this.map.addControl(new BasicControl.Zoom({
            position: 'lt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

          let jQuery = MarkerList.utils.$; //即jQuery/Zepto

          this.markerList = new MarkerList({
            map: this.map,
            //从数据中读取位置, 返回lngLat
            getPosition: function(item) {
              return [item.location.longitude, item.location.latitude];
            },
            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
              return index;
            },
            getInfoWindow: function(data, context, recycledInfoWindow) {

              let infoTitleStr = '<div>车辆信息</div>';
              let infoBodyStr = '<br><div class="fs-13 text-center">数据加载中...</div><br>';

              return new SimpleInfoWindow({
                infoTitle: infoTitleStr,
                infoBody: infoBodyStr,
                offset: new AMap.Pixel(0, -37)
              });

            },
            //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function(dataItem, context, recycledMarker) {
              let src = '';
              let rotateDeg = (dataItem.direction - 90) + 'deg';
              src = this.getIconSrc(dataItem);

              return new SimpleMarker({
                containerClassNames: 'my-marker',
                iconStyle: {
                  src: require('../../../assets/img/' + src),
                  style: {
                    width: '20px',
                    height: '20px',
                    transform: 'rotate(' + rotateDeg + ')',
                  }
                },
                label: {
                  content: dataItem.tractor.plate_number,
                  offset: new AMap.Pixel(30, 0)
                }
              });
            },

            //marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],

            selectedClassNames: 'selected',

            autoSetFitView: false

          });


          this.markerList.on('selectedChanged', function(event, info) {

            if (info.selected) {
              let device_id = info.selected.data.device_id;
              this.getDeviceDetail(device_id).then((results) => {

                AMap.plugin('AMap.Geocoder', function() {

                  let lnglat = [info.selected.data.location.longitude, info.selected.data.location.latitude]
                  let geocoder = new AMap.Geocoder({
                    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                    city: ''
                  })
                  geocoder.getAddress(lnglat, function(status, data) {
                    if (status === 'complete' && data.info === 'OK') {
                      results.data.data.addressDetail = data.regeocode.formattedAddress;
                      let infoWindowDom = this.getInfoWindowDom(results, jQuery);
                      let infoWindow = this.markerList.getInfoWindow();

                      infoWindow.setInfoTitle(infoWindowDom.infoTitleStr);
                      infoWindow.setInfoBody(infoWindowDom.infoBodyStr);

                    }
                  })
                })

              })
              //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
              if (!info.sourceEventInfo.isListElementEvent) {

                if (info.selected.listElement) {
                  scrollListElementIntoView(jQuery(info.selected.listElement));
                }

              }
            }
          });

        });
    },
    /* 渲染infoWindow */
    getInfoWindowDom: function(results, jQuery) {
      let infoWindowDom = {};
      let detailData = results.data.data;
      let carMsg = (detailData.tractor && detailData.tractor.plate_number) ? detailData.tractor.plate_number : '无';
      let semitrailer = (detailData.semitrailer && detailData.semitrailer.plate_number) ? detailData.semitrailer.plate_number : '无';
      let waybill_vehicle_status = (detailData.waybill_vehicle_status && detailData.waybill_vehicle_status.verbose) ? detailData.waybill_vehicle_status.verbose : '无';
      let device_status = (detailData.location_info && detailData.location_info.device_status && detailData.location_info.device_status.verbose) ? detailData.location_info.device_status.verbose : '无';
      let master_driver = (detailData.master_driver && detailData.master_driver.name) ? detailData.master_driver.name : '无';
      let vice_driver = (detailData.vice_driver && detailData.vice_driver.name) ? detailData.vice_driver.name : '无';
      let escort_staff = (detailData.escort_staff && detailData.escort_staff.name) ? detailData.escort_staff.name : '无';
      let speed = (detailData.map_data && detailData.map_data.speed) ? detailData.map_data.speed : 0;
      let operatorDom = '';

      let routePlayback = () => {
        let deviceId = results.data.data.device_id;
        this.$router.push({
          path: `/mapManage/carMonitor/routePlayback/${deviceId}`,
        })
      };
      let fellowOrder = () => {
        let waybillId = (results.data.data.waybill && results.data.data.waybill.id) ? results.data.data.waybill.id : '';
        let stepId = results.data.data.selection_trip_id ? results.data.data.selection_trip_id : '';
        this.$router.push({
          path: `/logisticsManage/consignmentOrders/orderDetail/routePlayback/${stepId}/${waybillId}`,
        })
      }

      if (waybill_vehicle_status !== '无' && (detailData.waybill_vehicle_status && detailData.waybill_vehicle_status.key !== 'free')) {
        operatorDom = `<div><a href="javascript:void(0)" id="order-follow" class="el-button el-button--primary el-button--mini">订单跟踪</a>&nbsp;<a href="javascript:void(0)"  id="route-playback" class="el-button el-button--success el-button--mini">轨迹回放</a></div>`;
      } else {
        operatorDom = `<div><a href="javascript:void(0)" id="route-playback" class="el-button el-button--success el-button--mini">轨迹回放</a></div>`;
      }

      infoWindowDom.infoTitleStr = `<div class="fs-13 md-5">车牌号:${carMsg}</div>`;
      infoWindowDom.infoBodyStr = `<div class="fs-13 md-5">挂车号：${semitrailer}</div><div class="fs-13 md-5">主驾驶：${master_driver}</div><div class="fs-13 md-5">副驾驶：${vice_driver}</div><div class="fs-13 md-5">押运员：${escort_staff}</div><div class="fs-13 md-5">任务状态：${waybill_vehicle_status}</div><div class="fs-13 md-5">GPS状态：${device_status}</div><div class="fs-13 md-5">速度：${speed}km/h</div><div class="fs-13 md-5">定位时间：${detailData.location_info.create_time}</div><div class="fs-13 ">当前位置：${detailData.addressDetail}</div><br>${operatorDom}`;

      /* 这里需要在vue框架下面操作dom有点无奈，使用setTimeout也不够严谨 */
      setTimeout(function() {
        jQuery('#order-follow').click(function() {
          fellowOrder();
        })
        jQuery('#route-playback').click(function() {
          routePlayback();
        })
      }, 200)

      return infoWindowDom;
    },
    /* 生成marker并点聚合 */
    renderMarker: function() {
      let renderAndCluster = function() {
        /* 生成marker，详见高德地图标注列表api */
        this.markerList.render(this.carList);
        this.map.plugin(["AMap.MarkerClusterer"], function() {
          this.allMakers = this.markerList.getAllMarkers();
          if (this.cluster) {
            this.cluster.clearMarkers();
          }
          /* 点聚合，详见高德地图点聚合api */
          this.cluster = new AMap.MarkerClusterer(this.map, this.allMakers, {
            minClusterSize: 4,
            maxZoom: 17,
          });
        });
      }
      if (this.markerList) {
        renderAndCluster();
      } else {
        setTimeout(() => {
          renderAndCluster();
        }, 1000)

      }

      this.map.setFitView(this.allMakers);

    }
  },
  created() {

  },
  mounted() {
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    this.initMarkList();

    /*
    this.getMonitorList().then((data) => { //展示该数据
      this.renderMarker();
    })*/

    this.getRoutePlaybackOfDay();

  }
};

</script>
<style scoped lang="less">
.map-out-container {
  width: 100%;
  height: 700px;
  position: relative;
  .search-cloumn {
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    z-index: 9999;
  }
  .total-data {
    background-color: #fff;
    height: 40px;
    width: 100%;
    line-height: 40px;

    .total-data-item {
      text-align: center;
      padding: 0px 10px;
      border-right: 1px solid #ddd;
      float: left;
      img {
        width: 18px;
        height: 18px;
        position: relative;
        top: 10px;
        margin-right: 5px;
      }
    }
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 170;
  }
  .map-loading {
    position: absolute;
    height: 52px;
    width: 100%;
    left: 0;
    top: 0px;
    /deep/ .el-loading-mask {
      background-color: rgba(250, 250, 250, 0);
    }
  }
}

#map-container {
  width: 100%;
  height: 700px;
}

</style>
