<style scoped lang="less">

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
            <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回列表页</span></span> -->
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">数据信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
              <el-row>
                <el-col :span="20" :offset="2">
                  <div class="trans-fee">
                    <div class="table-list">
                      <el-table :data="detailData" stripe style="width: 100%" size="mini">
                        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                          <template slot-scope="scope">
                            <div class="fee-list" v-if="item.param==='start_mileage'||item.param==='end_mileage'">
                              {{scope.row[item.param]}}<span v-if="item.param==='start_mileage'">（不含）</span><span v-if="item.param==='end_mileage'">（含）</span>
                            </div>
                            <div v-else>{{scope.row[item.param]}}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <ul class="freight-op-btn">
                    <li>
                      <el-button type="danger" plain size="mini">—</el-button>
                    </li>
                  </ul>
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
export default {
  name: 'editThreePartyCapacity',
  computed: {
    id() {
      return this.$route.query.id;
    },
    titleType() {
      return this.$route.query.id ? '编辑运费约定' : '新增运费约定'
    }
  },
  data() {
    return {
      pageLoading: false,
      carrierPageLoading:false,
      activeStep:0,
      detailData:[{
        start_mileage:10,
        end_mileage:100,
        initial_price:10,
        change_rate:0.660,
        change_number:9
      }],
      editMsgForm: {
        tractor_plate_number: '',//牵引车牌号
        carrier:'',//所属公司
        transport_weight: '',//装载质量
        fuel_type: '',//牵引车燃料类型
        semitrailer_plate_number: '',//挂车车牌
        master_driver_name: '',//主驾驶姓名
        master_driver_mobile_phone: '',//主驾驶电话
        master_driver_id_number: '',//主驾驶身份证
        master_driver_qualification_certificate_number: '',//主驾驶资格证
        vice_driver_name: '',//主驾驶姓名
        vice_driver_mobile_phone: '',//副驾驶电话
        vice_driver_id_number: '',//副驾驶身份证
        vice_driver_qualification_certificate_number: '',//副驾驶资格证
        escort_staff_name: '',//押运员姓名
        escort_staff_mobile_phone: '',//押运员电话
        escort_staff_id_number: '',//押运员身份证
        escort_staff_qualification_certificate_number: '',//押运员资格证
      },
      thTableList: [{
        title: '起点里程（公里）',
        param: 'start_mileage',
        width: ''
      }, {
        title: '终点里程（公里）',
        param: 'end_mileage',
        width: ''
      }, {
        title: '起步价（元/吨）',
        param: 'initial_price',
        width: ''
      }, {
        title: '变动费率（元/吨/公里）',
        param: 'change_rate',
        width: ''
      }, {
        title: '变动值',
        param: 'change_number',
        width: ''
      }],
      rules: {
        tractor_plate_number:[
          { required: true, message: '请输入牵引车牌', trigger: 'blur' },
        ],
        carrier:[
          { required: true, message: '请选择车辆所属', trigger: 'blur' },
        ],
        fuel_type:[
          { required: true, message: '请选择燃料类型', trigger: 'blur' },
        ],
        semitrailer_plate_number:[
          { required: true, message: '请输入挂车牌', trigger: 'blur' },
        ],

      },

      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      typeSelect: [{
        id: 'OIL',
        title: '油'
      }, {
        id: 'GAS',
        title: '气'
      }],
      carrierList:[],
    }
  },
  methods: {

    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne';
      let btnObject = btn;
      let postData = {}
      // let keyArray = ['name', 'contact_name', 'contact_phone', 'detail_address', 'deficiency_standard', 'code', 'codeMsg'];
      // let postData = this.pbFunc.fifterbyArr(this.customerMsgForm, keyArray);
      // if (btnType === 'next') {
      //   this.editAjax(postData, formName, btnObject, 2);
      // } else if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      // }
    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'addThreePartyCapacity';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 如果id存在则为编辑 */
          if (this.id) {
            postData.id = this.id;
            apiName = 'updateThreePartyCapacity';
          }
          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;
          postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
            if (results.data && results.data.code == 0 && results.data.data) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              if (isReview) {
                if (this.$route.query.id) {
                  this.$router.push({ path: `/basicDataManage/standardDataSet/freight/freightDetail/${results.data.data.id }` });
                } else {
                  this.$router.push({ path: "/basicDataManage/standardDataSet/freight/freightDataList" });
                }
              } else {
                let id = results.data.data.id;
                this.$router.push({ path: "/basicDataManage/threePartyCapacity/editThreePartyCapacity", query: { activeStep: stepNum - 1, id: id } });
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
    getDetail() {
      const postData = {
        tractor_semitrailer_id: this.id,
      }
      this.pageLoading = true;
      this.$$http('threePartyCapacityDetail', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;

          this.editMsgForm = {
            tractor_plate_number: this.detailData.tractor.plate_number,//牵引车牌号
            carrier:this.detailData.tractor.carrier.id,//所属公司
            transport_weight: this.detailData.semitrailer.transport_weight,//装载质量
            fuel_type: this.detailData.tractor.fuel_type.key,//牵引车燃料类型
            semitrailer_plate_number: this.detailData.semitrailer.plate_number,//挂车车牌
            master_driver_name: this.detailData.master_driver?this.detailData.master_driver.name:'',//主驾驶姓名
            master_driver_mobile_phone: this.detailData.master_driver?this.detailData.master_driver.mobile_phone:'',//主驾驶电话
            master_driver_id_number: this.detailData.master_driver?this.detailData.master_driver.id_number:'',//主身份证
            master_driver_qualification_certificate_number: this.detailData.master_driver?this.detailData.master_driver.qualification_certificate_number:'',//主驾驶资格证
            vice_driver_name: this.detailData.vice_driver?this.detailData.vice_driver.name:'',//主驾驶姓名
            vice_driver_mobile_phone: this.detailData.vice_driver?this.detailData.vice_driver.mobile_phone:'',//副驾驶电话
            vice_driver_id_number: this.detailData.vice_driver?this.detailData.vice_driver.id_number:'',//副驾驶身份证
            vice_driver_qualification_certificate_number: this.detailData.vice_driver?this.detailData.vice_driver.qualification_certificate_number:'',//副驾驶资格证
            escort_staff_name: this.detailData.escort_staff?this.detailData.escort_staff.name:'',//押运员姓名
            escort_staff_mobile_phone: this.detailData.escort_staff?this.detailData.escort_staff.mobile_phone:'',//押运员电话
            escort_staff_id_number: this.detailData.escort_staff?this.detailData.escort_staff.id_number:'',//押运员身份证
            escort_staff_qualification_certificate_number: this.detailData.escort_staff?this.detailData.escort_staff.qualification_certificate_number:'',//押运员资格证
          }
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    getCarrierList() {
      let postData = {
        pagination:false
      };
      this.carrierPageLoading = true;

      this.$$http('getCarrierList', postData).then((results) => {

        this.carrierPageLoading = false;
        if (results.data && results.data.code == 0) {
          this.carrierList = results.data.data;
        }
      }).catch((err) => {
        this.carrierPageLoading = false;
      })

    },
    returnToPage() {
      if (this.id) {
        this.$router.push({ path: `/basicDataManage/standardDataSet/freight/freightDetail/${this.id}` });
      } else {
        this.$router.push({ path: "/basicDataManage/standardDataSet/freight/freightDataList" });
      }
    }
  },
  watch: {

  },
  created() {
    if(this.id){
      this.getDetail();
    }

    this.getCarrierList();
  },
}

</script>

