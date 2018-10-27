<style scoped lang="less">
  .adjustment-dialog-form{
    width:80%;
    .el-form-item{
      margin-bottom:0;
    }
  }

</style>
<template>
  <div>
    <el-dialog title="提醒" :visible="isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="adjustment-dialog-form">
        <div class="text-center">{{titleObj.type}} <span class="text-blue">{{titleObj.title}}</span> 已存在完善运力，运力如下：</div>
        <el-form class="adjustment-dialog-content mt-30" label-width="60px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="牵引车:"><span v-html="pbFunc.dealNullData(row.tractor&&row.tractor.plate_number)"></span></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="挂车:"><span v-html="pbFunc.dealNullData(row.tractor&&row.semitrailer.plate_number)"></span></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主驾:"><span v-html="pbFunc.dealNullData(row.master_driver&&row.master_driver.name)"></span></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="副驾:"><span v-html="pbFunc.dealNullData(row.vice_driver&&row.vice_driver.name)"></span></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="押运员:"><span v-html="pbFunc.dealNullData(row.escort_staff&&row.escort_staff.name)"></span></el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="mt-30 text-red fs-12 text-center">运力信息将直接引用，若运力信息不对，请联系车辆调度修改</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="saveBtn" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'detectionCapacityDialog',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    closeDialogBtn: Function,
    row: {
      type: Object,
      required: true
    },
    titleObj:{
      type: Object,
      required: true
    }
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
        btnText: '确认使用',
        isDisabled: false,
        isLoading: false
      },
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },
    saveBtn: function() {
      this.$$http('relationThreePartyCapacity', {tractor_semitrailer:this.row.id}).then((results) => {
        this.submitBtn = {
          btnText: '确认使用',
          isDisabled: false,
          isLoading: false
        }
        if (results.data && results.data.code == 0) {
          this.$message({
            message: '确认使用成功',
            type: 'success'
          });
          this.$emit('closeDialogBtn', true);
          this.$router.push({ path: "/basicDataManage/threePartyCapacity/threePartyCapacityList" });
        }

      }).catch((err) => {
        this.submitBtn = {
          btnText: '确认使用',
          isDisabled: false,
          isLoading: false
        }
        this.$message.error('确认使用失败');
      })


    },
  },
  watch: {

  },
  created: function() {
  }
}

</script>
