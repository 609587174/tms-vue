<style scoped lang="less">
.listTableAll {
  text-align: center;
}

.el-table {
  /deep/ .el-table__header-wrapper tr th .cell {
    text-align: center;
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
     td {
      border-bottom: 0px solid #ebeef5;
      .el-table th.is-leaf{
        border:none;
      }
    }
    .listDetalis {
      float: left;
      text-align: center;
    }
    .colinfo {
      float: left;
      height: 30px;
      line-height: 30px;
    }
    .el-icon-location {
      font-size: 15px;
      margin-left: 5px;
      color: #409eff;
    }
    .carList .el-col {
      height: 25px;
      line-height: 25px;
    }
    .opButton .el-row {
      margin-top: 5px;
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
.whiteSpan{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}
.el-icon-location{
  cursor:pointer;
}
#map-container {
  height: 400px;
  width: 100%;
}
</style>
<template>
  <div style="position:relative;">
    <noData :noDataObj="noDataObj" v-if="ListData.length==0&&ListDataSearch"></noData>
    <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandFalg"  :row-key="getRowKeys" @expand-change="changeExpand" height="500">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="listDetalis" style="width:75%;padding-left:48px;">
            <div>
              <el-row class="loadInfo commh" style="width:100%;">
                <el-col :span="7" class="colinfo">装:<span style="color:rgb(97,126,253);font-weight:bold;font-size:16px;">{{props.row.delivery_order.fluid}}</span><i class="el-icon-location primary" @click="showMapDetalis('load',props.row.delivery_order.actual_fluid_id)"></i>
                </el-col>
                <el-col :span="3" class="colinfo">
                </el-col>
                <el-col :span="4" class="colinfo">{{props.row.delivery_order.plan_time.split(" ")[0]}}</br>{{props.row.delivery_order.plan_time.split(" ")[1]}}
                </el-col>
                <el-col :span="4" class="colinfo"><span v-if="props.row.pick_active_time">{{props.row.pick_active_time.split(" ")[0]}}</br>{{props.row.pick_active_time.split(" ")[1]}}</span><span v-else>无</span>
                </el-col>
                <el-col :span="3" class="colinfo">{{props.row.delivery_order.plan_tonnage}}
                </el-col>
                <el-col :span="3" class="colinfo"><span v-if="props.row.pick_active_tonnage">{{props.row.pick_active_tonnage}}</span><span v-else>无</span>
                </el-col>
              </el-row>
               <el-row class="loadInfo commh" style="width:100%;margin-top:30px;" v-if="!(fifterStatus.indexOf(props.row.status.key)>-1)&&props.row.section_type.key=='unload'">
                <el-col :span="7" class="colinfo">卸:<span style="color:rgb(73,210,208);font-weight:bold;font-size:16px;">{{props.row.business_order.station}}</span><i class="el-icon-location primary" @click="showMapDetalis('unload',props.row.business_order.map_postion)"></i>
                </el-col>
                <el-col :span="3" class="colinfo">{{props.row.standard_mile}}km
                </el-col>
                <el-col :span="4" class="colinfo">{{props.row.plan_time.split(" ")[0]}}</br>{{props.row.plan_time.split(" ")[1]}}
                </el-col>
                <el-col :span="4" class="colinfo"><span v-if="props.row.active_time">{{props.row.active_time.split(" ")[0]}}</br>{{props.row.active_time.split(" ")[1]}}</span><span v-else>无</span>
                </el-col>
                <el-col :span="3" class="colinfo">{{props.row.plan_tonnage}}
                </el-col>
                <el-col :span="3" class="colinfo"><span v-if="props.row.active_tonnage">{{props.row.active_tonnage}}</span><span v-else>无</span>
                </el-col>
              </el-row>
              <el-row v-if="props.row.status.key=='confirm_match'" style="width:100%;margin-top:30px;">
                <el-col :span="7" class="colinfo">
                  已经匹配卸货单,<el-button style="padding-left:0" type="text" @click="operation('sureDownOrder',props.row)">前往确认</el-button>
                </el-col>
             </el-row>

             <el-row v-if="props.row.status.key=='already_match'" style="width:100%;margin-top:30px;">
                <el-col :span="7" class="colinfo">
                  已经确认卸货单,<el-button style="padding-left:0" type="text" @click="operation('sureDownOrder',props.row)">前往查看</el-button>
                </el-col>
             </el-row>

            </div>
          </div>
          <div class="listDetalis carList" style="width:15%">
            <el-row class="commh carInfo" >
              <el-col class="whiteSpan"  v-if="props.row.transPowerInfo.tractor" >车号:<span :title="props.row.transPowerInfo.tractor.plate_number">{{props.row.transPowerInfo.tractor.plate_number}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo " >
              <el-col class="whiteSpan"  v-if="props.row.transPowerInfo.semitrailer">挂车:<span :title="props.row.transPowerInfo.semitrailer?props.row.transPowerInfo.semitrailer.plate_number: ''"> {{props.row.transPowerInfo.semitrailer?props.row.transPowerInfo.semitrailer.plate_number: ""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo ">
              <el-col class="whiteSpan"   v-if="props.row.transPowerInfo.master_driver" >驾驶员:<span :title="props.row.transPowerInfo.master_driver?props.row.transPowerInfo.master_driver.name:''">{{props.row.transPowerInfo.master_driver?props.row.transPowerInfo.master_driver.name:""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo " >
              <el-col class="whiteSpan"  v-if="props.row.transPowerInfo.vice_driver" >副驾:<span :title="props.row.transPowerInfo.vice_driver?props.row.transPowerInfo.vice_driver.name:''">{{props.row.transPowerInfo.vice_driver?props.row.transPowerInfo.vice_driver.name:""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo " >
              <el-col class="whiteSpan" v-if="props.row.transPowerInfo.escort_staff"  >押运:<span :title="props.row.transPowerInfo.escort_staff?props.row.transPowerInfo.escort_staff.name:''">{{props.row.transPowerInfo.escort_staff?props.row.transPowerInfo.escort_staff.name:""}}</span></el-col>
            </el-row>
          </div>
          <div class="listDetalis opButton" style="width:9%">
            <el-row v-for="(item,key) in buttonAll[props.row.status.key]" v-if="props.row.interrupt_status.key=='normal'">
              <el-col >
               <el-tooltip class="item" effect="dark" content="该运单申请取消中" placement="top-start" v-if="props.row.waybill.change_status.key=='canceled'">
                  <el-button :type="item.type" :plan="item.attrPlan" size="mini"  class="is-disabled"> {{item.text}}</el-button>
                </el-tooltip>
                <el-button v-else :type="item.type" :plan="item.attrPlan"  size="mini" @click="operation(item.methods_type,props.row)" >{{item.text}}</el-button>
              </el-col>
            </el-row>
            <el-row  v-if="props.row.interrupt_status.key!='normal'" v-for="(item,key) in buttonModyfiyAll[props.row.interrupt_status.key]">
              <el-col >
                <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)" >{{item.text}}</el-button>
              </el-col>
           </el-row>
          </div>
          <div style="clear:both"></div>
        </template>
      </el-table-column>
      <el-table-column label="装卸地" prop="delivery_order.order_number" min-width="21.875%" type>
        <template slot-scope="props">
          <el-row justify="space-between" type="flex">
            <el-col :span="4" :title="props.row.delivery_order.order_number" class="whiteSpan">订单号:{{props.row.delivery_order.order_number}}</el-col>
            <el-col :span="4" :title="props.row.waybill.waybill_number" class="whiteSpan">
              <a style="color:#409EFF" @click="gotoDetalis(props.row)"><span style="cursor:pointer;">运单号:{{props.row.waybill.waybill_number}}</span></a>
            </el-col>
            <el-col :span="4" :title="props.row.business_order.order_number||'无'" class="whiteSpan" >
              卸货单号:<span v-if="props.row.business_order.order_number">{{props.row.business_order.order_number}}</span><span v-else>无</span>
            </el-col>
            <el-col :span="4" :title="props.row.delivery_order.trader" class="whiteSpan">托运商:{{props.row.delivery_order.trader}}</el-col>
            <el-col :span="4" class="whiteSpan">标准运价:<span v-if="props.row.initial_price>0">{{props.row.initial_price}}元+</span><span>{{props.row.change_rate?props.row.change_rate:0}}元/吨/公里</span></el-col>
            <el-col :span="2">
              <el-tooltip :content="props.row.delivery_order.mark||'暂无备注'" placement="top" effect="light" :open-delay="delayTime">
                <el-button type="text" style="line-height: 0px;height: 0px;">备注<i class="el-icon-document"></i></el-button>
              </el-tooltip>
            </el-col>
            <el-col class="whiteSpan" :span="3" :title="props.row.status.verbose">状态:
             <span v-if="props.row.interrupt_status.key=='canceling'||props.row.interrupt_status.key=='modifying'||props.row.interrupt_status.key=='abnormal'">{{props.row.interrupt_status.verbose}}</span>
            <span v-else>{{props.row.status.verbose}}</span>
          </el-col>
          </el-row>
           <!-- <div style="position: absolute;height:60px;width:15px;background-color:white;left:-48px;top:0"></div>
          <div style="position: absolute;height:60px;width:15px;background-color:white;right:0;top:0"></div> -->
        </template>
      </el-table-column>
      <el-table-column label="标准里程" prop="" min-width="9.375%">
      </el-table-column>
      <el-table-column label="计划时间" prop="" min-width="12.5%">
      </el-table-column>
      <el-table-column label="实际时间" prop="" min-width="12.5%">
      </el-table-column>
      <el-table-column label="计划吨位" prop="" min-width="9.375%">
      </el-table-column>
      <el-table-column label="实际吨位" prop="" min-width="9.375%">
      </el-table-column>
      <el-table-column label="车辆信息" prop="" min-width="15%">
      </el-table-column>
      <el-table-column label="操作" prop="" min-width="13%">
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
      expandFalg:true,
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
      buttonAll: {
        driver_pending_confirmation: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus",
        }],
        to_fluid: [
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
  props: ['ListData'],
  computed: {
    expandArr: function() {
      var returnId = [];
      if (this.ListData[0]) {
        returnId.push(this.ListData[0].id);
      }
      return returnId;
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
      if (columnIndex === 1) {
        return [1, 8];
      }
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
      } else if (type == 'changeData') {

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
