<!-- personDetail.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="addPerson" class="detail-mian">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>人员信息</p>
      </el-header>
      <el-main>
        <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                基础人员
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="姓名:" prop="name">
                  <div class="detail-form-item">{{userData.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="从业类型:" prop="work_type.verbose">
                  <div class="detail-form-item">{{userData.work_type.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码:" prop="mobile_phone">
                  <div class="detail-form-item">{{userData.mobile_phone}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="人员所属:" prop="staff_type">
                  <div class="detail-form-item">{{userData.staff_type.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号:" prop="id_number">
                  <div class="detail-form-item">{{userData.id_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="在职状态:" prop="on_job_status">
                  <div class="detail-form-item">{{userData.on_job_status.verbose}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="性别:" prop="gender.verbose">
                  <div class="detail-form-item">{{userData.gender.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期:">
                  <div class="detail-form-item">{{userData.birthday}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年龄:">
                  <div class="detail-form-item">{{userData.age}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="家属姓名:">
                  <div class="detail-form-item">{{userData.family_menber_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="家属联系方式:" prop="family_menber_phone">
                  <div class="detail-form-item">{{userData.family_menber_phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="准驾类型:">
                  <div class="detail-form-item">{{userData.drive_license_allow_type}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="所在地区:">
                  <div class="detail-form-item">{{userData.area}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="详细地址:">
                  <div class="detail-form-item">{{userData.detail_address}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证:">
                  <div><img :src="userData.id_photo" alt="" width="150" height="80"></div>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                驾驶证件信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(1)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="驾驶证档案编号:" prop="drive_license_number">
                  <div class="detail-form-item">{{userData.drive_license_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="驾驶证初次发证时间:">
                  <div class="detail-form-item">{{userData.drive_license_issue_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="驾驶证到期时间:">
                  <div class="detail-form-item">{{userData.drive_license_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="驾驶证发证机关:" prop="drive_license_issue_organ">
                  <div class="detail-form-item">{{userData.drive_license_issue_organ}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="驾驶证:">
                  <div><img :src="userData.drive_license_photo" alt="" width="150" height="80"></div>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                从业资格证信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(2)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="从业资格证号:" prop="qualification_certificate_number">
                  <div class="detail-form-item">{{userData.qualification_certificate_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="从业资格证证初次发证时间:">
                  <div class="detail-form-item">{{userData.qualification_certificate_issue_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="从业资格证到期时间:">
                  <div class="detail-form-item">{{userData.qualification_certificate_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="从业资格证发证机关:">
                  <div class="detail-form-item">{{userData.qualification_certificate_issue_organ}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="从业资格证:">
                  <div><img :src="userData.qualification_certificate_photo" alt="" width="150" height="80"></div>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                押运证信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(3)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="押运证号:" prop="escort_license_number">
                  <div class="detail-form-item">{{userData.escort_license_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="押运证初次发证时间:">
                  <div class="detail-form-item">{{userData.escort_license_issue_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="押运证到期时间:">
                  <div class="detail-form-item">{{userData.escort_license_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="押运证发证机关:">
                  <div class="detail-form-item">{{userData.escort_license_issue_organ}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="从业资格证:">
                  <div><img :src="userData.escort_license_photo" alt="" width="150" height="80"></div>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                劳务信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(4)">编辑该条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="录用日期:">
                  <div class="detail-form-item">{{userData.labour_employ_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上岗日期:">
                  <div class="detail-form-item">{{userData.labour_on_work_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下岗日期:">
                  <div class="detail-form-item">{{userData.labour_off_work_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="合同起始日期:">
                  <div class="detail-form-item">{{userData.contract_start_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同截止日期:">
                  <div class="detail-form-item">{{userData.contract_due_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="转正日期:">
                  <div class="detail-form-item">{{userData.contract_correct_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="体检日期:">
                  <div class="detail-form-item">{{userData.heath_examination_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="24">
                <el-form-item label="体检备注:">
                  <div class="detail-form-item">{{userData.heath_examination_remark}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          <!-- </el-form> -->
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title ">
            <el-row :gutter="40">
              <el-col :span="12" :offset="6" class="text-center">
                培训信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(4)">新增一条</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :model="userData" status-icon> -->
            <div v-for="(item,key) in userData.carrier_driver_trainings">
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="培训时间:">
                    <div class="detail-form-item">{{item.entry_training_date}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训内容:">
                    <div class="detail-form-item">{{item.entry_training_content}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="培训考核:">
                    <div class="detail-form-item">{{item.entry_training_exam}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="考核结果:">
                    <div class="detail-form-item">{{item.entry_training_exam_result}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="备注:">
                    <div class="detail-form-item">{{item.entry_training_remark}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          <!-- </el-form> -->
        </div>
      </el-form>
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
      userData: {
        "id": "33569f33-4319-404d-8759-41c3e834cc7c",
        "name": "张三",
        "work_type": {
          "key": "DRIVER",
          "verbose": "驾驶员"
        },
        "mobile_phone": "13122268566",
        "staff_type": {
          "key": "SELF_OWNED_TRUCK",
          "verbose": "自有车辆人员"
        },
        "id_number": "511321199105107032",
        "id_photo": null,
        "on_job_status": {
          "key": "ON_JOB",
          "verbose": "在职"
        },
        "gender": {
          "key": "MALE",
          "verbose": "男"
        },
        "birthday": null,
        "age": null,
        "family_member_name": null,
        "family_member_phone": null,
        "family_address": null,
        "drive_license_number": null,
        "drive_license_issue_date": null,
        "drive_license_due_date": null,
        "drive_license_issue_organ": null,
        "drive_license_allow_type": null,
        "drive_license_photo": null,
        "escort_license_number": null,
        "escort_license_issue_date": null,
        "escort_license_due_date": null,
        "escort_license_issue_organ": null,
        "escort_license_photo": null,
        "qualification_certificate_number": null,
        "qualification_certificate_issue_date": null,
        "qualification_certificate_due_date": null,
        "qualification_certificate_issue_organ": null,
        "qualification_certificate_photo": null,
        "labour_employ_date": null,
        "labour_on_work_date": null,
        "labour_off_work_date": null,
        "contract_start_date": null,
        "contract_due_date": null,
        "contract_correct_date": null,
        "heath_examination_date": null,
        "heath_examination_remark": null,
        "carrier_driver_trainings": [{
          "id": "33569f33-4319-404d-8759-41c3e834cc7c",
          "entry_training_date": "2018-05-08",
          "entry_training_content": "test",
          "entry_training_exam": "test",
          "entry_training_exam_result": "test",
          "entry_training_remark": "test"
        }]
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
        name: [ //姓名
          { required: true },
        ],
        staff_type: {
          verbose: [ //从业类型
            { required: true }
          ]
        },
        mobile_phone: [ //手机号码
          { required: true }
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
    goEditDetail(number) {
      this.$router.push({ path: "/transportPowerManage/personManage/addPerson?activeStep=" + number });
    },

  }
}

</script>
