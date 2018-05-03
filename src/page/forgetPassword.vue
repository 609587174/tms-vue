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

.el-input /deep/ .el-input__inner {
  height: 32px;
  border: 1px solid rgb(102, 102, 102);
  border-radius: 0px;
}

.login-form {
  width: 350px;
  margin: 13% auto 0;
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-input {
    margin: 0 0 0 5px;
    width: 201px;
    height: 32px;
  }
  .vaInput {
    width: 120px;
  }
  .inputTip {
    width: 80px;
    display: inline-block;
  }
  img {
    line-height: 32px;
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
    background-color: rgb(102, 204, 204);
    border-radius: 4px;
    color: white;
    height: 46px;
    font-size: 18px;
    border-color: white;
    margin-left: 10%;
    line-height: 32px;
  }
  .getphoneBt {
    height: 35px;
    margin-left: 5px;
    background-color: rgb(102, 153, 255);
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    padding: 0 8px;
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
      <el-form class="login-form">
        <p class="des">找回密码</p>
        <el-form-item>
          <span class="inputTip">手机号码:</span>
          <el-input :autofocus="true" placeholder="请输入注册手机号" v-model="phone" name='email'>
          </el-input>
        </el-form-item>
        <el-form-item>
          <span class="inputTip">短信验证码:</span>
          <el-input placeholder="请输入验证码" type="password" v-model="vaPassword" class="vaInput">
          </el-input>
          <el-button class="getphoneBt" style="" v-on:click="getPhoneVa" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
        <el-form-item>
          <span class="inputTip">新密码:</span>
          <el-input placeholder="请输入密码" type="password" v-model="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <span class="inputTip">确认密码:</span>
          <el-input placeholder="请再次输入密码" type="password" v-model="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:80%;margin-top:25px;" v-on:click="resetPassword" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
        <el-form-item class="Textline">已有账号，<span v-on:click="toLoginPage" class="colorblue">请登陆</span></el-form-item>
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
    return {
      phone: '',
      vaPassword: '',
      paseeword: "",
      secondPassword: "",
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '重制中...';
      return '重置密码';
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

    }
  },
  created() {
    sessionStorage.clear();
  }
};

</script>
