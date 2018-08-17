<template>
  <div class="clearfix upload-img-container">
    <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" :http-request="uploadFile" :before-upload="beforeAvatarUpload" multiple accept="image/gif,image/jpeg,image/png,image/jpg">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import * as qiniu from 'qiniu-js';
import axios from 'axios';
export default {
  name: 'qiniuUpload',
  props: {

  },

  data: function() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
    }
  },
  computed: {


  },
  methods: {
    handleRemove(file, fileList) {
      for (let i in this.fileList) {
        if (this.fileList[i].name === file.name) {
          this.fileList.splice(i, 1);
        }
      }
      console.log(file, this.fileList);
    },
    handlePictureCardPreview(file) {
      console.log('file', file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      if ((file.size / 1024 / 1024) > 2) {
        this.$message({
          message: '上传头像图片大小不能超过 2MB',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    uploadFile(e) {
      console.log('files', e);
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

      axios.get('http://driver.hhtdlng.com/api/v1/driver-side/qiniu/retrieve-token/', {
        params: {
          suffix: 'png',
        }
      }).then((results) => {
        if (results.data && results.data.code == 0) {
          let resultsData = results.data.data;
          let key = resultsData.key;
          let token = resultsData.token;

          this.uploadWithSDK(token, putExtra, config, key, files);
        }
      })

    },
    uploadWithSDK(token, putExtra, config, key, file) {
      // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
      let error = err => {
        console.log('err', err);
        this.$message({
          message: '上传失败',
          type: 'error'
        });
      };

      let complete = res => {
        console.log('res', res);
        this.fileList.push({
          name: file.name,
          url: `http://dev-image.hhtdlng.com/${key}`
        })
      };

      let next = response => {
        console.log('response', response, file);
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

  }
}

</script>
<style scoped lang="less">


</style>
