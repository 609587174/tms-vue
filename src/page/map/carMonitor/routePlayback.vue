<template>
  <div class="out-contain">
    <div class="search-filters-contain" v-show="showMap">
      <div>
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="车牌号:">
                <el-select v-model="searchFilters.choosedCar" @change="chooseCar" filterable placeholder="请输入关键词" :loading="carLoading">
                  <el-option v-for="(item,key) in carList" :key="key" :label="item.tractor.plate_number" :value="item.tractor.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="搜索时间:">
                <el-date-picker v-model="searchFilters.choosedTime" :picker-options="timeQuickPick" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="chooseTime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24">
              <div class="float-left time-spacing">{{timeSpacing.day}}天{{timeSpacing.hours}}小时{{timeSpacing.minutes}}分钟</div>
              <div>
                <el-button class="float-right" type="primary" @click="searchAndRender" :disabled="searchBtn.isDisabled" :loading="searchBtn.loading">{{searchBtn.text}}</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="nav-tab point-tab">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="停留点" name="stopPoint">
              <el-table :data="curentStopPoint" stripe style="width: 100%" size="mini" v-loading="pageLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <el-table-column align="center" label="操作" :width="60">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="checkPoint(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page-list text-center">
                <el-pagination background layout="prev, pager, next" :total="stopPointPage.total" :page-size="stopPointPage.pageSize" :current-page.sync="stopPointPage.currentPage" @current-change="stopPointPageChange" v-if="!pageLoading && stopPointPage.total>10">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="离线点" name="offlinePoint">
              <el-table :data="curentOfflinePoint" stripe style="width: 100%" size="mini" v-loading="pageLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <el-table-column align="center" label="操作" :width="60">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="checkPoint(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page-list text-center">
                <el-pagination background layout="prev, pager, next" :total="offlinePointPage.total" :page-size="offlinePointPage.pageSize" :current-page.sync="offlinePointPage.currentPage" @current-change="offlinePointPageChange" v-if="!pageLoading && offlinePointPage.total>10">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="side-alert-traggle side-alert-traggle-right" v-show="showMap" @click="triggerAlert"><span>«</span></div>
    <div class="side-alert-traggle side-alert-traggle-left" v-show="!showMap" @click="triggerAlert"><span>»</span></div>
    <div class="map-loading" v-loading="pageLoading"></div>
    <div id="map-container"></div>
    <div class="bottom-operate">
      <div class="display-distance">{{distanceMile}}公里</div>
      <div class="startAndPause text-center"><img v-show="!isDisplay" @click="resumeDriving" src="@/assets/img/play.png" /><img v-show="isDisplay" @click="pauseDriving" src="@/assets/img/suspend.png" /></div>
      <div class="speed-control">
        <span>{{speed}}km/h</span>
        <input class="speedRange" type="range" min="1000" max="200000" step="5000" v-model="speed" @change="changeSpeed">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'routePlayback',
  computed: {
    id: function() {
      console.log('this.$route.params', this.$route.params.id);
      return this.$route.params.id;
    },
    todayStart: function() {
      let today = new Date();
      let todayDetail = this.pbFunc.getDateDetail(today);
      let start = '';
      start = todayDetail.year + '-' + todayDetail.month + '-' + todayDetail.day + ' ' + '00:00:00';
      return start;
    },
    todayEnd: function() {
      let today = new Date();
      let todayDetail = this.pbFunc.getDateDetail(today);
      let end = '';
      end = todayDetail.year + '-' + todayDetail.month + '-' + todayDetail.day + ' ' + todayDetail.hour + ':' + todayDetail.minute + ':' + todayDetail.second;
      return end;
    }
  },
  data() {
    return {
      pageLoading: true,
      map: '', //地图实列
      markerList: [],
      cluster: '',
      pathSimplifierIns: '', //轨迹实列
      infoWindow: '',
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
      pathNavigatorStyle: {},

      totalPage: {
        currentPage: 1,
        pageSize: 1000,
      },
      stopPointPage: {
        total: '',
        currentPage: 1,
        pageSize: 8,
      },
      offlinePointPage: {
        total: '',
        currentPage: 1,
        pageSize: 7,
      },
      navg1: '',
      distanceMile: '', //总里程
      speed: 0,
      driveringTime: 10, //巡航时间
      startMarker: '',
      endMarker: '',
      deviceDetail: '',
      carNumber: '',
      todayStartDateCopy: this.todayStartDate,
      searchFilters: {
        choosedCar: '',
        choosedTime: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), new Date()], //巨坑
      },
      choosedDeviceId: '',
      carList: [],
      carLoading: false,
      oneDayMillisecond: 24 * 3600 * 1000, //一天的毫秒数
      timeSpacing: {}, //所选择的时间间隔
      activeName: 'stopPoint',
      searchBtn: {
        loading: false,
        text: '搜索',
        isDisabled: false,
      },
      timeQuickPick: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            let start = new Date();
            let end = new Date();
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000);
            let end = new Date(new Date() - 24 * 3600 * 1000);
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            end.setHours('23');
            end.setMinutes('59');
            end.setSeconds('59');
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '三天内',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000 * 2);
            let end = new Date();
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '七天内',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000 * 6);
            let end = new Date();
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      thTableList: [{
          title: '开始时间',
          param: 'create_time',
        },
        {
          title: '结束时间',
          param: 'end_time',
        },
        {
          title: '持续时长',
          param: 'duration',
          width: '120'
        },
      ],
      showMap: true,
      isDisplay: true,
      landmarkList: [],
      infoInterval: '',
    }
  },
  methods: {
    chooseTime: function() {
      console.log('searchFilters', this.searchFilters.choosedTime);
      if (this.searchFilters.choosedTime.length) {
        this.timeSpacing = this.calculateTimeSpacing();
        if (this.timeSpacing.day > 6) {
          this.$message({
            message: '查询时间不超过7天',
            type: 'error'
          });
          this.searchBtn.isDisabled = true;
        } else {
          this.searchBtn.isDisabled = false;
        }
      } else {
        this.searchBtn.isDisabled = true;
      }

    },
    getCarList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          pagination: false,
        };
        this.carLoading = true;
        this.$$http('getCarList', postData).then((results) => {
          this.carLoading = false;
          if (results.data && results.data.code == 0 && results.data.data) {
            this.carList = results.data.data;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    chooseCar: function() {
      for (let i in this.carList) {
        if (this.searchFilters.choosedCar === this.carList[i].tractor.id) {
          this.choosedDeviceId = this.carList[i].device_id;
          this.carNumber = this.carList[i].tractor.plate_number;
          break;
        }
      }
    },
    getDeviceDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.id
        };
        this.$$http('getDeviceDetail', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.deviceDetail = results.data.data;
            this.carNumber = this.deviceDetail.tractor.plate_number;
            this.searchFilters.choosedCar = this.deviceDetail.tractor.id;
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
    getTripRecords: function() {
      return new Promise((resolve, reject) => {
        this.dataResult = [];
        this.stopPointResult = [];
        this.offlinePointResult = [];
        this.path = [];

        let postData = {
          id: this.choosedDeviceId ? this.choosedDeviceId : this.id,
          page: this.totalPage.currentPage,
          page_size: this.totalPage.pageSize,
          start_time: this.todayStart,
          end_time: this.todayEnd,
        };
        if (this.searchFilters.choosedTime.length) {
          if (typeof this.searchFilters.choosedTime[0] === 'string') {
            postData.start_time = this.searchFilters.choosedTime[0];
            postData.end_time = this.searchFilters.choosedTime[1];
          }
        }
        console.log('this.searchFilters.choosedTime', this.searchFilters.choosedTime);
        this.$$http('getTripRecords', postData).then((results) => {

          if (results.data && results.data.code == 0 && results.data.data) {
            console.log('results.data.data', results.data.data);

            this.dataResult = results.data.data.trip_results;
            this.stopPointResult = results.data.data.stopping_point_locations;
            this.offlinePointResult = results.data.data.offline_point_locations;

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
    compareTime: function(startTime, endTime) {

      let thisResult = (Date.parse(endTime) - Date.parse(startTime));

      return thisResult;

    },
    calculateTimestamps: function(timestamps) {

      let resultObject = {
        day: '',
        hours: '',
        minutes: ''
      }

      resultObject.day = Math.floor(timestamps / (24 * 3600 * 1000));

      resultObject.hours = Math.floor((timestamps % (24 * 3600 * 1000)) / (3600 * 1000));

      resultObject.minutes = Math.floor(((timestamps % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000));

      return resultObject;

    },
    calculateTimeSpacing: function() {

      let resultObject = {};

      let startTime = this.searchFilters.choosedTime[0];

      let endTime = this.searchFilters.choosedTime[1];

      let timestamps = this.compareTime(startTime, endTime);

      resultObject = this.calculateTimestamps(timestamps);

      return resultObject;

    },
    calculateEndTime: function(startTime, duration) {
      let time = Date.parse(startTime) + duration * 1000;
      let timeDetail = this.pbFunc.getDateDetail(new Date(time));
      let timeStr = timeDetail.year + '-' + timeDetail.month + '-' + timeDetail.day + ' ' + timeDetail.hour + ':' + timeDetail.minute + ':' + timeDetail.second;
      return timeStr;
    },
    dealSatrtEndTime: function(data) {
      console.log('datafdfsdf', data);
      let resultsData = [];
      for (let i in data) {
        console.log('data', data[i], typeof data[i]);
        resultsData[i] = data[i];
        if (data[i].hasOwnProperty('offline_seconds')) {
          let durationMinutes = Math.floor(data[i].offline_seconds / 60);
          let durationSeconds = data[i].offline_seconds % 60;
          resultsData[i].duration = durationMinutes + '分' + durationSeconds + '秒';
          resultsData[i].end_time = this.calculateEndTime(data[i].create_time, data[i].offline_seconds);
        } else {
          let durationMinutes = Math.floor(data[i].stopping_seconds / 60);
          let durationSeconds = data[i].stopping_seconds % 60;
          resultsData[i].duration = durationMinutes + '分' + durationSeconds + '秒';
          resultsData[i].end_time = this.calculateEndTime(data[i].create_time, data[i].stopping_seconds);
        }

      }

      return resultsData;

    },
    setCurrentInfo: function() {
      let _this = this;
      let cursor = _this.navg1.getCursor();
      let pointMsgStr = '';
      let longitude = _this.totalDataResult[cursor.idx].location.longitude;
      let latitude = _this.totalDataResult[cursor.idx].location.latitude;
      pointMsgStr = '<div class="fs-13">车牌号：' + _this.carNumber +
        '</div><div class="fs-13">定位时间：' + _this.totalDataResult[cursor.idx].create_time +
        '</div><div class="fs-13">行驶速度：' + _this.totalDataResult[cursor.idx].speed +
        'km/h</div>';

      _this.infoWindow.setInfoBody(pointMsgStr);

      _this.infoWindow.setPosition([longitude, latitude]);


    },
    renderPath: function(data) {
      let _this = this;
      let allowTime = 20;
      if (_this.pathSimplifierIns) {
        if (_this.path.length) {
          /* 如果有数据的情况下 */
          //拼接数据
          _this.totalDataResult = [..._this.totalDataResult, ..._this.dataResult];
          _this.totalStopPoint = [..._this.totalStopPoint, ..._this.stopPointResult];

          _this.totalOfflinePoint = [..._this.totalOfflinePoint, ..._this.offlinePointResult];
          _this.resultPath = [..._this.resultPath, ..._this.path];

          console.log('_this.pathSimplifierIns', _this.pathSimplifierIns);
          //设置数据，绘制轨迹
          _this.pathSimplifierIns.setData([{
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

          _this.pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: []
          }]);

        }

        _this.startMarker.setPosition(_this.resultPath[0]);

        if (Math.ceil(data.data.data.count / _this.totalPage.pageSize)) {
          /* 一次只拿1000条数据，如果数据没有拿完则继续去获取数据 */
          if (_this.totalPage.currentPage < Math.ceil(data.data.data.count / _this.totalPage.pageSize)) {

            _this.totalPage.currentPage++;

            _this.searchAndRender();
          } else {
            /* 如果数据已经获取完成 */
            _this.curentStopPoint = _this.totalStopPoint.slice(0, _this.stopPointPage.pageSize);
            _this.curentStopPoint = _this.dealSatrtEndTime(_this.curentStopPoint);
            _this.stopPointPage.currentPage = 1;
            _this.stopPointPage.total = _this.totalStopPoint.length;

            _this.curentOfflinePoint = _this.totalOfflinePoint.slice(0, _this.offlinePointPage.pageSize);
            _this.curentOfflinePoint = _this.dealSatrtEndTime(_this.curentOfflinePoint);
            _this.offlinePointPage.currentPage = 1;
            _this.offlinePointPage.total = _this.totalOfflinePoint.length;


            let pointArray = [];


            _this.pageLoading = false;
            console.log('this.pageLoading', _this.pageLoading);
            //对第一条线路（即索引 0）创建一个巡航器
            _this.navg1 = _this.pathSimplifierIns.createPathNavigator(0, _this.pathNavigatorStyle);

            console.log(' _this.navg1', _this.navg1);

            /* 计算地图 */
            setTimeout(() => {
              _this.getLandMarkList().then(() => {
                _this.renderMarker();
              });
            }, 100)

            /* 计算里程 */
            pointArray = _this.choosePositionForDistance(_this.resultPath, 20); //选取点
            _this.navg1.moveToPoint(_this.resultPath.length - 1);
            _this.distanceMile = Math.ceil(_this.navg1.getMovedDistance());
            //_this.distanceMile = Math.ceil(_this.calculateDistance(pointArray)); //计算里程
            _this.speed = Math.floor(_this.distanceMile / _this.driveringTime); //计算巡航速度

            let endMarkerIndex = _this.resultPath.length - 1;
            _this.endMarker.setPosition(_this.resultPath[endMarkerIndex]);

            _this.navg1.setSpeed(_this.speed);

            setTimeout(() => {
              _this.infoWindow.open(_this.map, _this.resultPath[0]);
              _this.navg1.start();
            }, 1500);

            _this.navg1.on('move', function() {
              _this.setCurrentInfo();
            })

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
    searchAndRender: function() {
      let _this = this;
      _this.totalDataResult = [];
      _this.totalStopPoint = [];
      _this.totalOfflinePoint = [];
      _this.resultPath = [];
      _this.pageLoading = true;
      _this.getTripRecords().then((data) => {
        _this.renderPath(data);
      })
    },

    getIconSrc: function(item) {
      let src = ''
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
    initPath: function() {
      let _this = this;


      AMapUI.loadUI(['misc/PathSimplifier', 'overlay/SimpleInfoWindow', 'misc/MarkerList', 'overlay/SimpleMarker'], function(PathSimplifier, SimpleInfoWindow, MarkerList, SimpleMarker) {

        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }

        //初始化信息窗口
        _this.infoWindow = new SimpleInfoWindow({
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
        _this.pathSimplifierIns = new PathSimplifier({
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

        _this.pathNavigatorStyle = {

          loop: true, //循环播放

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
        //轨迹点添加事件

        _this.pathSimplifierIns.on('pointMouseover pointClick', function(e, info) {

          let pointMsgStr = '';
          pointMsgStr = '<div class="fs-13">车牌号：' + _this.carNumber +
            '</div><div class="fs-13">定位时间：' + _this.totalDataResult[info.pointIndex].create_time +
            '</div><div class="fs-13">行驶速度：' + _this.totalDataResult[info.pointIndex].speed +
            'km/h</div>';

          _this.infoWindow.setInfoBody(pointMsgStr);

          _this.infoWindow.open(_this.map, info.pathData.path[info.pointIndex]);

        });


        let $ = MarkerList.utils.$; //即jQuery/Zepto

        _this.markerList = new MarkerList({

          map: _this.map,

          //从数据中读取位置, 返回lngLat
          getPosition: function(item) {
            return [item.location.longitude, item.location.latitude];
          },

          //数据ID，如果不提供，默认使用数组索引，即index
          getDataId: function(item, index) {
            return index;
          },

          getInfoWindow: function(data, context, recycledInfoWindow) {

            let infoTitleStr = '<div class="marker-info-window"><span class="fs-13">' + data.position_name + '</span>';
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
            src = _this.getIconSrc(dataItem);
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

          },

          //marker上监听的事件
          markerEvents: ['click', 'mouseover', 'mouseout'],

          selectedClassNames: 'selected',

          autoSetFitView: false

        });

        _this.markerList.on('selectedChanged', function(event, info) {
          if (info.selected) {
            let infoWindow = _this.markerList.getInfoWindow();
            let id = info.selected.data.id;
            _this.getLandmarkDetail(id).then((results) => {
              console.log('detailresults', results);
              let infoBodyStr = _this.getInfoWindowDom(_this.landmarkDetail);
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
        });

      });

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
    checkPoint: function(row) {
      console.log('row', row);
      let _this = this;
      let pointMsgStr = '';
      pointMsgStr = '<div class="fs-13">车牌号：' + _this.carNumber +
        '</div><div class="fs-13">定位时间：' + row.create_time +
        '</div><div class="fs-13">行驶速度：' + row.speed +
        'km/h</div>';

      _this.infoWindow.setInfoBody(pointMsgStr);

      _this.infoWindow.open(_this.map, [row.location.longitude, row.location.latitude]);

    },
    pauseDriving: function() { //暂停
      this.isDisplay = false;
      this.navg1.pause();
    },
    resumeDriving: function() { //恢复
      this.isDisplay = true;
      this.navg1.resume();
    },
    changeSpeed: function() {
      this.navg1.setSpeed(this.speed);
    },
    triggerAlert: function() {
      this.showMap = !this.showMap;
    },

    getLandMarkList: function() {
      return new Promise((resolve, reject) => {
        let mapCenter = this.map.getCenter();
        let bounds = this.map.getBounds();
        let lnglat1 = new AMap.LngLat(bounds.northeast.lng, bounds.northeast.lat);
        let lnglat2 = new AMap.LngLat(bounds.northeast.lng, bounds.southwest.lat);
        let distance = Math.floor(lnglat1.distance(lnglat2));

        console.log('mapCenter', mapCenter, bounds, distance);

        let postData = {
          pagination: false,
          longitude: mapCenter.lng,
          latitude: mapCenter.lat,
          distance: distance,

          // source_type: this.searchFilters.landmarkFrom,
          // confirm_status: this.searchFilters.confirm_status,
          // async_status: this.searchFilters.async_status,
          // position_type: this.searchFilters.position_type,
        };

        this.$$http('getLandMarkList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkList = results.data.data.results;
            console.log('this.landmarkList', this.landmarkList);
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
    renderMarker: function() {
      let _this = this;
      console.log('markerList', _this.markerList);
      _this.markerList.render(_this.landmarkList);
      _this.map.plugin(["AMap.MarkerClusterer"], function() {
        _this.allMakers = _this.markerList.getAllMarkers();
        if (_this.cluster) {
          _this.cluster.clearMarkers();
        }
        _this.cluster = new AMap.MarkerClusterer(_this.map, _this.allMakers, { minClusterSize: 4, maxZoom: 17, });
      });
    },
    getLandmarkDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getLandMarkDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkDetail = results.data.data;
            console.log('deviceDetail', this.landmarkDetail);
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
      let infoBodyStr = '<div class="fs-13">地标类型：' + data.position_type.verbose +
        '</div><div class="fs-13">地标位置：' + data.address +
        '</div><div class="fs-13">审核状态：' + data.confirm_status.verbose +
        '</div><div class="fs-13">上传来源：' + data.source_type.verbose +
        '</div><div class="fs-13">是否同步：' + data.async_status.verbose +
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
    this.getCarList();
    this.getDeviceDetail();
    this.searchAndRender();
    this.timeSpacing = this.calculateTimeSpacing();
    console.log('this.$route.params', this.$route.params);
  },
}

</script>
<style scoped lang="less">
.out-contain {
  position: relative;
  #map-container {
    width: 100%;
    height: 700px;
  }
  .map-loading {
    position: absolute;
    height: 50px;
    width: 100%;
    left: 0;
    top: 0;
  }
  .search-filters-contain {
    padding: 20px 10px 0 10px;
    background-color: #fff;
    height: 660px;
    width: 480px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .time-spacing {
    padding-left: 10px;
    line-height: 40px;
    font-size: 14px;
  }
  .point-tab {
    margin-top: 20px;
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
  .side-alert-traggle {
    position: absolute;
    top: 280px;

    width: 26px;
    height: 28px;

    line-height: 28px;

    cursor: pointer;
    text-align: center;

    border: 1px solid #bbb;
    border-left: 0 none;
    background-color: #f4f5f7;
    z-index: 999;
    span {
      font-size: 22px;
    }
  }
  .side-alert-traggle-right {
    left: 500px;
  }

  .side-alert-traggle-left {
    left: 0px;
  }
}

</style>
