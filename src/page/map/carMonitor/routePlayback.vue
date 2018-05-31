<template>
  <div>
    <div id="map-container"></div>
  </div>
</template>
<script>
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
      map: '',
      pathSimplifierIns: '',
      totalDataResult: [],
      resultPath: [],
      path: [],
      navg1: '',
      tripRecords: {},


    }
  },
  methods: {
    getTripRecords: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getTripRecords', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.tripRecordsData = results.data.data;
            console.log('tripRecords', this.tripRecords);
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
      ctrl.getTripRecords().then((data) => {

        if (_this.path.length) {

          _this.totalDataResult = [..._this.totalDataResult, ..._this.dataResult]
          _this.resultPath = [..._this.resultPath, ..._this.path];

          //设置数据
          _this.pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: _this.resultPath
          }]);

        } else {

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

        if (Math.ceil(data.paging.total_count / _this.pageSize)) {

          if (_this.currentPage < Math.ceil(data.paging.total_count / _this.pageSize)) {

            _this.currentPage++

              _this.searchAndRender();
          } else {

            let pointArray = [];
            let speed = 0;

            //对第一条线路（即索引 0）创建一个巡航器
            _this.navg1 = _this.pathSimplifierIns.createPathNavigator(0, pathNavigatorStyle);

            pointArray = _this.choosePositionForDistance(_this.resultPath, 20);

            _this.distanceMile = _this.calculateDistance(pointArray);

            speed = _this.distanceMile / _this.driveringTime;

            _this.navg1.setSpeed(speed);

            _this.navg1.start();
          }

        }

      })
    },
    initPath: function() {
      let _this = this;
      AMapUI.loadUI(['misc/PathSimplifier', 'overlay/SimpleInfoWindow'], function(PathSimplifier, SimpleInfoWindow) {

        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }

        let infoWindow = new SimpleInfoWindow({
          infoTitle: '点位置信息',
          infoBody: ''
        });

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

            startPointStyle: {
              radius: 6,
              fillStyle: 'rgb(244,18,71)',
            },

            endPointStyle: {
              radius: 6,
              fillStyle: 'rgb(244,18,71)',
            },
          },

          autoSetFitView: true, //页面自适应

        });

        pathNavigatorStyle = {

          loop: true, //循环播放

          speed: 1000000, //巡航速度，单位千米/小时

          pathNavigatorStyle: {
            width: 20,
            height: 20,
            content: PathSimplifier.Render.Canvas.getImageContent('../../../img/navigation.svg'), //使用图片
            initRotateDegree: -45,
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

        _this.pathSimplifierIns.on('pointMouseover pointClick', function(e, info) {

          let pointMsgStr = '';
          pointMsgStr = '<div class="line-map-info">车牌号：' +
            _this.choosedCar[0].title +
            '</br>设备号：' + _this.totalDataResult[info.pointIndex].device_no +
            '</br>定位时间：' + _this.totalDataResult[info.pointIndex].created_at +
            '</br>定位地址：' + _this.totalDataResult[info.pointIndex].detail_address +
            '</div>';

          infoWindow.setInfoBody(pointMsgStr);

          infoWindow.open(map, info.pathData.path[info.pointIndex]);

        });

      });
    }
  },
  created() {

  },
  mounted() {
    /* 创建地图 */
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    console.log('this.$route.params', this.$route.params);
  },
}

</script>
<style scoped lang="less">


</style>
