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
  <div id="addPerson" class="detail-mian">
    <el-container v-loading="pageLoading">
      <el-header style="margin-top:15px;">
        <el-row>
          <el-col :span="1" class="left-arrow-d" @click="goDetalis()"><i class="icon-down-arrow"></i></el-col>
          <el-col :span="22">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">基础人员</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="姓名:" prop="name">
                    <el-input placeholder="请输入" type="text" v-model="userForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业类型:" prop="work_type">
                    <el-select v-model="userForm.work_type" placeholder="请选择">
                      <el-option v-for="(item,key) in employmentTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码:" prop="mobile_phone">
                    <el-input placeholder="请输入" type="text" v-model="userForm.mobile_phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="人员所属:" prop="staff_type">
                    <el-select v-model="userForm.staff_type" placeholder="请选择">
                      <el-option v-for="(item,key) in staffsSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号:" prop="id_number">
                    <el-input placeholder="请输入" type="text" v-model="userForm.id_number" :disabled="notEdit" @blur="dealIdNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="在职状态:">
                    <el-radio v-model="userForm.on_job_status" label="ON_JOB">在职</el-radio>
                    <el-radio v-model="userForm.on_job_status" label="OFF_JOB">离职</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="性别:">
                    <el-radio v-model="userForm.gender" label="MALE">男</el-radio>
                    <el-radio v-model="userForm.gender" label="FEMALE">女</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthday" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄:">
                    <el-input placeholder="请输入年龄" type="text" v-model="userForm.age"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="家属姓名:" prop="family_member_name">
                    <el-input placeholder="请输入" type="text" v-model="userForm.family_member_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="家属联系方式:" prop="family_member_phone">
                    <el-input placeholder="请输入" type="text" v-model="userForm.family_member_phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="准驾类型:">
                    <el-input placeholder="请输入" type="text" v-model="userForm.drive_license_allow_type"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="所在地区:">
                    <choose-address :address.sync="userForm.address" v-on:chooseProvince="chooseProvincecopy"></choose-address>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="详细地址:">
                    <el-input placeholder="请输入" type="text" v-model="userForm.detail_address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证:">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview
                    " :on-remove="handleRemove" :file-list="userForm.idImg" list-type="picture">
                      <el-button size="small" type="primary" plain>上传图片</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" @click="goAddDriverLicense()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
                  <el-button type="primary" @click="saveBasicAndReview()" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
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
export default {
  name: 'addCarHeadManage',
  data() {
    return {
      activeStep: 0,
      pageLoading: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      customerMsgForm: {
        name: '',
        contact_name: '',
        contact_phone: '',
        detail_address: '',
        deficiency_standard: '',
        free_hour: '',
        overtime_price: '',
        license3in1_code: '',
        license_code: '',
        license_pic: ''
      },
      selectData: {
        clientTypeSelect: [
          { id: '1', value: '自有车辆' },
          { id: '2', value: '平台客户' },
        ],
      },
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
        ],
        contact_name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入座机号或者手机号', trigger: 'blur' }
        ],

      },
      nextStepBtn: {
        isLoading: false,
        btnText: '下一步',
        isDisabled: false,
      }
    }
  },
  created() {
    console.log(this);
  },
  methods: {
    goOtherSetp() {
      this.nextStepBtn.isDisabled = true;
      this.$refs['addClientFormSetpOne'].validate((valid) => {
        if (valid) {
          this.nextStepBtn.btnText = '正在提交';
          this.nextStepBtn.isLoading = true;

          setTimeout(() => {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.nextStepBtn.btnText = '下一步';
            this.nextStepBtn.isLoading = false;
            this.nextStepBtn.isDisabled = false;
          }, 1000)
        } else {
          this.nextStepBtn.isDisabled = false;
        }
      });
    },
  }
}

</script>
