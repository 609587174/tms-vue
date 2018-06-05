<!-- editCompany.vue -->
<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin: 0 0;
}

.addheadcarform {
  margin: 30px 5%;
  .el-input {
    width: 250px;
  }
  .el-select {
    width: 250px;
  }
}

#addClientForm {
  border: 1px solid rgb(222, 222, 222);
}

.alone-insurance-form {
  border: 1px solid rgb(222, 222, 222);
  border-top: none;
  padding: 30px 30px 0 20px;
}

.insurance-form-head {
  background-color: #f1f1f1;
  height: 41px;
  line-height: 41px;
}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header style="margin-top:15px;">
        <el-row>
          <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回</span></span>
          </el-col>
          <el-col :span="20">
            <p>编辑企业信息</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">企业基础信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="企业名称：" prop="name">
                    <el-input v-model.trim="editMsgForm.name" type="text" placeholder="请输入企业名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人：" prop="contact_name">
                    <el-input v-model.trim="editMsgForm.contact_name" type="text" placeholder="请输入联系人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话：" prop="contact_phone">
                    <el-input v-model.trim="editMsgForm.contact_phone" type="text" placeholder="请输入电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="公司地址：" prop="area">
                    <choose-address :address.sync="address"></choose-address>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="详细地址：" prop="detail_address">
                    <el-input v-model.trim="editMsgForm.detail_address" placeholder="请输入公司地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业类型：" prop="carrier_type">
                    <el-select v-model="editMsgForm.carrier_type" placeholder="请选择">
                      <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="社会机构代码:" prop="codeMsg">
                    <el-row>
                      <el-col :span="10">
                        <el-select v-model="editMsgForm.code" @change="codeTab" placeholder="请选择" :disabled="editMsgForm.code==='license3in1_code'&&editMsgForm.codeMsg?true:false">
                          <el-option v-for="(item,key) in selectData.codeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="14">
                        <el-input placeholder="请输入" type="text" v-model="editMsgForm.codeMsg"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button type="primary" @click="editBasics(saveBasicAndReviewBtn,'out')" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import chooseAddress from '@/components/chooseAddress';
export default {
  name: 'editPages',
  components: {
    chooseAddress: chooseAddress
  },
  computed: {
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
    carrierType: function() {
      return this.$store.state.common.selectData.carrier_carrier_type;
    },
    users: function() {

      return this.pbFunc.getLocalData('users', true);
    }
  },
  data() {
    return {
      address: {
        province: '',
        city: '',
        area: '',
      },
      pageLoading: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      addType: 'OWN',
      selectCustomer: '',
      editMsgForm: {
        name: '',
        contact_name: '',
        contact_phone: '',
        area: '',
        detail_address: '',
        carrier_type: '',
        code: 'license_code',
        codeMsg: ''
      },
      sociology: [
        { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
        { pattern: /^([A-Z0-9]{18})$/, message: '由18位数字和大写字母组成', trigger: 'blur' }
      ],
      structure: [
        { required: true, message: '请输入组织机构代码', trigger: 'blur' },
        { pattern: /^([A-Z0-9]{9})$/, message: '由9位数字和大写字母组成', trigger: 'blur' }
      ],
      selectData: {
        codeSelect: [
          { id: 'license_code', value: '统一社会机构代码（三合一）' },
          { id: 'organization_code', value: '组织机构代码（非三合一）' },
        ],
        addTypeSelect: [
          { id: 'OWN', value: '默认新增' },
          { id: 'PLAT', value: '选择已有' },
        ],
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z]{4,30}$/, message: '企业名称为中文、英文，不能输入数字、标点符号，4-30个字符', trigger: 'blur' },
        ],
        contact_name: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z]{2,20}$/gi, message: '联系人为2-20个字符，支持中文、字母', trigger: 'blur' },
        ],
        contact_phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /(^(\(0\d{2}\)|0\d{2}-|\s)?\d{7,8}$)|(^1\d{10}$)/, message: '手机或座机号格式不正确，请重新输入', trigger: 'blur' } ///^\d{3,4}-?\d{7,8}$/=====/^((0\d{2,3}-\d{7,8})|(1\d{10}$))$/
        ],
        area: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        detail_address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' },
          { min: 4, max: 100, message: '请输入4-100字符', trigger: 'blur' }
        ],
        carrier_type: [
          { required: true, message: '请选择企业类型', trigger: 'blur' }
        ],
        codeMsg: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { pattern: /^([A-Z0-9]{18})$/, message: '由18位数字和大写字母组成', trigger: 'blur' }
        ]

      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并下一步',
        isDisabled: false,
      },
      detail: {},
      customerList: [],
      isDisabled: false
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    codeTab() {
      this.editMsgForm.codeMsg = '';
      this.$refs['addFormSetpOne'].clearValidate();
      if (this.editMsgForm.code === 'license_code') {
        this.rules.codeMsg = this.sociology;
      } else {
        this.rules.codeMsg = this.structure;
      }
    },
    returnToPage: function() {
      if (this.$route.query.id) {
        this.$router.push({ path: "/clientManage/clientManageSecond/clientDetail", query: { id: this.$route.query.id } });
      } else {
        this.$router.push({ path: "/clientManage/clientManageSecond/privateClientManage" });
      }
    },
    getDetail: function() {
      this.$$http('getCompany', { carrier_id: this.users.carrier.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;

          if (this.detail.customer_type === 'PLAT') {
            this.isDisabled = true;

          }
          this.editMsgForm = {
            name: this.detail.name,
            contact_name: this.detail.contact_name,
            contact_phone: this.detail.contact_phone,
            area: '',
            detail_address: this.detail.detail_address,
            carrier_type: this.detail.carrier_type.key,
            code: this.detail.organization_code ? 'organization_code' : 'license_code',
            codeMsg: this.detail.organization_code ? this.detail.organization_code : this.detail.license_code
          }
          this.address = {
            province: this.detail.area.id,
            city: this.detail.area.city.id,
            area: this.detail.area.city.county.id,
          };
          if (this.editMsgForm.code === 'license_code') {
            this.rules.codeMsg = this.sociology;
          } else {
            this.rules.codeMsg = this.structure;
          }
        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      console.log('btnTextCopy', btnTextCopy);
      console.log('postData', postData);
      let apiName = 'updateCompany';
      btnObject.isDisabled = true;
      this.editMsgForm.area = this.address.area;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;
          postData.id = this.users.carrier.id;
          postData.area =this.address.area;
          postData.user_id = this.users.id;
          console.log('修改企业详细', postData);
          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
            if (results.data && results.data.code == 0 && results.data.data) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.push({ path: "/setting/company/pages" });
            }
          }).catch((err) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
          })
        } else {
          btnObject.isDisabled = false;
        }
      });
    },
    editBasics(btn, btnType) {
      console.log('this.userForm', this.editMsgForm);

      let formName = 'addFormSetpOne';
      let btnObject = btn;
      let keyArray = ['name', 'contact_name', 'contact_phone', 'area', 'detail_address', 'carrier_type'];
      if (this.editMsgForm.code === 'license_code') {
        this.editMsgForm.license_code = this.editMsgForm.codeMsg;
        keyArray.push('license_code');
      } else if (this.editMsgForm.code === 'organization_code') {
        this.editMsgForm.organization_code = this.editMsgForm.codeMsg;
        keyArray.push('organization_code');
      }

      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      console.log('postData', postData);

      postData.customer_type = 'OWN'
      console.log('postDataNew', postData);
      if (btnType === 'next') {
        this.editAjax(postData, formName, btnObject, 2);
      } else if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },
    // editUnload(btn) {
    //   console.log('this.userForm', this.editMsgForm);

    //   let formName = 'addFormSetpTwo';
    //   let btnObject = btn;
    //   let keyArray = ['free_hour', 'overtime_price'];
    //   let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
    //   this.editAjax(postData, formName, btnObject, null, true);
    // },

  }
}

</script>
