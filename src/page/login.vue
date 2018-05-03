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
  width: 280px;
  margin: 13% auto 0;
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-input {
    margin: 0 0 0 20px;
    width: 201px;
    height: 32px;
  }
  .vaInput {
    width: 120px;
  }
  .inputTip {
    width: 50px;
    display: inline-block;
    line-height: 32px;
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
        <p class="des">登录</p>
        <el-form-item>
          <span class="inputTip">用户名:</span>
          <el-input :autofocus="true" placeholder="请输入用户名／手机号" v-model="username" name='userName'>
          </el-input>
        </el-form-item>
        <el-form-item>
          <span class="inputTip">密码:</span>
          <el-input placeholder="请输入密码" type="password" v-model="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <span class="inputTip">验证码:</span>
          <el-input placeholder="请输入验证码" type="password" v-model="password" class="vaInput">
          </el-input>
          <img src="../assets/img/va.png" v-on:click="refreshVaImg">
        </el-form-item>
        <el-form-item class="Textline">忘记密码？<span v-on:click="toForgetPassword" class="colorblue">找回密码</span></el-form-item>
        <el-form-item>
          <el-button style="width:80%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
        <el-form-item class="Textline">没有账号，<span v-on:click="toLogin" class="colorblue">请注册</span></el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      var vm = this;
      if (!vm.username) {
        vm.$message.error('请填写用户名！！！');
        return;
      }
      if (!vm.password) {
        vm.$message.error('请填写密码');
        return;
      }
      let loginParams = { name: vm.username, password: vm.password };
      vm.isBtnLoading = true;
      vm.isBtnLoading = false;
      vm.pbFunc.setLocalData('token', "autostringify-liuming");
      vm.$emit('login', vm.$router.currentRoute.query.from);
    },
    toForgetPassword() {
      this.$router.push({ path: '/forgetPassword' });
    },
    toLogin() {
      this.$router.push({ path: '/register' });
    },
    refreshVaImg() {


    }
  },
  created() {
    sessionStorage.clear();
  }
};

</script>
