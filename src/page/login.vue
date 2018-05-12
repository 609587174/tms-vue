<style scoped lang="less">

</style>
<template>
  <div>
    <div class="user-page" @keyup.enter="login">
      <div class="user-page-title">登录</div>
      <el-form class="user-form" label-width="100px" :label-position="'left'" :rules="rules" :model="ruleForm" status-icon ref="loginFrom">
        <p class="des"></p>
        <el-form-item label="用户名：" prop="userName">
          <el-input :autofocus="true" placeholder="请输入用户名／手机号" size="small" v-model="ruleForm.userName" onkeyup="this.value=this.value.replace(/\s+/g,'')">
          </el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input placeholder="请输入密码" type="password" size="small" v-model="ruleForm.password" onkeyup="this.value=this.value.replace(/\s+/g,'')">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="ValNum" validate-on-rule-change>
          <el-row>
            <el-col :span="15">
              <el-input placeholder="请输入验证码" size="small" type="text" v-model="ruleForm.ValNum" class="vaInput" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="4"> </el-input>
            </el-col>
            <el-col :span="8" :offset="1"><img src="../assets/img/va.png" width="100%" v-on:click="refreshVaImg"></el-col>
          </el-row>
        </el-form-item>
        <div class="user-page-btn">
          <el-form-item>忘记密码？<span v-on:click="toForgetPassword" class="text-blue">找回密码</span></el-form-item>
          <el-form-item>
            <el-button @click.native="login" type="success" :loading="isBtnLoading">{{btnText}}</el-button>
          </el-form-item>
          <el-form-item>没有账号，<span v-on:click="toLogin('loginFrom')" class="text-blue">请注册</span></el-form-item>
        </div>
        <div class="user-page-img"><img src="../assets/img/user_2.png"></div>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
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
        if (value !== this.vaImgNum) {
          callback(new Error("验证码不正确"));
        }
      }
    };
    return {
      isBtnLoading: false,
      vaImgNum: "k9s5",
      ruleForm: {
        userName: '',
        password: '',
        ValNum: ""
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名或手机号', trigger: 'blur' },
          { min: 4, max: 20, message: '用户名或手机号不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        ValNum: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    },

  },
  methods: {
    login() {
      var vm = this;
      let loginParams = { name: vm.username, password: vm.password };
      vm.isBtnLoading = true;
      vm.isBtnLoading = false;
      vm.pbFunc.setLocalData('token', "autostringify-liuming");
      vm.$emit('login', vm.$router.currentRoute.query.from);
    },
    toForgetPassword() {
      this.$router.push({ path: '/forgetPassword' });
    },
    callbackerr(cuowu) {

    },
    toLogin(loginFrom) {
      var vm = this;
      this.$refs[loginFrom].validate((valid) => {
        if (!valid) {
          var callbackInfo = { errorField: "ValNum", errorMessage: "有错误" }
          console.log(vm);
          console.log(this.$refs.loginFrom.fields.filter((item) => (item.prop === callbackInfo.errorField)));
          this.$refs.loginFrom.fields.filter((item) => (item.prop === callbackInfo.errorField))[0].error = callbackInfo.errorMessage;
        } else {
          return false;
        }
      });
      //this.$router.push({ path: '/register' });
    },
    refreshVaImg() {


    }
  },
  created() {
    sessionStorage.clear();
  }
};

</script>
