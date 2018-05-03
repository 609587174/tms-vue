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

</style>
<template>
  <div>
    <div class="g-center login-page font-size-12" @keyup.enter="login">
      <h1 class="des">注册</h1>
      <el-form class="register-form">
        <el-form-item label="姓名：">
          <el-input :autofocus="true" placeholder="请输入账号" name="name" v-model="username">
          </el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input placeholder="请输入密码" type="password" name="password" v-model="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading"></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    };
  },
  computed: {

  },
  methods: {
    login() {

    }
  },
  created() {

  }
};

</script>
