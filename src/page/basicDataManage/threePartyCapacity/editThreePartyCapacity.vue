
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
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="牵引车牌:" prop="tractor_plate_number">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.tractor_plate_number" @blur="detectionCapacity('tractor')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属车辆:" prop="carrier">
                    <!-- <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.carrier"></el-input> -->
                    <el-select v-model="editMsgForm.carrier" placeholder="请选择" :loading="carrierPageLoading">
                      <el-option v-for="(item,key) in carrierList" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃料类型:" prop="fuel_type">
                    <!-- <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.fuel_type"></el-input> -->
                    <el-select v-model="editMsgForm.fuel_type" placeholder="请选择">
                      <el-option v-for="(item,key) in typeSelect" :key="key" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="挂车牌:" prop="semitrailer_plate_number">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.semitrailer_plate_number" @blur="detectionCapacity('trailer')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装载质量:" prop="transport_weight">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.transport_weight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="主驾驶:" prop="master_driver_name">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.master_driver_name" @blur="detectionCapacity('master_driver')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话:" prop="master_driver_mobile_phone">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.master_driver_mobile_phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号码:" prop="master_driver_id_number">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.master_driver_id_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶从业资格证号:" label-width="130px">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.master_driver_qualification_certificate_number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="副驾驶:" prop="vice_driver_name">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.vice_driver_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话:" prop="vice_driver_mobile_phone">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.vice_driver_mobile_phone" @blur="detectionCapacity('vice_driver')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号码:" prop="vice_driver_id_number">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.vice_driver_id_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶从业资格证号:" label-width="130px">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.vice_driver_qualification_certificate_number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="押运员:" prop="escort_staff_name">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.escort_staff_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话:" prop="escort_staff_mobile_phone">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.escort_staff_mobile_phone" @blur="detectionCapacity('escort_staff')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号码:" prop="escort_staff_id_number">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.escort_staff_id_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运从业资格证号:" label-width="130px">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.escort_staff_qualification_certificate_number"></el-input>
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
    <detection-capacity-dialog :is-show="isDetectionCapacity" :row="detectionCapacityDetail"></detection-capacity-dialog>
  </div>
</template>
<script>
import detectionCapacityDialog from '@/components/basicDataManage/detectionCapacityDialog'
export default {
  name: 'editThreePartyCapacity',
  components:{
    detectionCapacityDialog:detectionCapacityDialog
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    titleType() {
      return this.$route.params.id ? '编辑三方运力' : '新增三方运力'
    }
  },
  data() {
    return {
      pageLoading: false,
      carrierPageLoading:false,
      isDetectionCapacity:false,
      detailData: {},
      activeStep:0,
      isDisabled:true,
      detectionCapacityDetail:{},
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
        transport_weight:[
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        master_driver_name:[
          { pattern: this.$store.state.common.regular.name.match, message: this.$store.state.common.regular.name.tips, trigger: 'blur' },
        ],
        master_driver_id_number:[
          { pattern: this.$store.state.common.regular.idNumber.match, message: this.$store.state.common.regular.idNumber.tips, trigger: 'blur' },
        ],
        master_driver_mobile_phone:[
          // { required: this.editMsgForm.master_driver_name?true:false, message: '请输入电话', trigger: 'blur' },
          { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
        ],
        vice_driver_name:[
          { pattern: this.$store.state.common.regular.name.match, message: this.$store.state.common.regular.name.tips, trigger: 'blur' },
        ],
        vice_driver_id_number:[
          { pattern: this.$store.state.common.regular.idNumber.match, message: this.$store.state.common.regular.idNumber.tips, trigger: 'blur' },
        ],
        vice_driver_mobile_phone:[
          { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
        ],
        escort_staff_name:[
          { pattern: this.$store.state.common.regular.name.match, message: this.$store.state.common.regular.name.tips, trigger: 'blur' },
        ],
        escort_staff_id_number:[
          { pattern: this.$store.state.common.regular.idNumber.match, message: this.$store.state.common.regular.idNumber.tips, trigger: 'blur' },
        ],
        escort_staff_mobile_phone:[
          { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入高速公司名称', trigger: 'blur' },
          { min: 1, max: 20, message: '为1~20个字符', trigger: 'blur' }
        ],
        contact_phone: [
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入手机号或者座机号', trigger: 'blur' }
        ]
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
    closeDialog: function(isSave) {
      this.isDetectionCapacity = false;

    },
    detectionCapacity(type){
      let postData = {};
      if(type === 'tractor'&&this.editMsgForm.tractor_plate_number){
        postData.tractor_plate_number = this.editMsgForm.tractor_plate_number;
      }else if(type === 'trailer'&&this.editMsgForm.semitrailer_plate_number){
        postData.semitrailer_plate_number = this.editMsgForm.semitrailer_plate_number;
      }else if(type === 'master_driver'&&this.editMsgForm.master_driver_mobile_phone&&(this.editMsgForm.master_driver_mobile_phone).match(this.$store.state.common.regular.phone.match)){
        postData = {
          master_driver:{
            mobile_phone:this.editMsgForm.master_driver_mobile_phone
          }
        }
      }else if(type === 'vice_driver'&&this.editMsgForm.vice_driver_mobile_phone&&(this.editMsgForm.vice_driver_mobile_phone).match(this.$store.state.common.regular.phone.match)){
        postData = {
          vice_driver:{
            mobile_phone:this.editMsgForm.vice_driver_mobile_phone
          }
        }
      }else if(type === 'escort_staff'&&this.editMsgForm.escort_staff_mobile_phone&&(this.editMsgForm.escort_staff_mobile_phone).match(this.$store.state.common.regular.phone.match)){
        postData = {
          escort_staff:{
            mobile_phone:this.editMsgForm.escort_staff_mobile_phone
          }
        }
      }
      if(this.pbFunc.objSize(postData)){
        this.$$http('threeDetectionCapacity', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            console.log('检测运力',results.data);

          }else if(results.data && results.data.code == 400){
            this.$message({
              message: results.data.msg,
              type: 'warning'
            });
          }else if(results.data && results.data.code == 600){

          }
        }).catch((err) => {
        })
      }
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne';
      let btnObject = btn;
      let postData = {
        tractor_plate_number: this.editMsgForm.tractor_plate_number,//牵引车牌号
        carrier:this.editMsgForm.carrier,//所属公司
        transport_weight: this.editMsgForm.transport_weight,//装载质量
        fuel_type: this.editMsgForm.fuel_type,//牵引车燃料类型
        semitrailer_plate_number: this.editMsgForm.semitrailer_plate_number,//挂车车牌
        master_driver:{//主驾驶
          name:this.editMsgForm.master_driver_name,//司机名称
          mobile_phone:this.editMsgForm.master_driver_mobile_phone,//司机电话
          id_number:this.editMsgForm.master_driver_id_number,//身份证号码
          qualification_certificate_number:this.editMsgForm.master_driver_qualification_certificate_number
        },
        vice_driver:{//副驾驶
          name:this.editMsgForm.vice_driver_name,//司机名称
          mobile_phone:this.editMsgForm.vice_driver_mobile_phone,//司机电话
          id_number:this.editMsgForm.vice_driver_id_number,//身份证号码
          qualification_certificate_number:this.editMsgForm.vice_driver_qualification_certificate_number
        },
        escort_staff:{//押运员
          name:this.editMsgForm.escort_staff_name,//名称
          mobile_phone:this.editMsgForm.escort_staff_mobile_phone,//电话
          id_number:this.editMsgForm.escort_staff_id_number,//身份证号码
          qualification_certificate_number:this.editMsgForm.escort_staff_qualification_certificate_number
        },
      }
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
            postData.customer_id = this.id;
            apiName = 'updateThreePartyCapacity';
          }
          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;
          //postData = this.pbFunc.fifterObjIsNull(postData);
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
                  this.$router.push({ path: `/basicDataManage/threePartyCapacity/clientDetail/${results.data.data.id }` });
                } else {
                  this.$router.push({ path: "/basicDataManage/threePartyCapacity/threePartyCapacityList" });
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
        id: this.id,
      }
      this.pageLoading = true;
      this.$$http('highSpeedDetail', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
          this.editMsgForm = {
            name: this.detailData.name,
            type: this.detailData.type && this.detailData.type.key,
            contact_name: this.detailData.contact_name,
            contact_phone: this.detailData.contact_phone,
            detail_address: this.detailData.detail_address,
          }

        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    getCarrierList() {
      let postData = {
        page: 1,
        page_size: 100
      };
      this.carrierPageLoading = true;

      this.$$http('getCarrierList', postData).then((results) => {

        this.carrierPageLoading = false;
        if (results.data && results.data.code == 0) {
          this.carrierList = results.data.data.results;
        }
      }).catch((err) => {
        this.carrierPageLoading = false;
      })

    },
    returnToPage() {
      if (this.id) {
        this.$router.push({ path: `/basicDataManage/supplierManage/tollfeeManage/tollfeeManageDetalis/${this.id}` });
      } else {
        this.$router.push({ path: "/basicDataManage/supplierManage/tollfeeManage/tollfeeManageList" });
      }
    }
  },
  watch: {
    editMsgForm: {
      handler(val, oldVal) {　　　　　　
        if(val.master_driver_name){
          this.rules.master_driver_mobile_phone =[
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
          ]
        }else{
          this.rules.master_driver_mobile_phone =[
            { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
          ]
        }

        if(val.vice_driver_name){
          this.rules.vice_driver_mobile_phone =[
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
          ]
        }else{
          this.rules.vice_driver_mobile_phone =[
            { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
          ]
        }

        if(val.escort_staff_name){
          this.rules.escort_staff_mobile_phone =[
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
          ]
        }else{
          this.rules.escort_staff_mobile_phone =[
            { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' },
          ]
        }

      }, 　　　　deep: true

    }
  },
  created() {
    this.id && this.getDetail();
    this.getCarrierList();
  },
}

</script>
<style scoped lang="less">

</style>
