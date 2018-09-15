<template>
  <div class="out-contain">
    <mapSearchFilter @chooseCar="chooseCar" @searchAndRender="searchAndRender" :searchFilters="searchFilters" :searchBtn.sync="searchBtn"></mapSearchFilter>
    <sideAlertTraggle :offlinePointPage="offlinePointPage" :stopPointPage="stopPointPage" :curentStopPoint="curentStopPoint" :curentOfflinePoint="curentOfflinePoint" :offlineAndstopLoading="offlineAndstopLoading" @checkPoint="checkPoint"></sideAlertTraggle>
    <div class="map-loading" v-loading="pageLoading"></div>
    <div id="map-container"></div>
    <div class="bottom-operate">
      <div class="display-distance">{{distanceMile}}公里</div>
      <div class="landmark-operate">
        <el-button type="success" size="mini" :loading="getLandmarkBtn.isLoading" :isDisabled="getLandmarkBtn.isDisabled" @click="checkLandmark()" v-if="!isNeedGetLandmark && resultPath.length">{{getLandmarkBtn.text}}</el-button>
        <el-button type="primary" size="mini" @click="hideLandmark()" v-if="isNeedGetLandmark">隐藏地标</el-button>
      </div>
      <div class="startAndPause text-center"><img v-show="!isDisplay" @click="resumeDriving" src="@/assets/img/play.png" /><img v-show="isDisplay" @click="pauseDriving" src="@/assets/img/suspend.png" /></div>
      <div class="speed-control">
        <input class="speedRange" type="range" min="1000" max="200000" step="5000" v-model="speed" @change="changeSpeed">
        <span>{{speed}}km/h</span>
      </div>
    </div>
  </div>
</template>
<script>
import mapSearchFilter from '@/components/map/mapSearchFilter';
import sideAlertTraggle from '@/components/map/sideAlertTraggle';
import axios from 'axios';
export default {
  name: 'routePlaybackDetail',
  components: {
    mapSearchFilter,
    sideAlertTraggle,
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      pageLoading: false,
      offlineAndstopLoading: true,
      map: '', //地图实列
      markerList: [], //标注列表实例
      cluster: '', //点聚合实例
      pathSimplifierIns: '', //轨迹实列
      infoWindow: '', //简单信息窗体实列
      totalDataResult: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后的总数据集合
      totalStopPoint: [], //接口请求返回所有停留点数据，
      totalOfflinePoint: [], //接口请求返回所有离线点数据，
      dataResult: [], //接口请求返回坐标点数据，
      stopPointResult: [], //接口请求返回停留点数据，
      offlinePointResult: [], //接口请求返回离线点点数据，
      curentStopPoint: [], //当前分页停留点数据
      curentOfflinePoint: [], //当前分页停留点数据
      resultPath: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后经纬度集合
      path: [], //接口请求返回数据，过滤后只包含经纬度信息。
      pathNavigatorStyle: {}, //巡航样式
      totalPage: { //获取轨迹点数据分页信息
        currentPage: 1,
        pageSize: 1000,
      },
      stopPointPage: { //自定义停留点数据分页信息
        total: '',
        currentPage: 1,
        pageSize: 10,
      },
      offlinePointPage: { //自定义离线点数据分页信息
        total: '',
        currentPage: 1,
        pageSize: 10,
      },
      navg1: '', //巡航
      distanceMile: 0, //总里程
      speed: 0, //巡航的展示速度
      driveringTime: 10, //巡航时间
      startMarker: '', //起点标记
      endMarker: '', //终点标记
      deviceDetail: '', //设备详情，获取设备详情是为了页面初始化的时候，获取绑定车辆信息carNumber
      carNumber: '', //绑定车辆信息
      masterDriver: '',
      searchFilters: {
        choosedCar: '', //筛选所选择的车辆
        choosedTime: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), new Date()], //筛选所选择的时间段，巨坑，choosedTime初始化不能使用变量。可能是用法不正确。
        optionValue: 'time',
        orderValue: '',
      },
      choosedDeviceId: '', //筛选所选择的车辆所绑定的设备id，所有轨迹信息是通过设备id来获取

      searchBtn: {
        loading: false,
        text: '搜索',
        isDisabled: false,
      },
      isDisplay: false,
      landmarkList: [], //地标列表
      isGetLandmark: false,
      isNeedGetLandmark: false,
      getLandmarkBtn: {
        text: '查看地标',
        isLoading: false,
        isDisabled: false,
      },
      mapCenter: '',
      distance: '',
    }
  },
  methods: {
    dateToStr: function(date) {
      let dateDetail = this.pbFunc.getDateDetail(date);
      let str = '';
      str = dateDetail.year + '-' + dateDetail.month + '-' + dateDetail.day + ' ' + dateDetail.hour + ':' + dateDetail.minute + ':' + dateDetail.second;
      return str;
    },
    chooseCar: function(data) {
      this.choosedDeviceId = data.carList;
      this.carNumber = data.carNumber;
    },
    /* 页面初始化时获取设备详细信息，为了获取车牌号。carNumber */
    getDeviceDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.id
        };
        this.$$http('getDeviceDetail', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.deviceDetail = results.data.data;
            this.carNumber = this.deviceDetail.tractor.plate_number;
            this.masterDriver = (this.deviceDetail.master_driver && this.deviceDetail.master_driver.name) ? this.deviceDetail.master_driver.name : '无';
            this.searchFilters.choosedCar = this.deviceDetail.tractor.id;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    /* 获取轨迹点数据返回的结果中的离线点和停留点只包含开始时间和持续多少秒，calculateEndTime是用来计算结束时间 */
    calculateEndTime: function(startTime, duration) {
      let time = Date.parse(startTime) + duration * 1000;
      let timeDetail = this.pbFunc.getDateDetail(new Date(time));
      let timeStr = timeDetail.year + '-' + timeDetail.month + '-' + timeDetail.day + ' ' + timeDetail.hour + ':' + timeDetail.minute + ':' + timeDetail.second;
      return timeStr;
    },
    /* 处理离线点和停留点的结束时间和持续时长，后端没有直接返回结果，需要自己计算，data参数为停留点数据或者离线点数据 */
    dealSatrtEndTime: function(data) {
      let resultsData = [];
      for (let i in data) {
        resultsData[i] = data[i];
        if (data[i].hasOwnProperty('offline_seconds')) {
          let durationHours = Math.floor(data[i].offline_seconds / 3600);
          let durationMinutes = Math.floor((data[i].offline_seconds % 3600) / 60);
          let durationSeconds = data[i].offline_seconds % 60;
          resultsData[i].duration = durationHours + '时' + durationMinutes + '分' + durationSeconds + '秒';
          resultsData[i].end_time = this.calculateEndTime(data[i].create_time, data[i].offline_seconds);
        } else {
          let durationHours = Math.floor(data[i].offline_seconds / 3600);
          let durationMinutes = Math.floor((data[i].offline_seconds % 3600) / 60);
          let durationSeconds = data[i].stopping_seconds % 60;
          resultsData[i].duration = durationHours + '时' + durationMinutes + '分' + durationSeconds + '秒';
          resultsData[i].end_time = this.calculateEndTime(data[i].create_time, data[i].stopping_seconds);
        }

      }

      return resultsData;

    },
    /* 获取到所有数据以后对数据进行再次组合排序 */
    sortResult: function(dataArray, apiName) {
      if (apiName === 'getTripRecords') {
        for (let i = 0; i < dataArray.length; i++) {
          this.totalDataResult = this.totalDataResult.concat(dataArray[i].totalDataResult);
          this.resultPath = this.resultPath.concat(dataArray[i].resultPath);
        }
        this.renderPath();
      } else if (apiName === 'getOfflineAndStopRecords') {
        for (let i = 0; i < dataArray.length; i++) {
          this.totalStopPoint = this.totalStopPoint.concat(dataArray[i].totalStopPoint);
          this.totalOfflinePoint = this.totalOfflinePoint.concat(dataArray[i].totalOfflinePoint);
        }
        this.offlineStopPointSetPage();
      }
    },
    /* 触发搜索时，需要初始化一些数据 */
    initData: function() {
      if (this.navg1) {
        this.navg1.stop();
      }
      this.totalDataResult = [];
      this.totalStopPoint = [];
      this.curentStopPoint = [];
      this.totalOfflinePoint = [];
      this.curentOfflinePoint = [];
      this.resultPath = [];
      this.isGetLandmark = false;

      this.stopPointPage = {
        total: '',
        currentPage: 1,
        pageSize: 10,
      }
      this.offlinePointPage = {
        total: '',
        currentPage: 1,
        pageSize: 10,
      };
      this.totalPage = {
        currentPage: 1,
        pageSize: 1000,
      };

      //this.pageLoading = true;
      this.offlineAndstopLoading = true;

    },

    loadCoordinateOfWaybill: function() {
      return new Promise((resolve, reject) => {
        this.pageLoading = true;
        axios.get(`http://namenode:8080/api/v1/loadCoordinateOfWaybill?waybill_number=${this.searchFilters.orderValue}`).then(results => {
          this.pageLoading = false;
          console.log('results', results);
          if (results.data && results.data.code == 200) {

            let resultsData = results.data.msg[0].coord_list;
            this.totalDataResult = resultsData;
            this.resultPath = this.totalDataResult.map(item => {
              return [item.longitude, item.latitude];
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
    loadCoordinateOfInterval: function() {
      console.log('this.searchFilters', this.searchFilters);
      return new Promise((resolve, reject) => {
        this.pageLoading = true;
        const startTime = this.dateToStr(new Date(this.searchFilters.choosedTime[0]));
        const endTime = this.dateToStr(new Date(this.searchFilters.choosedTime[1]));
        axios.get(`http://namenode:8080/api/v1/loadCoordinateOfInterval?start_time=${startTime}&end_time=${endTime}&device_id=${this.id}`).then(results => {
          console.log('loadCoordinateOfInterval', results);
          this.pageLoading = false;
          if (results.data && results.data.code == 200) {

            let resultsData = results.data.msg[0].coord_list;
            this.totalDataResult = resultsData;
            this.resultPath = this.totalDataResult.map(item => {
              return [item.longitude, item.latitude];
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
    searchAndRender: function() {
      this.initData();
      if (this.searchFilters.optionValue === 'order') {
        if (this.searchFilters.orderValue) {

          this.loadCoordinateOfWaybill().then(() => {
            this.renderPath();
          })
        } else {
          this.$message.error('请选择订单');
        }
      } else {
        this.loadCoordinateOfInterval().then(() => {
          this.renderPath();
        })
      }

    },

    /*  轨迹地图初始化相关start  */
    getIconSrc: function(item) {
      let src = 'parking_4.png'
      /*lng加气站*/
      if (item.position_type && item.position_type === 'LNG') {
        if (item.async_status === 'ASYNCED') {
          src = 'gas_1.png';
        } else {
          switch (item.confirm_status) {
            case 'SUCCESS':
              src = 'gas_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'gas_3.png'
              break;
            default:
              src = 'gas_4.png'
          }
        }
      }
      /*卸货站*/
      if (item.position_type && item.position_type === 'DELIVER_POSITION') {
        if (item.async_status === 'ASYNCED') {
          src = 'l_1.png';
        } else {
          switch (item.confirm_status) {
            case 'SUCCESS':
              src = 'l_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'l_3.png'
              break;
            default:
              src = 'l_4.png'
          }
        }
      }
      /*食宿停*/
      if (item.position_type && item.position_type === 'REST_AREA') {
        if (item.async_status === 'ASYNCED') {
          src = 'parking_1.png';
        } else {
          switch (item.confirm_status) {
            case 'SUCCESS':
              src = 'parking_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'parking_3.png'
              break;
            default:
              src = 'parking_4.png'
          }
        }
      }
      /*气源液厂*/
      if (item.position_type && item.position_type === 'LNG_FACTORY') {
        if (item.async_status === 'ASYNCED') {
          src = 'lng_1.png';
        } else {
          switch (item.confirm_status.key) {
            case 'SUCCESS':
              src = 'lng_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'lng_3.png'
              break;
            default:
              src = 'lng_4.png'
          }
        }
      }
      return src;

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
        let lnglat = [this.totalDataResult[info.pointIndex].longitude, this.totalDataResult[info.pointIndex].latitude]
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
    //初始化标注列表
    initmarkerList: function(MarkerList, SimpleInfoWindow, SimpleMarker) {
      return new MarkerList({

        map: this.map,

        //从数据中读取位置, 返回lngLat
        getPosition: (item) => {
          return [item.location.longitude, item.location.latitude];
        },

        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: (item, index) => {
          return index;
        },

        getInfoWindow: (data, context, recycledInfoWindow) => {

          let infoTitleStr = '<div class="marker-info-window"><span class="fs-13">' + data.position_name + '</span>';
          let infoBodyStr = '<br><div class="fs-13 text-center">数据加载中...</div><br>';

          if (recycledInfoWindow) {
            recycledInfoWindow.setInfoTitle(infoTitleStr);
            recycledInfoWindow.setInfoBody(infoBodyStr);
            return recycledInfoWindow;
          } else {
            return new SimpleInfoWindow({
              infoTitle: infoTitleStr,
              infoBody: infoBodyStr,
              offset: new AMap.Pixel(0, -37)
            });
          }

        },

        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: (dataItem, context, recycledMarker) => {
          let src = '';
          src = this.getIconSrc(dataItem);

          if (recycledMarker) {
            recycledMarker.setIconStyle({
              src: require('../../../assets/img/' + src),
              style: {
                width: '20px',
                height: '20px',
              },
            });

            recycledMarker.setLabel({
              content: dataItem.position_name,
              offset: new AMap.Pixel(30, 0)
            })

            return recycledMarker;

          } else {
            return new SimpleMarker({
              containerClassNames: 'my-marker',
              iconStyle: {
                src: require('../../../assets/img/' + src),
                style: {
                  width: '20px',
                  height: '20px',
                },
              },
              label: {
                content: dataItem.position_name,
                offset: new AMap.Pixel(30, 0)
              },
            });
          }

        },

        //marker上监听的事件
        markerEvents: ['click', 'mouseover', 'mouseout'],

        selectedClassNames: 'selected',

        autoSetFitView: false

      });
    },
    //标注列表点击时间回调
    markerListEventCallback: function(MarkerList, info) {
      let $ = MarkerList.utils.$; //即jQuery/Zepto
      if (info.selected) {
        let infoWindow = this.markerList.getInfoWindow();
        let id = info.selected.data.id;
        /* 实时获取地标数据 */
        this.getLandmarkDetail(id).then((results) => {
          let infoBodyStr = this.getInfoWindowDom(this.landmarkDetail);
          infoWindow.setInfoBody(infoBodyStr);
        }).catch(() => {
          let infoBodyStr = '<br><div class="fs-13 text-center">数据加载失败</div><br>';
          infoWindow.setInfoBody(infoBodyStr);
        })
        //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
        if (!info.sourceEventInfo.isListElementEvent) {

          if (info.selected.listElement) {
            scrollListElementIntoView($(info.selected.listElement));
          }

        }
      }
    },
    /*  轨迹地图初始化相关end  */

    /* 初始化地图内的各种需要的控件 */
    initPath: function() {
      AMapUI.loadUI(['misc/PathSimplifier', 'overlay/SimpleInfoWindow', 'misc/MarkerList', 'overlay/SimpleMarker'], (PathSimplifier, SimpleInfoWindow, MarkerList, SimpleMarker) => {

        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }
        //初始化信息窗口
        this.infoWindow = new SimpleInfoWindow({
          infoTitle: '<div class="fs-16 text-center">点位置信息</div>',
          infoBody: ''
        });
        //初始化起点icon
        this.startMarker = new SimpleMarker({
          map: this.map,
          iconStyle: {
            src: require('../../../assets/img/origin.png'),
            style: {
              width: '20px',
              height: '25px',
            },
            visible: false,
          },
          offset: new AMap.Pixel(-9, -24),
        });
        //初始化终点icon
        this.endMarker = new SimpleMarker({
          map: this.map,
          iconStyle: {
            src: require('../../../assets/img/finish.png'),
            style: {
              width: '22px',
              height: '27px',
            }
          },
          offset: new AMap.Pixel(-10, -26),
          visible: false,
        });
        //初始化轨迹
        this.pathSimplifierIns = this.initPathSimplifier(PathSimplifier);
        //轨迹点添加事件
        this.pathSimplifierIns.on('pointMouseover pointClick', (e, info) => {
          this.pathSimplifierEventCallback(info);
        });
        //初始化巡航样式
        this.pathNavigatorStyle = this.initPathNavigatorStyle(PathSimplifier);
        //初始化标注列表
        this.markerList = this.initmarkerList(MarkerList, SimpleInfoWindow, SimpleMarker);
        //标注列表添加事件
        this.markerList.on('selectedChanged', (event, info) => {
          this.markerListEventCallback(MarkerList, info);
        });

      });

    },
    /* 这里巡航时，实时展示点信息时，设置点信息 */
    setCurrentInfo: function() {
      let cursor = this.navg1.getCursor(); //获取当前点信息，见高德api
      if (Number(cursor.idx) >= 0) {
        let pointMsgStr = '';
        let longitude = this.totalDataResult[cursor.idx].longitude;
        let latitude = this.totalDataResult[cursor.idx].latitude;
        let speed = this.totalDataResult[cursor.idx].speed ? this.totalDataResult[cursor.idx].speed : '0';
        pointMsgStr = '<div class="fs-13 md-5">主驾驶员：' + this.masterDriver +
          '</div><div class="fs-13 md-5">车牌号：' + this.carNumber +
          '</div><div class="fs-13 md-5">定位时间：' + this.totalDataResult[cursor.idx].create_time +
          '</div><div class="fs-13 md-5">行驶速度：' + speed +
          'km/h</div>';

        this.infoWindow.setInfoBody(pointMsgStr);
        this.infoWindow.setPosition([longitude, latitude]);

      }

      if (cursor.idx == (this.totalDataResult.length - 1)) {
        this.isDisplay = false;
      }

    },
    offlineStopPointSetPage: function() {
      /* 停留点逻辑处理
       **这里后端是返回了当次接口请求返回结果的离线点或者停留点数据，前端通过多次请求获取完整数据后，拼接数据到totalStopPoint／totalOfflinePoint中，并需要自己做分页，
       */
      this.stopPointPage.currentPage = 1;
      this.stopPointPage.total = this.totalStopPoint.length;
      this.curentStopPoint = this.totalStopPoint.slice(0, this.stopPointPage.pageSize);
      this.curentStopPoint = this.dealSatrtEndTime(this.curentStopPoint);
      /* 离线点逻辑处理同停留点 */
      this.curentOfflinePoint = this.totalOfflinePoint.slice(0, this.offlinePointPage.pageSize);
      this.curentOfflinePoint = this.dealSatrtEndTime(this.curentOfflinePoint);
      this.offlinePointPage.currentPage = 1;
      this.offlinePointPage.total = this.totalOfflinePoint.length;
    },
    renderPath: function() {
      let allowTime = 20;
      console.log('this.resultPath', this.resultPath);
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
        if (this.isNeedGetLandmark) {
          this.getLandMarkList().then(() => {
            this.renderMarker();
          });
        }

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
    stopPointPageChange: function() {
      setTimeout(() => {
        this.curentStopPoint = this.totalStopPoint.slice((this.stopPointPage.currentPage - 1) * this.stopPointPage.pageSize, this.stopPointPage.currentPage * this.stopPointPage.pageSize);
        this.curentStopPoint = this.dealSatrtEndTime(this.curentStopPoint);
      })
    },
    offlinePointPageChange: function() {
      setTimeout(() => {
        this.curentOfflinePoint = this.totalOfflinePoint.slice((this.offlinePointPage.currentPage - 1) * this.offlinePointPage.pageSize, this.offlinePointPage.currentPage * this.offlinePointPage.pageSize);
        this.curentOfflinePoint = this.dealSatrtEndTime(this.curentOfflinePoint);
      })
    },
    /* 停留点或者离线点，查看操作 */
    checkPoint: function(row) {
      this.isDisplay = false;
      this.navg1.pause();

      AMap.plugin('AMap.Geocoder', () => {

        let lnglat = [row.row.location.longitude, row.row.location.latitude]
        let geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: ''
        })
        geocoder.getAddress(lnglat, (status, data) => {
          if (status === 'complete' && data.info === 'OK') {
            let pointMsgStr = '';
            let addressDetail = data.regeocode.formattedAddress;
            let speed = row.row.speed ? row.row.speed : '0';
            pointMsgStr = '<div class="fs-13 md-5">主驾驶员：' + this.masterDriver +
              '</div><div class="fs-13 md-5">车牌号：' + this.carNumber +
              '</div><div class="fs-13 md-5">定位时间：' + row.row.create_time +
              '</div><div class="fs-13 md-5">行驶速度：' + speed +
              'km/h</div><div class="fs-13 md-5">定位地址：' + addressDetail +
              '</div>';


            this.infoWindow.setInfoBody(pointMsgStr);

            this.infoWindow.open(this.map, [row.row.location.longitude, row.row.location.latitude]);
          }
        })
      })

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
            this.infoWindow.open(this.map, this.resultPath[0]);
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
    checkLandmark: function() {
      /* 获取地标列表并生成地标 */
      this.isNeedGetLandmark = true;
      if (this.isGetLandmark) {
        this.renderMarker();
      } else {
        this.getLandMarkList().then(() => {
          this.renderMarker();
        });
      }
    },
    hideLandmark: function() {
      this.isNeedGetLandmark = false;
      this.markerList.clearData();
      this.cluster.clearMarkers();
    },
    getLandMarkList: function() {
      return new Promise((resolve, reject) => {

        let postData = {
          pagination: false,
          simplify: true,
          longitude: this.mapCenter.lng,
          latitude: this.mapCenter.lat,
          distance: this.distance,
        };

        this.getLandmarkBtn.text = '获取中';
        this.getLandmarkBtn.isDisabled = true;
        this.getLandmarkBtn.isLoading = true;

        this.$$http('getLandMarkList', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.landmarkList = results.data.data.results;

            this.getLandmarkBtn.text = '查看地标';
            this.getLandmarkBtn.isDisabled = false;
            this.getLandmarkBtn.isLoading = false;
            this.isGetLandmark = true;


            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    renderMarker: function() {
      this.markerList.render(this.landmarkList);
      this.map.plugin(["AMap.MarkerClusterer"], () => {
        this.allMakers = this.markerList.getAllMarkers();
        if (this.cluster) {
          // this.cluster.clearMarkers();
          this.cluster.setMarkers(this.allMakers);
        } else {
          this.cluster = new AMap.MarkerClusterer(this.map, this.allMakers, { minClusterSize: 4, maxZoom: 17, });
        }

      });
    },
    getLandmarkDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getLandMarkDetail', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.landmarkDetail = results.data.data;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    getInfoWindowDom: function(data) {
      let infoBodyStr = '<div class="fs-13 md-5">地标类型：' + data.position_type.verbose +
        '</div><div class="fs-13 md-5">地标位置：' + data.address +
        '</div><div class="fs-13 md-5">审核状态：' + data.confirm_status.verbose +
        '</div><div class="fs-13 md-5">上传来源：' + data.source_type.verbose +
        '</div><div class="fs-13 md-5">是否同步：' + data.async_status.verbose +
        '</div></div>';

      return infoBodyStr;
    },

  },
  created() {

  },

  mounted() {
    /* 创建地图 */
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });
    this.initPath();
    this.getDeviceDetail();
    this.loadCoordinateOfInterval().then(() => {
      this.renderPath();
    })

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
