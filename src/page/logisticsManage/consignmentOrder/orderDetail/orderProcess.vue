<style scoped lang="less">
.detail-main {
  min-height: 500px;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second">
          <div class="detail-main" v-loading="pageLoading">
            <el-container v-show="!pageLoading">
              <el-main>
                <div class="detail-list detail-form" v-for="(item,key) in detailData" :key="key">
                  <!-- 生成运单 -->
                  <div v-if="item.type === 'driver_pending_confirmation'">
                    <div class="detail-form-title">
                      <el-row>
                        <el-col :span="12" :offset="6" class="text-center">
                          生成运单
                        </el-col>
                      </el-row>
                    </div>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>生成运单号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>生成运单时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 司机确认 -->
                  <div v-if="item.type === 'driver_pending_confirmation'">
                    <div class="detail-form-title">
                      <el-row>
                        <el-col :span="12" :offset="6" class="text-center">
                          司机确认
                        </el-col>
                      </el-row>
                    </div>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>司机:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>副驾:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>押运:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>车号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>确认运单时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 装车 -->
                  <div v-if="item.type === 'driver_pending_confirmation'">
                    <div class="detail-form-title">
                      <el-row>
                        <el-col :span="12" :offset="6" class="text-center">
                          装车
                        </el-col>
                      </el-row>
                    </div>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>司机:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>副驾:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>押运:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>车号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>确认运单时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.xxx)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderProcess',
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      activeName: 'second',
      pageLoading: true,
      detailData: [],
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderDetailTab/${this.id}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/routePlayback/${this.id}` });
      }
    },
    activated: function() {
      this.activeName = 'second';
    }
  }
}

</script>
