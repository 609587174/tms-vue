<style scoped lang="less">


</style>
<template>
  <div>
    <public-header></public-header>
    <div class="user-page" @keyup.enter="onSubmit">
      <div v-if="isRegisterSuccess">
        <div class="user-page-title">注册</div>
        <el-form :model="registerForm" ref="registerForm" status-icon :rules="rules" label-width="120px" class="user-form">
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model.trim="registerForm.name" size="small" type="text" placeholder="请输入你的用户名"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contact_name">
            <el-input v-model.trim="registerForm.contact_name" size="small" type="text" placeholder="请输入你的手机号码"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contact_phone">
            <el-input v-model.trim="registerForm.contact_phone" size="small" type="text" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="公司地址：" prop="area">
            <choose-address :address.sync="address"></choose-address>
            <!-- <el-row :gutter="0">
              <el-col :md="8">
                <el-select v-model="registerForm.detail_address" size="small" placeholder="省">
                  <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-col>
              <el-col :md="8">
                <el-select v-model="registerForm.detail_address" size="small" placeholder="市">
                  <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-col>
              <el-col :md="8">
                <el-select v-model="registerForm.detail_address" size="small" placeholder="区">
                  <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-col>
            </el-row> -->
          </el-form-item>
          <el-form-item prop="detail_address">
            <el-row>
              <el-input v-model.trim="registerForm.detail_address" size="small" type="textarea" :rows="3" placeholder="请输入公司地址"></el-input>
            </el-row>
          </el-form-item>
          <el-form-item label="企业类型：" prop="carrier_type" size="small">
            <el-select v-model="registerForm.carrier_type" size="small" placeholder="请选择">
              <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
            </el-select>
            <div class="user-checked">
              <el-checkbox v-model="checked">我已同意并阅读<span>《用户协议》</span></el-checkbox>
            </div>
          </el-form-item>
          <div class="user-page-btn">
            <el-form-item>
              <el-button type="success" @click="onSubmit('registerForm')" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
            </el-form-item>
            <el-form-item>已有账号，请<span class="text-blue cursor-pointer" v-on:click="linkLogin()">登录</span></el-form-item>
          </div>
          <div class="user-page-img"><img src="../assets/img/user_5.png"></div>
        </el-form>
      </div>
      <div v-if="!isRegisterSuccess">
        <div class="user-page-title">审核中</div>
        <div class="user-register-notice">您的注册信息已提交，请耐心等待系统审核，谢谢！
          <br> 审核后会给您的注册手机号发短信通知
          <br> 审核通过后您可通过用户名/手机号登录系统
          <br> 如有疑问，请联系客服QQ：
          <span class="text-blue">1373724944</span>
        </div>
        <div class="user-page-img text-center"><img src="../assets/img/user_4.png"></div>
      </div>
    </div>
  </div>
</template>
<script>
import chooseAddress from '../components/chooseAddress';
import publicHeader from '../components/publicHeader';
export default {
  components: {
    chooseAddress: chooseAddress,
    publicHeader: publicHeader,
  },
  data() {


    return {
      address: {
        province: '',
        city: '',
        area: '',
      },
      isRegisterSuccess: true,
      registerForm: {
        user_id: '',
        name: '',
        contact_name: '',
        contact_phone: '',
        area: '',
        detail_address: '',
        carrier_type: ''
      },
      checked: true,
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        contact_name: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号码格式不正确，请重新输入', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        detail_address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ],
        carrier_type: [
          { required: true, message: '请选择企业类型', trigger: 'blur' }
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
    carrierType: function() {
      return this.$store.state.common.selectData.carrier_carrier_type;
    },
    user_id: function() {
      return this.$route.query.user_id || '';
    }
  },
  methods: {

    onSubmit(registerForm) {
      console.log('user_id', this.user_id);
      this.registerForm.user_id = this.user_id
      this.registerForm.area = this.address.area
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          if (this.checked) {
            this.submitBtn.isDisabled = true;
            this.submitBtn.btnText = '注册中';
            this.submitBtn.isLoading = true;
            this.$$http('addCarrier', this.registerForm).then((results) => {
              console.log('注册成功', results.data);
              // this.pageLoading = false;
              this.submitBtn.btnText = '注册';
              this.submitBtn.isLoading = false;
              this.submitBtn.isDisabled = false;
              if (results.data && results.data.code == 0) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                setTimeout(() => {

                  this.isRegisterSuccess = false;
                }, 3000)

              }

            }).catch((err) => {
              this.submitBtn.btnText = '注册';
              this.submitBtn.isLoading = false;
              this.submitBtn.isDisabled = false;
            })
          } else {
            this.$message.error('请勾选用户协议');
          }
        } else {
          this.submitBtn.isDisabled = false;
        }
      });


    },
    linkLogin: function() {
      this.$router.push({ path: "login" });
    },
  },

  created() {

  }
};

</script>
