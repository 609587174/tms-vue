<style scoped lang="less">
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
                    <el-input placeholder="请输入" size="mini" type="text" v-model="userForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业类型:" prop="work_type">
                    <el-select v-model="userForm.work_type" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in employmentTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码:" prop="mobile_phone">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.mobile_phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="人员所属:" prop="staff_type">
                    <el-select v-model="userForm.staff_type" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in staffsSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号:" prop="id_number">
                    <el-input placeholder="请输入" size="mini" type="text" v-model="userForm.id_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="在职状态:">
                    <el-radio v-model="userForm.on_job_status" label="OFF_JOB">离职</el-radio>
                    <el-radio v-model="userForm.on_job_status" label="ON_JOB">在职</el-radio>
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
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄:">
                    <el-input placeholder="请输入年龄" type="text" size="mini" v-model="userForm.age"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="家属姓名:">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.family_member_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="家属联系方式:" prop="family_member_phone">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.family_member_phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="准驾类型:">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.drive_license_allow_type"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="所在地区:">
                    <choose-address :address.sync="userForm.address"></choose-address>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="详细地址:">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.detail_address"></el-input>
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
                  <el-button type="success" @click="goAddDriverLicense()" :loading="addDriverLicenseBtn.isLoading" :disabled="addDriverLicenseBtn.isDisabled">{{addDriverLicenseBtn.btnText}}</el-button>
                  <el-button type="primary" @click="saveBasicAndReview()" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <div class="detail-form-title text-center">驾驶证件信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addClientFormSetpTow" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="驾驶证档案编号:" prop="drive_license_number">
                    <el-input placeholder="请输入" size="mini" type="text" v-model="userForm.drive_license_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证初次发证时间:">
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.drive_license_issue_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证到期时间:">
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.drive_license_due_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="驾驶证发证机关:">
                    <el-input :autofocus="true" placeholder="请输入" size="mini" type="text" v-model="userForm.drive_license_issue_organ"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证:">
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
                  <el-button type="success" @click="addCertificate()" :loading="addCertificateBtn.isLoading" :disabled="addCertificateBtn.isDisabled">{{addCertificateBtn.btnText}}</el-button>
                  <el-button type="primary" @click="saveDriverLicenseAndReview()" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==2">
            <div class="detail-form-title text-center">从业资格证信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addClientFormSetpThree" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="从业资格证号:" prop="qualification_certificate_number">
                    <el-input size="mini" placeholder="请输入" type="text" v-model="userForm.qualification_certificate_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证证初次发证时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.qualification_certificate_issue_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证到期时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.qualification_certificate_due_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="从业资格证发证机关:">
                    <el-input size="mini" :autofocus="true" placeholder="请输入" type="text" v-model="userForm.qualification_certificate_issue_organ"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证:">
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
                  <el-button type="success" @click="addEscort()" :loading="addEscortBtn.isLoading" :disabled="addEscortBtn.isDisabled">{{addEscortBtn.btnText}}</el-button>
                  <el-button type="primary" @click="addCertificateAndReview()" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==3">
            <div class="detail-form-title text-center">押运证信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addClientFormSetpFour" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="押运证号:" prop="escort_license_number">
                    <el-input :autofocus="true" size="mini" placeholder="请输入" type="text" v-model="userForm.escort_license_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运证初次发证时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.escort_license_issue_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运证到期时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.escort_license_due_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="押运证发证机关:">
                    <el-input :autofocus="true" size="mini" placeholder="请输入" type="text" v-model="userForm.escort_license_issue_organ"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证:">
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
                  <el-button type="success" @click="addLabour()" :loading="addLabourBtn.isLoading" :disabled="addLabourBtn.isDisabled" ng-app="string">{{addLabourBtn.btnText}}</el-button>
                  <el-button type="primary" @click="saveEscortAndReview()" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==4">
            <div class="detail-form-title text-center">劳务信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addClientFormSetpFive" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="录用日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.labour_employ_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="上岗日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.labour_on_work_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下岗日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.labour_off_work_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="合同起始日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.contract_start_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同截止日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.contract_due_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="转正日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.contract_correct_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="体检日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.heath_examination_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="体检备注:">
                    <el-input :autofocus="true" placeholder="请输入" type="textarea" :rows="4" v-model="userForm.heath_examination_remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" @click="addTraining()" :loading="addTrainingBtn.isLoading" :disabled="addTrainingBtn.isDisabled">{{addTrainingBtn.btnText}}</el-button>
                  <el-button type="primary" @click="saveLabourAndReview()" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==5">
            <div class="detail-form-title ">
              <el-row :gutter="40">
                <el-col :span="12" :offset="6" class="text-center">
                  培训信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="success" size="mini" @click="addNewTraining">新增一条</el-button>
                </el-col>
              </el-row>
            </div>
            <el-form class="addheaduserform detail-form" v-for="(item,key) in userForm.carrier_driver_trainings" :key="key" label-width="120px" ref="addClientFormSetpSix" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="12" :offset="6" class="text-center">
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="success" size="mini" @click="delTraining(key)" :loading="item.isLoading" :disabled="item.isDisabled">删除</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="培训时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.entry_training_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训内容:">
                    <el-input size="mini" placeholder="请输入" type="text" v-model="item.entry_training_content"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训考核:">
                    <el-input size="mini" :autofocus="true" placeholder="请输入" type="text" v-model="item.entry_training_exam"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="考核结果:">
                    <el-input size="mini" :autofocus="true" placeholder="请输入" type="text" v-model="item.entry_training_exam_result"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注:">
                    <el-input :autofocus="true" placeholder="请输入" type="textarea" :rows="4" v-model="item.entry_training_remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row v-show="!userForm.carrier_driver_trainings.length">
              <el-col :span="12" :offset="6" class="text-center">
                <br>
                <br> 暂无数据
                <br>
                <br>
              </el-col>
            </el-row>
            <div class="detail-btn" v-show="userForm.carrier_driver_trainings.length">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="saveTrainingAndReview()" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
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
import chooseAddress from '../../../components/chooseAddress'
export default {
  name: 'addPerson',
  components: {
    chooseAddress: chooseAddress,
  },
  computed: {
    employmentTypeSelect: function() {
      return this.$store.state.common.selectData.carrier_driver_work_type;
    },
    staffsSelect: function() {
      return this.$store.state.common.selectData.carrier_driver_staff_type;
    },
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
    id: function() {
      return this.$route.query.id || '';
    },
    titleType: function() {
      return this.$route.query.id ? '编辑人员' : '新增人员';
    }
  },
  data() {
    return {
      pageLoading: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      userForm: {
        /* 基础信息 */
        name: '', //姓名
        work_type: '', //从业类型
        mobile_phone: '', //手机号码
        staff_type: '', //人员所属
        id_number: '', //身份证号码
        on_job_status: 'ON_JOB', //在职状态
        gender: 'MALE', //性别
        birthDate: '', //出生日期
        age: '', //年龄
        family_member_name: '', //家属姓名
        family_member_phone: '', //家属联系方式
        drive_license_allow_type: '', //准驾类型
        address: {
          province: '',
          city: '',
          area: '',
        },
        detail_address: '', //详细地址
        idImg: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }], //身份证照片
        /* 驾驶证件信息 */
        drive_license_number: '',
        drive_license_issue_date: '',
        drive_license_due_date: '',
        drive_license_issue_organ: '',
        /* 从业资格证信息 */
        qualification_certificate_number: '', //从业资格证号
        qualification_certificate_issue_date: '', //从业资格证初次发证日期
        qualification_certificate_due_date: '', //从业资格证初次到期日期
        qualification_certificate_issue_organ: '', //从业资格证发证机关
        /* 押运证信息 */
        escort_license_number: '', //押运证证号
        escort_license_issue_date: '', //押运证初次发证日期
        escort_license_due_date: '', //押运证初次到期日期
        escort_license_issue_organ: '', //押运证发证机关
        /* 劳务信息信息 */
        labour_employ_date: '', //录用日期
        labour_on_work_date: '', //上岗日期
        labour_off_work_date: '', //下岗日期
        contract_start_date: '', //合同开始日期
        contract_due_date: '', //合同结束日期
        contract_correct_date: '', //合同转正日期
        heath_examination_date: '', //体检日期
        heath_examination_remark: '', //体检备注
        carrier_driver_trainings: [], //驾驶人员培训
      },

      selectData: {
        clientTypeSelect: [
          { id: '1', value: '自有车辆' },
          { id: '2', value: '平台客户' },
        ],
      },
      rules: {
        name: [ //姓名
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        employmentType: [ //从业类型
          { required: true, message: '请选择从业类型', trigger: 'blur' }
        ],
        mobile_phone: [ //手机号码
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入手机号码', trigger: 'blur' }
        ],
        staffs: [ //人员所属
          { required: true, message: '请选择人员所属', trigger: 'blur' },
        ],
        id_number: [ //身份证号码
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入18位身份证号码', trigger: 'blur' }
        ],
        on_job_status: [ //在职状态
          { required: true, message: '请选择在职状态', trigger: 'blur' },
        ],
        family_member_phone: [ //家属联系方式
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入手机号码', trigger: 'blur' }
        ],

        drive_license_number: [ //驾驶证档案编号
          { required: true, message: '请输入驾驶证档案编号', trigger: 'blur' },
        ],

        qualification_certificate_number: [ //从业资格证号
          { required: true, message: '请输入从业资格证号', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]{18,19}$/, message: '从业资格证号为18~19位字段，支持字母、数字', trigger: 'blur' }
        ],

        escort_license_number: [ //押运证证号
          { required: true, message: '请输入押运证证号', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]{18,19}$/, message: '押运证证号为18~19位字段，支持字母、数字', trigger: 'blur' }
        ],


      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      addDriverLicenseBtn: {
        isLoading: false,
        btnText: '填写驾驶证信息',
        isDisabled: false,
      },
      addCertificateBtn: {
        isLoading: false,
        btnText: '填写从业资格证',
        isDisabled: false,
      },
      addEscortBtn: {
        isLoading: false,
        btnText: '填写押运员信息',
        isDisabled: false,
      },
      addLabourBtn: {
        isLoading: false,
        btnText: '填写劳务信息',
        isDisabled: false,
      },
      addTrainingBtn: {
        isLoading: false,
        btnText: '填写培训信息',
        isDisabled: false,
      },

    }
  },
  created() {
    if (this.id) {
      this.getDetail();
    }
    console.log('this', this, typeof null, typeof undefined, typeof '', null === null);
  },
  methods: {
    addNewTraining: function() {
      let newTraining = {
        entry_training_date: null,
        entry_training_content: '',
        entry_training_exam: '',
        entry_training_exam_result: '',
        entry_training_remark: '',
        isDefault: false,
        isLoading: false,
        isDisabled: false,
      }
      this.userForm.carrier_driver_trainings.push(newTraining);
    },
    delTraining: function(index) {
      console.log('index', index, this.userForm.carrier_driver_trainings[index]);
      if (this.userForm.carrier_driver_trainings[index].isDefault) {
        this.userForm.carrier_driver_trainings[index].isLoading = true;
        this.userForm.carrier_driver_trainings[index].isDisabled = true;
        this.$$http('deleteDriverTraining', { id: this.id, carrier_driver_training_id: this.userForm.carrier_driver_trainings[index].id }).then((results) => {
          this.userForm.carrier_driver_trainings[index].isLoading = false;
          this.userForm.carrier_driver_trainings[index].isDisabled = false;
          console.log('results', results);
          if (results.data && results.data.code == 0 && results.data.data) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.userForm.carrier_driver_trainings.splice(index, 1);
          }
        }).catch((err) => {
          this.userForm.carrier_driver_trainings[index].isLoading = false;
          this.userForm.carrier_driver_trainings[index].isDisabled = false;
        })
      } else {
        this.userForm.carrier_driver_trainings.splice(index, 1);
      }
      console.log('index', index);
    },
    saveTrainingAndReview: function() {
      let btnObject = this.saveBasicAndReviewBtn;
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'patchDrivers';
      btnObject.isDisabled = true;

      let postData = {
        carrier_driver_trainings: [],
        carrier_driver_trainings_add: [],
      }

      for (let i in this.userForm.carrier_driver_trainings) {
        let keyArray = ['entry_training_content', 'entry_training_date', 'entry_training_exam', 'entry_training_exam_result', 'entry_training_remark'];
        let carrier_driver_trainings = this.pbFunc.fifterbyArr(this.userForm.carrier_driver_trainings[i], keyArray);
        if (this.userForm.carrier_driver_trainings[i].default) {
          postData.carrier_driver_trainings.push(carrier_driver_trainings);
        } else {
          postData.carrier_driver_trainings_add.push(carrier_driver_trainings);
        }
      }
      if (!postData.carrier_driver_trainings.length) {
        delete postData.carrier_driver_trainings
      }
      if (!postData.carrier_driver_trainings_add.length) {
        delete postData.carrier_driver_trainings_add
      }

      postData.id = this.id;


      btnObject.btnText = '正在提交';
      btnObject.isLoading = true;

      console.log('postData', postData);
      //postData = this.pbFunc.fifterObjIsNull(postData);
      this.$$http(apiName, postData).then((results) => {
        btnObject.btnText = btnTextCopy;
        btnObject.isLoading = false;
        btnObject.isDisabled = false;
        console.log('results', results);
        if (results.data && results.data.code == 0 && results.data.data) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.$router.push({ path: "/transportPowerManage/personManage/personDetail", query: { id: results.data.data.id } });
        }
      }).catch((err) => {
        btnObject.btnText = btnTextCopy;
        btnObject.isLoading = false;
        btnObject.isDisabled = false;
      })

    },
    getDetail: function() {
      this.pageLoading = true;
      this.$$http('getDriversDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.pageLoading = false;
          this.detailData = results.data.data;
          this.detailData.gender = this.detailData.gender ? this.detailData.gender.key : 'MALE';
          this.detailData.on_job_status = this.detailData.on_job_status ? this.detailData.on_job_status.key : 'ON_JOB';
          this.detailData.staff_type = this.detailData.staff_type ? this.detailData.staff_type.key : '';
          this.detailData.work_type = this.detailData.work_type ? this.detailData.work_type.key : '';
          this.userForm = this.detailData;
          this.detailData.address = {
            province: '',
            city: '',
            area: '',
          }

          for (let i in this.detailData.carrier_driver_trainings) {
            this.detailData.carrier_driver_trainings[i].isDefault = true;
            this.detailData.carrier_driver_trainings[i].isDisabled = false;
            this.detailData.carrier_driver_trainings[i].isLoading = false;
          }

          let areaCopy = null;
          if (this.detailData.area) {
            areaCopy = this.pbFunc.deepcopy(this.detailData.area);
          }
          this.detailData.address.province = areaCopy.id ? areaCopy.id : '';
          this.detailData.address.city = (areaCopy.city && areaCopy.city.id) ? areaCopy.city.id : '';
          this.detailData.address.area = (areaCopy.city && areaCopy.city.county) ? areaCopy.city.county.id : '';

          console.log('this.detailDta', results.data.data);
        }
      })
    },
    goDetalis() {
      if (this.id) {
        this.$router.push({
          path: "/transportPowerManage/personManage/personDetail",
          query: { id: this.id }
        });
      } else {
        this.$router.push({
          path: "/transportPowerManage/personManage/personListManage"
        })

      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    addPersonAjax(postData, formName, btnObject, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      console.log('btnTextCopy', btnTextCopy);
      console.log('postData', postData);
      let apiName = 'addDrivers';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 如果id存在则为编辑 */
          if (this.id) {
            postData.id = this.id;
            apiName = 'patchDrivers';
          }

          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;

          //postData = this.pbFunc.fifterObjIsNull(postData);

          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
            console.log('results', results);
            if (results.data && results.data.code == 0 && results.data.data) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              if (isReview) {
                this.$router.push({ path: "/transportPowerManage/personManage/personDetail", query: { id: results.data.data.id } });
              } else {
                let nextActiveStep = parseInt(this.activeStep) + 1;
                let id = results.data.data.id;
                this.$router.push({ path: "/transportPowerManage/personManage/addPerson", query: { activeStep: nextActiveStep, id: id } });
              }
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
    goAddDriverLicense() {
      console.log('this.userForm', this.userForm.birthDate);

      let formName = 'addClientFormSetpOne';
      let btnObject = this.addDriverLicenseBtn;
      let keyArray = ['name', 'work_type', 'mobile_phone', 'staff_type', 'id_number', 'on_job_status', 'gender', 'birthday', 'age', 'family_member_name', 'family_member_phone', 'drive_license_allow_type', 'detail_address'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      postData.area = this.userForm.address.area || this.userForm.address.city || '';
      this.addPersonAjax(postData, formName, btnObject);
    },
    saveBasicAndReview() {
      let formName = 'addClientFormSetpOne';
      let btnObject = this.saveBasicAndReviewBtn;
      let keyArray = ['name', 'work_type', 'mobile_phone', 'staff_type', 'id_number', 'on_job_status', 'gender', 'birthday', 'age', 'family_member_name', 'family_member_phone', 'drive_license_allow_type', 'detail_address'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      postData.area = this.userForm.address.area || this.userForm.address.city || '';
      this.addPersonAjax(postData, formName, btnObject, true);
    },
    addCertificate() {
      let formName = 'addClientFormSetpTow';
      let btnObject = this.addCertificateBtn;
      let keyArray = ['drive_license_number', 'drive_license_issue_date', 'drive_license_due_date', 'drive_license_issue_organ'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject);
    },
    saveDriverLicenseAndReview() {
      let formName = 'addClientFormSetpTow';
      let btnObject = this.saveBasicAndReviewBtn;
      let keyArray = ['drive_license_number', 'drive_license_issue_date', 'drive_license_due_date', 'drive_license_issue_organ'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject, true);
    },
    addEscort() {
      let formName = 'addClientFormSetpThree';
      let btnObject = this.addEscortBtn;
      let keyArray = ['qualification_certificate_number', 'qualification_certificate_issue_date', 'qualification_certificate_due_date', 'qualification_certificate_issue_organ'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject);
    },
    addCertificateAndReview() {
      let formName = 'addClientFormSetpThree';
      let btnObject = this.saveBasicAndReviewBtn;
      let keyArray = ['qualification_certificate_number', 'qualification_certificate_issue_date', 'qualification_certificate_due_date', 'qualification_certificate_issue_organ'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject, true);
    },
    addLabour() {
      let formName = 'addClientFormSetpFour';
      let btnObject = this.addLabourBtn;
      let keyArray = ['escort_license_number', 'escort_license_issue_date', 'escort_license_due_date', 'escort_license_issue_organ'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject);
    },
    saveEscortAndReview() {
      let formName = 'addClientFormSetpFour';
      let btnObject = this.saveBasicAndReviewBtn;
      let keyArray = ['escort_license_number', 'escort_license_issue_date', 'escort_license_due_date', 'escort_license_issue_organ'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject, true);
    },
    addTraining() {
      let formName = 'addClientFormSetpFive';
      let btnObject = this.addTrainingBtn;
      let keyArray = ['labour_employ_date', 'labour_on_work_date', 'labour_off_work_date', 'contract_start_date', 'contract_due_date', 'contract_correct_date', 'heath_examination_date', 'heath_examination_remark'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject);
    },
    saveLabourAndReview() {
      let formName = 'addClientFormSetpFive';
      let btnObject = this.saveBasicAndReviewBtn;
      let keyArray = ['labour_employ_date', 'labour_on_work_date', 'labour_off_work_date', 'contract_start_date', 'contract_due_date', 'contract_correct_date', 'heath_examination_date', 'heath_examination_remark'];
      let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
      this.addPersonAjax(postData, formName, btnObject, true);
    }

  }
}

</script>
