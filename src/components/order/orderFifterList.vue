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
    }
    .el-table__expanded-cell[class*=cell] {
      padding-left: 0;
      padding-right: 0;
    }
    td {
      border-bottom: 0px solid #ebeef5;
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
    .expanded td {
      text-align: center
    }
    .el-table__row {
      position: relative;
    }
    .el-table__row td:nth-child(1) .cell {
      padding-left: 40px;
    }
    .el-table__expanded-cell[class*=cell] {
      padding: 16px 0;
    }
  }
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

</style>
<template>
  <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandFalg" :row-key="getRowKeys" v-loading="pageLoading" size="medium" height="550">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div class="listDetalis" style="width:75%;padding-left:48px;">
          <el-row class="loadInfo commh" style="width:100%;">
            <el-col :span="7" class="colinfo">装:<span>{{props.row.fluid_name}}</span><i class="el-icon-location primary"></i>
            </el-col>
            <el-col :span="3" class="colinfo">{{props.row.standard_mile}}km
            </el-col>
            <el-col :span="4" class="colinfo">{{props.row.plan_time.split(" ")[0]}}</br>{{props.row.plan_time.split(" ")[1]}}
            </el-col>
            <el-col :span="4" class="colinfo">无
            </el-col>
            <el-col :span="3" class="colinfo">{{props.row.plan_tonnage}}
            </el-col>
            <el-col :span="3" class="colinfo">无
            </el-col>
          </el-row>
          <el-row class="loadInfo commh" style="width:100%;" v-for="(item,key) in props.row.destination">
            <el-col :span="7" class="colinfo">
              卸:<span>{{item}}</span><i class="el-icon-location primary"></i>
            </el-col>
          </el-row>
        </div>
        <div class="listDetalis carList" style="width:15%">
          <el-row style="width:80%;" class="commh">
            <el-col>需求车数:{{props.row.require_car_number}}辆</el-col>
          </el-row>
          <el-row style="width:80%;" class="commh">
            <el-col>提交车数:{{props.row.submit_car_number}}辆</el-col>
          </el-row>
          <el-row style="width:80%;" class="commh">
            <el-col>确认车数:{{props.row.sure_car_number}}辆</el-col>
          </el-row>
        </div>
        <div class="listDetalis opButton" style="width:9%">
          <el-row v-if="props.row.status.key=='appoint'">
            <el-col>
              <el-button type="primary" size="mini" plain @click="operation('addCar',props.row)">添加车辆</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="props.row.status.key=='determine'||props.row.status.key=='confirmed'">
              <el-button type="success" size="mini" plain @click="operation('changePlan',props.row)">修改计划</el-button>
            </el-col>
          </el-row>
          <el-row v-if="props.row.status.key=='appoint'">
            <el-col>
              <el-button type="primary" size="mini" @click="operation('upPlan',props.row)">提交计划</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="props.row.status.key=='determine'||props.row.status.key=='confirmed'">
              <el-button type="primary" size="mini" @click="operation('showDetalis',props.row)">查看详情</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="clear:both"></div>
      </template>
    </el-table-column>
    <el-table-column label="装卸地" prop="id" min-width="21.875%" type>
      <template slot-scope="props">
        <div>
          <el-row justify="space-between" type="flex">
            <el-col :span="5">
              <el-button type="text" style="height:0px;line-height:0px;" @click="gotoOrderDetalis(props.row)">订单号:{{props.row.order_number}}</el-button>
            </el-col>
            <el-col :span="5"> 托运方:{{props.row.trader}}</el-col>
            <el-col :span="5">标准运费:{{props.row.yunfei}}</el-col>
            <el-col :span="5">
              <el-tooltip :content="props.row.mark" placement="top" effect="light">
                <el-button style="height:0px;line-height:0px;" type="text">备注<i class="el-icon-document"></i></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="4"> 状态:{{props.row.status.verbose}}
            </el-col>
          </el-row>
          <div style="position: absolute;height:60px;width:15px;background-color:white;left:-48px;top:0"></div>
          <div style="position: absolute;height:60px;width:15px;background-color:white;right:0;top:0"></div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="标准里程" prop="carry_type_info.carry_name" min-width="9.375%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="计划时间" prop="carriers.supplier_name" min-width="12.5%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="实际时间" prop="discount_price" min-width="12.5%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="计划吨位" min-width="9.375%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="实际吨位" prop="" min-width="9.375%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="车辆信息" prop="" min-width="15%">
    </el-table-column>
    <el-table-column label="操作" prop="" min-width="13%">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'orderFifterList',
  data() {
    return {
      expandStatus: true,
      pageLoading: false,
      expandFalg: true
    };
  },
  props: {
    ListData: {
      type: Array,
      default: []
    }
  },
  computed: {
    expandArr: function() {
      var returnId = [];
      if (this.ListData[0]) {
        returnId.push(this.ListData[0].id);
      }
      return returnId;
    }
  },
  methods: {
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return [1, 8];
      }
    },
    getRowKeys: function(row) {
      return row.id;
    },
    gotoOrderDetalis: function(row) {
      var type = "";
      if (row.status.key == 'appoint') {
        type = 'add';
      } else {
        type = 'edit';
      }
      this.$router.push({ path: `/orders/pickupOrders/orderDetail/orderDetailTab/${row.id}/${type}` });
    },
    operation: function(type, rowData) {
      var vm = this;
      if (type == "addCar") {
        //传入一个订单号跳转订单详情-车辆指派页面
        this.$router.push({ path: `/orders/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${rowData.id}/add` });
        
        this.upPlanMethod();
      } else if (type == 'changePlan') {
        this.$router.push({ path: `/orders/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${rowData.id}/edit` });
        //传入一个订单号跳转订单详情-车辆指派页面
      } else if (type == 'showDetalis') {
        //传入一个订单号跳转订单详情-车辆指派页面
        var type = "";
        if (rowData.status.key == 'appoint') {
          type = 'add';
        } else {
          type = 'edit';
        }
        this.$router.push({ path: `/orders/pickupOrders/orderDetail/orderDetailTab/${rowData.id}/${type}` });
        //vm.$emit("refreshList",'determine');
      } else if (type == 'upPlan') {
        var sendData = {
          delivery_order_id: rowData.id
        }
        if (rowData.submit_car_number == 0) {
          vm.$confirm('提交车辆不能为零哦,请你先添加车辆', '请注意', {
            confirmButtonText: '确认',
            showCancelButton: false,
            type: 'warning',
            center: true,
          }).then(() => {

          })
        } else {
          vm.pageLoading = true;
          this.$$http("upOrderPlan", sendData).then((results) => {
            vm.pageLoading = false;
            if (results.data.code == 0) {
              this.$message({
                message: '提交计划成功',
                type: 'success'
              });

            }

            vm.$emit("refreshList",'determine');
          }).catch(() => {
            vm.pageLoading = false;
          });
        }

      }
    },
    upPlanMethod: function() {
      //判断各种数据弹窗
    }
  },
  created() {

  }
};

</script>
