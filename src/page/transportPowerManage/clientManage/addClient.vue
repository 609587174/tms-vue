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

#addClientForm {
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
  <div id="addClientForm">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>新增客户</p>
      </el-header>
      <el-main>
        <el-steps :active="activeStep" align-center finish-status="success">
          <el-step title="步骤1" description="基础信息"></el-step>
          <el-step title="步骤2" description="运费约定"></el-step>
        </el-steps>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form class="addheadcarform" label-width="100px" ref="addClientFormSetpOne" :rules="rules" :model="basicMsgForm" status-icon>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="客户名称:" prop="clientName">
                    <el-input :autofocus="true" placeholder="请输入客户名称" type="text" v-model="basicMsgForm.clientName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人姓名:" prop="contactor">
                    <el-input placeholder="请输入联系人姓名" type="text" v-model="basicMsgForm.contactor"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式:" prop="phone">
                    <el-input placeholder="请输入联系方式" type="text" v-model="basicMsgForm.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="地址:">
                    <el-input placeholder="请输入地址" type="text" v-model="basicMsgForm.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户类型:">
                    <el-select v-model="basicMsgForm.clientType" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.clientTypeSelect" :key="$index" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="社会机构代码:">
                    <el-input placeholder="请输入社会机构代码" type="text" v-model="basicMsgForm.departmentCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="亏吨标准:">
                    <el-input placeholder="请输入亏吨标准" type="text" v-model="basicMsgForm.tonLoss"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="11">
                <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
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
    return {
      activeStep: 0,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      basicMsgForm: {
        clientName: '',
        contactor: '',
        phone: '',
        address: '',
        departmentCode: '',
        tonLoss: '',
      },
      selectData: {
        clientTypeSelect: [
          { id: '1', value: '自有车辆' },
          { id: '2', value: '平台客户' },
        ],
      },
      rules: {
        clientName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
        ],
        contactor: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入座机号或者手机号', trigger: 'blur' }
        ],

      },
      nextStepBtn: {
        isLoading: false,
        btnText: '下一步',
        isDisabled: false,
      }
    }
  },
  created() {
    console.log(this);
  },
  methods: {
    goOtherSetp() {
      this.nextStepBtn.isDisabled = true;
      this.$refs['addClientFormSetpOne'].validate((valid) => {
        if (valid) {
          this.nextStepBtn.btnText = '正在提交';
          this.nextStepBtn.isLoading = true;

          setTimeout(() => {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.nextStepBtn.btnText = '下一步';
            this.nextStepBtn.isLoading = false;
            this.nextStepBtn.isDisabled = false;
          }, 1000)
        } else {
          this.nextStepBtn.isDisabled = false;
        }
      });
    },
  }
}

</script>
