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
    width: 100%;
  }
  .el-select {
    width: 100%;
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
  <div id="addClientForm">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>新增人员</p>
      </el-header>
      <el-main>
        <el-steps :active="activeStep" align-center finish-status="success">
          <el-step title="步骤1" description="基础信息"></el-step>
          <el-step title="步骤2" description="运费约定"></el-step>
        </el-steps>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==5">
            <el-form class="addheadcarform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="姓名:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业类型:" prop="employmentType">
                    <el-select v-model="userForm.employmentType" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.employmentTypeSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码:" prop="phone">
                    <el-input placeholder="请输入" type="text" v-model="userForm.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="人员所属:" prop="staffs">
                    <el-select v-model="userForm.staffs" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.staffsSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号:" prop="idNumber">
                    <el-input placeholder="请输入" type="text" v-model="userForm.idNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="在职状态:" prop="onTheJobStatus">
                    <el-select v-model="userForm.onTheJobStatus" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="性别:">
                    <el-radio v-model="userForm.gender" label="man">男</el-radio>
                    <el-radio v-model="userForm.gender" label="woman">女</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄:">
                    <el-input placeholder="请输入年龄" type="text" v-model="userForm.age"></el-input>岁
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="家属姓名:">
                    <el-input placeholder="请输入" type="text" v-model="userForm.familyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="家属联系方式:" prop="familyContact">
                    <el-input placeholder="请输入" type="text" v-model="userForm.familyContact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="准驾类型:">
                    <el-input placeholder="请输入" type="text" v-model="userForm.quasiDriveType"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="所在地区:">
                    <el-row :gutter="0">
                      <el-col :md="8">
                        <el-select v-model="userForm.onTheJobStatus" placeholder="请选择">
                          <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :md="8">
                        <el-select v-model="userForm.onTheJobStatus" placeholder="请选择">
                          <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :md="8">
                        <el-select v-model="userForm.onTheJobStatus" placeholder="请选择">
                          <el-option v-for="(item,key) in selectData.onTheJobStatusSelect" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="详细地址:">
                    <el-input placeholder="请输入" type="text" v-model="userForm.detailedAddress"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证:">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview
                    " :on-remove="handleRemove" :file-list="userForm.idImg" list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="11">
                <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <el-form class="addheadcarform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="驾驶证档案编号:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证初次发证时间:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证到期时间:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="驾驶证发证机关:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证:">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview
                    " :on-remove="handleRemove" :file-list="userForm.idImg" list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
              </el-col>
              <el-col :span="6" :offset="11">
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==2">
            <el-form class="addheadcarform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="从业资格证号:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证证初次发证时间:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证到期时间:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="从业资格证发证机关:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证:">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview
                    " :on-remove="handleRemove" :file-list="userForm.idImg" list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
              </el-col>
              <el-col :span="6" :offset="11">
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==3">
            <el-form class="addheadcarform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="押运证号:" prop="userName">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运证初次发证时间:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运证到期时间:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="押运证发证机关:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="从业资格证:">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview
                    " :on-remove="handleRemove" :file-list="userForm.idImg" list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
              </el-col>
              <el-col :span="6" :offset="11">
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==4">
            <el-form class="addheadcarform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="录用日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="上岗日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下岗日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="合同起始日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同截止日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="转正日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="体检日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="体检备注:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
              </el-col>
              <el-col :span="6" :offset="11">
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form class="addheadcarform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="培训时间:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="userForm.birthDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训内容:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训考核:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="8">
                  <el-form-item label="考核结果:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="userForm.userName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="primary" @click="goOtherSetp('down')">上一步</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp()" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
              </el-col>
              <el-col :span="6" :offset="11">
              </el-col>
            </el-row>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'addPerson',
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
        employmentTypeSelect: [
          { id: '1', value: '驾驶员' },
          { id: '2', value: '押运员' },
          { id: '3', value: '驾驶/押运员' },
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
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入15/18位身份证号码', trigger: 'blur' }
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
        btnText: '下一步',
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
