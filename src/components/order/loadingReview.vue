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
    <el-form ref="examinePoundForm" :model="surePound" :rules="rules" status-icon :label-position="'right'" label-width="100px">
      <el-row v-if="!isUpload">
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
      </el-row>
      <el-row v-if="isUpload">
        <el-col :span="20" :offset="2">
          <qiniuImgUpload :fileList.sync="poundUpload.fileList" :uploadTitle="poundUpload.uploadTitle" :limit="poundUpload.limit"></qiniuImgUpload>
        </el-col>
      </el-row>
      <el-row v-if="isUpload" class="mt-10">
        <el-col :span="20" :offset="2">
          <qiniuImgUpload :fileList.sync="sealUpload.fileList" :uploadTitle="sealUpload.uploadTitle" :limit="sealUpload.limit"></qiniuImgUpload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划装车时间:">
            {{surePound.plan_time}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="实际到厂时间:" label-width="120px" prop="active_time">
            <el-date-picker v-if="isEdit" v-model="surePound.active_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <span v-if="!isEdit">{{surePound.active_time || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划装车液厂:">
            {{surePound.delivery_order && surePound.delivery_order.fluid_name || surePound.fluid}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="装液开始时间:" label-width="120px">
            <el-date-picker v-if="isEdit" v-model="surePound.work_start_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <span v-if="!isEdit">{{surePound.work_start_time || '无'}}</span>
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
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="主驾:">
            <span>{{surePound.transPowerInfo && surePound.transPowerInfo.master_driver && surePound.transPowerInfo.master_driver.name ||surePound.master_driver}}&nbsp;&nbsp;{{surePound.transPowerInfo && surePound.transPowerInfo.master_driver && surePound.transPowerInfo.master_driver.mobile_phone ||surePound.master_driver_phone}}</span>
            <span v-if="surePound.transPowerInfo && surePound.transPowerInfo.group && surePound.transPowerInfo.group.group_name">/{{surePound.transPowerInfo && surePound.transPowerInfo.group && surePound.transPowerInfo.group.group_name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="装车皮重(吨):" label-width="120px" prop="tare_weight">
            <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="surePound.tare_weight"></el-input>
            <span v-if="!isEdit">{{surePound.tare_weight || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="副驾/押运:">
            <span>{{surePound.transPowerInfo && surePound.transPowerInfo.vice_driver && surePound.transPowerInfo.vice_driver.name || surePound.copilot_name}}&nbsp;&nbsp;{{surePound.transPowerInfo && surePound.transPowerInfo.vice_driver && surePound.transPowerInfo.vice_driver.mobile_phone || surePound.copilot_driver_phone}}</span>
            <br v-if="(surePound.transPowerInfo && surePound.transPowerInfo.vice_driver && surePound.transPowerInfo.vice_driver.name) || surePound.copilot_name"> <span>{{surePound.transPowerInfo && surePound.transPowerInfo.escort_staff && surePound.transPowerInfo.escort_staff.name || surePound.supercargo_name}}&nbsp;&nbsp;{{surePound.transPowerInfo && surePound.transPowerInfo.escort_staff && surePound.transPowerInfo.escort_staff.mobile_phone || surePound.supercargo_phone}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="装车净重(吨):" label-width="120px" prop="net_weight">
            <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="surePound.net_weight"></el-input>
            <span v-if="!isEdit">{{surePound.net_weight || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;" v-if="isEdit">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="sendRe()" :loading="buttonLoading" :disabble="buttonLoading">确 定</el-button>
    </div>
  </div>
</template>
<script>
import qiniuImgUpload from '@/components/qiniuImgUpload'; //引入骑牛图片上传组件
export default {
  name: 'loadingReview',
  data() {
    return {
      buttonLoading: false,
      imgList: [],
      surePound: {},

      poundUpload: {
        fileList: [],
        uploadTitle: '上传磅单',
        limit: 1,
      },
      poundReturnId: '',
      sealUpload: {
        fileList: [],
        uploadTitle: '上传铅封',
        limit: 3,
      },
      sealReturnId: '',

      rules: {
        active_time: [
          { required: true, message: '请选择实际到厂时间', trigger: 'change' },
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
        ]
      }


    };
  },
  components: {
    qiniuImgUpload,
  },
  props: {
    surePoundData: Object,
    successCallback: Function,
    cancel: Function,
    isEdit: Boolean,
    isUpload: Boolean,
  },
  computed: {
    imgReviewSrc: function() {
      let imgListArray = [];
      for (let i in this.imgList) {
        imgListArray.push(this.imgList[i].url);
      }
      return `/imgReview?imgList=${imgListArray.join(',')}`;
    }
  },
  methods: {
    getImg() { //获取榜单和铅封图片
      this.imgList = [];
      //获取装车榜单
      if (this.surePound.weight_note) {
        this.$$http('getPundList', { id: this.surePound.weight_note }).then((results) => {
          if (results.data.code === 0) {
            let imageUrlArray = results.data.data.data;
            imageUrlArray.map((item, j) => {
              if (item.image_url) {
                this.imgList.push({
                  url: item.image_url,
                  title: '磅单'
                });
              }
            })
          }
        });
      }
      //获取铅封
      if (this.surePound.carseal) {
        this.$$http('getSeal', { id: this.surePound.carseal }).then((results) => {
          let imageUrlArray = results.data.data.data;
          imageUrlArray.map((item, j) => {
            if (item.image_url_list) {
              let imageList = item.image_url_list;
              let imageNum = item.seal_no_list;
              imageList.map((imgItem, k) => {
                this.imgList.push({
                  url: imgItem,
                  title: '铅封号：',
                  num: imageNum && imageNum[k] ? imageNum[k] : '无'
                });
              })
            }
          })
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
            section_trip: this.surePoundData.id,
            image_url: imgUrlArray.join(','),
          };
          this.$$http("postPundList", postData).then(results => {
            if (results.data.code == 0) {
              this.poundReturnId = results.data.data.id;
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
    //上传铅封榜单
    uploadSealImg() {
      if (this.sealUpload.fileList.length) {
        let imgUrlArray = [];
        for (let i in this.sealUpload.fileList) {
          imgUrlArray.push(this.sealUpload.fileList[i].url);
        }
        let postData = {
          section_trip: this.surePoundData.id,
          image_url_list: imgUrlArray,
        };
        this.$$http("postSeal", postData).then(results => {
          if (results.data.code == 0) {
            this.sealReturnId = results.data.data.id;
          } else {
            this.$message({
              type: "error",
              message: "铅封上传失败"
            });
          }
        })
      }
    },
    //审核通过ajax
    sendReAjax() {

      if (!this.surePound.weight_note && !this.poundReturnId) return;

      let sendData = {
        active_time: this.surePound.active_time,
        work_start_time: this.surePound.work_start_time,
        work_end_time: this.surePound.work_end_time,
        gross_weight: this.surePound.gross_weight,
        tare_weight: this.surePound.tare_weight,
        net_weight: this.surePound.net_weight,
        leave_time: this.surePound.leave_time || null,
        active_mile: this.surePound.active_mile || null,
        is_checked: 'pass',
        id: this.isUpload ? this.poundReturnId : this.surePound.weight_note,
      };

      this.$$http("examineLoad", sendData).then(results => {
        this.buttonLoading = false;
        if (results.data.code == 0) {
          this.$message({
            type: "success",
            message: "审核通过成功"
          });

          this.$emit('successCallback');
          this.$emit('close');
        }
      }).catch((err) => {
        this.buttonLoading = false;
      });
    },
    sendRe() { //审核通过

      if (this.isUpload && !this.poundUpload.fileList.length) {
        this.$message({
          type: "success",
          message: "请上传磅单",
        });
        return;
      };

      this.$refs['examinePoundForm'].validate(valid => {

        if (!valid) return;

        this.buttonLoading = true;

        if (this.isUpload) {
          this.uploadSealImg();
          this.uploadPoundImg().then(results => {
            this.sendReAjax();
          }).catch(()=>{
            this.buttonLoading = false;
          });
        } else {
          this.sendReAjax();
        }

      })



    }
  },
  created() {
    this.surePound = Object.assign({}, this.surePoundData);

    !this.isUpload && this.getImg();

  },
  watch: {
    //这个组件主要应用于弹窗中，弹窗的打开不会触发弹窗内的组件的重新渲染，所以这里监控surePoundData的变化，初始化数据
    surePoundData: {
      handler(val, oldVal) {
        //数据再次初始化
        this.surePound = Object.assign({}, val);

        !this.isUpload && this.getImg();

        this.poundUpload = {
          fileList: [],
          uploadTitle: '上传磅单',
          limit: 1,
        };

        this.sealUpload = {
          fileList: [],
          uploadTitle: '上传铅封',
          limit: 2,
        }
      },
      deep: true　
    },
  }
};

</script>
