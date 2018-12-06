<style scoped lang="less">
  /deep/ .el-dialog .el-dialog__body{
    padding-bottom: 0;
  }

</style>
<template>
  <div>
    <el-dialog :title="toExamineObj.title" :visible="isShow" :width="toExamineObj.width" center :before-close="closeBtn" :close-on-click-modal="false">
      <div v-if="toExamineObj.isShow">
        <div class="op-dialog-form">
          <el-form class="op-dialog-content" label-width="120px" :rules="rules" :model="formRules" status-icon ref="formRules">
            <el-row :getter="20">
              <el-col :span="12">
                <el-form-item label="车号:">{{row.plate_number}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数量:">
                  <el-input placeholder="请输入" type="text" v-model.trim="formRules.nums"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="20">
              <el-col :span="12">
                <el-form-item label="费用类型:">{{row.cost_type?row.cost_type.verbose:''}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="含税金额(元):" prop="pre_tax_amount">
                  <el-input placeholder="请输入" type="text" v-model.trim="formRules.pre_tax_amount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="20">
              <el-col :span="12">
                <el-form-item label="费用时间:">{{row.cost_date}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="运单号:" prop="waybill">
                  <el-select v-model="formRules.waybill" filterable clearable placeholder="请输入选择" @change="selectWaybill">
                    <!-- <el-option v-for="(item,key) in waybillList" :key="key" :label="item.waybill_number" :value="item.waybill_number"></el-option> -->
                    <el-option v-for="(item,key) in waybillList" :key="item.id" :label="item.waybill_number" :value="item.waybill_number">
                      <span style="float: left">{{ item.waybill_number }}</span>
                      <span class="option-span" v-if="item.work_end_time">{{ item.work_end_time }}</span>
                      <span class="option-span" v-if="item.fluid">{{ item.fluid }}</span>
                      <span class="option-span" v-if="item.loading_quantity">{{ item.loading_quantity }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="运单号:">{{row.waybill}}</el-form-item> -->
              </el-col>
            </el-row>
            <el-row :getter="20">
              <el-col :span="24">
                <el-form-item label="备注:">{{row.upload_remark}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="20">
              <el-col :span="24">
                <el-form-item label="照片:">
                  <el-row :getter="20">
                    <el-col :span="5" :offset="1" v-for="item in row.image_url_list" :key="item.image_url_list">
                      <div>
                        <router-link target="_blank" :to="imgReviewSrc">
                          <img :src="item" style='width:100%;height:100px'></img>
                        </router-link>
                        <!-- <div class="text-center">{{item.title}}{{item.num}}</div> -->
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div v-else>
        <div class="op-dialog-form">
          <el-form class="op-dialog-content" label-width="0" :rules="refuseRules" :model="refuseFormRules" status-icon ref="refuseFormRules">
            <el-form-item label="" prop="refuse_note">
              <el-input placeholder="请输入拒绝理由" type="textarea" :rows="6" v-model.trim="refuseFormRules.refuse_note"></el-input>
              <span class="text-stance fs-13">最多支持120个字符</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div v-if="toExamineObj.isShow">
          <el-button @click="switchWindowBtn(false)">拒绝</el-button>
          <el-button type="primary" @click="byBtn" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
        </div>
        <div v-else>
          <el-button @click="switchWindowBtn(true)">取消</el-button>
          <el-button type="primary" @click="refuseBtn" :loading="refuseSubmitBtn.isLoading" :disabled="refuseSubmitBtn.isDisabled">{{refuseSubmitBtn.btnText}}</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- <qiniu-img-upload></qiniu-img-upload> -->
  </div>
</template>
<script>
import qiniuImgUpload from '@/components/qiniuImgUpload'; //引入骑牛图片上传组件
export default {
  name: 'costReviewDialog',
  components:{
    qiniuImgUpload:qiniuImgUpload
  },
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    closeDialogBtn: Function,
    row: {
      type: Object,
      required: true
    },
  },

  data: function() {
    return {
      formRules: {
        nums: '', //数量
        pre_tax_amount: '', //税前金额
        waybill:''
      },
      refuseFormRules: {
        refuse_note: '', //拒绝理由
      },

      rules: {
        nums:[
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        pre_tax_amount:[
          { required: true, message: '请输入税前金额', trigger: 'blur' },
          { pattern: this.$store.state.common.regular.price.match, message: this.$store.state.common.regular.price.tips, trigger: 'blur' },
        ],
        waybill: [
          { required: true, message: '请选择运单号', trigger: 'blur' }
        ],
      },
      refuseRules:{
        refuse_note:[
          { required: true, message: '请输入拒绝理由', trigger: 'blur' },
          { max: 120, message: '最多支持120个字符', trigger: 'blur' },
        ],
      },
      submitBtn: {
        btnText: '通过',
        isDisabled: false,
        isLoading: false
      },
      refuseSubmitBtn: {
        btnText: '确定',
        isDisabled: false,
        isLoading: false
      },
      imgList:[],
      imglistStr:'',
      toExamineObj:{
        isShow:true,
        width:'50%',
        title:'费用审核'
      },
      waybillList:[],//运单列表
    }
  },
  computed: {
    imgReviewSrc: function() {
      let imgListArray = [];
      for (let i in this.imgList) {
        imgListArray.push(this.imgList[i]);
      }
      return `/imgReview?imgList=${imgListArray.join(',')}`;
    }
  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },
    selectWaybill(waybill) {
      for (let i in this.waybillList) {
        if (this.waybillList[i].waybill_number === waybill) {
          this.editMsgForm.work_end_time = this.waybillList[i].work_end_time;
          this.editMsgForm.fluid = this.waybillList[i].fluid;
          this.editMsgForm.loading_quantity = this.waybillList[i].loading_quantity;
        }
      }
    },
    getWaybillData(row) {
      let postData = {
        datetime: row.cost_date,
        plate_number: row.plate_number
        // datetime:'2018-06-13 22:10:15',
        // plate_number:'鲁HH5555'
      }
      this.$$http('getWaybillData', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.waybillList = results.data.data;
        }
      })
    },
    switchWindowBtn(type){
      if(type){
        this.toExamineObj = {
          isShow:type,
          width:'50%',
          title:'费用审核',
        }
        this.submitBtn={
          btnText: '通过',
          isDisabled: false,
          isLoading: false
        };
      }else{
        this.toExamineObj = {
          isShow:type,
          width:'30%',
          title:'拒绝理由',
        }
        this.refuseSubmitBtn={
          btnText: '确定',
          isDisabled: false,
          isLoading: false
        };
      }
    },
    cashExpenseEeview(postData,type,submitBtn){
      this.$$http('cashExpenseEeview', postData).then((results) => {
        submitBtn = {
          btnText: type,
          isDisabled: false,
          isLoading: false
        }
        if (results.data && results.data.code == 0) {
          this.$message({
            message: type+'成功',
            type: 'success'
          });
          this.$emit('closeDialogBtn', true);
        }

      }).catch((err) => {
        submitBtn = {
          btnText: type,
          isDisabled: false,
          isLoading: false
        }
        this.$message.error(type+'失败');
      })
    },
    byBtn: function() {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.submitBtn = {
            btnText: '通过中',
            isDisabled: true,
            isLoading: true
          }
          let postData = this.formRules;
          postData.id = this.row.id;
          postData.verify = 'passed';
          // postData = this.pbFunc.fifterObjIsNull(postData);
          this.cashExpenseEeview(postData,'通过',this.submitBtn)

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    refuseBtn(){
      this.$refs['refuseFormRules'].validate((valid) => {
        if (valid) {
          this.refuseSubmitBtn = {
            btnText: '确认中',
            isDisabled: true,
            isLoading: true
          }
          let postData = this.refuseFormRules;
          postData.id = this.row.id;
          postData.verify = 'refused';
          // postData = this.pbFunc.fifterObjIsNull(postData);
          this.cashExpenseEeview(postData,'确认',this.refuseSubmitBtn)

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    }
  },
  watch: {
    isShow(curVal, oldVal) {　
      this.formRules = {
        nums: this.row.nums,
        pre_tax_amount: this.row.pre_tax_amount,
        waybill:this.row.waybill
      };　
      this.refuseFormRules={
        refuse_note: '', //拒绝理由
      };
      this.imgList = this.row.image_url_list;
      this.toExamineObj = {
        isShow:true,
        width:'50%',
        title:'费用审核'
      }
      this.getWaybillData(this.row)
      // this.submitBtn.isDisabled = true;　　　　　　　
      if (this.$refs['formRules']) {
        this.$refs['formRules'].clearValidate();　　　　
      }　　
      if (this.$refs['refuseFormRules']) {
        this.$refs['refuseFormRules'].clearValidate();　　　　
      }　
      this.submitBtn={
        btnText: '通过',
        isDisabled: false,
        isLoading: false
      };
      this.refuseSubmitBtn={
        btnText: '确定',
        isDisabled: false,
        isLoading: false
      };
    },
  },
  created: function() {

    this.pbFunc.format();
  }
}

</script>
