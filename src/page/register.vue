<style scoped lang="less">


</style>
<template>
  <div>
    <div class="user-page" @keyup.enter="login">
      <div class="user-page-title">注册</div>
      <el-form :model="registerForm" ref="registerForm" status-icon :rules="rules" label-width="120px" class="user-form">
        <el-form-item label="姓名：" prop="nick_name">
          <el-input v-model.trim="registerForm.nick_name" size="small" type="text" placeholder="请输入你的用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model.trim="registerForm.password" size="small" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirm_password">
          <el-input v-model.trim="registerForm.confirm_password" size="small" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model.trim="registerForm.phone" size="small" type="text" placeholder="请输入你的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="verify_key" size="small" class="verify-code-item">
          <el-row>
            <el-col :span="14">
              <el-input v-model.trim="registerForm.verify_key" type="text" placeholder="请输入验证码" @blur="showValue" class="verify-code-input"></el-input>
            </el-col>
            <el-col :span="9" :offset="1"><img :src="verifyCodeData.image_code_path" width="100%" height="32" v-on:click="refreshVaImg"></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="短信验证码：" prop="message_verify_code" class="verify-code-item">
          <el-row>
            <el-col :span="14">
              <el-input v-model.trim="registerForm.message_verify_code" size="small" type="text" placeholder="请输入验证码" class="verify-code-input"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-button size="small" class="get-code-btn" type="primary" @click="getMsgCode" :loading="msgBtn.isLoading" :disabled="msgBtn.isDisabled">{{msgBtn.getCodeText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div class="user-page-btn">
          <el-form-item>
            <el-button type="success" @click="onSubmit('registerForm')" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
          </el-form-item>
          <el-form-item>已有账号，请<span class="text-blue">登录</span></el-form-item>
        </div>
        <div class="user-page-img"><img src="../assets/img/user_6.png"></div>
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
        nick_name: '',
        phone: '',
        password: '',
        confirm_password: '',
        verify_key: '',
        message_verify_code: '',
      },
      verifyCodeData:{},
      rules: {
        nick_name: [
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
        confirm_password: [
          { required: true, message: '请再次输入你的密码', trigger: 'blur' },
          { pattern: /^\w{6,20}$/, message: '用户名为6-20个字符，支持中文、字母、数字', trigger: 'blur' },
          { validator: checkRepassword, trigger: 'blur' },
        ],
        verify_key: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' }
        ],
        message_verify_code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      },
      msgBtn: {
        getCodeText: '获取验证码',
        isLoading: false,
        isDisabled: false,
      },
      submitBtn: {
        btnText: '下一步',
        isLoading: false,
        isDisabled: false,
      }
    };
  },
  computed: {

  },
  created() {

    this.refreshVaImg();
  },
  methods: {
    refreshVaImg() {
      this.$$http('imageVerifyCode', {}).then((results) => {
        // this.pageLoading = false;
        if (results.data && results.data.code === 0) {
          this.verifyCodeData= results.data.data;
          console.log('results图片',results.data,this.verifyCodeData)
        //   this.tableData = results.data.data.results;
        //   console.log('this.tableData', this.tableData);
        }
      }).catch((err) => {
        // this.pageLoading = false;
      })
    },
    showValue() {
      console.log(this.registerForm.message_verify_code)
    },
    onSubmit(registerForm) {
      let postData = this.registerForm;
      this.submitBtn.isDisabled = true;
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          this.submitBtn.btnText = '注册中';
          this.submitBtn.isLoading = true;
          this.$$http('register', postData).then((results) => {
            console.log('register注册', results.data.data.results);
            setTimeout(() => {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.submitBtn.btnText = '注册';
              this.submitBtn.isLoading = false;
              this.submitBtn.isDisabled = false;
            }, 1000)

          }).catch((err) => {
            // this.pageLoading = false;
          })

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
      this.$$http('messageVerifyCode', { phone: this.registerForm.phone }).then((results) => {
        console.log('results图片', results.data.data.results);
        // this.pageLoading = false;
        if (results.data && results.data.code == 0) {
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
      }).catch((err) => {
        // this.pageLoading = false;
      })




    }
  },
  // created() {

  // }
};

</script>
