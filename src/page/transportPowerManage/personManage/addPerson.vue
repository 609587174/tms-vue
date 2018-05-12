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
    <el-container>
      <el-header style="margin-top:15px;">
        <p>新增人员</p>
      </el-header>
      <el-main>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">基础人员</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="姓名:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" size="mini" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业类型:" prop="employmentType">
                    <el-select v-model="userForm.employmentType" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in employmentTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码:" prop="phone">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="人员所属:" prop="staffs">
                    <el-select v-model="userForm.staffs" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.staffsSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号:" prop="idNumber">
                    <el-input placeholder="请输入" size="mini" type="text" v-model="userForm.idNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="在职状态:" prop="onTheJobStatus">
                    <el-select v-model="userForm.onTheJobStatus" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="性别:">
                    <el-radio v-model="userForm.gender" label="man">男</el-radio>
                    <el-radio v-model="userForm.gender" label="woman">女</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期:">
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄:">
                    <el-input placeholder="请输入年龄" type="text" size="mini" v-model="userForm.age"></el-input>岁
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="家属姓名:">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.familyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="家属联系方式:" prop="familyContact">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.familyContact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="准驾类型:">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.quasiDriveType"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="所在地区:">
                    <el-row :gutter="0">
                      <el-col :md="8">
                        <el-select v-model="userForm.onTheJobStatus" size="mini" placeholder="省">
                          <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :md="8">
                        <el-select v-model="userForm.onTheJobStatus" size="mini" placeholder="市">
                          <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :md="8">
                        <el-select v-model="userForm.onTheJobStatus" size="mini" placeholder="区">
                          <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="详细地址:">
                    <el-input placeholder="请输入" type="text" size="mini" v-model="userForm.detailedAddress"></el-input>
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
                  <el-button type="success" @click="nextStep()">填写驾驶证件信息</el-button>
                  <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
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
                  <el-form-item label="驾驶证档案编号:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" size="mini" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证初次发证时间:">
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证到期时间:">
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="驾驶证发证机关:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" size="mini" type="text" v-model="userForm.userName"></el-input>
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
                  <el-button type="success" @click="nextStep()">填写从业资格证信息</el-button>
                  <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
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
                  <el-form-item label="从业资格证号:" prop="userName">
                    <el-input :autofocus="true" size="mini" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证证初次发证时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证到期时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="从业资格证发证机关:">
                    <el-input size="mini" :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
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
                  <el-button type="success" @click="nextStep()">填写押运证信息</el-button>
                  <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
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
                  <el-form-item label="押运证号:" prop="userName">
                    <el-input :autofocus="true" size="mini" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运证初次发证时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运证到期时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="押运证发证机关:">
                    <el-input :autofocus="true" size="mini" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
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
                  <el-button type="success" @click="nextStep()">填写劳务信息</el-button>
                  <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
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
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="上岗日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下岗日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="合同起始日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同截止日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="转正日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="体检日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="体检备注:">
                    <el-input :autofocus="true" placeholder="请输入" type="textarea" :rows="4" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" @click="nextStep()">填写培训信息</el-button>
                  <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
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
                  <el-button type="success" size="mini">新增一条</el-button>
                </el-col>
              </el-row>
            </div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addClientFormSetpSix" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="培训时间:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训内容:">
                    <el-input size="mini" :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训考核:">
                    <el-input size="mini" :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="考核结果:">
                    <el-input size="mini" :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注:">
                    <el-input :autofocus="true" placeholder="请输入" type="textarea" :rows="4" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
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
  name: 'addPerson',
  computed: {
    employmentTypeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      activeStep: 0,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      userForm: {
        userName: '', //姓名
        employmentType: '', //从业类型
        phone: '', //手机号码
        staffs: '', //人员所属
        idNumber: '', //身份证号码
        onTheJobStatus: '', //在职状态
        gender: 'man', //性别
        birthDate: '', //出生日期
        age: '', //年龄
        familyName: '', //家属姓名
        familyContact: '', //家属联系方式
        quasiDriveType: '', //准驾类型
        region: {
          province: '',
          city: '',
          area: ''
        }, //所在地区
        detailedAddress: '', //详细地址
        idImg: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }], //身份证照片

      },

      selectData: {
        clientTypeSelect: [
          { id: '1', value: '自有车辆' },
          { id: '2', value: '平台客户' },
        ],
        staffsSelect: [
          { id: '1', value: '自有车辆人员' },
          { id: '2', value: '三方车辆人员' }
        ],
        onTheJobStatusSelect: [
          { id: '1', value: '在职' },
          { id: '2', value: '离职' }
        ],
      },
      rules: {
        userName: [ //姓名
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        employmentType: [ //从业类型
          { required: true, message: '请选择从业类型', trigger: 'blur' }
        ],
        phone: [ //手机号码
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入手机号码', trigger: 'blur' }
        ],
        staffs: [ //人员所属
          { required: true, message: '请选择人员所属', trigger: 'blur' },
        ],
        idNumber: [ //身份证号码
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入18位身份证号码', trigger: 'blur' }
        ],
        onTheJobStatus: [ //在职状态
          { required: true, message: '请选择在职状态', trigger: 'blur' },
        ],
        familyContact: [ //家属联系方式
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入手机号码', trigger: 'blur' }
        ],
      },
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      }
    }
  },
  created() {
    console.log(this);
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    nextStep() {
      this.activeStep += 1;
    },
    goOtherSetp() {
      this.nextStepBtn.isDisabled = true;
      this.$refs['addClientFormSetpOne'].validate((valid) => {
        if (valid) {
          this.nextStepBtn.btnText = '正在提交';
          this.nextStepBtn.isLoading = true;
          //没有准驾类型，和省市区，还有身份证图片。
          let postData = {
            name: this.userForm.userName, //姓名
            work_type: this.userForm.employmentType, //从业类型
            mobile_phone: this.userForm.phone, //手机号码
            staff_type: this.userForm.staffs, //人员所属
            id_number: this.userForm.idNumber, //手机号码
            on_job_status: this.userForm.onTheJobStatus, //在职状态
            gender: this.userForm.gender, //性别
            birthday: this.userForm.birthDate, //性别
            age: this.userForm.age, //年龄
            family_menber_name: this.userForm.family_menber_name, //家属姓名
            family_menber_phone: this.userForm.familyContact, //家属姓名
            quasiDriveType: this.userForm.quasiDriveType, //家属姓名
            //area:this.userForm.region,//所在地区
            detail_address: this.userForm.detailedAddress, //详细地址
          }

          this.$$http('addDrivers', postData).then((results) => {
            console.log('results', results);
            if (results.data && results.data.code == 0 && results.data.data) {
              this.$router.push({ path: "/transportPowerManage/personManage/personDetail", query: { id: results.data.data.id } });
            }
          })

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
