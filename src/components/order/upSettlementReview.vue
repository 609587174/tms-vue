<!-- 装车榜单审核组件 -->
<!--
  本组件成灾功能：
  1:纯展示不能审核：isedit = false;
  2:可以审核不能上传装车榜单图片isedit = ture ; isUpload = false;
  3:可以审核并能上传装车榜单图片isedit = ture ; isUpload = ture;
 -->
<style scoped lang="less">
.loading-review-container {
  /deep/ .el-date-editor.el-input {
    width: 100%;
  }
}

</style>
<template>
  <div class="loading-review-container">
    <el-form ref="examinePoundForm" :model="upSettleForm" :rules="rules" status-icon :label-position="'right'" label-width="100px">
      <!-- <el-row v-if="!isUpload">
        <el-col :span="20" :offset="2">
          <el-row style="min-height: 131px;">
            <el-col :span="5" :offset="1" v-for="item in imgList" :key="item.id">
              <div>
                <router-link target="_blank" :to="imgReviewSrc">
                  <img :src="item.url" style='width:100%;height:100px'></img>
                </router-link>
                <div class="text-center">{{item.title}}{{item.num}}</div>
              </div>
            </el-col>
          </el-row>
          <el-col :span="20" :offset="2">
          </el-col>
        </el-col>
      </el-row> -->
      <el-row v-if="setpTipInfo.length>0">
        <el-col :span="20" :offset="2" style="text-align:center;color:#F56C6C">
          请注意，改单与
            <span v-for="(item,index) in setpTipInfo">
              {{item.order_number}}({{item.station}})
              <span v-if="index!=setpTipInfo.length-1">/</span>
            </span>
            合为分卸单,请注意填写卸车信息！
        </el-col>
      </el-row>
      <el-row v-if="isUpload" justify="space-around" type="flex" style="margin-top:10px;">
        <el-col :span="4" >
          <upSettlementImg :fileList.sync="poundUpload.fileList" :hideUpimg="false":Title="poundUpload.Title" :limit="poundUpload.limit"  :imgView="imgReviewSrc" :imgInfo="imgList.length>0?imgList[0]:{}"
            @imgChange="imgChange" :type="'load'"></upSettlementImg>
        </el-col>
        <el-col :span="4" v-for="(item,index) in sealImgList">
          <upSettlementImg :fileList.sync="sealUpload.fileList" :hideUpimg="true" :Title="sealUpload.Title" :limit="sealUpload.limit"  :imgView="sealImgReviewSrc" :imgInfo="item"></upSettlementImg>
        </el-col>
        <el-col :span="4" >
          <upSettlementImg :fileList.sync="unPoundUpload.fileList" :hideUpimg="false" :Title="unPoundUpload.Title" :limit="unPoundUpload.limit"  :imgView="unImgReviewSrc" :imgInfo="unImgList.length>0?unImgList[0]:{}" @imgChange="imgChange" :type="'unload'"></upSettlementImg>
        </el-col>

      </el-row>
      <el-row style="margin-top:20px;" justify="space-around" type="flex">
        <el-col :span="10" >
          <el-row>
            <el-col>
              <el-form-item label="实际到厂时间:" label-width="120px" prop="pickup_active_time">
                <el-date-picker v-if="isEdit" v-model="upSettleForm.pickup_active_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="装液开始时间:" label-width="120px" prop="pickup_work_start_time">
                <el-date-picker v-if="isEdit" v-model="upSettleForm.pickup_work_start_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="装液完成时间:" label-width="120px" prop="pickup_work_end_time">
                <el-date-picker v-if="isEdit" v-model="upSettleForm.pickup_work_end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="装车毛重(吨):" label-width="120px" prop="pickup_gross_weight">
                <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="upSettleForm.pickup_gross_weight"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="装车皮重(吨):" label-width="120px" prop="pickup_tare_weight">
                <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="upSettleForm.pickup_tare_weight"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="装车净重(吨):" label-width="120px" prop="pickup_net_weight">
                <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="upSettleForm.pickup_net_weight"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10" >
          <el-row>
            <el-col>
              <el-form-item label="实际到站时间:" label-width="120px" prop="active_time">
                <el-date-picker v-if="isEdit" v-model="upSettleForm.active_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="卸车完成时间:" label-width="120px" prop="work_end_time">
                <el-date-picker v-if="isEdit" v-model="upSettleForm.work_end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="离站时间:" label-width="120px" prop="leave_time">
                <el-date-picker v-if="isEdit" v-model="upSettleForm.leave_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="实际里程(km):" label-width="120px" prop="active_mile">
                <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="upSettleForm.active_mile"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="卸车毛重(吨):" label-width="120px" prop="gross_weight">
                <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="upSettleForm.gross_weight"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="卸车皮重(吨):" label-width="120px" prop="tare_weight">
                <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="upSettleForm.tare_weight"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="卸车净重(吨):" label-width="120px" prop="net_weight">
                <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="upSettleForm.net_weight"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      </el-row>
       
      <!-- <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划装车液厂:">
            {{surePound.delivery_order && surePound.delivery_order.fluid_name || surePound.fluid}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="装液开始时间:" label-width="120px">
            <el-date-picker v-if="isEdit" v-model="surePound.work_start_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划装车吨位:">
            {{surePound.plan_tonnage}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="装液完成时间:" label-width="120px" prop="work_end_time">
            <el-date-picker v-if="isEdit" v-model="surePound.work_end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <span v-if="!isEdit">{{surePound.work_end_time || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划装车车号:">
            {{surePound.transPowerInfo && surePound.transPowerInfo.tractor && surePound.transPowerInfo.tractor.plate_number || surePound.plate_number}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="装车毛重(吨):" label-width="120px" prop="gross_weight">
            <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="surePound.gross_weight"></el-input>
            <span v-if="!isEdit">{{surePound.gross_weight || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;" v-if="isEdit">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="sendRe()" :loading="buttonLoading" :disabble="buttonLoading">确 定</el-button>
    </div>
  </div>
</template>
<script>
import upSettlementImg from '@/components/upSettlementImg'; //引入骑牛图片上传组件
export default {
  name: 'loadingReview',
  data() {
    return {
      buttonLoading: false,
      imgList: [],
      unImgList:[],
      sealImgList:[],
      upSettleForm: {
        pickup_active_time:"",
        pickup_work_start_time:"",
        pickup_work_end_time:"",
        pickup_gross_weight:"",
        pickup_tare_weight:"",
        pickup_net_weight:"",
        active_time:"",
        leave_time:"",
        work_end_time:"",
        gross_weight:"",
        tare_weight:"",
        net_weight:"",
        active_mile:"",
      },
      setpTipInfo:[],
      poundUpload: {
        fileList: [],
        Title: '装车磅单',
        limit: 1,
        change:false,
      },
      sealUpload: {
        fileList: [],
        Title: '铅封',
        limit: 3,
      },
      unPoundUpload: {
        fileList: [],
        Title: '卸车磅单',
        limit: 1,
        change:false,
      },

      rules: {
        active_time: [
          { required: true, message: '请选择实际到站时间', trigger: 'change' },
        ],
        work_end_time: [
          { required: true, message: '请选择装车完成时间', trigger: 'change' },
        ],
        gross_weight: [
          { pattern: /^\d+(\.\d{1,3})?$/, message: '不超过三位小数', trigger: 'blur' },
        ],
        tare_weight: [
          { pattern: /^\d+(\.\d{1,3})?$/, message: '不超过三位小数', trigger: 'blur' },
        ],
        net_weight: [
          { required: true, message: '请输入装车净重', trigger: 'blur' },
          { pattern: /^[1-9][0-9]?(\.\d{1,3})?$/, message: '请注意单位为吨', trigger: 'blur' },
        ],
        pickup_gross_weight: [
          { pattern: /^\d+(\.\d{1,3})?$/, message: '不超过三位小数', trigger: 'blur' },
        ],
        pickup_tare_weight: [
          { pattern: /^\d+(\.\d{1,3})?$/, message: '不超过三位小数', trigger: 'blur' },
        ],
        pickup_net_weight: [
          { required: true, message: '请输入装车净重', trigger: 'blur' },
          { pattern: /^[1-9][0-9]?(\.\d{1,3})?$/, message: '请注意单位为吨', trigger: 'blur' },
        ],
      }
    };
  },
  components: {
    upSettlementImg,
  },
  props: {
    surePoundData: Object,
    successCallback: Function,
    cancel: Function,
    isEdit: Boolean,
    isUpload: Boolean,
    checkStep:String
  },
  computed: {
    imgReviewSrc: function() {
      let imgListArray = [];
      for (let i in this.imgList) {
        imgListArray.push(this.imgList[i].url);
      }
      return `/imgReview?imgList=${imgListArray.join(',')}`;
    },
    unImgReviewSrc:function() {
      let imgListArray = [];
      for (let i in this.unImgList) {
        imgListArray.push(this.unImgList[i].url);
      }
      return `/imgReview?imgList=${imgListArray.join(',')}`;
    },
    sealImgReviewSrc:function() {
      let imgListArray = [];
      for (let i in this.sealImgList) {
        imgListArray.push(this.sealImgList[i].url);
      }
      return `/imgReview?imgList=${imgListArray.join(',')}`;
    },
  },
  methods: {
    imgChange:function(changeInfo){
      if(changeInfo.type=='load'){
        this.poundUpload.change=true;
        this.poundUpload.fileList=changeInfo.fileList;
      }else if(changeInfo.type=='unload'){
        this.unPoundUpload.change=true;
        this.unPoundUpload.fileList=changeInfo.fileList;
      }
    },
    getImg() { //获取榜单和铅封图片
      this.imgList = [];
      //获取装车榜单
      if (this.surePound.pickup_weight_note) {
        this.$$http('getPundList', { id: this.surePound.pickup_weight_note }).then((results) => {
          if (results.data.code === 0) {
            let imageUrlArray = results.data.data.data;
            imageUrlArray.map((item, j) => {
              if (item.image_url) {
                this.imgList.push({
                  url: item.image_url,
                  title: '装车磅单'
                });
              }
            })
          }
        });
      }
      //获取铅封
      if (this.surePound.pickup_carseal) {
        this.$$http('getSeal', { id: this.surePound.pickup_carseal }).then((results) => {
          let imageUrlArray = results.data.data.data;
          this.sealImgList=[];
          imageUrlArray.map((item, j) => {
            if (item.image_url_list) {
              let imageList = item.image_url_list;
              let imageNum = item.seal_no_list;
              imageList.map((imgItem, k) => {
                this.sealImgList.push({
                  url: imgItem,
                  title: '铅封号：',
                  num: imageNum && imageNum[k] ? imageNum[k] : '无'
                });
              })
            }
          })
        });
      }

      //获取卸车榜单
        if (this.surePound.weight_note) {
          let qustArray = [];
          this.unImgList = [];
          this.$$http("getPundList", { id: this.surePound.weight_note }).then(results => {
            if (results.data.code == 0) {
              let imageUrlArray = results.data.data.data;
              imageUrlArray.map((img, i) => {
                this.unImgList.push({
                  url: img.image_url,
                  title: '卸车磅单'
                });
              })
            }
          });
        }
    },
    //上传装车榜单
    uploadPoundImg() {
      return new Promise((resolve, reject) => {
        if (this.poundUpload.fileList.length) {
          let imgUrlArray = [];
          for (let i in this.poundUpload.fileList) {
            imgUrlArray.push(this.poundUpload.fileList[i].url);
          }
          let postData = {
            section_trip: this.surePoundData.pickup_trip.id,
            image_url: imgUrlArray.join(','),
          };
          this.$$http("postPundList", postData).then(results => {
            if (results.data.code == 0) {
              resolve(results)
            } else {
              reject(results);
            }
          }).catch(err => {
            reject(err);
          })
        }

      })

    },

    upUnloadPoundImg() {
      return new Promise((resolve, reject) => {
        if (this.unPoundUpload.fileList.length) {
          let imgUrlArray = [];
          for (let i in this.unPoundUpload.fileList) {
            imgUrlArray.push(this.unPoundUpload.fileList[i].url);
          }
          let postData = {
            section_trip: this.surePoundData.id,
            image_url: imgUrlArray.join(','),
          };
          this.$$http("postPundList", postData).then(results => {
            if (results.data.code == 0) {
              resolve(results)
            } else {
              reject(results);
            }
          }).catch(err => {
            reject(err);
          })
        }

      })

    },
     cancle(){
      this.$emit('close');
      this.unPoundUpload.fileList=[];
      this.poundUpload.fileList=[];
    },
    //审核通过ajax
    sendReAjax() {
      let sendData = this.upSettleForm;
      sendData.id=this.surePound.id;
      sendData.status='in_settlement';
      this.$$http("changeOrderStatus", sendData).then(results => {
        this.buttonLoading = false;
        if (results.data.code == 0) {
          this.$message({
            type: "success",
            message: "提交结算成功"
          });

          this.$emit('successCallback');
          this.$emit('close');
        }
      }).catch((err) => {
        this.buttonLoading = false;
      });
    },
    sendRe() { //审核通过

      this.$refs['examinePoundForm'].validate(valid => {
        if (!valid) return;
        this.buttonLoading = true;
          if(this.poundUpload.change){
            this.uploadPoundImg();
          }
          if(this.unPoundUpload.change){
            this.upUnloadPoundImg();
          }
          this.sendReAjax();
      })
    },
    getCheckStep() {
      var sendData={};
      sendData.id=this.surePoundData.id;
      this.$$http('getCheckStep',sendData).then(results=>{
        if(results.data.code==0){
          this.setpTipInfo=results.data.data;
        }
      });
    }
  },
  created() {
    this.surePound = Object.assign({}, this.surePoundData);
    this.getImg();
    this.checkStep=='check'&&this.getCheckStep();
    this.upSettleForm={
        pickup_active_time:this.surePound.pickup_trip.active_time||null,
        pickup_work_start_time:this.surePound.pickup_trip.work_start_time||null,
        pickup_work_end_time:this.surePound.pickup_trip.work_end_time||null,
        pickup_gross_weight:this.surePound.pickup_trip.gross_weight||null,
        pickup_tare_weight:this.surePound.pickup_trip.tare_weight||null,
        pickup_net_weight:this.surePound.pickup_trip.net_weight||null,
        active_time:this.surePound.active_time||null,
        leave_time:this.surePound.weight_audit_time||null,
        work_end_time:this.surePound.work_end_time||null,
        gross_weight:this.surePound.gross_weight||null,
        tare_weight:this.surePound.tare_weight||null,
        net_weight:this.surePound.net_weight||null,
        active_mile:this.surePound.weight_active_mile||null,
    }
    

  },
  watch: {
    //这个组件主要应用于弹窗中，弹窗的打开不会触发弹窗内的组件的重新渲染，所以这里监控surePoundData的变化，初始化数据
    surePoundData: {
      handler(val, oldVal) {
        //数据再次初始化
        this.surePound = Object.assign({}, val);

        this.getImg();
        this.checkStep=='check'&&this.getCheckStep();
        this.poundUpload = {
          fileList: [],
          Title: '装车磅单',
          limit: 1,
        };

        this.sealUpload = {
          fileList: [],
          Title: '铅封',
          limit: 1,
        };
        this.unPoundUpload = {
          fileList: [],
          Title: '卸车磅单',
          limit: 1,
        };
      },
      deep: true　
    },
  }
};

</script>
