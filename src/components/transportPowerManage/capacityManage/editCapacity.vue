<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin: 0 0;
}

.addheadcarform {
  margin: 30px 5%;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}

#addeditHeadCarPage {
  border: 1px solid rgb(222, 222, 222);
}

.alone-insurance-form {
  border: 1px solid rgb(222, 222, 222);
  border-top: none;
  padding: 30px 30px 0 20px;
}

.insurance-form-head {
  background-color: #f1f1f1;
  height: 41px;
  line-height: 41px;
}

#addeditHeadCarPage {
  background-color: white;
}

.icon-arrow-lift {
  font-size: 35px;
  color: rgb(222, 222, 222);
  vertical-align: middle;
}

.right-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  pointer: cursor;
}

.icon-down-arrow {
  font-size: 35px;
  color: rgb(222, 222, 222);
  vertical-align: middle;
  transform: rotate(90deg);
  display: inline-block;
}

.left-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
}

.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

</style>
<template>
  <div id="addeditHeadCarPage">
    <el-container>
      <el-header style="margin-top:15px;height:80px">
        <el-row>
          <el-col :span="1" class="left-arrow-d"><i class="icon-down-arrow" v-on:click="goDetail"></i></el-col>
          <el-col :span="22">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-loading="pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <!-- <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp1" :rules="rules" :model="headCarFormStep1" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="牵引车牌:" prop="plate_number">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="headCarFormStep1.plate_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆归属:" prop="attributes">
                    <el-select v-model="headCarFormStep1.attributes" placeholder="请选择车辆归属">
                      <el-option v-for="(item,key) in selectData.ascriptionSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆所属:" prop="carrier">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.carrier.name" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="车架号:" prop="vin_number">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.vin_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发动机号:" prop="engine_number">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.engine_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆类型:" prop="vehicle_type">
                    <el-select v-model="headCarFormStep1.vehicle_type" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.carTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="品牌型号:" prop="brand">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.brand"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装备质量:" prop="total_weight">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.total_weight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="牵引车总质量:" prop="towing_weight">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.towing_weight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="外廊长:" prop="length">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.length"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊宽:" prop="width">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊高:" prop="height">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.height"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运输介质:">
                    <el-select v-model="headCarFormStep1.trans_type" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.transportTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃料类型:">
                    <el-select v-model="headCarFormStep1.fuel_type" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.fuelTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="危险品灯号:" prop="danger_product_lamp">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.danger_product_lamp"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="危险品灯号到期日期:" prop="dangerousNumDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.danger_product_due_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="气瓶编号:" prop="gas_bottle_number">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.gas_bottle_number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="压力表编号:" prop="pressureGaugeNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.pressure_gauge_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="压力表编号到期日期:" prop="pressureGaugeDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.pressure_gauge_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号1:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_1_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_1_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号2:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_2_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_2_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号3:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_3_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_3_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号4:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_4_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_4_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="success" @click="goOtherSetp('add','nextStep','addEditFormSetp1')">填写证件信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('add','out','addEditFormSetp1')">保存并退出</el-button>
              </el-col>
            </el-row> -->
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <!-- <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp2" :rules="rules" :model="headCarFormStep2" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="行驶证编号:" prop="drivingNum">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep2.license_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证发证日期:" prop="getDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep2.license_register_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证年审日期:" prop="examineDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep2.license_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运营证号:" prop="operationNum">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep2.operation_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证发证日期:" prop="operationDate" label-width="150px">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="headCarFormStep2.operation_issue_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证年审日期:" prop="examineOperationDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep2.operation_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="success" @click="goOtherSetp('update','nextStep','addEditFormSetp2')">填写保险信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('update','out','addEditFormSetp2')">保存并退出</el-button>
              </el-col>
            </el-row> -->
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'addCarHeadManage',
  data() {
    return {
      activeStep: 0,
      pageLoading: true
    }
  },
  computed: {
    capacityId: function() {
      return this.$route.query.capacityId;
    },
    titleType: function () {
      return parseInt(this.$route.query.activeStep) === 0 ? '编辑绑定挂车' : '编辑绑定人员';
    }
    // selectData: function() {
    //   return {
    //     ascriptionSelect: this.$store.state.common.selectData.truck_attributes,
    //     carTypeSelect: this.$store.state.common.selectData.tractor_vehicle_type,
    //     transportTypeSelect: this.$store.state.common.selectData.truck_trans_type,
    //     fuelTypeSelect: this.$store.state.common.selectData.tractor_fuel_type,
    //     insuranceTypeSelect: this.$store.state.common.selectData.tractor_insurance_typem,
    //     insurancMethodSelect: this.$store.state.common.selectData.truck_insurance_method
    //   }
    // }
  },
  mounted() {
  },
  methods: {
    goDetail: function(stepInfo) {
      if (this.capacityId) {
        this.$router.push({ path: "/transportPowerManage/capacityManage/capacityDetail?capacityId=" + this.capacityId });
      }
    }
  }
}

</script>
