<style scoped lang="less">
  .listTableAll {
  text-align: left;
  font-size: 13px;
}

.el-table {
  /deep/ .el-table__header-wrapper tr th .cell {
    text-align: left;
  }
  /deep/ .el-table__body {
    .el-table__row {
      background-color: #f5f6fa;
      &.expanded {
        td {
          border-top: 1px solid #e4e7ed;
          border-bottom: 1px solid #e4e7ed;
        }
      }
    }
    .el-table__expanded-cell[class*=cell] {
      padding-left: 0;
      padding-right: 0;
    }
    .listDetalis {
      float: left;
      text-align: left;
    }
    td {
      border-bottom: 0px solid #ebeef5;
      font-size: 13px;
      height: 25px;
      padding: 5px 0;
      .el-table th.is-leaf {
        border-top: none;
      }
    }
    .colinfo {
      float: left;
      height: 30px;
      line-height: 30px;
      font-size: 10px;
    }
    .el-icon-location {
      font-size: 10px;
      margin-left: 5px;
      color: #409eff;
    }
    .carList .el-col {
      height: 25px;
      line-height: 25px;
    }

    .el-col-3 {
      width: 11.5%;
    }
    .el-button {
      min-width: 70px;
    }
    .el-table__row td:nth-child(1) .cell {
      padding-left: 40px;
    }
  }
}

.dialog-footer {
  text-align: center;
}

.el-button--success {
  color: #67c23a !important;
  background: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}

.commh {
  line-height: 28px;
  margin-top: 5px;
  height: 28px;
}

.carInfo {
  width: 70%;
  text-align: left;
  margin-left: 15%;
}

.el-dialog__wrapper .el-dialog {
  -webkit-backface-visibility: hidden;
}

.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}

.el-icon-location {
  cursor: pointer;
}

#map-container {
  height: 400px;
  width: 100%;
}

.listDetalis .el-row {
  margin-top: 10px;
}

.listDetalis>div:nth-child(1) {
  margin-top: 0px;
}

.unloadList {
  margin-top: 30px;
}

</style>
<template>
  <div style="position:relative;font-size: 10px;">
    <noData v-if="ListData.length==0&&ListDataSearch"></noData>
    <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandStatus" :expand-row-keys="returnId" :row-key="getRowKeys" @expand-change="changeExpand" ref="tableConList" height="500">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="width:90%;float:left;font-size:13px;padding:10px 0 10px 45px;">
            <div v-if="expendShowConfig[props.row.status.key]=='loadExtend'" style="margin:10px 0;">
              <el-row style="margin-top:5px;">
                <el-col :span="4">
                  订单号: {{props.row.delivery_order.order_number}}
                </el-col>
                <el-col :span="4">
                  液厂地址: <span v-if="props.row.delivery_order.fluid_address&&props.row.delivery_order.fluid_address.length<10">{{props.row.delivery_order.fluid_address}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.delivery_order.fluid_address" placement="top-start">
                    <span>{{props.row.delivery_order.fluid_address.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  实际液厂: <span v-if="props.row.delivery_order.actual_fluid_name&&props.row.delivery_order.actual_fluid_name.length<10">{{props.row.delivery_order.actual_fluid_name}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.delivery_order.actual_fluid_name" placement="top-start">
                    <span>{{props.row.delivery_order.actual_fluid_name.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  车号: <span v-if="props.row.capacity_info && props.row.capacity_info.tractor">{{props.row.capacity_info.tractor.plate_number}}</span>
                  <span v-else>无</span>
                </el-col>
                <el-col :span="4">
                  主驾: <span v-if="props.row.capacity_info && props.row.capacity_info.master_driver&&props.row.capacity_info.master_driver.name">{{props.row.capacity_info.master_driver.name}}</span>
                </el-col>
                <el-col :span="4">
                  主驾电话: <span v-if="props.row.capacity_info && props.row.capacity_info.master_driver&&props.row.capacity_info.master_driver.mobile_phone">{{props.row.capacity_info.master_driver.mobile_phone}}</span>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="4" class="whiteSpan">
                  <el-tooltip class="item" effect="light" placement="bottom-start" v-if="props.row.pre_business_order_list&&props.row.pre_business_order_list.length>0">
                    <div slot="content" style="width:250px;">
                      <el-row v-for="(unloadItem,unloadIndex) in props.row.pre_business_order_list" v-bind:class="{unloadList:unloadIndex!=0}">
                        <el-col>业务单号:{{unloadItem.order_number}}</el-col>
                        <el-col style="margin-top:10px;">站点:{{unloadItem.station}}</el-col>
                        <el-col style="margin-top:10px;">需求液厂:{{unloadItem.actual_fluid_name}}</el-col>
                        <el-col style="margin-top:10px;">计划吨位:{{unloadItem.plan_tonnage}}吨</el-col>
                        <el-col style="margin-top:10px;">到站时间:{{unloadItem.plan_arrive_time}}</el-col>
                      </el-row>
                    </div>
                    <div class="whiteSpan">预匹配卸货地:<span v-for="(Uitem,Uindex) in props.row.pre_business_order_list"><span v-if="props.row.pre_business_order_list.length>1&&Uindex!=props.row.pre_business_order_list.length-1">{{Uitem.station}}/</span><span v-else>{{Uitem.station}}</span></span></div>
                  </el-tooltip>
                  <span v-else>预匹配卸货地:无</span>
                </el-col>
                <el-col :span="4">
                  挂车号: <span v-if="props.row.capacity_info && props.row.capacity_info.semitrailer">{{props.row.capacity_info.semitrailer.plate_number}}</span>
                  <span v-else>无</span>
                </el-col>
                <el-col :span="4">
                  车队: <span v-if="props.row.capacity_info && props.row.capacity_info.group&&props.row.capacity_info.group.group_name">{{props.row.capacity_info.group.group_name}}</span>
                </el-col>
                <el-col :span="4">
                  备注: <span v-if="props.row.delivery_order && props.row.delivery_order.mark" class="no-wrap">{{props.row.delivery_order.mark}}</span><span v-else>无</span><i class="el-icon-edit ml-5 cursor-pointer" v-on:click="editMark(props.row)"></i>
                </el-col>
              </el-row>
            </div>
            <div v-if="expendShowConfig[props.row.status.key]=='matchExtend'">
              <el-row style="margin:5px 0;" :gutter="20">
                <el-col :span="4">
                  液厂: <span v-if="props.row.delivery_order.fluid&&props.row.delivery_order.fluid.length<10">{{props.row.delivery_order.fluid}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.delivery_order.fluid" placement="top-start">
                    <span>{{props.row.delivery_order.fluid.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col>
                <!--  <el-col :span="4" class="whiteSpan">
                  计划装车时间:
                  <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.delivery_order.plan_time" placement="top-start" v-if="props.row.delivery_order&&props.row.delivery_order.plan_time">
                    <span>{{props.row.delivery_order.plan_time.split(" ")[0]}}</span>
                  </el-tooltip>
                  <span v-else>无</span>
                </el-col> -->
                <el-col :span="4" class="whiteSpan">
                  实际到厂时间:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pick_active_time">
                    <div slot="content" style="width:180px;">
                      <el-row>
                        <el-col>原数据:{{props.row.pick_active_time}}</el-col>pickup_trip
                        <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_time">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_time}}</el-col>
                      </el-row>
                    </div>
                    <span>{{props.row.pick_active_time}}</span>
                  </el-tooltip>
                  <span v-else>无</span>
                </el-col>
                <el-col :span="4">
                  实际装车吨位:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pick_active_time">
                    <div slot="content" style="width:120px;">
                      <el-row>
                        <el-col>原数据:{{props.row.pick_active_tonnage}}吨</el-col>
                        <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage}}吨</el-col>
                      </el-row>
                    </div>
                    <span>{{props.row.pick_active_tonnage}}<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showPound(props.row)">(磅)</a></span>
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  主车: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.group&&props.row.transPowerInfo.group.group_name">{{props.row.transPowerInfo.group.group_name}}</span>
                </el-col>
                <el-col :span="4">
                  主驾: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
                </el-col>
                <el-col :span="4">
                  备注: <span v-if="props.row.delivery_order && props.row.delivery_order.mark" class="no-wrap">{{props.row.delivery_order.mark}}</span><span v-else>无</span><i class="el-icon-edit ml-5 cursor-pointer" v-on:click="editMark(props.row)"></i>
                </el-col>
              </el-row>
              <el-row v-for="(Uitem,Uindex) in props.row.unload_trips" style="position:relative;margin:10px 0 0 0;" :gutter="20">
                <el-col :span="4" style="position:absolute;left:-20px;"><span>{{Uindex+1}}.</span></el-col>
                <el-col :span="4" class="whiteSpan"><span>卸货站:{{Uitem.business_order.station}}</span></el-col>
                <el-col :span="4" class="whiteSpan">卸货地址:<span v-if="Uitem.business_order.station_address.length<10">{{Uitem.business_order.station_address}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="Uitem.business_order.station_address" placement="top-start">
                    <span>{{Uitem.business_order.station_address.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col>
                <el-col :span="4" class="whiteSpan">计划到站时间:{{Uitem.business_order.plan_arrive_time}}</el-col>
                <el-col :span="4" class="whiteSpan">计划卸车:{{Uitem.business_order.plan_tonnage}}吨</el-col>
                <el-col :span="8" class="whiteSpan">收货人:{{Uitem.business_order.consignee}}／{{Uitem.business_order.consignee_phone}}</el-col>
              </el-row>
            </div>
            <div v-if="expendShowConfig[props.row.status.key]=='unloadExtend'">
              <el-row style="margin-top:5px;" :gutter="20">
                <el-col :span="4">
                  液厂: <span v-if="props.row.delivery_order.fluid&&props.row.delivery_order.fluid.length<10">{{props.row.delivery_order.fluid}}</span>
                </el-col>
                <el-col :span="4" class="whiteSpan">
                  实际到厂时间:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pick_active_time">
                    <div slot="content" style="width:180px;">
                      <el-row>
                        <el-col>原数据:{{props.row.pick_active_time}}</el-col>pickup_trip
                        <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_time">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_time}}</el-col>
                      </el-row>
                    </div>
                    <span>{{props.row.pick_active_time}}</span>
                  </el-tooltip>
                  <span v-else>无</span>
                </el-col>
                <el-col :span="4">
                  实际装车吨位:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pick_active_time">
                    <div slot="content" style="width:120px;">
                      <el-row>
                        <el-col>原数据:{{props.row.pick_active_tonnage}}吨</el-col>
                        <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage}}吨</el-col>
                      </el-row>
                    </div>
                    <span>{{props.row.pick_active_tonnage}}<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showPound(props.row)">(磅)</a></span>
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  车号:<span v-if="props.row.capacity_info && props.row.capacity_info.tractor">{{props.row.capacity_info.tractor.plate_number}}</span>
                  <span v-else>无</span>
                </el-col>
                <el-col :span="4">
                  主驾: <span v-if="props.row.capacity_info && props.row.capacity_info.master_driver&&props.row.capacity_info.master_driver.name">{{props.row.capacity_info.master_driver.name}}</span> <span style="margin-left:5px;" v-if="props.row.capacity_info && props.row.capacity_info.master_driver&&props.row.capacity_info.master_driver.mobile_phone">{{props.row.capacity_info.master_driver.mobile_phone}}</span>
                </el-col>
                <el-col :span="4">
                  车队: <span v-if="props.row.capacity_info && props.row.capacity_info.group&&props.row.capacity_info.group.group_name">{{props.row.capacity_info.group.group_name}}</span>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;" :gutter="20">
                <el-col :span="4">
                  卸货站: {{props.row.business_order.station}}
                </el-col>
                <el-col :span="4">
                  卸货地: <span v-if="props.row.business_order.station_address.length<10">{{props.row.business_order.station_address}}</span>
                  <el-tooltip class="item" effect="light" :content="props.row.business_order.station_address" placement="top-start">
                    <span>{{props.row.business_order.station_address.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  实际卸车吨位:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pick_active_time">
                    <div slot="content" style="width:120px;">
                      <el-row>
                        <el-col>原数据:{{props.row.active_tonnage}}吨</el-col>
                        <el-col><span v-if="props.row.unload_trips&&props.row.unload_trips[0].last_actual_quantity">新数据:{{props.row.unload_trips&&props.row.unload_trips[0].last_actual_quantity}}吨</span></el-col>
                      </el-row>
                    </div>
                    <span>{{props.row.active_tonnage}}吨<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showDownPound(props.row)">(磅)</a></span>
                  </el-tooltip>
                </el-col>
                <el-col :span="4" class="whiteSpan">
                  实际卸货时间:
                  <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.work_end_time" placement="top-start" v-if="props.row.work_end_time">
                    <span>{{props.row.work_end_time}}</span>
                  </el-tooltip>
                  <span v-else>无</span>
                </el-col>
                <el-col :span="4" class="whiteSpan">
                  实际到站时间:
                  <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.arrival_time||props.row.active_time" placement="top-start" v-if="props.row.arrival_time||props.row.active_time">
                    <span>{{props.row.arrival_time||props.row.active_time}}</span>
                  </el-tooltip>
                  <span v-else>无</span>
                </el-col>
                <el-col :span="4" class="whiteSpan">
                  离站时间:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pick_active_time">
                    <div slot="content" style="width:180px;">
                      <el-row>
                        <el-col>原数据:{{props.row.weight_audit_time}}</el-col>
                        <el-col><span v-if="props.row.unload_trips&&props.row.unload_trips[0].last_weight_audit_time">新数据:{{props.row.unload_trips&&props.row.unload_trips[0].last_weight_audit_time}}</span></el-col>
                      </el-row>
                    </div>
                    <span>{{props.row.weight_audit_time}}</span>
                  </el-tooltip>
                  <span v-else>无</span>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;" :gutter="20">
                <el-col :span="4" class="whiteSpan">
                  标准里程:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.last_standard_mile">
                    <div slot="content" style="width:120px;">
                      <el-row>
                        <el-col>原数据:{{props.row.standard_mile}}km</el-col>
                        <el-col v-if="props.row.last_standard_mile">新数据:{{props.row.last_standard_mile}}km</el-col>
                      </el-row>
                    </div>
                    <span v-if="props.row.standard_mile">{{props.row.standard_mile}}km <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                    <span v-else>0km <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                  </el-tooltip>
                  <span v-else>{{props.row.standard_mile}}km</span>
                </el-col>
                <el-col :span="4" class="whiteSpan">
                  实际里程:
                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.last_weight_active_mile">
                    <div slot="content" style="width:120px;">
                      <el-row>
                        <el-col>原数据:{{props.row.weight_active_mile}}km</el-col>
                        <el-col v-if="props.row.last_weight_active_mile">新数据:{{props.row.last_weight_active_mile||'0'}}km</el-col>
                      </el-row>
                    </div>
                    <span v-if="props.row.weight_active_mile">{{props.row.weight_active_mile}}km <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                    <span v-else>0km <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                  </el-tooltip>
                  <span v-else>{{props.row.weight_active_mile}}km</span>
                </el-col>
                <el-col :span="4">
                  收货人: {{props.row.business_order.consignee}}
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  收货人电话: {{props.row.business_order.consignee_phone}}
                </el-col>
                <el-col :span="4">
                  下单人: {{props.row.business_order.sale_man_name}}
                  </el-tooltip>
                </el-col>
                <el-col :span="4">
                  下单人电话: {{props.row.business_order.sale_man_phone}}
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="4">
                  备注: <span v-if="props.row.delivery_order && props.row.delivery_order.mark" class="no-wrap">{{props.row.delivery_order.mark}}</span><span v-else>无</span><i class="el-icon-edit ml-5 cursor-pointer" v-on:click="editMark(props.row)"></i>
                </el-col>
              </el-row>
            </div>
            <div style="clear:both"></div>
          </div>
          <div style="width:100px;float:right;padding-left:10px;">
            <el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key" v-if="props.row.interrupt_status.key=='normal'" style="margin-top:10px;">
              <el-col>
                <el-button v-if="props.row.status.key=='unload_driver_pending_confirmation'&&props.row.waybill.status.key!='y10'" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)" disabled>需司机确认</el-button>
                <el-button v-if="props.row.status.key=='loading_audit_failed'&&props.row.pick_loading_audit_failed_cancel==true" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
                <el-button v-if="(!(props.row.status.key=='unload_driver_pending_confirmation'&&props.row.waybill.status.key!='y10'))&&(props.row.status.key!='loading_audit_failed')" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>
            <el-row v-if="props.row.interrupt_status.key!='normal'" v-for="(item,key) in buttonModyfiyAll[props.row.interrupt_status.key]" :key="key" style="margin-top:10px;">
              <el-col>
                <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="运单号" prop="waybill.waybill_number" min-width="150">
        <template slot-scope="props">
          <div :title="props.row.waybill.waybill_number" class="whiteSpan">
            <a style="color:#409EFF" @click="gotoDetalis(props.row)"><span style="cursor:pointer;">运单号:{{props.row.waybill.waybill_number}}</span></a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="业务单号" prop="" min-width="150" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.business_order.order_number" placement="top-start" v-if="props.row.business_order.order_number">
            <span >{{props.row.business_order.order_number}}</span>
          </el-tooltip>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="装车液厂" prop="" min-width="150">
        <template slot-scope="props">
          <span style="color:rgb(97,126,253);font-weight:bold;font-size:13px;">{{props.row.delivery_order.fluid.split("-")[0]}}</span><i class="el-icon-location primary" @click="showMapDetalis('load',props.row.delivery_order.actual_fluid_id)"></i>
        </template>
      </el-table-column>
      <el-table-column label="卸货站" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <span v-if="props.row.plan_time">{{props.row.business_order.station}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="计划装车时间" prop="" min-width="180" v-if="this.nowHead!='unloadHead'">
        <template slot-scope="props">
          <div class="whiteSpan">
            <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.delivery_order.plan_time" placement="top-start" v-if="props.row.delivery_order&&props.row.delivery_order.plan_time">
              <span >{{props.row.delivery_order.plan_time.split(" ")[0]}}</span>
            </el-tooltip>
            <span v-else>无</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="计划装车吨位" prop="" min-width="150" v-if="this.nowHead=='loadHead'">
        <template slot-scope="props">
          <span v-if="props.row.delivery_order&&props.row.delivery_order.plan_tonnage">{{props.row.delivery_order.plan_tonnage}}吨</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="计划到站时间" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.plan_time" placement="top-start" v-if="props.row.plan_time">
            <span >{{props.row.plan_time}}</span>
          </el-tooltip>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="计划卸车吨位" prop="" min-width="150" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <span v-if="props.row.plan_tonnage">{{props.row.plan_tonnage}}吨</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="实际到厂时间" prop="" min-width="180" v-if="this.nowHead!='unloadHead'&&this.nowHead!='matchHead'">
        <template slot-scope="props">
          <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.pick_active_time" placement="top-start" v-if="props.row.pick_active_time">
            <span >{{props.row.pick_active_time}}</span>
          </el-tooltip>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="实际装车吨位" prop="" min-width="150" v-if="this.nowHead!='unloadHead'">
        <template slot-scope="props">
          <span v-if="props.row.pick_active_tonnage">{{props.row.pick_active_tonnage}}吨</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="实际到站时间" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.arrival_time||props.row.active_time" placement="top-start" v-if="props.row.arrival_time||props.row.active_time">
            <span >{{props.row.arrival_time||props.row.active_time}}</span>
          </el-tooltip>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="实际卸车吨位" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <span v-if="props.row.pick_active_time">{{props.row.active_tonnage}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="卸车信息" prop="" min-width="150" v-if="this.nowHead=='matchHead'">
        <template slot-scope="props">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content" style="width:250px;">
              <el-row v-for="(Uitem,Uindex) in props.row.unload_trips" v-bind:class="{unloadList:Uindex!=0}">
                <el-col style="margin-top:10px;">站点:{{Uitem.business_order.station}}</el-col>
                <el-col style="margin-top:10px;">计划吨位:<span v-if="Uitem.business_order.plan_tonnage">{{Uitem.business_order.plan_tonnage}}吨</span></el-col>
                <el-col style="margin-top:10px;" class="whiteSpan">计划到站时间:{{Uitem.business_order.plan_arrive_time}}</el-col>
              </el-row>
            </div>
            <div class="whiteSpan"><span v-for="(Uitem,Uindex) in props.row.unload_trips"><span v-if="props.row.unload_trips.length>1&&Uindex!=props.row.unload_trips.length-1">{{Uitem.business_order.station}}/</span><span v-else>{{Uitem.business_order.station}}</span></span></div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="车辆信息" prop="" min-width="150">
        <template slot-scope="props">
          <el-tooltip class="item" effect="light" placement="right">
            <div slot="content" style="width:140px;">
              <el-row>
                <el-col>车号:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
                  <span v-else>无</span></el-col>
                <el-col>挂车号:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.semitrailer">{{props.row.transPowerInfo.semitrailer.plate_number}}</span>
                  <span v-else>无</span></el-col>
                <el-col>主驾:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span>
                  <span v-else>无</span></el-col>
                <el-col>主驾电话:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
                  <span v-else>无</span></el-col>
                <el-col>副驾:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.vice_driver&&props.row.transPowerInfo.vice_driver.name">{{props.row.transPowerInfo.vice_driver.name}}</span>
                  <span v-else>无</span></el-col>
                <el-col>押运:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.escort_staff&&props.row.transPowerInfo.escort_staff.name">{{props.row.transPowerInfo.escort_staff.name}}</span>
                  <span v-else>无</span></el-col>
              </el-row>
            </div>
            <span v-if="props.row.transPowerInfo&&props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="" min-width="180">
        <template slot-scope="props">
          <el-tooltip :content="props.row.delivery_order.mark" placement="top-start" effect="light" v-if='props.row.delivery_order.mark!=""&&props.row.delivery_order.mark'>
            <span class="el-icon-document" style="font-size:16px;color:blue;cursor:pointer"></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="" min-width="150">
        <template slot-scope="props">
          <span v-if="props.row.interrupt_status.key=='canceling'||props.row.interrupt_status.key=='modifying'||props.row.interrupt_status.key=='abnormal'">{{props.row.interrupt_status.verbose}}</span>
          <span v-else>{{props.row.status.verbose}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" width="100" fixed="right">
        <template slot-scope="props">
          <el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key" v-if="props.row.interrupt_status.key=='normal'">
            <el-col v-if="key==0">
              <el-button v-if="props.row.status.key=='unload_driver_pending_confirmation'&&props.row.waybill.status.key!='y10'" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)" disabled>需司机确认</el-button>
              <el-button v-if="props.row.status.key=='loading_audit_failed'&&props.row.pick_loading_audit_failed_cancel==true" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              <el-button v-if="!(props.row.status.key=='unload_driver_pending_confirmation'&&props.row.waybill.status.key!='y10')&&props.row.status.key!='loading_audit_failed'" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
            </el-col>
          </el-row>
          <el-row v-if="props.row.interrupt_status.key!='normal'" v-for="(item,key) in buttonModyfiyAll[props.row.interrupt_status.key]" :key="key">
            <el-col v-if="key==0">
              <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提交变更" :visible.sync="changeSatusShow" width="25%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;">
      <el-form class="change_Status" label-width="80px" ref="changeStatusForm" style="width:80%;margin-left:10%">
        <el-form-item label="变更类型:" label-width="80px">
          <el-select v-model="changeStatusParam.changeStatusType" placeholder="请选择变更类型">
            <el-option v-for="(item,key) in changeSatusTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更内容:" label-width="80px">
          <el-select v-model="changeStatusParam.changeStatusFied" placeholder="请选择" v-if="changeStatusParam.changeStatusType=='truck'||changeStatusParam.changeStatusType==''" v-loading="seletPadding" filterable>
            <el-option v-for="(item,key) in changeSatusCarList" :key="key" :label="item.tractor.plate_number" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" label-width="80px">
          <el-input type="textarea" :rows="3" v-model="changeStatusParam.changeSatusDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="changeSatusShow = false">取 消</el-button>
       <el-button type="primary" @click="upStatus">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详细地址" :visible.sync="showMap" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" @open="openDigo">
      <div id="map-container" v-if="showMap"></div>
    </el-dialog>
    <el-dialog :title="surePoundTitle" center :visible.sync="isShowSurePound" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
      <loadingReview :isEdit="isEditSurePound" :isUpload="isUploadPound" :surePoundData="choosedListData" @close="isShowSurePound=false" @successCallback="loadingReviewSuccess"></loadingReview>
    </el-dialog>
    <el-dialog :title="cancleLoadTitle" center width="30%" :visible.sync="cancleLoadEx" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
      <refuseModal :weightId="weightId" @close="cancleLoadEx= false" @successCallback="refuseSuccess"></refuseModal>
    </el-dialog>
    <el-dialog :title="sureDownPoundTitle" center :visible.sync="isShowSureDownPound" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
      <unloadingReview :isEdit="isEditSureDownPound" :isUpload="isUploadUnloadPound" :surePoundData="choosedListData" @close="isShowSureDownPound = false" @successCallback="unloadingReviewSuccess"></unloadingReview>
    </el-dialog>
    <el-dialog title="提交结算" center :visible.sync="isUpSettlement" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
      <!--  -->
      <!-- <el-form ref="isUpSettlementForm" :model="UpSettlementForm" status-icon :label-position="'right'" label-width="100px" :rules="rules">
        <el-row style="margin-top:15px;">
          <el-col :span="10" :offset="2">
            <el-form-item label="实际到站时间:" prop="">
              <el-date-picker v-model="UpSettlementForm.arrival_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="离站时间:" prop="">
              <el-date-picker v-model="UpSettlementForm.weight_audit_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="卸车净重(吨):" prop="net_weight">
              <el-input placeholder="请输入" type="text" v-model="UpSettlementForm.net_weight"></el-input>
            </el-form-item>
            <el-form-item label="实际里程:" prop="active_mile">
              <el-input placeholder="请输入" type="text" v-model="UpSettlementForm.active_mile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button @click="isUpSettlement = false">取 消</el-button>
          <el-button type="primary" @click="upSettlementTrue()" :loading="upSettlementLoading">确 定</el-button>
        </span> -->
      <upSettlementReview :isEdit="isEditSureDownPound" :isUpload="isUploadUnloadPound" :surePoundData="choosedListData" @close="isUpSettlement = false" @successCallback="upSettlementReviewSuccess" :isShowAccountCheck="isShowAccountCheck"></upSettlementReview>
    </el-dialog>
    <el-dialog title="编辑备注" center :visible.sync="editMarkModalVisibel" width="40%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
      <editMark :deliveryOrderId="deliveryOrderId" :markText="markText" @close="editMarkModalVisibel= false" @successCallback="editSuccess"></editMark>
    </el-dialog>
  </div>
</template>
<script>
let landmarkMap;
let positionMark;
import noData from '../../../components/common/noData';
import loadingReview from '@/components/order/loadingReview';
import unloadingReview from '@/components/order/unloadingReview';
import upSettlementReview from '@/components/order/upSettlementReview';
import refuseModal from '@/components/order/refuseModal';
import editMark from '@/components/order/editMark';
export default {
  name: 'orderFifterList',
  components: {
    noData,
    loadingReview,
    unloadingReview,
    refuseModal,
    upSettlementReview,
    editMark
  },
  data() {
    var onlyNum = (rule, value, callback) => {
      if ((value + "").match(/^\d+(\.\d+)?$/) || value == '' || value == null) {
        callback();
      } else {
        callback(new Error("只能是数字"));
      }
    };
    return {
      noDataObj: {
        imgUrl: require("../../../assets/img/tms_no_data.png")
      },
      upSettlementLoading: false,
      lockFalg: false,
      delayTime: 500,
      showMap: false,
      loadPosition: {},
      isUpSettlement: false,
      ListDataSearch: false,
      UpSettlementForm: {
        arrival_time: "",
        weight_audit_time: "",
        net_weight: "",
        active_mile: ""
      },

      fifterStatus: ['driver_pending_confirmation', 'to_fluid', 'reach_fluid', 'loading_waiting_audit', 'loading_audit_failed', 'waiting_match', 'confirm_match', 'already_match', 'waiting_seal'],
      buttonModyfiyAll: {
        canceling: [{
          text: "确认取消",
          type: "danger",
          attrPlan: true,
          methods_type: "sureCancle",
        }],
        abnormal: [],
        modifying: []
      },
      tableHeadConfig: {
        'first': [{ key: 'all', value: 'loadHead' }, { key: 'driver_pending_confirmation', value: 'loadHead' }, { key: 'to_fluid', value: 'loadHead' }, { key: 'reach_fluid', value: 'loadHead' }, { key: 'loading_waiting_audit', value: 'loadHead' }, { key: 'loading_audit_failed', value: 'loadHead' }],
        'second': [{ key: 'all', value: 'matchHead' }, { key: 'waiting_match', value: 'matchHead' }, { key: 'confirm_match', value: "matchHead" }, { key: 'already_match', value: 'matchHead' }],
        'third': [{ key: 'all', value: 'unloadHead' }, { key: 'unload_driver_pending_confirmation', value: 'unloadHead' }, { key: 'to_site', value: 'unloadHead' }, { key: 'reach_site', value: 'unloadHead' }, { key: 'unloading_waiting_audit', value: 'unloadHead' }, { key: 'unloading_audit_failed', value: 'unloadHead' }],
        'fourth': [{ key: 'all', value: 'unloadHead' }, { key: 'waiting_settlement', value: 'unloadHead' }, { key: 'in_settlement', value: 'unloadHead' }],
        'fifth': [{ key: 'all', value: 'unloadHead' }, { key: 'canceing', value: 'matchHead' }, { key: 'modifying', value: 'matchHead' }, { key: 'abnormal', value: 'loadHead' }],
        'sxith': [{ key: 'all', value: 'unloadHead' }, { key: 'finished', value: 'unloadHead' }, { key: 'canceled', value: 'unloadHead' }],
        'seven': [{ key: 'all', value: 'unloadHead' }]
      },
      expendShowConfig: {
        'driver_pending_confirmation': 'loadExtend',
        'to_fluid': 'loadExtend',
        'reach_fluid': 'loadExtend',
        'loading_waiting_audit': 'loadExtend',
        'loading_audit_failed': 'loadExtend',
        'waiting_match': 'matchExtend',
        'confirm_match': 'matchExtend',
        'already_match': 'matchExtend',
        'unload_driver_pending_confirmation': 'unloadExtend',
        'to_site': 'unloadExtend',
        'reach_site': 'unloadExtend',
        'unloading_waiting_audit': 'unloadExtend',
        'unloading_audit_failed': 'unloadExtend',
        'waiting_seal': 'loadExtend',
        'waiting_settlement': 'unloadExtend',
        'in_settlement': 'unloadExtend',
        'canceing': 'matchExtend',
        'modifying': 'matchExtend',
        'abnormal': 'loadExtend',
        'finished': 'unloadExtend',
        'canceled': 'loadExtend'
      },
      rules: {
        net_weight: [
          { validator: onlyNum, trigger: 'blur' }
        ],
        active_mile: [
          { validator: onlyNum, trigger: 'blur' }
        ]
      },
      buttonAll: {
        driver_pending_confirmation: [{
            text: "上传装车磅单",
            type: "primary",
            methods_type: "upLoadPound",
          },
          // {
          //   text: "变更",
          //   type: "primary",
          //   methods_type: "changeSatus",
          // },
          { //司机未确认
            text: "取消运单",
            type: "danger",
            methods_type: "cancleOrder",
            attrPlan: true
          }
        ],
        unload_driver_pending_confirmation: [{
          text: "上传卸车磅单",
          type: "primary",
          methods_type: "upUnloadPound",
        }],
        waiting_match: [{
          text: "匹配卸货单",
          type: "primary",
          methods_type: "waitingMatch",
        }],
        confirm_match: [{
          text: "确认卸货单",
          type: "success",
          methods_type: "sureDownOrder"
        }, { //待匹配卸货单
          text: "变更卸货单",
          type: "primary",
          methods_type: "changeUnload",
          attrPlan: true
        }],
        already_match: [{ //已配卸货单
          text: "变更卸货单",
          type: "primary",
          methods_type: "changeUnload",
          attrPlan: true
        }],
        to_fluid: [
          // {
          //   text: "变更",
          //   type: "primary",
          //   methods_type: "changeSatus"
          // },
          {
            text: "取消运单",
            type: "danger",
            methods_type: "cancleOrder", //前往装车
            attrPlan: true
          }
        ],
        waiting_seal: [
          // {
          //   text: "变更",
          //   type: "primary",
          //   methods_type: "changeSatus"
          // },
          { //待上传铅封
            text: "取消运单",
            type: "danger",
            methods_type: "cancleOrder",
            attrPlan: true
          }
        ],
        reach_fluid: [
          // {
          //   text: "变更",
          //   type: "primary",
          //   methods_type: "changeSatus"
          // },
          { //已到装货地
            text: "取消运单",
            type: "danger",
            methods_type: "cancleOrder",
            attrPlan: true
          }
        ],
        loading_waiting_audit: [{
            text: "装车审核",
            type: "success",
            methods_type: "loadingEX",
            attrPlan: true
          },
          {
            text: "取消运单",
            type: "danger",
            methods_type: "cancleOrder",
            attrPlan: true
          }, {
            text: "审核拒绝",
            type: "danger",
            methods_type: "refuseLoading",
            attrPlan: true
          }
        ],
        loading_audit_failed: [{ //
          text: "取消运单",
          type: "danger",
          methods_type: "cancleOrder",
          attrPlan: true
        }],
        to_site: [],
        reach_site: [],
        unloading_waiting_audit: [{
            text: "卸车审核",
            type: "primary",
            methods_type: "downEx"
          },
          {
            text: "审核拒绝",
            type: "danger",
            methods_type: "refuseUnloading"
          }
        ],
        unloading_audit_failed: [],
        waiting_settlement: [
          // {
          //   text: "调整数据",
          //   type: "success",
          //   methods_type: "changeData",
          //   attrPlan: true
          // },
          {
            text: "提交结算",
            type: "primary",
            methods_type: "upSettlement",
          }
        ],

        in_settlement: [],
        finished: [{ //已完成
          text: "查看详情",
          type: "primary",
          methods_type: "showDetalis",
        }],
        canceled: [{ //已取消
          text: "查看详情",
          type: "primary",
          methods_type: "showDetalis",
        }]

      },
      changeSatusShow: false,
      changeStatusParam: {
        changeStatusType: "",
        changeStatusFied: "",
        changeSatusDesc: "",
        sectiontrip: ""
      },
      changeSatusTypeSelect: [
        { key: 'truck', verbose: "车辆变更" },
      ],
      changeSatusCarList: [],
      changeSatusPerList: [],
      seletPadding: false,
      returnId: [],


      isShowSurePound: false,
      surePoundTitle: '装车磅单审核通过',
      isEditSurePound: true,
      isUploadPound: false,


      isShowSureDownPound: false,
      sureDownPoundTitle: '卸车磅单审核通过',
      isEditSureDownPound: true,
      isUploadUnloadPound: false,
      choosedListData: {},
      isShowAccountCheck: false,
      cancleLoadTitle: '装车磅单审核拒绝',
      cancleLoadEx: false,
      weightId: '',


      editMarkModalVisibel: false,
      deliveryOrderId: '',
      markText: ''


    };
  },
  props: ['ListData', 'firstMenu', 'secondMenu', 'expandStatus'],
  computed: {
    nowHead: function() {
      var returnHead = "";
      if (this.firstMenu == 'first') {
        returnHead = "loadHead";
      } else if (this.firstMenu == 'second') {
        returnHead = "matchHead";
      } else {
        returnHead = "unloadHead";
      }
      return returnHead;
    }
  },
  mounted: function() {
    /*生成地图*/
    // var vm=this;

    // this.getDetail().then((results) => {
    //   let lnglat = [results.data.data.location.longitude, results.data.data.location.latitude];

    //   landmarkMap.setCenter(lnglat);
    //   positionMark.setPosition(lnglat);
    // });
  },
  methods: {
    editMark(row) {
      this.deliveryOrderId = row.delivery_order.id;
      this.markText = row.delivery_order.mark;
      console.log('markText', this.markText);
      this.editMarkModalVisibel = true;

    },
    editSuccess() {
      this.$emit('searchList');
    },
    upSettlementTrue: function() {
      // var vm = this;
      // this.$refs['isUpSettlementForm'].validate((valid) => {
      //   if (valid) {
      //     var sendData = this.UpSettlementForm;
      //     vm.upSettlementLoading = true;

      //     sendData.status = "in_settlement";
      //     this.$$http('changeOrderStatus', sendData).then((results) => {
      //       vm.upSettlementLoading = false;
      //       if (results.data.code == 0) {
      //         this.isUpSettlement = false;
      //         this.$message({
      //           message: '提交结算成功',
      //           type: 'success'
      //         });
      //         vm.$emit('searchList');
      //       }
      //     }).catch(() => {
      //       vm.upSettlementLoading = false;
      //     });
      //   }
      // });
    },
    upSettlementReviewSuccess: function() {
      this.$emit('searchList');
    },
    expandArr: function() {
      if (this.expandStatus) {
        this.ListData.forEach((item) => {
          this.returnId.push(item.id);
        });
      } else {
        this.returnId = [];
      }
    },
    gotoDetalis: function(rowData) {
      //this.$router.push({ path: `/logisticsManage/UnderConsignmentOrders/underOrderDetailTab/${rowData.id}/${rowData.waybill.id}` });
      window.open(`#/logisticsManage/UnderConsignmentOrders/underOrderDetailTab/${rowData.id}/${rowData.waybill.id}`, '_blank')
    },
    showPound: function(rowData) {

      let rowDataCopy = Object.assign({}, rowData);

      if (rowDataCopy && rowDataCopy.section_type && rowDataCopy.section_type.key && rowDataCopy.section_type.key === 'unload') {
        rowDataCopy.weight_note = rowDataCopy.pickup_weight_note;
        rowDataCopy.active_time = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.active_time || rowDataCopy.active_time;
        rowDataCopy.work_start_time = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.work_start_time || rowDataCopy.work_start_time;
        rowDataCopy.work_end_time = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.work_end_time || rowDataCopy.work_end_time;
        rowDataCopy.gross_weight = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.gross_weight || rowDataCopy.gross_weight;
        rowDataCopy.tare_weight = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.tare_weight || rowDataCopy.tare_weight;
        rowDataCopy.net_weight = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.net_weight || rowDataCopy.net_weight;
        rowDataCopy.carseal = rowDataCopy.pickup_carseal || rowDataCopy.carseal;
      }

      this.isUploadPound = false;
      this.isShowSurePound = true;
      this.choosedListData = rowDataCopy;
      this.surePoundTitle = '查看装车磅单'
      this.isEditSurePound = false;

    },
    showDownPound: function(rowData) {

      this.isUploadUnloadPound = false;
      this.isShowSureDownPound = true;
      this.choosedListData = rowData;
      this.sureDownPoundTitle = '查看卸车车磅单'
      this.isEditSureDownPound = false;

    },
    showMapDetalis: function(type, id) {
      var vm = this;
      if (type == "load") {
        this.$$http('getFulidDetalis', { id: id }).then((results) => {
          if (results.data.code == 0) {
            vm.showMap = true;
            var pointObj = results.data.data;
            vm.loadPosition.longitude = pointObj.coordinate.longitude;
            vm.loadPosition.latitude = pointObj.coordinate.latitude;
            vm.loadPosition.position = pointObj.coordinate.address;
            //vm.openDigo(pointObj.coordinate);
          }
        }).catch(() => {

        });
      } else if (type == "unload") {
        this.$$http('getStationDetalis', { id: id }).then((results) => {
          if (results.data.code == 0) {
            vm.showMap = true;
            var pointObj = results.data.data;
            vm.loadPosition.longitude = pointObj.location.longitude;
            vm.loadPosition.latitude = pointObj.location.latitude;
            vm.loadPosition.position = pointObj.address;
            //vm.openDigo(pointObj.coordinate);
          }
        }).catch(() => {

        });
      }
    },
    openDigo: function(obj) {
      var vm = this;
      setTimeout(() => {
        landmarkMap = new AMap.Map('map-container', {
          zoom: 10,
        });
        // /*创建点标记*/
        positionMark = new AMap.Marker({
          map: landmarkMap,
        });
        positionMark.setLabel({
          content: vm.loadPosition.position,
          offset: new AMap.Pixel(30, 0)
        });
        let lnglat = [vm.loadPosition.longitude, vm.loadPosition.latitude];
        landmarkMap.setCenter(lnglat);
        positionMark.setPosition(lnglat);
      }, 100);
    },
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {

    },
    upStatus: function() {
      var sendData = {};
      var vm = this;
      if (this.changeStatusParam.changeStatusFied && this.changeStatusParam.changeStatusType) {
        sendData.content = this.changeStatusParam.changeStatusFied;
        sendData.change_type = this.changeStatusParam.changeStatusType;
        sendData.desc = this.changeStatusParam.changeSatusDesc;
        sendData.sectiontrip = this.changeStatusParam.sectiontrip;
        this.$$http("upStatus", sendData).then((results) => {
          vm.$emit("changeTabs", 'fifth');
          vm.changeSatusShow = false;
        }).catch(() => {

        });
      } else {

      }
    },
    getRowKeys: function(row) {
      return row.id;
    },
    changeExpand: function(row, expandedRows) {
      // console.log('row', row);
      // console.log('expandedRows', expandedRows);
      // var vm = this;
      // if (row.transPowerInfo) {} else {
      //   var sendData = {};
      //   sendData.id = row.capacity;
      //   vm.$$http("getTransPowerInfo", sendData).then((transPowerInfo) => {
      //     if (transPowerInfo.data.code == 0) {
      //       row.transPowerInfo = transPowerInfo.data.data;
      //     }
      //   }).catch(() => {

      //   });
      // }
    },
    loadingExFun: function(type, rowData) {
      this.isShowSurePound = true;
      this.surePoundTitle = '装车磅单审核通过';
      this.isEditSureDownPound = true;
      this.isUploadPound = false;

      //this.choosedListData = rowData;

      /* 列表上数据和进程数据不一致，因为审核通过后才会把进程数据同步到列表。需要获取进程数据，审核进程数据 */
      this.$$http("orderProcess", { id: rowData.id }).then((results) => {

        if (results.data.code == 0) {
          let orderProcessData = results.data.data;
          let dataObject = {};

          orderProcessData.map((item, i) => {

            if (item.type === 'waiting_seal') {
              dataObject = {
                ...dataObject,
                ...item,
                weight_note: item.weight_id,
                carseal: rowData.carseal,
              }
            }

            if (item.type === 'loading_waiting_audit') {
              if (item.weight_id) {
                dataObject = {
                  ...dataObject,
                  ...item,
                  weight_note: item.weight_id,
                }
              }
            }

            if (item.type === 'to_fluid') {
              dataObject = {
                ...dataObject,
                ...item
              }
            }

          })

          this.choosedListData = Object.assign({}, dataObject);

        }
      });
    },
    downExFun: function(type, rowData) {
      this.isShowSureDownPound = true;
      this.sureDownPoundTitle = '卸车磅单审核通过';
      this.isEditSureDownPound = true;
      this.isUploadUnloadPound = false;

      //this.choosedListData = rowData;

      /* 列表上数据和进程数据不一致，因为审核通过后才会把进程数据同步到列表。需要获取进程数据，审核进程数据 */
      this.$$http("orderProcess", { id: rowData.id }).then((results) => {

        if (results.data.code == 0) {
          let orderProcessData = results.data.data;
          let dataObject = {};

          orderProcessData.map((item, i) => {

            if (item.type === 'unloading_waiting_audit') {
              dataObject = {
                ...dataObject,
                ...item,
                weight_note: item.weight_id,
                weight_active_mile: ''
              }
            }

            if (item.type === 'to_fluid') {
              dataObject = {
                ...dataObject,
                ...item
              }
            }

          })

          this.choosedListData = Object.assign({}, dataObject);
        }
      });
    },
    operation: function(type, rowData) {
      if (type == 'changeSatus') {
        this.changeSatusBox(rowData);
        this.changeStatusParam.sectiontrip = rowData.id;
      } else if (type == 'loadingEX') {
        this.loadingExFun(type, rowData);
      } else if (type == 'sureDownOrder') {
        this.$router.push({ path: `/logisticsManage/UnderConsignmentOrders/underOrderProcess/${rowData.id}/${rowData.waybill.id}` });
      } else if (type == 'downEx') {
        this.downExFun(type, rowData);
      } else if (type == 'sureUnload') {
        this.$router.push({ path: `/logisticsManage/UnderConsignmentOrders/underOrderProcess/${rowData.id}/${rowData.waybill.id}` });
      } else if (type == 'upSettlement') {
        this.upSettlement(rowData);
      } else if (type == 'changeUnload') {
        //变更卸货地
        window.open('#/logisticsManage/UnderConsignmentOrders/unloadBill/' + rowData.waybill.id + '/' + rowData.id)
        // this.$router.push({ path: `/logisticsManage/UnderConsignmentOrders/unloadBill/${rowData.waybill.id}` });
      } else if (type == 'waitingMatch') {
        //匹配卸货地
        window.open('#/logisticsManage/UnderConsignmentOrders/unloadBill/' + rowData.waybill.id + '/' + rowData.id)
        // this.$router.push({ path: `/logisticsManage/UnderConsignmentOrders/unloadBill/${rowData.waybill.id}` });
      } else if (type == 'upUnloadPound') {
        //上传卸车磅单
        this.isShowSureDownPound = true;
        this.choosedListData = rowData;
        this.sureDownPoundTitle = '上传卸车磅单'
        this.isEditSureDownPound = true;
        this.isUploadUnloadPound = true;

      } else if (type == 'cancleOrder') {
        //取消运单
        var sendData = {};
        sendData.id = rowData.id;
        sendData.status = "canceled";
        this.$confirm('取消运单后,系统将通知驾驶员,是否确认', '确认取消运单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$$http("changeStatusSection", sendData).then((results) => {
            if (results.data.code == 0) {
              this.$message({
                type: "success",
                message: "取消运单成功",
              });
              this.$emit('searchList');
            } else {
              this.$message.error(results.data.msg);
            }
          })

        }).catch((err) => {
          console.log('errs', err);
        });
      } else if (type == 'upLoadPound') {
        //上传装车磅单

        this.isShowSurePound = true;

        this.choosedListData = rowData;

        this.surePoundTitle = '上传装车磅单'

        this.isEditSurePound = true;

        this.isUploadPound = true;


      } else if (type == 'showDetalis') { //查看详情
        window.open(`#/logisticsManage/UnderConsignmentOrders/underOrderDetailTab/${rowData.id}/${rowData.waybill.id}`)
        //this.$router.push({ path: `/logisticsManage/UnderConsignmentOrders/underOrderDetailTab/${rowData.id}/${rowData.waybill.id}` });
      } else if (type == 'refuseLoading') {
        //装车审核拒绝
        this.weightId = rowData.weight_note;
        this.cancleLoadEx = true;
        this.cancleLoadTitle = '装车磅单审核拒绝';
      } else if (type == 'refuseUnloading') {
        //装车审核拒绝
        this.weightId = rowData.weight_note;
        this.cancleLoadEx = true;
        this.cancleLoadTitle = '卸车磅单审核拒绝';
      }
    },
    upSettlement: function(rowData) {
      // this.UpSettlementForm = {
      //     arrival_time: rowData.arrival_time || "",
      //     weight_audit_time: rowData.weight_audit_time || "",
      //     net_weight: rowData.net_weight || "",
      //     active_mile: rowData.weight_active_mile || "",
      //     id: rowData.id
      //   },
      //   this.isUpSettlement = true;
      //this.upSettlementTrue();

      this.choosedListData = rowData;
      this.sureDownPoundTitle = '提交结算'
      this.isEditSureDownPound = true;
      this.isUploadUnloadPound = true;
      this.isShowAccountCheck = true;
      this.isUpSettlement = true;
    },
    changeSatusBox: function(rowData) {
      //判断各种数据弹窗
      this.changeSatusShow = true;
    },
    loadingReviewSuccess: function() {
      this.$emit('searchList');
    },
    unloadingReviewSuccess: function() {
      this.$emit('searchList');
    },
    refuseSuccess: function() {
      this.$emit('searchList');
    }
  },
  created() {
    if (this.expandStatus) {
      this.ListData.forEach((item) => {
        this.returnId.push(item.id)
      });
    }
  },
  watch: {
    changeStatusParam: {
      handler(val, oldVal) {
        var sendData = {};
        var vm = this;
        if (val.changeStatusType == 'truck' && this.changeSatusCarList.length == 0) {
          this.seletPadding = true;
          this.$$http("searchCapacityFreeList", sendData).then((results) => {
            vm.seletPadding = false;
            if (results.data.code == 0) {
              vm.changeSatusCarList = results.data.data;
            }
          }).catch(() => {
            vm.seletPadding = false;
          });
        }
      },
      deep: true
    },
    ListData: {
      handler(val, oldVal) {
        this.expandArr();
        setTimeout(() => {
          this.ListDataSearch = true;
        })

      },
      deep: true
    },
    expandStatus: {
      handler(val, oldVal) {
        setTimeout(() => {
          this.expandArr();
        })
      },
    }
  }
}

</script>
