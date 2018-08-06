<style scoped lang="less">
.label-list {
  margin-bottom: 0px;
}

.el-collapse-item {
  /deep/ .el-collapse-item__header {
    padding-left: 20px;

    background-color: #fafafa;
  }
  /deep/ .el-collapse-item__content {
    padding-top: 25px;
  }
}

.orderPossing {
  border: 1px solid #ebeef5;
  border-top: none;
  overflow-y: auto;
  max-height: 600px;
  overflow-x: hidden;
}

.el-button {
  margin-left: 0;
}

.garyColor {
  color: gary;
}

.label-list label {
  width: 100px;
}

.label-list {
  padding-left: 100px;
}

.borderB {
  border-bottom: 1px solid #ebeef5;
}

.paddingCancle /deep/ .el-collapse-item__content {
  padding-top: 0;
  padding-bottom: 0;
}

.padds {
  padding: 25px 0 0px 0
}

.label-list label {
  width: 100px;
}

.sealTitle {
  text-align: center;
  margin-bottom: 20px;
  z-index:5000;
  position:relative;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second" style="background-color:white">
          <div class="detail-main border-top-clear" v-loading="pageLoading">
            <el-container >
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: '/logisticsManage/consignmentOrders/ordersList'}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>运单进程</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <el-row style="">
                  <el-col :span="20" class="orderPossing mt-30">
                    <el-collapse v-model="extendsArr" v-if="detailData.length>=1">
                      <el-collapse-item :title="statusType[item.type]" :name="key" v-for="(item,key) in detailData" :key="key" v-bind:class="{paddingCancle: item.type=='confirm_match'}">
                        <div v-if="item.type === 'driver_pending_confirmation'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>生成运单号:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.waybill)"></div>
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
                        <div v-if="item.type === 'reach_fluid'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>车号:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'to_fluid'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>司机:</label>
                                <div class="detail-form-item">
                                  <span v-html="pbFunc.dealNullData(item.master_driver)"></span>
                                  <span style="margin-left:5px;" v-html="pbFunc.dealNullData(item.master_driver_phone)"></span>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>副驾:</label>
                                <div class="detail-form-item">
                                  <span v-html="pbFunc.dealNullData(item.copilot_name)"></span>
                                  <span style="margin-left:5px;" v-html="pbFunc.dealNullData(item.copilot_driver_phone)"></span>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>押运:</label>
                                <div class="detail-form-item">
                                  <span v-html="pbFunc.dealNullData(item.supercargo_name)"></span>
                                  <span style="margin-left:5px;" v-html="pbFunc.dealNullData(item.supercargo_phone)"></span>
                                </div>
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
                        <div v-if="item.operation === '上传装车铅封'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>装车铅封审核:</label>
                                <div class="detail-form-item">
                                  <el-button type="text" style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showSeal',item.car_seal)">点击查看铅封</el-button>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                          <!--  <el-row :gutter="40">
                            <el-col :span="16">
                              <div class="label-list">
                                <label>铅封号:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.seal_no)"></div>
                              </div>
                            </el-col>
                          </el-row> -->
                        </div>
                        <div v-if="(item.type === 'waiting_seal'||item.type=='loading_waiting_audit')&&item.operation!='上传装车铅封'">
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
                                <div class="detail-form-item" style="height:24px">
                                  <el-tooltip class="item" effect="dark" :content="item.fluid_address" placement="top-start" style="width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                    <el-button type="text" style="height:24px;line-height:24px;padding-left:0">{{item.fluid_address}}</el-button>
                                  </el-tooltip>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>计划到厂时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plan_time)"></div>
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
                                <label>操作人:</label>
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
                                <label>装车净重:</label>
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
                                <label>装液完成时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_end_time)"></div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>离站时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.leave_time)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>装车磅单审核:</label>
                                <div class="detail-form-item">
                                  <el-button type="text " style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showPound',item.weight_id)">点击查看磅单</el-button>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type=='unloading_waiting_audit'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>站点:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.station)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>站点地址:</label>
                                <div class="detail-form-item" style="height:24px">
                                  <el-tooltip class="item" effect="dark" :content="item.station_address" placement="top-start" style="width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                    <el-button type="text" style="height:24px;line-height:24px;padding-left:0;">{{item.station_address}}</el-button>
                                  </el-tooltip>
                                </div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>收货人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.contact)"></div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>收货人电话:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.contact_phone)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>计划到站时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plan_time)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>卸车毛重:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.gross_weight)"></div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>实际到站时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.active_time)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>卸车皮重:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.tare_weight)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>卸车净重:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.net_weight)"></div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>卸车开始时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_start_time)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>卸车完成时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_end_time)"></div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>卸车磅单审核:</label>
                                <div class="detail-form-item">
                                  <el-button type="text " style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showPound',item.weight_id)">点击查看磅单</el-button>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'confirm_match'" style="margin-top:-20px;">
                          <div v-for="(Mitem,Mkey) in item.waiting_matchArr" v-bind:class="{ garyColor: Mitem.status!='new',padds:Mkey==0,borderB:item.waiting_matchArr.length>1&&Mkey!=item.waiting_matchArr.length-1 }" style="border-left:none;border-right:none;">
                            <el-row style="padding:15px 0;">
                              <el-col :span="22">
                                <el-row :gutter="40">
                                  <el-col :span="8">
                                    <div class="label-list">
                                      <label>站点:</label>
                                      <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.station)"></div>
                                    </div>
                                  </el-col>
                                  <el-col :span="8">
                                    <div class="label-list">
                                      <label>收货人:</label>
                                      <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.consignee)"></div>
                                    </div>
                                  </el-col>
                                  <el-col :span="8">
                                    <div class="label-list">
                                      <label>计划卸车吨位:</label>
                                      <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.plan_tonnage)">吨</div>
                                    </div>
                                  </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                  <el-col :span="8">
                                    <div class="label-list">
                                      <label>站点地址:</label>
                                      <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.station_address)"></div>
                                    </div>
                                  </el-col>
                                  <el-col :span="8">
                                    <div class="label-list">
                                      <label>收货人电话:</label>
                                      <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.consignee_phone)"></div>
                                    </div>
                                  </el-col>
                                  <el-col :span="8">
                                    <div class="label-list">
                                      <label>计划到站时间:</label>
                                      <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.plan_arrive_time)"></div>
                                    </div>
                                  </el-col>
                                </el-row>
                              </el-col>
                              <el-col :span="2">
                                <div v-if="Mitem.status!='new'" style="line-height:48px;">
                                  <el-tag type="success">待取消</el-tag>
                                </div>
                                <div v-else style="line-height:48px;">
                                  <el-tag type="success">待确认</el-tag>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <div v-if="item.type === 'to_site'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'waiting_match'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'reach_site'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>车号:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'unloading_audit_failed'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>拒绝原因:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.reason)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'loading_audit_failed'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>拒绝原因:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.reason)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'in_settlement'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
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
                        <div v-if="item.type === 'to_site'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
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
                        <div v-if="item.type === 'already_match'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'waiting_settlement'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'finished'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'abnormal'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>变更类型:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.msg)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>变更前:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.before_truck_no)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>变更后:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.after_truck_no)"></div>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>变更提交时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'canceled'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>操作时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="item.type === 'normal'">
                          <el-row :gutter="40">
                            <el-col :span="8">
                              <div class="label-list">
                                <label>变更确认人:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="label-list">
                                <label>变更确认时间:</label>
                                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <div v-if="detailData.length>1">
                      <div v-for="(item,key) in allButton[detailData[detailData.length-1].type]">
                        <el-button style="margin-top:20px;width:100%" :type="item.type" v-if="item.text=='提交结算'" :loading="buttonLoading.settlementButton" @click="orderOperation(item.methods)">{{item.text}}</el-button>
                        <el-button style="margin-top:20px;width:100%" :type="item.type" v-if="item.text=='确认卸货地'" :loading="buttonLoading.sureUnload" @click="orderOperation(item.methods)">{{item.text}}</el-button>
                        <el-button style="margin-top:20px;width:100%" :type="item.type" v-if="item.text!='确认卸货地'&&item.text!='提交结算'" @click="orderOperation(item.methods)">{{item.text}}</el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :title="sureTitle" center :visible.sync="dialog.sureLoadEx" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;" :close-on-press-escape="noCancle">
      <el-form ref="examinePoundForm" :rules="rules" :model="surePound" status-icon :label-position="'right'" v-if="detailData.length>0" label-width="100px">
        <el-row>
          <el-col :span="20" :offset="2">
            <router-link target="_blank" :to="imgReviewSrc">
              <img :src="exPound.image_url" style='width:100%;max-height:500px'></img>
            </router-link>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px;">
          <el-col :span="10" :offset="2">
            <el-form-item label="实际到厂时间:" prop="active_time" v-if="detailData[detailData.length - 1].type!='unloading_waiting_audit'">
              <el-date-picker v-model="surePound.active_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="实际到站时间:" prop="active_time" v-else>
              <el-date-picker v-model="surePound.active_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="装车毛重(吨):" prop="gross_weight" v-if="detailData[detailData.length - 1].type!='unloading_waiting_audit'">
              <el-input placeholder="请输入" type="text" v-model="surePound.gross_weight"></el-input>
            </el-form-item>
            <el-form-item label="卸车毛重(吨):" prop="gross_weight" v-else>
              <el-input placeholder="请输入" type="text" v-model="surePound.gross_weight"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px;">
          <el-col :span="10" :offset="2">
            <el-form-item label="装液开始时间:" prop="work_start_time" v-if="detailData[detailData.length - 1].type!='unloading_waiting_audit'">
              <el-date-picker v-model="surePound.work_start_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="卸车开始时间:" prop="work_start_time" v-else>
              <el-date-picker v-model="surePound.work_start_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="装车皮重(吨):" prop="tare_weight" v-if="detailData[detailData.length - 1].type!='unloading_waiting_audit'">
              <el-input placeholder="请输入" type="text" v-model="surePound.tare_weight"></el-input>
            </el-form-item>
            <el-form-item label="卸车皮重(吨):" prop="tare_weight" v-else>
              <el-input placeholder="请输入" type="text" v-model="surePound.tare_weight"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px;">
          <el-col :span="10" :offset="2">
            <el-form-item label="装液完成时间:" prop="work_end_time" v-if="detailData[detailData.length - 1].type!='unloading_waiting_audit'">
              <el-date-picker v-model="surePound.work_end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="卸车完成时间:" prop="work_start_time" v-else>
              <el-date-picker v-model="surePound.work_end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="装车净重(吨):" prop="net_weight" v-if="detailData[detailData.length - 1].type!='unloading_waiting_audit'">
              <el-input placeholder="请输入" type="text" v-model="surePound.net_weight"></el-input>
            </el-form-item>
            <el-form-item label="卸车净重(吨):" prop="net_weight" v-else>
              <el-input placeholder="请输入" type="text" v-model="surePound.net_weight"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px;" v-if="detailData[detailData.length - 1].type=='unloading_waiting_audit'">
          <el-col :span="10" :offset="2">
            <el-form-item label="离站时间:" prop="work_end_time">
              <el-date-picker v-model="surePound.leave_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="实际里程:" prop="active_mile">
              <el-input placeholder="请输入" type="text" v-model="surePound.active_mile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;" v-if="detailData.length>0">
       <el-button @click="dialog.sureLoadEx = false">取 消</el-button>
       <el-button v-if="detailData[detailData.length - 1].type == 'loading_waiting_audit'" type="primary" @click="sendRe('sureLoadExUp')" :loading="buttonLoading.unloadinguditSuccessButton">确 定</el-button>
       <el-button v-else type="primary" @click="sendRe('sureLoadExUp')" :loading="buttonLoading.unloadinguditSuccessButton">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="cancleTitle" :visible.sync="dialog.cancleLoadEx" center width="30%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;" :close-on-press-escape="noCancle">
      <el-form label-width="125px" status-icon>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-form-item label="拒绝原因:">
              <el-select v-model="loadPoundReason" placeholder="请选择车辆归属">
                <el-option v-for="(item,key) in selectData.loadPoundReasonList" :key="key" :label="item.text" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="loadPoundReason=='other'">
          <el-col :span="18" :offset="3">
            <el-form-item label="其他原因:">
              <el-input type="textarea" v-model="otherInput" style="width:80%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;" v-if="detailData.length>0">
       <el-button @click="dialog.cancleLoadEx = false">返 回</el-button>
       <el-button v-if="detailData[detailData.length - 1].type == 'loading_waiting_audit'" type="primary" @click="sendRe('cancleLoadExUp')" :loading="buttonLoading.loadingAuditFailButton">确认拒绝</el-button>
       <el-button v-else type="primary" @click="sendRe('cancleLoadExUp')"  :loading="buttonLoading.unloadinguditFailButton">确认拒绝</el-button>
      </span>
    </el-dialog>
    <img-review :imgObject.sync='imgObject'>
      <div v-if="imgObject.title!=''" class="sealTitle">{{imgObject.title}}</div>
    </img-review>
  </div>
</template>
<script>
import imgReview from '@/components/common/imgReview';
export default {
  name: 'orderProcess',
  activeName: "second",
  computed: {
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    }
  },
  components: {
    imgReview: imgReview,
  },
  data() {
    return {
      imgReviewSrc: '',
      rules: [

      ],
      noCancle: false,
      examinePoundParam: {},
      extendsArr: [],
      statusType: {
        driver_pending_confirmation: '司机未确认',
        to_fluid: '前往装车',
        reach_fluid: '已到装货地',
        waiting_seal: '待上传铅封',
        loading_waiting_audit: '已装车待审核',
        loading_audit_failed: '装车审核失败',
        waiting_match: '待匹配卸货单',
        confirm_match: '待确认卸货单',
        already_match: '已匹配卸货单',
        to_site: '前往卸货地',
        reach_site: '已到卸货地',
        unloading_waiting_audit: '已卸车待审核',
        unloading_audit_failed: '卸车审核失败',
        waiting_settlement: '待提交结算',
        in_settlement: '结算中',
        finished: '已完成',
        canceled: '已取消',
        abnormal: '运力变更申请',
        normal: '运力已变更'
      },
      operationIsOk: true,
      lockFalg: false,
      activeName: 'second',
      pageLoading: false,
      detailData: [],
      dialog: {
        sureLoadEx: false,
        cancleLoadEx: false,
      },
      imgObject: {
        imgList: [],
        showPreview: false,
        previewIndex: 0,
        title:"",
      },
      buttonCanClick:true,
      buttonLoading:{
        settlementButton:false,//结算
        loadingAuditSuccessButton:false,//装车审核通过
        loadingAuditFailButton:false,//装车审核失败
        unloadinguditSuccessButton:false,//卸车审核通过
        unloadinguditFailButton:false,//卸车审核失败
        sureUnload:false,//确认卸货地
      },
      sureTitle: "装车磅单审核通过",
      cancleTitle: "装车磅单审核拒绝",
      loadPoundReason: "磅单照片不清晰",
      otherInput: "",
      surePound: {},
      exPound: {},
      sealImgList: [],
      poundImg: {},
      sealTitle: "",
      suerId: "",
      allButton: {
        'loading_waiting_audit': [{
          text: "审核拒绝",
          type: "danger",
          methods: "cancleLoadEx"
        }, {
          text: "审核通过",
          type: "success",
          methods: "sureLoadEx"
        }],
        'confirm_match': [{
          text: "确认卸货地",
          type: "success",
          methods: "sureMatch"
        }],
        'unloading_waiting_audit': [{
          text: "审核拒绝",
          type: "danger",
          methods: "cancleUnLoadEx"
        },{
          text: "审核通过",
          type: "success",
          methods: "sureUnLoadEx"
        }],
        'waiting_settlement': [{
          text: "提交结算",
          type: "success",
          methods: "upInSettlement"
        }]
      },
      selectData: {
        loadPoundReasonList: [{
            key: "磅单照片不清晰",
            text: "磅单照片不清晰"
          },
          {
            key: "虚假磅单照片",
            text: "虚假磅单照片"
          }, {
            key: "吨位信息错误",
            text: "吨位信息错误"
          }, {
            key: "other",
            text: "其他原因"
          }
        ]
      }
    }
  },
  methods: {
    showImg: function(type, id) {
      var vm = this;
      if (type == 'showPound') {
         this.imgObject.title="";
        if (vm.poundImg[id]) {
          var imgList = vm.poundImg[id];
          this.imgObject.imgList = [imgList];
          this.imgObject.showPreview = true;
        } else {
          if (id) {
            var sendData = {};
            //sendData.section_trip = this.setpId;
            sendData.id = id;
            if (vm.poundImg[id]) {
              var imgList = vm.poundImg[id];
              this.imgObject.imgList = imgList;
              this.imgObject.showPreview = true;

            } else {
              this.$$http("getPundList", sendData).then(results => {
                if (results.data.code == 0) {
                  vm.poundImg[results.data.data.data[0].id] = results.data.data.data[0].image_url;
                  var imgList = [results.data.data.data[0].image_url];
                  vm.imgObject.imgList = imgList;
                  vm.imgObject.showPreview = true;
                }
              });
            }
          }
        }
      } else if (type == 'showSeal') {
        if (this.sealImgList.length > 0) {
          vm.imgObject.title = this.sealTitle;
          vm.imgObject.imgList = this.sealImgList;
          vm.imgObject.showPreview = true;
        } else {
          var sendData = {};
          //sendData.section_trip=this.setpId;
          sendData.id = id;
          this.$$http("getSeal", sendData).then(results => {
            if (results.data.code == 0) {
              var poundTitle = "铅封号：";
              if (results.data.data.data[0].seal_no_list) {
                results.data.data.data[0].seal_no_list.forEach((item, index) => {
                  if (index != results.data.data.data[0].seal_no_list.length - 1) {
                    poundTitle += item + "/";
                  } else {
                    poundTitle += item;
                  }
                });
              }
              vm.imgObject.title = poundTitle;
              vm.sealTitle = poundTitle;
              vm.imgObject.imgList = results.data.data.data[0].image_url_list;
              this.sealImgList = results.data.data.data[0].image_url_list;
              vm.imgObject.showPreview = true;

            } else {
              vm.$message.error("获取铅封照片出错");
            }
          }).catch(() => {
            vm.$message.error("获取铅封照片出错");
          });
        }
      }
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderDetailTab/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/routePlayback/${this.setpId}/${this.willId}` });
      }
    },
    orderOperation: function(type) {
      var vm = this;
      var sendData = {};
      if (type == 'sureLoadEx') {
        //sendData.section_trip = this.setpId;
        if (this.detailData.length > 0 && this.detailData[this.detailData.length - 1].type == "loading_waiting_audit") {
          if (this.detailData[this.detailData.length - 1].operation == "上传装车铅封") {
            this.surePound = this.detailData[this.detailData.length - 2];
            sendData.id = this.detailData[this.detailData.length - 2].weight_id;
          } else {
            this.surePound = this.detailData[this.detailData.length - 1];
            sendData.id = this.detailData[this.detailData.length - 1].weight_id;
          }
        }

        this.$$http("getPundList", sendData).then(results => {
          if (results.data.code == 0) {
            vm.exPound = results.data.data.data[0];
            vm.poundImg[results.data.data.data[0].id] = results.data.data.data[0].image_url;
            vm.dialog.sureLoadEx = true;
            vm.imgReviewSrc = `/imgReview?imgList=${vm.exPound.image_url}`;
          }
        }).catch(() => {
          vm.$message.error("磅单图片获取失败")
        });
      } else if (type == 'cancleUnLoadEx') {
        vm.cancleTitle = "卸车磅单审核拒绝";
        vm.dialog.cancleLoadEx = true;

      } else if (type == 'sureUnLoadEx') {
        vm.sureTitle = "卸车磅单审核通过";
        //sendData.section_trip = this.setpId;
        if (this.detailData.length > 0 && this.detailData[this.detailData.length - 1].type == "unloading_waiting_audit") {
          this.surePound = this.detailData[this.detailData.length - 1];
          sendData.id = this.detailData[this.detailData.length - 1].weight_id;
        }
        this.$$http("getPundList", sendData).then(results => {
          if (results.data.code == 0) {
            vm.exPound = results.data.data.data[0];
            vm.poundImg[results.data.data.data[0].id] = results.data.data.data[0].image_url;
            vm.dialog.sureLoadEx = true;
          }
        }).catch(() => {
          vm.$message.error("磅单图片获取失败")
        });
      } else if (type == 'cancleLoadEx') {
        vm.dialog.cancleLoadEx = true;
      } else if (type == 'sureMatch') {
        if(vm.buttonCanClick){
          vm.buttonCanClick=false;
          if (this.changeStatus == 'modifying') {
          vm.$confirm('卸车分段不能确认,是否前往【已匹配待确认】中确认', '请注意', {
            confirmButtonText: '前往',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }).then(() => {
            vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList?goTo=second&secondActiveName=confirm_match" });
          }).catch(() => {

          })
        } else {
          var cancel_trip_list = [],
            match_trip_list = [],
            sendData;
          this.detailData.forEach(item => {
            if (item.type == "confirm_match" && item.identify_id == vm.suerId) {
              item.waiting_matchArr.forEach(Witem => {
                if (Witem.status == 'new') {
                  match_trip_list.push(Witem.trip_id);
                } else {
                  cancel_trip_list.push(Witem.trip_id);
                }
              });

            }
          });
          sendData.cancel_trip_list = cancel_trip_list;
          sendData.match_trip_list = match_trip_list;
          sendData.pickup_trip_id = this.setpId;
          this.pageLoading = true;
          this.buttonLoading.suerUnload=true;
          this.$$http("sureMatch", sendData).then(results => {
            vm.pageLoading = false;
            vm.buttonCanClick=true;
            if (results.data.code == 0) {
              this.buttonLoading.suerUnload=false;
              vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList" });
              vm.$message({
                type: "success",
                message: "确认卸货单成功"
              })
            } else {
              vm.$message.error("确认卸货单失败")
            }
          }).catch(() => {
            vm.pageLoading = false;
            vm.buttonCanClick=true;
            this.buttonLoading.suerUnload=false;
            vm.$message.error("确认卸货单失败")
          });
        }
        }
      } else if (type == 'upInSettlement') {
        if(vm.buttonCanClick){
          var sendData = {};
          sendData.id = this.setpId;
          sendData.status = 'in_settlement';
          this.pageLoading = true;
          vm.buttonCanClick=false;
          vm.buttonLoading.settlementButton=true;
          this.$$http('changeOrderStatus', sendData).then(results => {
            vm.pageLoading = false;
            vm.buttonCanClick=false;
            vm.buttonLoading.settlementButton=false;
            if (results.data.code == 0) {
              vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList" });
              vm.$message({
                type: "success",
                message: "提交结算成功"
              })
            } else {
              vm.$message.error("提交结算失败")
            }
          }).catch(() => {
            vm.pageLoading = false;
            vm.buttonCanClick=false;
            vm.buttonLoading.settlementButton=false;
            vm.$message.error("提交结算失败")
          });
        }
      }
    },
    sendRe: function(type, row) {
      if(this.buttonCanClick){
        this.buttonCanClick=false;
         var vm = this;
      var weight_id = "";
      if (this.detailData.length > 0 && this.detailData[this.detailData.length - 1].type == "loading_waiting_audit" || this.detailData[this.detailData.length - 1].type == "unloading_waiting_audit") {
        if (this.detailData[this.detailData.length - 1].operation == "上传装车铅封") {
          weight_id = this.detailData[this.detailData.length - 2].weight_id;
        } else {
          this.surePound = this.detailData[this.detailData.length - 1];
          weight_id = this.detailData[this.detailData.length - 1].weight_id;
        }
      }
      if (type == 'sureLoadExUp') {
        var sendData = {
          active_time: this.surePound.active_time,
          work_start_time: this.surePound.work_start_time,
          work_end_time: this.surePound.work_end_time,
          gross_weight: this.surePound.gross_weight,
          tare_weight: this.surePound.tare_weight,
          net_weight: this.surePound.net_weight,
          leave_time:this.surePound.leave_time||null,
          active_mile:this.surePound.active_mile||null
        };
        // if (this.detailData[this.detailData.length - 1].type == "unloading_waiting_audit") {
        //   sendData.status = 'waiting_settlement';
        // } else {
        //   sendData.status = 'waiting_match';
        // }

        sendData.id = weight_id;
        //sendData.weight_id = weight_id;
        sendData.is_checked = 'pass';
        if (this.operationIsOk) {
          this.operationIsOk = false;
          vm.pageLoading = true;
          this.$$http("examineLoad", sendData).then(results => {
            vm.pageLoading = false;
            vm.operationIsOk = true;
            vm.buttonCanClick=true;
            if(vm.detailData[vm.detailData.length - 1].type == "loading_waiting_audit" ){
              vm.buttonLoading.loadingAuditSuccessButton=true;
            }else{
              vm.buttonLoading.unloadinguditSuccessButton=true;
            }
            if (results.data.code == 0) {
              
               vm.$message({
                type: "success",
                message: "审核通过成功"
              });

              if(vm.detailData[vm.detailData.length - 1].type == "loading_waiting_audit" ){
                vm.buttonLoading.loadingAuditSuccessButton=false;
                vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList?goTo=first&secondActiveName=loading_waiting_audit" });
              }else{
                vm.buttonLoading.unloadinguditSuccessButton=false;
                vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList?goTo=third&secondActiveName=unloading_waiting_audit" });
              }
            }
          }).catch(() => {
            vm.pageLoading = false;
            vm.buttonCanClick=true;
            vm.buttonLoading.unloadinguditSuccessButton=false;
            vm.buttonLoading.loadingAuditSuccessButton=false;
          });
        }
      } else if (type == 'cancleLoadExUp') {
        var sendData = {};
        // if (this.detailData[this.detailData.length - 1].type == "unloading_waiting_audit") {
        //   sendData.status = 'unloading_audit_failed';
        // } else {
        //   sendData.status = 'loading_audit_failed';
        // }

        sendData.id = weight_id;
        //sendData.weight_id = "";
        sendData.is_checked = 'refuse';
        if (this.loadPoundReason != 'other') {
          sendData.reason = this.loadPoundReason;
        } else {
          sendData.reason = this.otherInput;
        }
        if (this.operationIsOk) {
          this.operationIsOk = false;
          vm.pageLoading = true;
          if(vm.detailData[vm.detailData.length - 1].type == "loading_waiting_audit" ){
            vm.buttonLoading.loadingAuditFailButton=true;
          }else{
            vm.buttonLoading.unloadinguditFailButton=true;
          }
          this.$$http("examineLoad", sendData).then(results => {
            vm.buttonCanClick=true;
            this.operationIsOk = true;
            vm.pageLoading = false;
            if (results.data.code == 0) {
              console.log('results', results);
               if(vm.detailData[vm.detailData.length - 1].type == "loading_waiting_audit" ){
                vm.buttonLoading.loadingAuditFailButton=false;
                vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList?goTo=first&secondActiveName=loading_waiting_audit" });
               }else{
                vm.buttonLoading.unloadinguditFailButton=false;
                vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList?goTo=third&secondActiveName=unloading_waiting_audit" });
               }
              vm.$message({
                type: "success",
                message: "审核拒绝成功"
              })
            }
          }).catch(() => {
            vm.pageLoading = false;
            vm.buttonCanClick=true;
            vm.buttonLoading.unloadinguditFailButton=false;
            vm.buttonLoading.loadingAuditFailButton=false;
          });
        }
      }
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
            vm.$$http("getSectionTrips", { id: vm.setpId }).then(stepInfo => {
              if (stepInfo.data.code == 0) {
                vm.suerId = stepInfo.data.data.identify;
                vm.changeStatus = stepInfo.data.data.interrupt_status.key;
                vm.matchData(results.data.data);
                vm.extendsArr.push(vm.detailData.length - 1);
                if (vm.detailData[vm.detailData.length - 1].operation == "上传装车铅封" || vm.detailData[vm.detailData.length - 1].operation == "已匹配卸货单") {
                  vm.extendsArr.push(vm.detailData.length - 2);
                }
              }
            });
            //vm.detailData = results.data.data;
          }
        }).catch(() => {
          vm.pageLoading = false;
        });
    },
    matchData: function(allData) {
      var middleArr = [];
      var middleAlone = [];
      var addFlag = false;
      for (var i in allData) {
        if (!allData[i].identify_id) {
          if (addFlag) {
            var waiting_matchOb = {};
            waiting_matchOb.waiting_matchArr = middleAlone;
            waiting_matchOb.type = middleAlone[middleAlone.length - 1].type;
            middleArr.push(waiting_matchOb);
            middleAlone = [];
          }
          middleArr.push(allData[i]);
          addFlag = false;
        } else {
          middleAlone.push(allData[i]);
          if (i == allData.length - 1) {
            var waiting_matchOb = {};
            waiting_matchOb.waiting_matchArr = middleAlone;
            waiting_matchOb.type = middleAlone[middleAlone.length - 1].type;
            waiting_matchOb.identify_id = middleAlone[middleAlone.length - 1].identify_id;
            middleArr.push(waiting_matchOb);
            middleAlone = [];
          }
          addFlag = true;
        }
      };
      this.detailData = middleArr;
    },
  },
  created: function() {
    this.getData();
  },
  activated: function() {
    this.activeName = 'second';
  }
}

</script>
