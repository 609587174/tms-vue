<template>
  <div class="clearfix upload-img-container">
    <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" :http-request="uploadFile">
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
    users: Object,
    logout: Function,
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
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile(file) {
      console.log('file', file);
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

      this.uploadWithSDK(token, putExtra, config, domain, file);
    },
    uploadWithSDK(token, putExtra, config, domain) {
      // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
      let error = function(err) {
        console.log('err', err);
      };

      let complete = function(res) {
        console.log('res', res);
      };

      let next = function(response) {
        console.log('response', response);
      };

      let subObject = {
        next: next,
        error: error,
        complete: complete
      };

      let observable = qiniu.upload(file, key, token, putExtra, config);

      let subscription = observable.subscribe(subObject);

    },
    getQiniuKey() {
      axios.get('http://driver.hhtdlng.com/api/v1/driver-side/qiniu/retrieve-token/', {
        params: {
          suffix: '',
        }
      }).then((results) => {
        console.log('results', results);
      });
    },
  },
  created() {
    this.getQiniuKey();
  }
}

</script>
<style scoped lang="less">
.upload-img-container {
  .img-item {
    position: relative;

    float: left;
    width: 80px;
    height: 80px;
    margin-right: 10px;

    font-size: 12px;
    line-height: 80px;

    text-align: center;

    color: #434343;
  }
  .consult-upload {
    display: inline-block;
    width: 80px;
    height: 80px;

    border: 2px dashed #cacaca;
    color: #cacaca;
    background: url("../assets/img/plus.png") no-repeat 21px 22px;
  }
  .thumb-icon {
    width: 100%;
    height: 100%;
  }

  .img-remove {
    position: absolute;
    top: -3px;
    right: -3px;

    display: block;
    width: 12px;
    height: 12px;
    overflow: hidden;

    font-size: 12px;
    line-height: 10px;

    text-align: center;
    text-decoration: none;

    color: #fff;
    border-radius: 50%;
    background: #f57170;
    background-clip: padding-box;
  }
  .img-file-input {
    display: none;
  }
  .upload-img-tips {
    padding-top: 55px;
    margin: 0;

    color: #a33823;
  }
}

</style>
