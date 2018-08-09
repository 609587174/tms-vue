<style scoped lang="less">
.listTableAll {
  text-align: left;
  font-size:12px;
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
      font-size:12px;
      height:25px;
      padding:5px 0;
      .el-table th.is-leaf {
        border-top: none;
      }
    }
    .colinfo {
      float: left;
      height: 30px;
      line-height: 30px;
      font-size:10px;
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
  display: inline-block;
  font-size:12px;
}

.el-icon-location {
  cursor: pointer;
}

#map-container {
  height: 400px;
  width: 100%;
}
.listDetalis .el-row{
  margin-top:10px;
}
.listDetalis>div:nth-child(1){
  margin-top:0px;
}
</style>
<template>
  <div style="position:relative;font-size: 10px;" >
    <noData v-if="ListData.length==0&&ListDataSearch"></noData>
    <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod"  :row-key="getRowKeys" @expand-change="changeExpand" ref="tableConList" height="500">
      <el-table-column type="expand">
      <template slot-scope="props">
      <div style="width:90%;float:left;padding-left:45px;font-size:12px;">
        <div v-if="expendShowConfig[props.row.status.key]=='loadExtend'" style="margin:10px 0;">
          <el-row style="margin-top:5px;">
              <el-col :span="4">
                订单号: {{props.row.delivery_order.order_number}}
              </el-col>
              <el-col :span="4">
                液厂地址: <span v-if="props.row.delivery_order.fluid_address&&props.row.delivery_order.fluid_address.length<10">{{props.row.delivery_order.fluid_address}}</span>
                <el-tooltip v-else class="item" effect="dark" :content="props.row.delivery_order.fluid_address" placement="top-start">
                  <span>{{props.row.delivery_order.fluid_address.slice(0,8)}}....</span>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                实际液厂: <span v-if="props.row.delivery_order.fluid&&props.row.delivery_order.fluid.length<10">{{props.row.delivery_order.fluid}}</span>
                <el-tooltip v-else class="item" effect="dark" :content="props.row.delivery_order.fluid" placement="top-start">
                  <span>{{props.row.delivery_order.fluid.slice(0,8)}}....</span>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                车号: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
                <span v-else>无</span>
              </el-col>
              <el-col :span="4">
                主驾: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span>
              </el-col>
              <el-col :span="4">
                主驾电话: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="4">
                卸货区域: {{props.row.require_car_number}}
              </el-col>
              <el-col :span="4">
                挂车号: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.semitrailer">{{props.row.transPowerInfo.semitrailer.plate_number}}</span>
                <span v-else>无</span>
              </el-col>
              <el-col :span="4">
                车队: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.group&&props.row.transPowerInfo.group.group_name">{{props.row.transPowerInfo.group.group_name}}</span>
              </el-col>
            </el-row>
          </div>
          <div v-if="expendShowConfig[props.row.status.key]=='matchExtend'">
            <el-row style="margin-top:5px;">
              <el-col :span="4">
                装货地: <span v-if="props.row.delivery_order.fluid_address&&props.row.delivery_order.fluid_address.length<10">{{props.row.delivery_order.fluid_address}}</span>
                <el-tooltip v-else class="item" effect="dark" :content="props.row.delivery_order.fluid_addres" placement="top-start">
                  <span>{{props.row.delivery_order.fluid_addres.slice(0,8)}}....</span>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                计划装车时间: {{props.row.pick_active_time}}
                </el-tooltip>
              </el-col>
               <el-col :span="4">
                实际装车时间: {{props.row.pick_active_time}}
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                实际装车吨位: {{props.row.pick_active_tonnage}}<el-button style="line-height:0px;height:0px" type="text" @click="showPound">(查看榜单)</el-button>
              </el-col>
              <el-col :span="4">
                主车:  <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.group&&props.row.transPowerInfo.group.group_name">{{props.row.transPowerInfo.group.group_name}}</span>
              </el-col>
               <el-col :span="4">
                主驾: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
              </el-col>
            </el-row>
          </div>
          <div v-if="expendShowConfig[props.row.status.key]=='unloadExtend'">
            <el-row style="margin-top:5px;">
              <el-col :span="4">
                装货地: <span v-if="props.row.delivery_order.fluid_address&&props.row.delivery_order.fluid_address.length<10">{{props.row.delivery_order.fluid_address}}</span>
                <el-tooltip v-else class="item" effect="dark" :content="props.row.delivery_order.fluid_addres.fluid" placement="top-start">
                  <span>{{props.row.delivery_order.fluid_addres.slice(0,8)}}....</span>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                实际装车时间: {{props.row.pick_active_time}}
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                实际装车吨位: {{props.row.pick_active_tonnage}}<el-button style="line-height:0px;height:0px" type="text" @click="showPound">(查看榜单)</el-button>
              </el-col>
              <el-col :span="4">
                车号:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
                <span v-else>无</span>
              </el-col>
              <el-col :span="4">
                主驾: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
              </el-col>
               <el-col :span="4">
                车队: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.group&&props.row.transPowerInfo.group.group_name">{{props.row.transPowerInfo.group.group_name}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="4">
                卸货站: {{props.row.business_order.station}}
              </el-col>
              <el-col :span="4">
                卸货地: <span v-if="props.row.business_order.station_address.length<10">{{props.row.business_order.station_address}}</span>
                <el-tooltip v-else class="item" effect="dark" :content="props.row.business_order.station_address" placement="top-start">
                  <span>{{props.row.business_order.station_address.slice(0,8)}}....</span>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                实际卸车吨位: {{props.row.active_tonnage}}
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                实际卸货时间: {{props.row.active_time}}
              </el-col>
              <el-col :span="4">
                实际到站时间: 2017-08-06 23:59:59</span>
              </el-col>
              <el-col :span="4">
                离站时间: 2017-08-06 23:59:59</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="4">
                标准里程: {{props.row.standard_mile}}km
              </el-col>
              <el-col :span="4">
                实际里程: 0km
              </el-col>
              <el-col :span="4">
                下单人: {{props.row.active_tonnage}}
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                下单人电话: {{props.row.active_time}}
              </el-col>
            </el-row>
          </div>
        </div>
         <div class="listDetalis opButton" style="width:100px;float:right;padding-left:10px;" >
          <el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key" v-if="props.row.interrupt_status.key=='normal'" type="flex" align="middle" style="    height: 64px;">
            <el-col>
              <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
            </el-col>
          </el-row>
          <el-row v-if="props.row.interrupt_status.key!='normal'" v-for="(item,key) in buttonModyfiyAll[props.row.interrupt_status.key]" :key="key" type="flex" style="    height: 64px;">
            <el-col>
              <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="clear:both"></div>
      </template>
      </el-table-column>
      <el-table-column label="运单号" prop="waybill.waybill_number" min-width="150">
      </el-table-column>
      <el-table-column label="装车液厂" prop="" min-width="150">
        <template slot-scope="props">
          <span style="color:rgb(97,126,253);font-weight:bold;font-size:12px;">{{props.row.delivery_order.fluid}}</span><i class="el-icon-location primary" @click="showMapDetalis('load',props.row.delivery_order.actual_fluid_id)"></i>
          </template>
      </el-table-column>
      <el-table-column label="计划装车时间" prop="" min-width="150" v-if="this.nowHead!='unloadHead'">
        <template slot-scope="props">
            <span v-if="props.row.delivery_order&&props.row.delivery_order.plan_time">{{props.row.delivery_order.plan_time}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="实际装车时间" prop="" min-width="150">
        <template slot-scope="props">
          <span v-if="props.row.pick_active_time">{{props.row.pick_active_time}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="计划装车吨位" prop="" min-width="150" v-if="this.nowHead=='loadHead'">
        <template slot-scope="props">
          <span v-if="props.row.delivery_order&&props.row.delivery_order.plan_tonnage">{{props.row.delivery_order.plan_tonnage}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="实际装车吨位" prop="" min-width="150">
        <template slot-scope="props">
          <span v-if="props.row.delivery_order&&props.row.delivery_order.pick_active_tonnage">{{props.row.delivery_order.pick_active_tonnage}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="计划到站时间" prop="" min-width="150" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <span v-if="props.row.plan_time">{{props.row.plan_time}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="计划到站吨位" prop="" min-width="150" v-if="this.nowHead=='unloadHead'">
        <template slot-scope="props">
          <span v-if="props.row.plan_tonnage">{{props.row.plan_tonnage}}</span><span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="卸车信息" prop="" min-width="150" v-if="this.nowHead=='matchHead'">
        <template slot-scope="props">
          <span v-for="(Uitem,Uindex) in props.row.unload_trips"><span v-if="props.row.unload_trips.length>1&&Uindex!=props.row.unload_trips.length-1">{{Uitem.business_order.station}}/</span><span v-else>{{Uitem.business_order.station}}</span></span>
        </template>
      </el-table-column>
      <el-table-column label="车辆信息" prop="" min-width="150">
        <template slot-scope="props">
          <el-tooltip class="item" effect="dark"  placement="top-start">
            <div slot="content" style="width:130px;">
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
                <span v-else>无</span ></el-col>
                <el-col>押运:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.escort_staff&&props.row.transPowerInfo.escort_staff.name">{{props.row.transPowerInfo.escort_staff.name}}</span>
                <span v-else>无</span></el-col>
              </el-row>
            </div>
            <span v-if="props.row.transPowerInfo&&props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
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
                <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
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
          <el-select v-model="changeStatusParam.changeStatusFied"  placeholder="请选择" v-if="changeStatusParam.changeStatusType=='truck'||changeStatusParam.changeStatusType==''" v-loading="seletPadding">
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
  </div>
</template>
<script>
  let landmarkMap;
  let positionMark;
  import noData from '@/components/common/noData';
export default {
  name: 'orderFifterList',
   components: {
    noData: noData
  },
  data() {
    return {
      noDataObj:{
        imgUrl:require("../../assets/img/tms_no_data.png")
      },
      lockFalg: false,
      delayTime:500,
      showMap:false,
      loadPosition:{},
      ListDataSearch:false,
      fifterStatus:['driver_pending_confirmation','to_fluid','reach_fluid','loading_waiting_audit','loading_audit_failed','waiting_match','confirm_match','already_match','waiting_seal'],
      buttonModyfiyAll:{
         canceling: [{
          text: "确认取消",
          type: "danger",
          attrPlan: true,
          methods_type: "sureCancle",
        }],
        abnormal: [],
        modifying: []
      },
      tableHeadConfig:{
         'first': [{ key: 'all', value: 'loadHead' }, { key: 'driver_pending_confirmation', value: 'loadHead' }, { key: 'to_fluid', value: 'loadHead' }, { key: 'reach_fluid', value: 'loadHead' }, { key: 'loading_waiting_audit', value: 'loadHead' }, { key: 'loading_audit_failed', value: 'loadHead' }],
        'second': [{ key: 'all', value: 'matchHead' }, { key: 'waiting_match', value: 'matchHead' }, { key: 'confirm_match', value: "matchHead" }, { key: 'already_match', value: 'matchHead' }],
        'third': [{ key: 'all', value: 'unloadHead' }, { key: 'to_site', value: 'unloadHead' }, { key: 'reach_site', value: 'unloadHead' }, { key: 'unloading_waiting_audit', value: 'unloadHead' }, { key: 'unloading_audit_failed', value: 'unloadHead' }],
        'fourth': [{ key: 'all', value: 'unloadHead' }, { key: 'waiting_settlement', value: 'unloadHead' }, { key: 'in_settlement', value: 'unloadHead' }],
        'fifth': [{ key: 'all', value: 'unloadHead' }, { key: 'canceing', value: 'matchHead' }, { key: 'modifying', value: 'matchHead' }, { key: 'abnormal', value: 'loadHead' }],
        'sxith': [{ key: 'all', value: 'unloadHead' }, { key: 'finished', value: 'unloadHead' }, { key: 'canceled', value: 'unloadHead' }],
        'seven': [{ key: 'all', value: 'unloadHead' }]
      },
      expendShowConfig:{
        'driver_pending_confirmation':'loadExtend',
        'to_fluid':'loadExtend',
        'reach_fluid':'loadExtend',
        'loading_waiting_audit':'loadExtend',
        'loading_audit_failed':'loadExtend',
        'waiting_match':'matchExtend',
        'confirm_match':'matchExtend',
        'already_match':'matchExtend',
        'to_site':'unloadExtend',
        'reach_site':'unloadExtend',
        'unloading_waiting_audit':'unloadExtend',
        'unloading_audit_failed':'unloadExtend',
        'waiting_seal':'unloadExtend',
        'waiting_settlement':'unloadExtend',
        'in_settlement':'unloadExtend',
        'canceing':'matchHead',
        'modifying':'matchHead',
        'abnormal':'loadHead',
        'finished':'unloadHead',
        'canceled':'unloadHead'
      },
      buttonAll: {
        driver_pending_confirmation: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus",
        }],
        confirm_match:[{ //待匹配卸货单
          text: "查看卸货地",
          type: "success",
          methods_type: "sureUnload",
          attrPlan: true
        }],
        to_fluid: [
        {
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        waiting_seal:[
        {
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        reach_fluid: [
        {
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        loading_waiting_audit: [{
          text: "装车审核",
          type: "success",
          methods_type: "loadingEX",
          attrPlan: true
        }],
        loading_audit_failed: [],
        waiting_match: [],
        confirm_match: [{
          text: "确认卸货单",
          type: "success",
          methods_type: "sureDownOrder"
        }],
        to_site: [],
        reach_site: [],
        unloading_waiting_audit: [{
          text: "卸车审核",
          type: "primary",
          methods_type: "downEx"
        }],
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
        }],

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
    
    };
  },
  props: ['ListData','firstMenu','secondMenu'],
  computed: {
    expandArr: function() {
      var returnId = [];
      if (this.ListData[0]) {
        returnId.push(this.ListData[0].id);
      }
      return returnId;
    },
    nowHead:function(){
      var returnHead="";
      this.tableHeadConfig[this.firstMenu].forEach((item)=>{
        if(item.key==this.secondMenu){
          returnHead=item.value;
        }
      });
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
    gotoDetalis: function(rowData) {
      console.log('rowData', rowData);
      this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderDetailTab/${rowData.id}/${rowData.waybill.id}` });
    },
    showPound:function(){

    },
    showMapDetalis:function(type,id){
     var vm=this;
     if(type=="load"){
        this.$$http('getFulidDetalis',{id:id}).then((results)=>{
          if(results.data.code==0){
            vm.showMap=true;
            var pointObj=results.data.data;
            vm.loadPosition.longitude=pointObj.coordinate.longitude;
            vm.loadPosition.latitude=pointObj.coordinate.latitude;
            vm.loadPosition.position=pointObj.coordinate.address;
            //vm.openDigo(pointObj.coordinate);
          }
        }).catch(()=>{

        });
      }else if(type=="unload"){
        this.$$http('getStationDetalis',{id:id}).then((results)=>{
          if(results.data.code==0){
            vm.showMap=true;
            var pointObj=results.data.data;
            vm.loadPosition.longitude=pointObj.location.longitude;
            vm.loadPosition.latitude=pointObj.location.latitude;
            vm.loadPosition.position=pointObj.address;
            //vm.openDigo(pointObj.coordinate);
          }
        }).catch(()=>{

        });
      }
    },
    openDigo:function(obj){
      var vm=this;
      setTimeout(()=>{
        landmarkMap = new AMap.Map('map-container', {
          zoom: 10,
        });
      // /*创建点标记*/
        positionMark = new AMap.Marker({
            map:landmarkMap,
          });
         positionMark.setLabel({
            content: vm.loadPosition.position,
            offset: new AMap.Pixel(30, 0)
         });
        let lnglat = [vm.loadPosition.longitude, vm.loadPosition.latitude];
        landmarkMap.setCenter(lnglat);
        positionMark.setPosition(lnglat);
      },100);  
    },
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      
    },
    upStatus: function() {
      var sendData = {};
      var vm = this;
      if(this.changeStatusParam.changeStatusFied&&this.changeStatusParam.changeStatusType){
         sendData.content = this.changeStatusParam.changeStatusFied;
        sendData.change_type = this.changeStatusParam.changeStatusType;
        sendData.desc = this.changeStatusParam.changeSatusDesc;
        sendData.sectiontrip = this.changeStatusParam.sectiontrip;
        this.$$http("upStatus", sendData).then((results) => {
          console.log('results', results)
          vm.$emit("changeTabs", 'fifth');
          vm.changeSatusShow = false;
        }).catch(() => {

        });
      }else{

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
    operation: function(type, rowData) {
      if (type == 'changeSatus') {
        this.changeSatusBox(rowData);
        this.changeStatusParam.sectiontrip = rowData.id;
      } else if (type == 'loadingEX') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
      } else if (type == 'sureDownOrder') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
      } else if (type == 'downEx') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
      } else if (type == 'sureUnload') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
      } else if (type == 'upSettlement') {
        this.upSettlement(rowData);
      } else if (type == 'sureCancle') {

      } else if (type == 'solveFault') {

      } else if (type == 'showDetalis') { //查看详情
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderDetailTab/${rowData.id}/${rowData.waybill.id}` });
      }
    },
    upSettlement: function(rowData) {
      var sendData = {};
      var vm = this;
      sendData.id = rowData.id;

      sendData.status = "in_settlement";
      this.$$http('changeOrderStatus', sendData).then((results) => {
        if (results.data.code == 0) {
          this.$message({
            message: '提交结算成功',
            type: 'success'
          });
          vm.$emit('searchList');
        }
      }).catch(() => {

      });
    },
    changeSatusBox: function(rowData) {
      //判断各种数据弹窗
      console.log('rowData', rowData);
      this.changeSatusShow = true;
    }
  },
  created() {

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
            console.log('carList', results);
          }).catch(() => {
            vm.seletPadding = false;
          });
        }
      },
      deep: true　
    },
    ListData:{
      handler(val, oldVal) {
        
        setTimeout(()=>{
          this.ListDataSearch=true;
        })
        
      },
      deep:true
    }
  }
}

</script>
