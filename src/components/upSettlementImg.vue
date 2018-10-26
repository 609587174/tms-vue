<style scoped lang="less">
.text_center>div{
  text-align:center;
  margin-top:15px;
  color:#409EFF;
}

</style>
<template>
  <div>
    <el-row v-if="">
    <el-col >
      <div style="text-align:center">{{imgInfo.title}}{{imgInfo.num}}</div>
    </el-col>
    <el-col>
    <router-link target="_blank" :to="imgView">
      <img :src="imgInfo.url" style='width:100%;max-height:100px' v-loading="imgLoading"></img>
    </router-link>
    </el-col>
    <el-col class="text_center" v-if="!hideUpimg">
    <el-upload action=""  :on-success="handleAvatarSuccess" :show-file-list="showList" :file-list="saveFileList" :http-request="uploadFile" :before-upload="beforeAvatarUpload" multiple accept="image/gif,image/jpeg,image/png,image/jpg">
      <div v-if="Title">修改{{Title}}</div>
    </el-upload>
    </el-col>
    </el-row>
  </div>
</template>
<script>
import * as qiniu from 'qiniu-js';
import axios from 'axios';
import imgReview from '@/components/common/imgReview';
export default {
  name: 'qiniuUpload',
  props: {
    fileList: [Object,Array],
    Title: String,
    limit: Number,
    imgView:String,
    imgInfo:Object,
    hideUpimg:Boolean,
    type:String
  },
  components: {
    imgReview,
  },
  data: function() {
    return {
      imgObject: {
        imgList: [], //图片url列表,必需。
        showPreview: false, //是否展示预览，默认false,必需
        previewIndex: 0, //默认展示图片的index,可选
      },
      showList:false,
      imgLoading:false,
      saveFileList:{}
    }
  },
  computed: {
    
  },
  methods: {
    handleAvatarSuccess:function(res, file){
      console.log(file);
    },
    beforeAvatarUpload(file) {

      const isLimte2M = file.size / 1024 / 1024 < 2;

      const isLimteNum = this.limit && this.saveFileList.length < this.limit;

      if (!isLimte2M) {
        this.$message({
          message: '上传头像图片大小不能超过 2MB',
          type: 'error'
        });
      }

      if (!isLimteNum) {
        this.$message({
          message: `只限上传${this.limit}张`,
          type: 'error'
        });
      }

      return isLimte2M && isLimteNum;
    },
    uploadFile(e) {
      let files = e.file;

      let config = {
        useCdnDomain: true,
        disableStatisticsReport: false,
        retryCount: 6,
        region: qiniu.region.z2
      };

      let putExtra = {
        fname: "",
        params: {},
        mimeType: null
      };

      let type = files.type.split('/')[1];
      this.imgLoading=true;
      this.$$http('getQiniuKey', {
        suffix: type,
      }).then(results => {
        if (results.data && results.data.code == 0) {
          let resultsData = results.data.data;
          let key = resultsData.key;
          let token = resultsData.token;
          this.uploadWithSDK(token, putExtra, config, key, files);
        }

      })

    },
    uploadWithSDK(token, putExtra, config, key, file) {
      var vm=this;
      // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
      let error = err => {
        this.$message({
          message: '上传失败',
          type: 'error'
        });
        this.imgLoading=false;
      };
      let currentUrl = document.location.href.toString();
      let complete = res => {
        this.imgLoading=false;
        if (currentUrl.match(`tms.91lng.cn`) && !currentUrl.match(`ptms.91lng.cn`) && !currentUrl.match(`testtms.91lng.cn`)) {
          this.saveFileList=[{ name: file.name, url: `http://images.91lng.cn/${key}` }]
          vm.imgInfo.url=`http://images.91lng.cn/${key}`;
            vm.$emit('imgChange',{'type':vm.type,'fileList':vm.saveFileList});
        } else {
          this.saveFileList=[{ name: file.name, url: `http://dev-image.hhtdlng.com/${key}` }]
            vm.imgInfo.url=`http://dev-image.hhtdlng.com/${key}`;
            vm.$emit('imgChange',{'type':vm.type,'fileList':vm.saveFileList});
        }
      };

      let next = response => {
        file.percentage = response.total.percent;
      };

      let subObject = {
        next: next,
        error: error,
        complete: complete
      };

      let observable = qiniu.upload(file, key, token, putExtra, config);

      let subscription = observable.subscribe(subObject);

    },
  },
  created() {
    this.saveFileList=this.pbFunc.deepcopy(this.fileList);
  }
}

</script>
<style scoped lang="less">
/deep/.el-upload--picture-card {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 120px;
  height: 120px;
}

</style>
