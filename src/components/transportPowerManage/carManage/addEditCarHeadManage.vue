<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin: 0 0;
}

.addheadcarform {
  margin: 30px 5%;
  .el-input {
    width: 250px;
  }
  .el-select {
    width: 250px;
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

</style>
<template>
  <div id="addeditHeadCarPage">
    <el-container>
      <el-header style="margin-top:15px;">
        <el>
          <p>新增牵引车</p>
      </el-header>
      <el-main v-loading="pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp1" :rules="rules" :model="headCarFormStep1" status-icon :label-position="'left'">
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
                  <el-form-item label="车辆所属:" prop="carrier" v-if="headCarFormStep1.attributes=='SELF_SUPPORT'">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.carrier"></el-input>
                  </el-form-item>
                  <el-form-item label="车辆所属:" prop="carrier" v-if="headCarFormStep1.attributes=='THIRD_SUPPORT'">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.carrier"></el-input>
                  </el-form-item>
                  <el-form-item label="车辆所属:" prop="carrier" v-if="headCarFormStep1.attributes=='HIRED_SUPPORT'">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.carrier"></el-input>
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
                  <el-form-item label="品牌型号:">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.brand"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装备质量:">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.total_weight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="牵引车总质量:" prop="headCarWeight">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.towing_weight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="外廊长:">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.length"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊宽:">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊高:" prop="headCarWeight">
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
                <el-button type="success" @click="goOtherSetp('add','nextStep')">填写证件信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('add','out')">保存并退出</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp2" :rules="rules" :model="headCarFormStep2" status-icon :label-position="'left'">
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
                <el-button type="success" @click="goOtherSetp('update','nextStep')">填写保险信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('update','out')">保存并退出</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==2">
            <el-form class="addheadcarform" label-width="100px" :rules="rules" :model="headCarFormStep3" status-icon :label-position="'left'" ref="addInsuanceFromStep3">
              <el-row class="insurance-form-head">
                <el-col :span="22" style="padding-left:10px;">保单填写</el-col>
                <el-col :span="2" style="text-align:right;">
                  <el-button @click="addInsuranceListForm">新增</el-button>
                </el-col>
              </el-row>
              <div v-for="(item,key) in headCarFormStep3.tractor_insurances" :key="key" class="alone-insurance-form">
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="保险类型:" prop="insuranceType" label-width="120px">
                      <el-select v-model="item.insurance_type">
                        <el-option v-for="(insurance,insuranceKey) in selectData.insuranceTypeSelect" :key="key" :label="insurance.verbose" :value="insurance.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保单号:" prop="getDrivingDate" label-width="120px">
                      <el-input placeholder="请输入" type="text" v-model="item.insurance_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入保公司:" prop="examineDrivingDate" label-width="120px">
                      <el-input placeholder="请输入" type="text" v-model="item.insurance_company"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="入保日期:" prop="insurance_start_date" label-width="120px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.insurance_start_date" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="到期日期:" label-width="120px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.insurance_due_date" style="width: 100%;" @change="changelastDate('addInsuanceFromStep3',key)"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" style="font-size:32px;text-align:right;" v-if="headCarFormStep3.tractor_insurances.length>1">
                    <i class="el-icon-delete" style="cursor:pointer;" @click="deleteInsuranceFrom(insuranceKey)"></i>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <el-row>
              <el-col :span="6" :offse="11">
                <el-button type="primary" @click="goOtherSetp('update')">保存并且退出</el-button>
              </el-col>
            </el-row>
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
    var headCarNumVa = (rule, value, callback) => {
      if (value.match(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/)) {
        callback();
      } else {
        callback(new Error("车牌号格式为：一个汉字+6个字段，如：鲁GP8996"));
      }
    };
    var buyInsuranceDateVa = (rule, value, callback) => {
      if (new Date(value).getTime() > new Date().getTime()) {
        callback(new Error("入保时间不能大于当前时间"));
      } else {
        callback();
      }
    };
    return {
      activeStep: 0,
      pageLoading: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      headCarFormStep1: {
        plate_number: '', //车牌号
        attributes: '', //车辆归属
        carrier: '',
        vin_number: '',
        engine_number: '',
        vehicle_type: '',
        brand: '',
        total_weight: '',
        towing_weight: '',
        length: '',
        width: '',
        height: '',
        trans_type: '',
        fuel_type: 'GAS',
        danger_product_lamp: '',
        danger_product_due_date: '',
        gas_bottle_number: '',
        pressure_gauge_number: '',
        pressure_gauge_due_date: '',
        safety_valve_1_number: '',
        safety_valve_1_due_date: '',
        safety_valve_2_number: '',
        safety_valve_2_due_date: '',
        safety_valve_3_number: '',
        safety_valve_3_due_date: '',
        safety_valve_4_number: '',
        safety_valve_4_due_date: ''

      },
      headCarFormStep2: {
        license_number: '',
        license_register_date: '',
        license_verify_date: '',
        operation_number: '',
        operation_issue_date: '',
        operation_verify_date: ''

      },
      headCarFormStep3: {
        tractor_insurances: [{
          insurance_type: '',
          insurance_number: '',
          insurance_company: '',
          insurance_start_date: '',
          insurance_due_date: ''
        }]
      },
      rules: {
        plate_number: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { validator: headCarNumVa, trigger: 'blur' }
        ],
        attributes: [
          { required: true, message: '请选择车辆归属', trigger: 'blur' }
        ],
        vin_number: [
          { min: 17, max: 17, message: '车架号为17个字段，如：LZZ1CLVB6GA107016', trigger: 'blur' }
        ],
        engine_number: [
          { min: 10, max: 15, message: '发动机号为10~15个字段', trigger: 'blur' }
        ],
        vehicle_type: [
          { required: true, message: '请选择车辆类型', trigger: 'blur' }
        ],
        brandModel: [
          { min: 10, max: 20, message: '10~20个字段', trigger: 'blur' }
        ],
        danger_product_lamp: [
          { min: 10, max: 10, message: '危险品灯号由10个数值组成，如37060111-16', trigger: 'blur' }
        ],
        gas_bottle_number: [
          { required: true, message: '请填写气瓶编号', trigger: 'blur' }
        ],
        insurance_start_date: [
          { validator: buyInsuranceDateVa, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    selectData: function() {
      return {
        ascriptionSelect: this.$store.state.common.selectData.truck_attributes,
        carTypeSelect: this.$store.state.common.selectData.tractor_vehicle_type,
        transportTypeSelect: this.$store.state.common.selectData.truck_trans_type,
        fuelTypeSelect: this.$store.state.common.selectData.tractor_fuel_type,
        insuranceTypeSelect: this.$store.state.common.selectData.tractor_insurance_type
      }
    }
  },
  created() {
    console.log(this);
  },
  methods: {
    goOtherSetp: function(stepInfo, operation) {
      if (stepInfo == "add" && this.activeStep <= 1) {
        if (this.activeStep == 0) {
          this.createFrom(operation);
        } else {
          this.updateFrom(this.activeStep, operation);
        }
      } else if (stepInfo == "down" && this.activeStep >= 1) {
        this.activeStep -= 1;
      }
    },
    createFrom: function(operation) {
      var vm = this;
      vm.pageLoading = true;
      if (this.headCarFormStep1.fuel_type != "GAS") {
        this.headCarFormStep1.gas_bottle_number = '',
          this.headCarFormStep1.pressure_gauge_number = '',
          this.headCarFormStep1.pressure_gauge_due_date = '',
          this.headCarFormStep1.safety_valve_1_number = '',
          this.headCarFormStep1.safety_valve_1_due_date = '',
          this.headCarFormStep1.safety_valve_2_number = '',
          this.headCarFormStep1.safety_valve_2_due_date = '',
          this.headCarFormStep1.safety_valve_3_number = '',
          this.headCarFormStep1.safety_valve_3_due_date = '',
          this.headCarFormStep1.safety_valve_4_number = '',
          this.headCarFormStep1.safety_valve_4_due_date = ''
      };
      this.$$http('creatHeadFrom', this.headCarFormStep1).then(function(result) {
        var result = result;
        vm.pageLoading = false;
        if (operation == 'out') {
          //跳转查询详情页面
        } else {
          vm.activeStep += 1;
        }
      });
    },
    updateFrom: function(step, operation) {
      vm.pageLoading = false;
      var vm = this;
      var sendData = "";
      if (vm.activeStep == 1) {
        sendData = this.headCarFormStep2;
      } else if (vm.activeStep == 2) {
        sendData = this.headCarFormStep3;
      }
      sendData.id = "a0970083-192b-40a8-baac-ea99b9b9b1b9";
      this.$$http('upadteHeadFrom', sendData).then(function(result) {
        var result = result;
        vm.pageLoading = false;
        if (operation == 'out') {
          //跳转查询详情页面
        } else {
          vm.activeStep += 1;
        }
      });
    },
    addInsuranceListForm: function(addInsuanceFrom) {
      this.headCarFormStep3.tractor_insurances.push({
        insurance_type: "",
        insurance_number: "",
        insurance_company: "",
        insurance_start_date: "",
        insurance_due_date: ""
      })
    },
    deleteInsuranceFrom: function(index) {
      if (this.headCarFormStep3.tractor_insurances.length > 1) {
        this.headCarFormStep3.tractor_insurances = this.headCarFormStep3.tractor_insurances.splice(index, 1);
      }
    },
    changelastDate: function(addInsuanceFrom, index) {
      var startTime = this.headCarFormStep3.tractor_insurances[index].insurance_start_date;
      var endTime = this.headCarFormStep3.tractor_insurances[index].insurance_due_date;
      if (startTime != "" && endTime > startTime) {
        this.$refs[addInsuanceFrom].fields[4 + index * 5].error = "到期日期不能小于入保时间";
      }
    }
  }
}

</script>
