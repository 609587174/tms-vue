<style scoped lang="less">


</style>
<template>
  <div>
    <el-dialog title="调账" :visible="accountAdjustIsShow" width="50%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="adjustment-dialog-form">
        <el-form class="adjustment-dialog-content" label-width="180px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="费用时间:">
            <el-row>
              <el-col :span="9">
                <div class="dialog-row-font">{{adjustRow.cost_date}}</div>
              </el-col>
              <el-col :span="13">
                <el-date-picker v-model="formRules.cost_date_adjust" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" @change="isValue"  placeholder="选择日期时间"></el-date-picker>
                <!-- <el-select v-model="formRules.cost_date_adjust" :loading="carrierLoading" filterable clearable @change="isValue" placeholder="请输入选择">
                  <el-option v-for="(item,key) in carrierSelect" :key="key" :label="item.carrier_name" :value="item.carrier_name"></el-option>
                </el-select> -->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="备注:">
            <el-row>
              <el-col :span="13" :offset="9">
                <el-input placeholder="请输入" type="textarea" resize="none" :rows="3" v-model="formRules.remark_adjust"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="adjustBtn" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'cashCostAdjustmentDialog',
  props: {
    accountAdjustIsShow: {
      type: Boolean,
      required: true
    },
    closeDialogBtn: Function,
    adjustRow: {
      type: Object,
      required: true
    },
  },

  data: function() {
    return {
      formRules: {
        cost_date_adjust: '', //费用时间
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
      },
      rules: {

      },
      submitBtn: {
        btnText: '确认调账',
        isDisabled: true,
        isLoading: false
      },
    }
  },
  computed: {
    waybillId() {
      return this.$route.params.waybillId;
    }
  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },

    isValue(type) {
      if(this.formRules.cost_date_adjust){
        this.submitBtn.isDisabled = false;
      }
    },
    adjustBtn: function() {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.submitBtn = {
            btnText: '调账中',
            isDisabled: true,
            isLoading: true
          }

          let postData = this.formRules;
          postData.id = this.adjustRow.id;
          let times = new Date();
          postData.adjust_time = times.Format("yyyy-MM-dd hh:mm:ss");
          postData.is_adjust = 'yes';
          postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http('updateCashCostStatistic', postData).then((results) => {
            this.submitBtn = {
              btnText: '确认调账',
              isDisabled: false,
              isLoading: false
            }
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '调账成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', true);
            }

          }).catch((err) => {
            this.submitBtn = {
              btnText: '确认调账',
              isDisabled: false,
              isLoading: false
            }
            this.$message.error('调账失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
  },
  watch: {
    accountAdjustIsShow(curVal, oldVal) {　
      this.formRules = {
        cost_date_adjust: '', //费用时间
        adjust_time: '', //调账时间
        remark_adjust: '', //调账备注
      };　
      this.submitBtn.isDisabled = true;　　　　　　　
      if (this.$refs['formRules']) {
        this.$refs['formRules'].clearValidate();　　　　
      }　　

    },
  },
  created: function() {
    this.pbFunc.format();
  }
}

</script>
