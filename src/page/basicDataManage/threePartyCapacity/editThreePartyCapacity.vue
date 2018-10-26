
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
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.tractor_plate_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属车辆:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.plate_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃料类型:" prop="fuel_type">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.fuel_type"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="挂车牌:" prop="semitrailer_plate_number">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.semitrailer_plate_number"></el-input>
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
                  <el-form-item label="主驾驶:" prop="consumption_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.consumption_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号码:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶从业资格证号:" label-width="130px">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="副驾驶:" prop="consumption_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.consumption_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号码:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶从业资格证号:" label-width="130px">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="押运员:" prop="consumption_price">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.consumption_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号码:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押运从业资格证号:" label-width="130px">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.is_matching"></el-input>
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
export default {
  name: 'editThreePartyCapacity',
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
      detailData: {},
      activeStep:0,
      isDisabled:true,
      editMsgForm: {
        tractor_plate_number: '',//牵引车牌号
        transport_weight: '',//装载质量
        fuel_type: '',//牵引车燃料类型
        semitrailer_plate_number: '',//挂车车牌
        master_driver_name: '',//主驾驶姓名
        master_driver_mobile_phone: '',//主驾驶电话
        master_driver_id_number: '',//主驾驶身份证
        master_driver_qualification_certificate_number: '',//主驾驶资格证
        master_driver_name: '',//主驾驶姓名
        master_driver_mobile_phone: '',//主驾驶电话
        master_driver_id_number: '',//主驾驶身份证
        master_driver_qualification_certificate_number: '',//主驾驶资格证
        vice_driver_name: '',//副驾驶姓名
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
        fuel_type:[
          { required: true, message: '请输入燃料类型', trigger: 'blur' },
        ],
        semitrailer_plate_number:[
          { required: true, message: '请输入挂车牌', trigger: 'blur' },
        ],
        transport_weight:[
          { required: true, message: '请输入装载质量', trigger: 'blur' },
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
        label: 'A卡',
        value: 'A'
      }, {
        label: 'B卡',
        value: 'B'
      }]
    }
  },
  methods: {
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
    returnToPage() {
      if (this.id) {
        this.$router.push({ path: `/basicDataManage/supplierManage/tollfeeManage/tollfeeManageDetalis/${this.id}` });
      } else {
        this.$router.push({ path: "/basicDataManage/supplierManage/tollfeeManage/tollfeeManageList" });
      }
    }
  },
  created() {
    this.id && this.getDetail();
  },
}

</script>
<style scoped lang="less">

</style>
