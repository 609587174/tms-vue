<style scoped lang="less">
#app {
  display: table;
  width: 100%;
}

.main-title {
  text-align: center;
}

.des {
  text-align: center;
  color: #999;
  margin-bottom: 2em;
}

.login-form {
  width: 400px;
  margin: 13% auto 0;
}

.login-page {
  background: #fff;
}

.margin-right (@width) {
  margin-right: @width;
}

.verify-code-item {
  .verify-code-input {
    width: 154px;
  }
  img {
    width: 112px;
    height: 40px;
    margin-left: 10px;
    position: relative;
    top: 7px;
  }
}

</style>
<template>
  <div>
    <div class="g-center login-page font-size-12" @keyup.enter="login">
      <el-form :model="registerForm" ref="registerForm" status-icon :rules="rules" label-width="120px" class="login-form">
        <h1 class="des">注册</h1>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model.trim="registerForm.name" type="text" placeholder="请输入你的用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model.trim="registerForm.phone" type="text" placeholder="请输入你的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model.trim="registerForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="rePassword">
          <el-input v-model.trim="registerForm.rePassword" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="imgVerifyCode" class="verify-code-item">
          <el-input v-model.trim="registerForm.imgVerifyCode" type="text" placeholder="请输入验证码" @blur="showValue" class="verify-code-input"></el-input>
          <img src="../assets/img/va.png" v-on:click="refreshVaImg">
        </el-form-item>
        <el-form-item label="短信验证码：" prop="msgVerifyCode" class="verify-code-item">
          <el-input v-model.trim="registerForm.msgVerifyCode" type="text" placeholder="请输入验证码" class="verify-code-input"></el-input>
          <el-button type="primary" @click="getMsgCode" :loading="msgBtn.isLoading" :disabled="msgBtn.isDisabled">{{msgBtn.getCodeText}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('registerForm')" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
        </el-form-item>
      </el-form>
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
        btnText: '注册',
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
