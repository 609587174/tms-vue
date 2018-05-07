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

</style>
<template>
  <div id="addeditHeadCarPage">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>新增牵引车</p>
      </el-header>
      <el-main>
        <el-steps :active="activeStep" align-center finish-status="success">
          <el-step title="步骤1" description="基础信息填写"></el-step>
          <el-step title="步骤2" description="证件信息填写"></el-step>
          <el-step title="步骤3" description="保单信息填写"></el-step>
        </el-steps>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp1" :rules="rules" :model="headCarForm" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="牵引车牌:" prop="headCarNum">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="headCarForm.headCarNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆归属:" prop="carAscription">
                    <el-select v-model="headCarForm.carAscription" placeholder="请选择车辆归属">
                      <el-option v-for="(item,key) in selectData.ascriptionSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆所属:" prop="carBelonged">
                    <el-input placeholder="请输入" type="text" v-model="headCarForm.carBelonged"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="车架号:" prop="frameNum">
                    <el-input placeholder="请输入" type="text" v-model="headCarForm.frameName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发动机号:" prop="EngineNum">
                    <el-input placeholder="请输入" type="text" v-model="headCarForm.EngineNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆类型:" prop="carType">
                    <el-select v-model="headCarForm.carType" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.carTypeSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="品牌型号:">
                    <el-input placeholder="请输入" type="text" v-model="headCarForm.brandModel"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装备质量:">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.equipmentWeight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="牵引车总质量:" prop="headCarWeight">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.headCarWeight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="外廊长:">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.carlength"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊宽:">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.carwideth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊高:" prop="headCarWeight">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.headCarheight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运输介质:">
                    <el-select v-model="headCarForm.transportType" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.transportTypeSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃料类型:">
                    <el-select v-model="headCarForm.fuelType" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.fuelTypeSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="危险品灯号:" prop="dangerousNum">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.dangerousNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="危险品灯号到期日期:" prop="dangerousNumDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarForm.dangerousNumDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarForm.fuelType=='1'">
                  <el-col :span="8">
                    <el-form-item label="气瓶编号:" prop="gasBottleNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarForm.gasBottleNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarForm.fuelType=='1'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarForm.safetyValveNum"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarForm.safetyValveNumDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarForm.fuelType=='1'">
                  <el-col :span="8">
                    <el-form-item label="压力表编号:" prop="pressureGaugeNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarForm.pressureGaugeNum"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="压力表编号到期日期:" prop="pressureGaugeDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarForm.pressureGaugeDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="11">
                <el-button type="primary" @click="goOtherSetp('add')">下一步</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp2" :rules="rules" :model="headCarForm" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="行驶证编号:" prop="drivingNum">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.drivingNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证发证日期:" prop="getDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarForm.getDrivingDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证年审日期:" prop="examineDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarForm.examineDrivingDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运营证号:" prop="operationNum">
                    <el-input placeholder="请输入" type="num" v-model="headCarForm.operationNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证发证日期:" prop="operationDate" label-width="150px">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="headCarForm.operationDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证年审日期:" prop="examineOperationDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarForm.examineOperationDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('add')">下一步</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==2">
            <el-form class="addheadcarform" label-width="100px" :rules="rules" :model="headCarForm" status-icon :label-position="'left'" ref="addInsuanceFrom">
              <el-row class="insurance-form-head">
                <el-col :span="22" style="padding-left:10px;">保单填写</el-col>
                <el-col :span="2" style="text-align:right;">
                  <el-button @click="addInsuranceListForm">新增</el-button>
                </el-col>
              </el-row>
              <div v-for="(item,key) in headCarForm.insuranceList" class="alone-insurance-form">
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="保险类型:" prop="insuranceType" label-width="150px">
                      <el-select v-model="item.insuranceType">
                        <el-option v-for="(insurance,insuranceKey) in selectData.insuranceTypeSelect" :label="insurance.value" :value="insurance.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保单号:" prop="getDrivingDate" label-width="150px">
                      <el-input placeholder="请输入" type="text" v-model="item.insuranceNum"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入保公司:" prop="examineDrivingDate" label-width="150px">
                      <el-input placeholder="请输入" type="text" v-model="item.insuranceCompany"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="入保日期:" prop="buyInsuranceDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.buyInsuranceDate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="到期日期:" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.lastInsuranceDate" style="width: 100%;" @change="changelastDate('addInsuanceFrom',key)"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" style="font-size:32px;text-align:right;" v-if="headCarForm.insuranceList.length>1">
                    <i class="el-icon-delete" style="cursor:pointer;" @click="deleteInsuranceFrom(insuranceKey)"></i>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="success" @click="goOtherSetp('success')">完成</el-button>
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
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      headCarForm: {
        headCarNum: "",
        carAscription: "1",
        carBelonged: "胜通物流有限公司",
        frameName: "",
        EngineNum: "",
        carType: "1",
        brandModel: "",
        equipmentWeight: "",
        headCarWeight: "",
        carlength: "",
        carwideth: "",
        headCarheight: "",
        transportType: "1",
        fuelType: "1",
        dangerousNumDate: "",
        dangerousNum: "",
        pressureGaugeDate: "",
        pressureGaugeNum: "",
        safetyValveNumDate: "",
        safetyValveNum: "",
        gasBottleNum: "",
        drivingNum: "",
        examineDrivingDate: "",
        getDrivingDate: "",
        operationNum: "",
        operationDate: "",
        examineOperationDate: "",
        insuranceList: [{
          insuranceType: "",
          insuranceNum: "",
          insuranceCompany: "",
          buyInsuranceDate: "",
          lastInsuranceDate: ""
        }]
      },
      selectData: {
        ascriptionSelect: [
          { id: "1", value: "自营车辆" },
          { id: "2", value: "三方车辆" },
          { id: "3", value: "租凭车辆" }
        ],
        carTypeSelect: [
          { id: "1", value: "重型半挂牵引车" },
          { id: "2", value: "轻型半挂牵引车" }
        ],
        transportTypeSelect: [
          { id: "1", value: "LNG" },
          { id: "2", value: "原油" },
          { id: "3", value: "普货" }
        ],
        fuelTypeSelect: [
          { id: "1", value: "气" },
          { id: "2", value: "油" }
        ],
        insuranceTypeSelect: [
          { id: "1", value: "强交险" },
          { id: "2", value: "商业险" }
        ],
      },
      rules: {
        headCarNum: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { validator: headCarNumVa, trigger: 'blur' }
        ],
        carAscription: [
          { required: true, message: '请选择车辆归属', trigger: 'blur' }
        ],
        carBelonged: [
          { required: true, message: '请填写车辆所属', trigger: 'blur' }
        ],
        frameNum: [
          { min: 17, max: 17, message: '车架号格式为：17个字段，如：LZZ1CLVB6GA107016', trigger: 'blur' }
        ],
        EngineNum: [
          { min: 10, max: 15, message: '发动机号为10~15个字段', trigger: 'blur' }
        ],
        carType: [
          { required: true, message: '请选择车辆类型', trigger: 'blur' }
        ],
        brandModel: [
          { min: 10, max: 20, message: '10~20个字段', trigger: 'blur' }
        ],
        dangerousNum: [
          { min: 10, max: 10, message: '危险品灯号由10个数值组成，如37060111-16', trigger: 'blur' }
        ],
        gasBottleNum: [
          { required: true, message: '请填写气瓶编号', trigger: 'blur' }
        ],
        buyInsuranceDate: [
          { validator: buyInsuranceDateVa, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log(this);
  },
  methods: {
    goOtherSetp: function(stepInfo) {
      if (stepInfo == "add" && this.activeStep <= 1) {
        this.activeStep += 1;
      } else if (stepInfo == "down" && this.activeStep >= 1) {
        this.activeStep -= 1;
      }
    },
    addInsuranceListForm: function(addInsuanceFrom) {
      this.headCarForm.insuranceList.push({
        insuranceType: "",
        insuranceNum: "",
        insuranceCompany: "",
        buyInsuranceData: "",
        lastInsuranceData: ""
      })
    },
    deleteInsuranceFrom: function(index) {
      if (this.headCarForm.insuranceList.length > 1) {
        this.headCarForm.insuranceList = this.headCarForm.insuranceList.splice(index, 1);
      }
    },
    changelastDate: function(addInsuanceFrom, index) {
      var startTime = this.headCarForm.insuranceList[index].buyInsuranceDate;
      var endTime = this.headCarForm.insuranceList[index].lastInsuranceDate;
      if (startTime != "" && endTime > startTime) {
        this.$refs[addInsuanceFrom].fields[4 + index * 5].error = "到期日期不能小于入保时间";
      }
    }
  }
}

</script>
