<style scoped lang="less">
/deep/ .code {
  input {
    border-color: #dcdfe6!important;
  }
  i {
    display: none;
  }
}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header style="margin-top:15px;">
        <el-row>
          <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回列表页</span></span>
          </el-col>
          <el-col :span="20">
            <p>编辑物流数据</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">数据信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="运单号:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.waybill"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务单号:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.order"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="托运方:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.company"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="车号:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.plate_number" :disabled="isDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际液厂:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.fluid"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸货站:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.station"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">

                <el-col :span="8">
                  <el-form-item label="实际装车时间:">
                    <el-date-picker v-model="editMsgForm.active_time" :disabled="isDisabled" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际离站时间:">
                    <el-date-picker v-model="editMsgForm.leave_time" :disabled="isDisabled" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际里程:" prop="actual_mile">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.actual_mile"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="运费:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.freight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过路费:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.road_toll"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="停车费:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.parking_fee"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="油/气费:" prop="fuel">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.fuel"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="维修费:" prop="maintenance_cost">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.maintenance_cost"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="其他费用:" prop="other_cost">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.other_cost"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="高速费(对公):" prop="high_cost">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.high_cost"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="油/气费(对公):" prop="oli_gas">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.oli_gas"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收入:" prop="income">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.income"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="备注:" prop="remark">
                    <el-input placeholder="请输入" type="textarea" resize="none" :rows="3" v-model.trim="editMsgForm.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button type="primary" @click="editBasics(saveBasicAndReviewBtn,'out')" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'editCostImport',
  computed: {
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
    id: function() {
      return this.$route.query.id || '';
    },
  },
  data() {
    return {
      pageLoading: false,
      isDisabled: true,
      editMsgForm: {
        waybill: '', // 运单号
        order: '', // 业务单号
        company: '', // 托运方
        plate_number: '', // 车牌号
        fluid: '', // 实际液厂
        station: '', // 站点名称
        active_time: '', // 实际装车时间
        leave_time: '', // 实际离站时间
        actual_mile: '', // 实际里程
        freight: '', // 运费
        road_toll: '', // 过路费
        parking_fee: '', // 停车费
        fuel: '', // 油/气费
        maintenance_cost: '', // 维修费
        other_cost: '', // 其他费用
        high_cost: '', // 高速费(对公)
        oli_gas: '', // 油/气费(对公)
        income: '', // 收入
        remark: '' //备注
      },

      rules: {
        check_quantity: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        stand_mile: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        label_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        change_value: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        freight_value: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        waiting_price: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
        waiting_charges: [
          { pattern: /^[0-9]+(.[0-9]{0,3})?$/, message: '支持数值输入，最多支持小数点后3位', trigger: 'blur' }
        ],
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并下一步',
        isDisabled: false,
      },
      detail: {},
      customerList: []
    }
  },
  created() {
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    returnToPage: function() {
      // if (this.$route.query.id) {
      //   this.$router.push({ path: "/consignmentCenter/carrierManage/carrierDetail", query: { id: this.$route.query.id } });
      // } else {
      this.$router.push({ path: "/statistics/business/income/incomeList" });
      // }
    },
    getDetail: function() {
      this.$$http('getIncomeStatisticDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;

          this.editMsgForm = {
            waybill: this.detail.waybill, // 运单号
            order: this.detail.order, // 业务单号
            company: this.detail.company, // 托运方
            plate_number: this.detail.plate_number, // 车牌号
            fluid: this.detail.fluid, // 实际液厂
            station: this.detail.station, // 站点名称
            active_time: this.detail.active_time, // 实际装车时间
            leave_time: this.detail.leave_time, // 实际离站时间
            actual_mile: this.detail.actual_mile, // 实际里程
            freight: this.detail.freight, // 运费
            road_toll: this.detail.road_toll, // 过路费
            parking_fee: this.detail.parking_fee, // 停车费
            fuel: this.detail.fuel, // 油/气费
            maintenance_cost: this.detail.maintenance_cost, // 维修费
            other_cost: this.detail.other_cost, // 其他费用
            high_cost: this.detail.high_cost, // 高速费(对公)
            oli_gas: this.detail.oli_gas, // 油/气费(对公)
            income: this.detail.income, // 收入
            remark: '' //备注
          }
        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'updateLogisticStatistic';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;
          postData.id = this.id;
          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
            if (results.data && results.data.code == 0 && results.data.data) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.push({ path: "/statistics/business/income/incomeList" });
            }
          }).catch((err) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
          })
        } else {
          btnObject.isDisabled = false;
        }
      });
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne';
      let btnObject = btn;
      let keyArray = ['plan_time', 'check_quantity', 'stand_mile', 'label_price', 'change_value', 'freight_value', 'waiting_price', 'waiting_charges', 'remark'];
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },

  }
}

</script>
