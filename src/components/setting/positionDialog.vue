<!-- positionDialog.vue -->
<template>
  <div>
    <el-dialog :title="title" :visible="positionDialog.isShow" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="100px" :rules="rules" :model="positionRules" status-icon ref="positionRules">
          <el-form-item label="部门名称：">
            <div>{{departmentRow.group_name}}</div>
          </el-form-item>
          <el-form-item label="职位名称：" prop="role_name">
            <el-input placeholder="请输入" v-model="positionRules.role_name" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button type="primary" @click="editposition('positionRules')" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'positionDialog',
  props: {
    positionDialog: {
      type: Object,
      required: true
    },
    positionRow: {
      type: Object,
      required: false
    },
    departmentRow: {
      type: Object,
      required: true
    },
    closeDialogBtn: Function,
  },

  data: function() {

    return {
      type: 'position', //弹窗类型
      operation: this.positionDialog.type,
      positionRules: {
        department: '',
        role_name: ''
      },
      rules: {
        role_name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' },
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi, message: '企业名称为中文、英文，不能输入数字、标点符号', trigger: 'blur' },
        ],
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      title:'新增职位'
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', this.type);
    },
    editposition: function(positionRules) {
      this.$refs[positionRules].validate((valid) => {
        if (valid) {
          this.submitBtn.isDisabled = true;
          this.submitBtn.btnText = '提交中';
          this.submitBtn.isLoading = true;
          let apiName = '';
          let postData = {};
          if (this.positionDialog.type === 'add') {
            apiName = 'addPosition';
            this.positionRules.department = this.departmentRow.id;
            postData = this.positionRules;
          } else if (this.positionDialog.type === 'update') {
            apiName = 'updatePosition';
            console.log('修改职位')
            postData = {
              role_name: this.positionRules.role_name,
              carrier_role_id: this.positionRow.id
            }
          }

          this.$$http(apiName, postData).then((results) => {
            console.log('部门', results.data);
            // this.pageLoading = false;
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            if (results.data && results.data.code == 0) {
              this.$message({
                message: this.positionDialog.type === 'add' ? '新增职位成功' : '修改职位成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', this.type, true);
            }

          }).catch((err) => {
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            this.$message.error(this.positionDialog.type === 'add' ? '新增职位失败' : '修改职位失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    }
  },
  watch: {
    positionDialog: {
      handler(val, oldVal) {　　　　　　
        console.log('编辑', val, oldVal);
        console.log('部门', this.departmentRow)
        if (val.isShow && val.type === 'update') {
          this.positionRules.role_name = this.positionRow.role_name;
          this.title = '修改职位';
        } else {
          this.positionRules.role_name = '';
          this.title = '新增职位';
        }　　　　
      },
      　　　　deep: true

    }
  },
  created: function() {

  }
}

</script>
<style scoped lang="less">


</style>
