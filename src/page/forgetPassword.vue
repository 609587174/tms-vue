<style scoped lang="less">


</style>
<template>
  <div>
    <div class="user-page" @keyup.enter="login">
      <div v-if="false">
        <div class="user-page-title">找回密码</div>
        <el-form class="user-form" label-width="95px" :label-position="'left'" :rules="rules" :model="ruleForm" status-icon>
          <el-form-item label="手机号" prop="phone">
            <el-input :autofocus="true" placeholder="请输入注册手机号" size="small" v-model.trim="ruleForm.phone" name='email'>
            </el-input>
          </el-form-item>
          <el-form-item label="短信验证码" prop="vaPassword">
            <el-row>
              <el-col :span="14">
                <el-input placeholder="请输入验证码" size="small" type="password" v-model.trim="ruleForm.vaPassword" class="vaInput"></el-input>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-button size="small" class="get-code-btn" style="" v-on:click="getPhoneVa" type="primary" :disabled="sendStatus" :loading="isBtnSendLoading">{{btnSendText}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input placeholder="请输入密码" size="small" type="password" v-model.trim="ruleForm.password">
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input placeholder="请再次输入密码" size="small" type="password" v-model.trim="ruleForm.confirmPassword">
            </el-input>
          </el-form-item>
          <div class="user-page-btn">
            <el-form-item>
              <el-button v-on:click="resetPassword" type="success" :loading="isBtnLoading">{{btnText}}</el-button>
            </el-form-item>
            </el-form-item>
            <el-form-item>已有账号，<span v-on:click="toLoginPage" class="text-blue">请登录</span></el-form-item>
          </div>
          <div class="user-page-img"><img src="../assets/img/user_6.png"></div>
        </el-form>
      </div>
      <div>
        <div class="user-page-title">找回密码</div>
        <div class="user-register-notice password">
          您的密码已重置成功，请使用新密码登录！<br>
          <span class="text-blue time">5</span>S 后自动返回登录页面<br>
          如没有自动跳转，请点击<span class="text-blue">登录</span><br>
        </div>
        <div class="btn-link"><el-button type="success" >登录</el-button></div>
        <div class="user-page-img text-center"><img src="../assets/img/user_3.png"></div>
      </div>
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
