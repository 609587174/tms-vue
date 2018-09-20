<template>
  <div>
    <transition name="fade">
      <div class="search-filters-contain" v-show="showLeftWindow">
        <div class="nav-tab point-tab">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="停留点" name="stopPoint">
              <el-table :data="curentStopPoint" stripe style="width: 100%" size="mini" v-loading="offlineAndstopLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <el-table-column align="center" label="操作" :width="60">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="checkPointDetail(scope)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page-list text-center">
                <el-pagination background layout="prev, pager, next" :total="stopPointPage.total" :page-size="stopPointPage.pageSize" :current-page.sync="stopPointPage.currentPage" @current-change="stopPointPageChange" v-if="!offlineAndstopLoading && stopPointPage.total>10">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="离线点" name="offlinePoint">
              <el-table :data="curentOfflinePoint" stripe style="width: 100%" size="mini" v-loading="offlineAndstopLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <el-table-column align="center" label="操作" :width="60">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="checkPointDetail(scope)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page-list text-center">
                <el-pagination background layout="prev, pager, next" :total="offlinePointPage.total" :page-size="offlinePointPage.pageSize" :current-page.sync="offlinePointPage.currentPage" @current-change="offlinePointPageChange" v-if="!offlineAndstopLoading && offlinePointPage.total>10">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="side-alert-traggle side-alert-traggle-right" v-show="showLeftWindow" @click="triggerAlert"><span>收起</span></div>
    </transition>
    <transition name="fade">
      <div class="side-alert-traggle side-alert-traggle-left" v-show="!showLeftWindow" @click="triggerAlert">
        <span>展开</span></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'sideAlertTraggle',
  props: {
    offlineAndstopLoading: Boolean,
    curentStopPoint: Array,
    stopPointPage: Object,
    curentOfflinePoint: Array,
    offlinePointPage: Object,
    checkPoint: Function,
  },
  data() {
    return {
      activeName: 'stopPoint',
      showLeftWindow: false,
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
    }
  },
  methods: {
    triggerAlert: function() {
      this.showLeftWindow = !this.showLeftWindow;
    },
    checkPointDetail: function(row) {
      this.$emit('checkPoint', row);
    },
  },
  created() {

  },
}

</script>
<style scoped lang="less">
.search-filters-contain {
  padding: 20px 10px 0 10px;
  background-color: #fff;
  height: 570px;
  width: 480px;
  position: absolute;
  left: 0;
  top: 200px;
  z-index: 80;
}

.side-alert-traggle {
  position: absolute;
  top: 440px;

  width: 26px;
  height: 50px;


  line-height: 24px;

  cursor: pointer;
  text-align: center;

  border: 1px solid #4a9bf8;
  border-left: 0 none;
  background-color: #fff;
  color: #4a9bf8;
  z-index: 999;
  span {
    font-size: 16px;
  }
}

.side-alert-traggle-right {
  left: 500px;
}

.side-alert-traggle-left {
  left: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
