<style scoped lang="less">

</style>
<template>
  <div>
    <div class="user-page" @keyup.enter="login">
      <div>
        <div class="user-page-title">注册</div>
        <el-form :model="registerForm" ref="registerForm" status-icon :rules="rules" label-width="120px" class="user-form">
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model.trim="registerForm.name" size="small" type="text" placeholder="请输入你的用户名"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="phone">
            <el-input v-model.trim="registerForm.phone" size="small" type="text" placeholder="请输入你的手机号码"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="password">
            <el-input v-model.trim="registerForm.password" size="small" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="公司地址：" prop="rePassword">
            <el-row :gutter="0">
              <el-col :md="8">
                <el-select v-model="registerForm.password" size="small" placeholder="省">
                  <el-option v-for="(item,key) in selectData.clientTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :md="8">
                <el-select v-model="registerForm.password" size="small" placeholder="市">
                  <el-option v-for="(item,key) in selectData.clientTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :md="8">
                <el-select v-model="registerForm.password" size="small" placeholder="区">
                  <el-option v-for="(item,key) in selectData.clientTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-input v-model.trim="registerForm.password" size="small" type="textarea" :rows="3" placeholder="请输入密码"></el-input>
            </el-row>
          </el-form-item>
          <el-form-item label="企业类型：" prop="imgVerifyCode" size="small" class="verify-code-item">
            <el-select v-model="registerForm.password" size="small" placeholder="省">
              <el-option v-for="(item,key) in selectData.clientTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
            </el-select>
            <div class="user-checked"><el-checkbox v-model="checked">我已同意并阅读<span>《用户协议》</span></el-checkbox></div>
          </el-form-item>
          <div class="user-page-btn">
            <el-form-item>
              <el-button type="success" @click="onSubmit('registerForm')" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
            </el-form-item>
            <el-form-item>已有账号，请<span class="text-blue">登录</span></el-form-item>
          </div>
          <div class="user-page-img"><img src="../assets/img/user_5.png"></div>
        </el-form>
      </div>
      <div v-if="false">
        <div class="user-page-title">审核中</div>
        <div class="user-register-notice">您的注册信息已提交，请耐心等待系统审核，谢谢！<br>
          审核后会给您的注册手机号发短信通知<br>
          审核通过后您可通过用户名/手机号登录系统<br>
          如有疑问，请联系客服QQ：<span class="text-blue">1373724944</span>
        </div>
        <div class="user-page-img text-center"><img src="../assets/img/user_4.png"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      console.log('value', value);
      setTimeout(() => {
        callback();
      }, 1000);

    };
    const checkRepassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致，请重新输入'));
      } else {
        callback();
      }
    };
    return {

      registerForm: {
        name: '',
        phone: '',
        password: '',
        rePassword: '',
        imgVerifyCode: '',
        msgVerifyCode: '',
        checked:true
      },
      selectData:{
        clientTypeSelect: [
          { id: '1', value: '自有车辆' },
          { id: '2', value: '平台客户' },
        ],
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^\w{4,20}$/, message: '用户名为4-20个字符，支持中文、字母、数字', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号码格式不正确，请重新输入', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请设置登录密码', trigger: 'blur' },
          { pattern: /^\w{6,20}$/, message: '用户名为6-20个字符，支持中文、字母、数字', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请再次输入你的密码', trigger: 'blur' },
          { pattern: /^\w{6,20}$/, message: '用户名为6-20个字符，支持中文、字母、数字', trigger: 'blur' },
          { validator: checkRepassword, trigger: 'blur' },
        ],
        imgVerifyCode: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' }
        ],
        msgVerifyCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      },
      msgBtn: {
        getCodeText: '获取验证码',
        isLoading: false,
        isDisabled: false,
      },
      submitBtn: {
        btnText: '提交注册',
        isLoading: false,
        isDisabled: false,
      }


    };
  },
  computed: {

  },
  methods: {
    refreshVaImg() {

    },
    showValue() {
      console.log(this.registerForm.imgVerifyCode)
    },
    onSubmit(registerForm) {
      this.submitBtn.isDisabled = true;
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          this.submitBtn.btnText = '注册中';
          this.submitBtn.isLoading = true;

          setTimeout(() => {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.submitBtn.btnText = '注册';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
          }, 1000)
        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    getMsgCode(event) {

      let num = 10;
      let intCountdown;

      const countdown = () => {
        this.msgBtn.getCodeText = num;
        if (num >= 1) {
          num--;
        } else {
          this.msgBtn.getCodeText = '获取验证码';
          this.msgBtn.isDisabled = false;
          clearInterval(intCountdown);
        }
      }

      this.msgBtn.isLoading = true;
      this.msgBtn.isDisabled = true;
      this.msgBtn.getCodeText = '正在发送';

      setTimeout(() => {
        this.msgBtn.isLoading = false;
        this.msgBtn.getCodeText = num;
        this.$message({
          message: '短信发送成功，请查看',
          type: 'success'
        });
        intCountdown = setInterval(countdown, 1000);
      }, 1000)

    }
  },
  created() {

  }
};

</script>
