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
      background-color: rgb(250, 250, 250);
    }
    .el-table__expanded-cell[class*=cell] {
      padding-left: 0;
      padding-right: 0;
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

</style>
<template>
  <div>
    <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :expand-row-keys="expandArr" :row-key="getRowKeys" @expand-change="changeExpand">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="listDetalis" style="width:75%;padding-left:48px;">
            <div>
              <el-row class="loadInfo commh" style="width:100%;">
                <el-col :span="7" class="colinfo">装:<span>{{props.row.delivery_order.supplier_name}}</span><i class="el-icon-location primary"></i>
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
            </div>
          </div>
          <div class="listDetalis carList" style="width:15%">
            <el-row class="commh carInfo">
              <el-col>车号:<span v-if="props.row.transPowerInfo">{{props.row.transPowerInfo.tractor.plate_number}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo">
              <el-col>挂车:<span v-if="props.row.transPowerInfo"> {{props.row.transPowerInfo.semitrailer?props.row.transPowerInfo.semitrailer.plate_number: ""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo">
              <el-col>驾驶员:<span v-if="props.row.transPowerInfo">{{props.row.transPowerInfo.master_driver?props.row.transPowerInfo.master_driver.name:""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo">
              <el-col>副驾:<span v-if="props.row.transPowerInfo">{{props.row.transPowerInfo.vice_driver?props.row.transPowerInfo.vice_driver.name:""}}</span></el-col>
            </el-row>
          </div>
          <div class="listDetalis opButton" style="width:9%">
            <el-row v-for="(item,key) in buttonAll[props.row.status.key]">
              <el-col>
                <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>
          </div>
          <div style="clear:both"></div>
        </template>
      </el-table-column>
      <el-table-column label="装卸地" prop="delivery_order.order_number" min-width="21.875%" type>
        <template slot-scope="props">
          <el-row justify="space-between" type="flex">
            <el-col :span="4">订单号:{{props.row.delivery_order.order_number}}</el-col>
            <el-col :span="4">
              <el-button style="height:0;line-height:0;" type="text" @click="gotoDetalis(props.row)">运单号:{{props.row.waybill.waybill_number}}</el-button>
            </el-col>
            <el-col :span="4" v-if="1==0">卸货单号:{{props.row.order_number}}</el-col>
            <el-col :span="4">托运商:{{props.row.delivery_order.trader}}</el-col>
            <el-col :span="3">标准运费:</el-col>
            <el-col :span="2">
              <el-tooltip :content="props.row.delivery_order.mark" placement="top" effect="light">
                <el-button type="text" style="line-height: 0px;height: 0px;">备注<i class="el-icon-document"></i></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="3">状态:{{props.row.status.verbose}}</el-col>
          </el-row>
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
          <el-select v-model="changeStatusParam.changeStatusFied" filterable placeholder="请选择变更类型" v-if="changeStatusParam.changeStatusType=='truck'" v-loading="seletPadding">
            <el-option v-for="(item,key) in changeSatusCarList" :key="key" :label="item.plate_number" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="changeStatusParam.changeStatusFied" placeholder="请选择变更类型" v-else filterable>
            <el-option v-for="(item,key) in changeSatusPerList" :key="key" :label="item.name" :value="item.id"></el-option>
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
  </div>
</template>
<script>
export default {
  name: 'orderFifterList',
  data() {
    return {
      lockFalg: false,
      buttonAll: {
        driver_pending_confirmation: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        to_fluid: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        reach_fluid: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        loading_waiting_audit: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }, {
          text: "装车审核",
          type: "success",
          methods_type: "loadingEX",
          attrPlan: true
        }],
        loading_audit_failed: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        waiting_match: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        already_match: [{
          text: "确认卸货单",
          type: "success",
          methods_type: "sureDownOrder"
        }],
        to_site: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        reach_site: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        unloading_waiting_audit: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }, {
          text: "卸车审核",
          type: "primary",
          methods_type: "downEx"
        }],
        unloading_audit_failed: [{
          text: "变更",
          type: "primary",
          methods_type: "changeSatus"
        }],
        waiting_settlement: [{
          text: "调整数据",
          type: "success",
          methods_type: "changeData",
          attrPlan: true
        }, {
          text: "提交结算",
          type: "primary",
          methods_type: "upSettlement",
        }],

        in_settlement: [],
        finished: [],
        canceled: [],
        canceling: [{
          text: "确认取消",
          type: "danger",
          attrPlan: true,
          methods_type: "sureCancle",
        }],
        abnormal: [{
          text: "故障解决",
          type: "success",
          methods_type: "solveFault",
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
        { key: 'truck', verbose: "车辆故障需替换" },
        { key: 'master_driver', verbose: "驾驶员更换" },
        { key: 'copilot_driver', verbose: "押运员更换" },
        { key: 'supercargo_driver', verbose: "副驾驶更换" }
      ],
      changeSatusCarList: [],
      changeSatusPerList: [],
      seletPadding: false
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
  mounted() {

  },
  methods: {
    gotoDetalis: function(rowData) {
      console.log('rowData', rowData);
      this.$router.push({ path: `/orders/consignmentOrders/orderDetail/orderDetailTab/${rowData.waybill.id}` });
    },
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return [1, 8];
      }
    },
    upStatus: function() {
      var sendData = {};
      var vm = this;

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
    },
    getRowKeys: function(row) {
      return row.id;
    },
    changeExpand: function(row, expandedRows) {
      console.log('row', row);
      console.log('expandedRows', expandedRows);
      var vm = this;
      if (row.transPowerInfo) {} else {
        var sendData = {};
        sendData.id = row.capacity;
        vm.$$http("getTransPowerInfo", sendData).then((transPowerInfo) => {
          if (transPowerInfo.data.code == 0) {
            row.transPowerInfo = transPowerInfo.data.data;
          }
        }).catch(() => {

        });
      }
    },
    operation: function(type, rowData) {
      if (type == 'changeSatus') {
        this.changeSatusBox(rowData);
        this.changeStatusParam.sectiontrip = rowData.id;
      } else if (type == 'loadingEX') {

      } else if (type == 'sureDownOrder') {

      } else if (type == 'downEx') {

      } else if (type == 'changeData') {

      } else if (type == 'upSettlement') {
        this.upSettlement(rowData);
      } else if (type == 'sureCancle') {

      } else if (type == 'solveFault') {

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
          sendData.pagination = false;
          this.seletPadding = true;
          this.$$http("searchHeadCarList", sendData).then((results) => {
            vm.seletPadding = false;
            if (results.data.code == 0) {
              vm.changeSatusCarList = results.data.data;
            }
            console.log('carList', results);
          }).catch(() => {
            vm.seletPadding = false;
          });
        }
        if (val.changeStatusType != 'truck' && this.changeSatusPerList.length == 0) {
          sendData.pagination = false;
          this.seletPadding = true;
          this.$$http("getDriversList", sendData).then((results) => {
            vm.seletPadding = false;
            if (results.data.code == 0) {
              vm.changeSatusPerList = results.data.data;
            }
            console.log('PerList', results);
          }).catch(() => {
            vm.seletPadding = false;
          });
        }
      },
      deep: true　
    }
  }
}

</script>
