<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin: 0 0;
}

.addTailcarform {
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
        <p>新增挂车</p>
      </el-header>
      <el-main>
        <el-steps :active="activeStep" align-center finish-status="success">
          <el-step title="步骤1" description="基础信息填写"></el-step>
          <el-step title="步骤2" description="证件信息填写"></el-step>
          <el-step title="步骤3" description="保单信息填写"></el-step>
          <el-step title="步骤4" description="其他信息填写"></el-step>
        </el-steps>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form class="addTailcarform" label-width="100px" ref="addEditFormSetp1" :rules="rules" :model="tailCarFormStep1" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="挂车牌:" prop="headCarNum">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="tailCarFormStep1.headCarNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆归属:" prop="carAscription">
                    <el-select v-model="tailCarFormStep1.carAscription" placeholder="请选择车辆归属">
                      <el-option v-for="(item,key) in selectData.ascriptionSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆所属:" prop="carBelonged">
                    <el-input placeholder="请输入" type="text" v-model="tailCarFormStep1.carBelonged"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="车架号:" prop="frameNum">
                    <el-input placeholder="请输入" type="text" v-model="tailCarFormStep1.frameNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆类型:" prop="carType">
                    <el-select v-model="tailCarFormStep1.carType" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.carTypeSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="品牌型号:">
                    <el-input placeholder="请输入" type="text" v-model="tailCarFormStep1.brandModel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="核定载质量:">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep1.equipmentWeight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="罐体容积:" prop="headCarWeight">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep1.volume"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="外廊长:">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep1.carlength"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊宽:">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep1.carwideth"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊高:" prop="headCarWeight">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep1.headCarheight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运输介质:">
                    <el-select v-model="tailCarFormStep1.transportType" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.transportTypeSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆注册日期:">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep1.carRegisterDate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
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
            <el-form class="addTailcarform" label-width="100px" ref="addEditFormSetp2" :rules="rules" :model="tailCarFormStep2" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="行驶证编号:" prop="drivingNum">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep2.drivingNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证发证日期:" prop="getDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep2.getDrivingDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证年审日期:" prop="examineDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep2.examineDrivingDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运营证号:" prop="operationNum">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep2.operationNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证发证日期:" prop="operationDate" label-width="150px">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="tailCarFormStep2.operationDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证年审日期:" prop="examineOperationDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep2.examineOperationDate" style="width: 100%;"></el-date-picker>
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
            <el-form class="addTailcarform" label-width="100px" :rules="rules" :model="tailCarFormStep3" status-icon :label-position="'left'" ref="addInsuanceFrom">
              <el-row class="insurance-form-head">
                <el-col :span="22" style="padding-left:10px;">保单填写</el-col>
                <el-col :span="2" style="text-align:right;">
                  <el-button @click="addInsuranceListForm">新增</el-button>
                </el-col>
              </el-row>
              <div v-for="(item,key) in tailCarFormStep3.insuranceList" class="alone-insurance-form">
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="保险类型:" prop="insuranceType">
                      <el-select v-model="item.insuranceType">
                        <el-option v-for="(insurance,insuranceKey) in selectData.insuranceTypeSelect" :label="insurance.value" :value="insurance.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保单号:" prop="getDrivingDate">
                      <el-input placeholder="请输入" type="text" v-model="item.insuranceNum"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入保公司:" prop="examineDrivingDate" l>
                      <el-input placeholder="请输入" type="text" v-model="item.insuranceCompany"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="入保日期:" prop="buyInsuranceDate">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.buyInsuranceDate" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="到期日期:">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.lastInsuranceDate" style="width: 100%;" @change="changelastDate('addInsuanceFrom',key)"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" style="font-size:32px;text-align:right;" v-if="tailCarFormStep3.insuranceList.length>1">
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
                <el-button type="primary" @click="goOtherSetp('success')">下一步</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==3">
            <el-form class="addTailcarform" label-width="160px" ref="addEditFormSetp2" :rules="rules" :model="tailCarFormStep4" status-icon :label-position="'left'">
              <el-row :gutter="82">
                <el-col :span="12">
                  <el-form-item label="罐检报告编号:" prop="potNum">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep4.potInspectNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="罐检检验日期:" prop="getDrivingDate">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep4.potInspectDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="12">
                  <el-form-item label="压力容器证编号:" prop="operationNum">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep4.pressureContainerNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="压力容器检验日期:" prop="operationDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="tailCarFormStep4.pressureContainerDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="success" @click="goOtherSetp('add')">完成</el-button>
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
      tailCarFormStep1: {
        headCarNum: "", //挂车排
        carAscription: "1", //车辆归属
        carBelonged: "胜通物流有限公司", //车辆所属
        frameNum: "", //车架号
        carType: "1", //车辆类型
        brandModel: "", //品牌型号
        equipmentWeight: "", //质量
        volume: "", //灌装容积
        carlength: "", //长
        carwideth: "", //宽
        headCarheight: "", //高
        transportType: "1", //运输介质
        carRegisterDate: "", //车辆注册日期

      },
      tailCarFormStep2: {
        drivingNum: "", //驾驶行驶证编号
        examineDrivingDate: "", //发证日期
        getDrivingDate: "", //运营年审日期
        operationNum: "", //运营号
        operationDate: "", //运营证发布日期
        examineOperationDate: "", //行驶证年审日期
      },
      tailCarFormStep3: {
        insuranceList: [{
          insuranceType: "", //保险类型
          insuranceNum: "", //保单号
          insuranceCompany: "", //入保公司
          buyInsuranceDate: "", //入保日期
          lastInsuranceDate: "" //到期日期
        }]
      },
      tailCarFormStep4: {
        potInspectNum: "", //运营年审日期
        potInspectDate: "", //运营号
        pressureContainerNum: "", //运营证发布日期
        pressureContainerDate: "", //行驶证年审日期
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
      this.tailCarFormStep3.insuranceList.push({
        insuranceType: "",
        insuranceNum: "",
        insuranceCompany: "",
        buyInsuranceData: "",
        lastInsuranceData: ""
      })
    },
    deleteInsuranceFrom: function(index) {
      if (this.tailCarFormStep3.insuranceList.length > 1) {
        this.tailCarFormStep3.insuranceList = this.tailCarFormStep3.insuranceList.splice(index, 1);
      }
    },
    changelastDate: function(addInsuanceFrom, index) {
      var startTime = this.tailCarFormStep3.insuranceList[index].buyInsuranceDate;
      var endTime = this.tailCarFormStep3.insuranceList[index].lastInsuranceDate;
      if (startTime != "" && endTime > startTime) {
        this.$refs[addInsuanceFrom].fields[4 + index * 5].error = "到期日期不能小于入保时间";
      }
    }
  }
}

</script>
