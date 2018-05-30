<template>
  <div class="nav-tab">
    <div class="tab-screen">
      <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
              <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="startSearch">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="任务状态:">
              <el-select v-model="searchFilters.position_type" placeholder="请选择">
                <el-option v-for="(item,key) in typeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div id="map-container"></div>
  </div>
</template>
<script>
export default {
  name: 'realTimeMonitor',
  data() {
    return {
      map: '',
      markerList: '',
      allMakers: '',
      cluster: '',
      pageLoading: true,
      searchFilters: {
        keyword: '',
        field: '',
        position_type: '',
      },
      typeSelect: [],

    };
  },
  computed: {

  },
  methods: {
    getMonitorList: function() {
      return new Promise((resolve, reject) => {
        this.pageLoading = true;
        this.$$http('realTimeMonitor').then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkList = results.data.data.data;
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
    startSearch: function() {

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
    initMarkList: function() {

      let _this = this;
      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        function(MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) {

          _this.map.addControl(new BasicControl.Zoom({
            position: 'lt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

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

              let infoTitleStr = '<div class="marker-info-window"><span class="fs-13">设备号：' + data.position_name + '</span>';
              let infoBodyStr = '<div class="fs-13">地标类型：</div><div class="fs-13">地标位置：</div>';

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
                  }
                },
                label: {
                  content: dataItem.position_name,
                  offset: new AMap.Pixel(30, 0)
                }
              });

            },

            //marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],

            selectedClassNames: 'selected',

            autoSetFitView: false

          });

          _this.markerList.on('selectedChanged', function(event, info) {
            if (info.selected) {
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
    renderMarker: function() {
      console.log('markerList', this.markerList);
      if (this.markerList) {
        this.markerList.render(this.landmarkList);
        this.map.plugin(["AMap.MarkerClusterer"], function() {
          this.allMakers = this.markerList.getAllMarkers();
          if (this.cluster) {
            this.cluster.clearMarkers();
          }
          this.cluster = new AMap.MarkerClusterer(this.map, this.allMakers, {
            gridSize: 60,
            minClusterSize: 3,
          });
        });
      } else {

        setTimeout(() => {
          this.markerList.render(this.landmarkList);
          this.map.plugin(["AMap.MarkerClusterer"], function() {
            this.allMakers = this.markerList.getAllMarkers();
            if (this.cluster) {
              this.cluster.clearMarkers();
            }
            this.cluster = new AMap.MarkerClusterer(this.map, this.allMakers, {
              minClusterSize: 5,
            });
          });
        }, 1000)

      }

      this.map.setFitView(this.allMakers);

    }
  },
  created() {

  },
  mounted() {
    let _this = this;
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });
    this.initMarkList();
    _this.getMonitorList().then((data) => { //展示该数据
      _this.renderMarker();
    })
  }
};

</script>
<style scoped lang="less">
#map-container {
  width: 100%;
  height: 700px;
}

</style>
