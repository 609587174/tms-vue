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

.login-form input {
  height: 32px;
}

.login-form {
  width: 360px;
  margin: 13% auto 0;
  .el-input {
    width: 220px;
    height: 32px;
  }
  .vaInput {
    width: 140px;
  }
  .inputTip {
    width: 80px;
    display: inline-block;
  }
  img {
    line-height: 40px;
    vertical-align: middle;
    cursor: pointer;
  }
  p {
    white-space: nowrap;
    font-size: 32px;
    font-style: normal;
    color: rgb(0, 0, 0);
  }
  .colorblue {
    color: rgb(51, 153, 255);
    cursor: pointer;
  }
  .Textline {
    text-align: center;
  }
  button {
    border-radius: 4px;
    color: white;
    height: 46px;
    font-size: 18px;
    border-color: white;
    margin-left: 10%;
  }
  .getphoneBt {
    height: 40px;
    margin-left: 5px;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 8px;
    min-width: 60px;
  }
}

.login-page {
  background: #fff;
}

.margin-right (@width) {
  margin-right: @width;
}

</style>
<template>
  <div>
    <div class="g-center login-page font-size-12" @keyup.enter="login">
      <el-form class="login-form" label-width="95px" :label-position="'left'" :rules="rules" :model="ruleForm" status-icon>
        <p class="des">找回密码</p>
        <el-form-item label="手机号" prop="phone">
          <el-input :autofocus="true" placeholder="请输入注册手机号" v-model.trim="ruleForm.phone" name='email'>
          </el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="vaPassword">
          <el-input placeholder="请输入验证码" type="password" v-model.trim="ruleForm.vaPassword" class="vaInput">
          </el-input>
          <el-button class="getphoneBt" style="" v-on:click="getPhoneVa" type="primary" :disabled="sendStatus" :loading="isBtnSendLoading">{{btnSendText}}</el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="请输入密码" type="password" v-model.trim="ruleForm.password">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input placeholder="请再次输入密码" type="password" v-model.trim="ruleForm.confirmPassword">
          </el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button style="width:80%;margin-top:25px;" v-on:click="resetPassword" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
        <el-form-item label-width="0px" class="Textline">已有账号，<span v-on:click="toLoginPage" class="colorblue">请登陆</span></el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import * as util from '../assets/utils.js';
//登录
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var lv = 0;
      if (value.match(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/)) {
        callback();
      } else {
        callback(new Error("密码不正确"));
      }
    };
    var validateNum = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("验证码不能为空"));
      } else {
        if (value != this.vaPhoneNum) {
          callback(new Error("验证码不正确"));
        }
      }
    };
    var validateConfirmPass = (rule, value, callback) => {
      if (value === password) {
        callback();
      } else {
        callback(new Error("两次输入密码不相同"));
      }
    };
    return {
      ruleForm: {
        phone: '',
        vaPassword: '',
        password: "",
        confirmPassword: "",
      },
      sendStatus: false,
      isBtnSendLoading: false,
      vaPhoneNum: "4399",
      isBtnLoading: false,
      times: 10,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 4, max: 20, message: '手机号不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateConfirmPass, trigger: 'blur' }
        ],
        vaPassword: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' },
        ]
      }
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '重制中...';
      return '重置密码';
    },
    btnSendText() {
      if (this.isBtnSendLoading) {
        return '发送中...';
      } else if (this.sendStatus) {
        return this.times + "s";
      } else if (!this.sendStatus && !this.isBtnSendLoading) {
        return "发送验证码";
      }
    }
  },
  methods: {
    resetPassword() {


    },
    toForgetPassword() {

    },
    toLoginPage() {
      this.$router.push({ path: '/login' });
    },
    getPhoneVa() {
      this.isBtnSendLoading = true;
      this.sendStatus = true;
      setTimeout(() => {

        this.isBtnSendLoading = false;
        var thisIn = setInterval(() => {
            if (this.times > 1) {
              this.times--;
            } else {
              this.sendStatus = false;
              this.times = 10;
              clearInterval(thisIn);
            }
          },
          1000)
      }, 1000);
    }
  },
  created() {
    sessionStorage.clear();
  }
};

</script>
