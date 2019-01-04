<template>
  <div>
    <el-form label-width="125px" status-icon :rules="rules" :model="ruleForm" ref="ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="mark">
            <el-input type="textarea" :rows="5" v-model="ruleForm.mark" style="width:80%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="confrimEdit" :loading="isLoading" :disabled="isLoading">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'editMark',
  data() {
    return {
      isLoading: false,
      ruleForm: {
        mark: '',
      },
      rules: {
        mark: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 1, max: 100, message: '备注不超过100字符', trigger: 'blur' }
        ],
      },
    };
  },
  components: {

  },
  props: {
    deliveryOrderId: String,
    markText: String,
    close: Function,
    successCallback: Function,
  },
  computed: {

  },
  watch: {
    markText: {
      handler(val, oldVal) {
        this.ruleForm.mark = val || '';
        this.$refs['ruleForm'].clearValidate();
      },
    }
  },
  methods: {
    confrimEdit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let sendData = {
            id: this.deliveryOrderId,
            mark: this.ruleForm.mark,
          };
          this.isLoading = true;
          this.$$http("fixOrderMark", sendData).then(results => {
            this.isLoading = false;
            if (results.data.code == 0) {
              this.$emit('successCallback');
              this.$emit('close');
              this.$message({
                type: "success",
                message: "编辑成功"
              })
            }
          }).catch(() => {
            this.isLoading = false;
          });
        }
      });
    },
  },
  created() {
    this.ruleForm.mark = this.markText;
  },
};

</script>
<style scoped lang="less">
</style>
