<!-- personDetail.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="addPerson" class="detail-mian">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>查看</p>
      </el-header>
      <el-main>
        <el-form class="addheaduserform" label-width="120px" :model="tailData" status-icon>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  基础信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="挂车牌:">
                  <div class="detail-form-item">{{tailData.plate_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆归属:">
                  <div class="detail-form-item">{{tailData.attributes.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆所属:">
                  <div class="detail-form-item">{{tailData.carrier.name}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="车架号:">
                  <div class="detail-form-item">{{tailData.vin_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆类型:">
                  <div class="detail-form-item">{{tailData.vehicle_type.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌型号:">
                  <div class="detail-form-item">{{tailData.brand}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="核定载质量:">
                  <div class="detail-form-item">{{tailData.transport_weight}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="罐体容积:">
                  <div class="detail-form-item">{{tailData.volume}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="长度:">
                  <div class="detail-form-item">{{tailData.length}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="宽度:">
                  <div class="detail-form-item">{{tailData.width}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="高度:">
                  <div class="detail-form-item">{{tailData.height}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="运输介质:">
                  <div class="detail-form-item">{{tailData.trans_type.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆注册日期:">
                  <div class="detail-form-item">{{tailData.register_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  证件信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(1)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="行驶证档案编号:">
                  <div class="detail-form-item">{{tailData.license_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行驶证发证日期:">
                  <div class="detail-form-item">{{tailData.license_register_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="运营者年审日期:">
                  <div class="detail-form-item">{{tailData.license_verify_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="运营证号:">
                  <div class="detail-form-item">{{tailData.operation_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="运营证发证日期:">
                  <div class="detail-form-item">{{tailData.operation_issue_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行驶证年审日期:">
                  <div class="detail-form-item">{{tailData.operation_verify_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  保险信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(2)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <div v-for="(item,key) in userData.semitrailer_insurances">
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="保险类型:" prop="qualification_certificate_number">
                    <div class="detail-form-item">{{item.insurance_type.verbose}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保单号:">
                    <div class="detail-form-item">{{item.insurance_number}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="投保方式:">
                    <div class="detail-form-item">{{item.insurance_type.verbose}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="入保公司:">
                    <div class="detail-form-item">{{item.insurance_company}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保险金额:">
                    <div><img :src="item.money" alt="" width="150" height="80"></div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="入保日期:">
                    <div class="detail-form-item">{{item.insurance_start_date}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="到期日期:">
                    <div class="detail-form-item">{{item.insurance_due_date}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- </el-form> -->
          </div>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  其他信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(3)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <div>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="罐检报告编号:">
                    <div class="detail-form-item">{{tailData.bottle_report_number}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="罐检检验日期:">
                    <div class="detail-form-item">{{tailData.bottle_verify_date}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="压力容器证编号:">
                    <div class="detail-form-item">{{tailData.pressure_bottle_number}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="压力容器检验日期:">
                    <div class="detail-form-item">{{tailData.pressure_bottle_verify_date}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- </el-form> -->
            </div>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
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
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      }
    }
  },
  created() {

    this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.query.id;
    }
  },
  methods: {
    getDetail: function() {
      this.$$http('getDriversDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.userData = results.data.data;
          console.log('this.userData', this.userData);
        }
      })

    },
    handleRemove: function(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview: function(file) {
      console.log(file);
    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/transportPowerManage/personManage/addPerson?activeStep=" + number });
    },

  }
}

</script>
