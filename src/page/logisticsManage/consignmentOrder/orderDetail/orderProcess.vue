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
                          <label></label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.msg)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>生成运单时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.waybill_create_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>操作人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 司机确认 -->
                  <div v-if="item.type === 'to_fluid'">
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
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.master_driver)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>副驾:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.copilot_name)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>押运:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.supercargo_name)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>车号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>确认运单时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 装车 -->
                  <div v-if="item.type === 'waiting_seal'">
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
                          <label>液厂:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.fluid)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>液厂地址:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.fluid_address)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>审核时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>计划到厂时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>装车毛重:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.gross_weight)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>审核人:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际到厂时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.active_time)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>装车皮重:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.tare_weight)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>净重:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.net_weight)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>装液开始时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_start_time)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>装车铅封审核:</label>
                          <div class="detail-form-item">
                            <el-button type="text" style="height:0;line-height:0;text-align:left;padding-left:0;">点击查看铅封</el-button>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>装液完成时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_end_time
)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>装车磅单审核:</label>
                          <div class="detail-form-item">
                            <el-button type="text " style="height:0;line-height:0;text-align:left;padding-left:0;">点击产看磅单</el-button>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" :offset="20">
                        <el-button type="primary" size="medium" @click="poundSH(false)">审核拒绝</el-button>
                        <el-button type="primary" size="medium" @click="poundSH(true)">审核通过</el-button>
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
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    }
  },
  data() {
    return {
      activeName: 'second',
      pageLoading: false,
      detailData: [],
    }
  },
  methods: {
    poundSH: function(status) {
      var sendData = {};
      sendData.id = this.setpId;
      if (status) {
        sendData.status = 'waiting_match';
      } else {
        sendData.status = 'loading_audit_failed';
        sendData.reason = "54564"
      }
      this.$$http("examineLoad", sendData).then(results => {
        if (results.data.code == 0) {
          console.log('results', results);
          vm.$message({
            type: "success",
            message: "审核" + status ? "通过成功" : "拒绝成功"
          })
        }
      });
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderDetailTab/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/routePlayback/${this.setpId}/${this.willId}` });
      }
    },
    getData: function() {
      var sendData = {};
      sendData.id = this.setpId;
      var vm = this;
      vm.pageLoading = true,
        this.$$http("orderProcess", sendData).then((results) => {
          vm.pageLoading = false;
          if (results.data.code == 0) {
            console.log('运单分段记录', results);
            vm.detailData = results.data.data;
          }
        }).catch(() => {
          vm.pageLoading = false;
        });
    }
  },
  created: function() {
    this.getData();
  },
  activated: function() {
    this.activeName = 'second';
  }
}

</script>
