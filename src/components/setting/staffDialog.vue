<!-- staffDialog.vue -->
<!-- staffDialog -->
<template>
  <div>
    <el-dialog :title="title" :visible="staffDialog.isShow" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="100px" :rules="rules" :model="staffRules" status-icon ref="staffRules">
          <el-form-item label="用户名：" prop="username">
            <el-input placeholder="请输入" v-model="staffRules.username" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="nick_name">
            <el-input placeholder="请输入" v-model="staffRules.nick_name" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="初始密码：" prop="password">
            <el-input placeholder="请输入" v-model="staffRules.password" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="phone">
            <el-input placeholder="请输入" v-model="staffRules.phone" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input placeholder="请输入" v-model="staffRules.email" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="部门：" prop="department">
            <el-select v-model="staffRules.department" placeholder="请选择">
              <el-option v-for="(item,key) in departmentList" :key="key" :label="item.verbose" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位：" prop="carrier_role">
            <el-select v-model="staffRules.carrier_role" placeholder="请选择">
              <el-option v-for="(item,key) in positionList" :key="key" :label="item.verbose" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button type="primary" @click="editDepartment" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'staffDialog',
  props: {
    staffDialog: {
      type: Object,
      required: true
    },
    departmentList: {
      type: Array,
      required: false
    },
    closeDialogBtn: Function,
  },

  data: function() {

    return {
      operation: this.staffDialog.type,
      staffRules: {
        username: '',
        password: '',
        nick_name: '',
        phone: '',
        email:'',
        department: '',
        carrier_role: ''
      },
      positionList:[],//职位列表
      rules: {
        group_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi, message: '企业名称为中文、英文，不能输入数字、标点符号', trigger: 'blur' },
        ],
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      title: '新增员工'
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', this.type);
    },
    editDepartment: function() {
      this.$refs['staffRules'].validate((valid) => {
        if (valid) {
          this.submitBtn.isDisabled = true;
          this.submitBtn.btnText = '提交中';
          this.submitBtn.isLoading = true;
          let apiName = '';
          let postData = {};
          if (this.staffDialog.type === 'add') {
            apiName = 'addStaff';
            postData = this.staffRules;
          } else if (this.staffDialog.type === 'update') {
            apiName = 'updateStaff';
            postData = {
              group_name: this.staffRules.group_name,
              id: this.departmentRow.id
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
                message: this.staffDialog.type === 'add' ? '新增员工成功' : '修改员工成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', this.type, true);
            }

          }).catch((err) => {
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            this.$message.error(this.staffDialog.type === 'add' ? '新增员工失败' : '修改员工失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    }
  },
  watch: {
    staffDialog: {
      handler(val, oldVal) {　　　　　　
        console.log('编辑', val, oldVal)
        if (val.isShow && val.type === 'update') {

          // this.staffRules.group_name = this.departmentRow.group_name;
          this.title = '修改员工';
        } else {
          this.title = '新增员工';
          // this.staffRules.group_name = '';
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
