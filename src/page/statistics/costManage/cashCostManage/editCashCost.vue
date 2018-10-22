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
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
            <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回列表页</span></span> -->
          </el-col>
          <el-col :span="20">
            <p>现金费用编辑</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">数据信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="车号:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.plate_number" :disabled="isDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="费用时间:">
                    <el-date-picker v-model="editMsgForm.cost_date" :disabled="isDisabled" type="datetime" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="费用类型:" prop="cost_type">
                    <el-select v-model="editMsgForm.cost_type" filterable placeholder="请选择" :disabled="isDisabled">
                      <el-option v-for="(item,key) in selectData.costSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="数量:" prop="nums">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.nums"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="税前金额:" prop="pre_tax_amount">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.pre_tax_amount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="税后金额:" prop="at_amount">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.at_amount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="税额:" prop="tax_amount">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.tax_amount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行程外费用:">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.is_travel"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="批次:">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.lot"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否匹配运单:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="运单号:" prop="waybill">
                    <el-select v-model="editMsgForm.waybill" filterable clearable placeholder="请输入选择" @change="selectWaybill">
                      <!-- <el-option v-for="(item,key) in waybillList" :key="key" :label="item.waybill_number" :value="item.waybill_number"></el-option> -->
                      <el-option v-for="(item,key) in waybillList" :key="item.id" :label="item.waybill_number" :value="item.waybill_number">
                        <span style="float: left">{{ item.waybill_number }}</span>
                        <span class="option-span" v-if="item.work_end_time">{{ item.work_end_time }}</span>
                        <span class="option-span" v-if="item.fluid">{{ item.fluid }}</span>
                        <span class="option-span" v-if="item.loading_quantity">{{ item.loading_quantity }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装车完成时间:">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model.trim="editMsgForm.work_end_time"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际液厂:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.fluid"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装车吨位:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model.trim="editMsgForm.loading_quantity"></el-input>
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
        plate_number: '', // 车牌号
        cost_type: '', // 费用类型
        cost_date: '', // 费用时间
        nums: '', // 数量
        pre_tax_amount: '', //税前金额
        at_amount: '', // 税后金额
        tax_amount: '', //税额
        is_matching: '', // 是否匹配运单
        waybill: '', // 运单号
        is_travel: '',
        work_end_time: '',
        fluid: '',
        loading_quantity: '',
        is_travel: '',
        lot: ''
      },
      waybillList: [], //运单号列表
      rules: {
        // cost_type: [
        //   { required: true, message: '请选择费用类型', trigger: 'blur' },
        // ],
        // nums: [
        //   { required: true, message: '请输入数量', trigger: 'blur' },
        //   { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        // ],
        // pre_tax_amount: [
        //   { required: true, message: '请输入税前金额', trigger: 'blur' },
        //   { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        // ],
        // at_amount: [
        //   { required: true, message: '请输入税后金额', trigger: 'blur' },
        //   { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        // ],
        // tax_amount: [
        //   { required: true, message: '请输入税额', trigger: 'blur' },
        //   { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        // ],
        waybill: [
          { required: true, message: '请选择运单号', trigger: 'blur' }
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
      customerList: [],
      selectData: {
        costSelect: [
          { id: 'logistics_high_speed', value: '过路费（普通）' },
          { id: 'logistics_high_speed_cash', value: '过路费（国家）' },
          { id: 'logistics_high_speed_bridge', value: '过桥费' },
          { id: 'logistics_fuel_cash', value: '现金油/气（有票）' },
          { id: 'logistics_fuel_cash_no_ticket', value: '现金油/气（无票）' },
          { id: 'logistics_park', value: '停车费' },
          { id: 'logistics_maintain', value: '维修费' },
          { id: 'logistics_detector', value: '检测费' },
          { id: 'logistics_other', value: '其它费用' },
        ]
      },
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
      this.$router.push({ path: "/statistics/costManage/cashCostManage/cashCostList" });
      // }
    },
    selectWaybill(waybill) {
      for (let i in this.waybillList) {
        if (this.waybillList[i].waybill_number === waybill) {
          this.editMsgForm.work_end_time = this.waybillList[i].work_end_time;
          this.editMsgForm.fluid = this.waybillList[i].fluid;
          this.editMsgForm.loading_quantity = this.waybillList[i].loading_quantity;
        }
      }
    },
    getWaybillData() {
      let postData = {
        datetime: this.detail.cost_date,
        plate_number: this.detail.plate_number
        // datetime:'2018-06-13 22:10:15',
        // plate_number:'鲁HH5555'
      }
      this.$$http('getWaybillData', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.waybillList = results.data.data;
        }
      })
    },
    getDetail: function() {
      this.$$http('getCashCostStatisticDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;
          this.editMsgForm = {
            plate_number: this.detail.plate_number, // 车牌号
            cost_type: this.detail.cost_type.key, // 费用类型
            cost_date: this.detail.cost_date, // 费用时间
            nums: this.detail.nums, // 数量
            pre_tax_amount: this.detail.pre_tax_amount, //税前金额
            at_amount: this.detail.at_amount, // 税后金额
            tax_amount: this.detail.tax_amount, //税额
            is_matching: this.detail.is_matching.verbose, // 是否匹配运单
            waybill: this.detail.waybill, // 运单号
            work_end_time: this.detail.work_end_time,
            fluid: this.detail.fluid,
            loading_quantity: this.detail.loading_quantity,
            is_travel: this.detail.is_travel.verbose,
            lot: this.detail.lot
          }
          this.getWaybillData();
        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'updateCashCostStatistic';
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
              this.$router.push({ path: "/statistics/costManage/cashCostManage/cashCostList" });
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
      let keyArray = ['waybill'];
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      for (let i in this.waybillList) {
        if (this.waybillList[i].waybill_number === this.editMsgForm.waybill) {
          postData.waybill_id = this.waybillList[i].id;
        }
      }
      if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },

  }
}

</script>
