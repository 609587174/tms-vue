<template>
  <div class="clearfix upload-img-container">
    <div class="img-up-add img-item" v-on:click="triggerClickInput">
      <div class="consult-upload"></div>
    </div>
    <input type="file" name="files" class="img-file-input" @change="handleFileSelect" />
    <p class="float-left upload-img-tips">{{uploadImgTips}}</p>
  </div>
</template>
<script>
export default {
  name: 'qiniuUpload',
  props: {
    users: Object,
    logout: Function,
  },

  data: function() {
    return {
      uploadImgTips: '',
    }
  },
  computed: {


  },
  methods: {
    triggerClickInput: function(event) {
      let imgFileInput;
      let targetNode = event.target;
      let className = targetNode.className;

      if (className.match(/consult-upload/g)) {
        imgFileInput = event.target.parentNode.nextSibling.nextSibling;
      } else {
        imgFileInput = event.target.nextSibling.nextSibling;
      }

      if (typeof FileReader == 'undefined') {
        this.uploadImgTips = '你的浏览器不支持上传，请升级浏览器';
      } else {
        imgFileInput.click();
      }
    },
    handleFileSelect: function(event) {

      let files = $event.target.files; //files所有选择的文件。（包含之前已经上传的和新选择的）

      let container = $event.target.parentNode; //得到外层父元素

      for (let i = 0, f; f = files[i]; i++) {
        //过滤掉非图片类型文件
        if (!f.type.match('image.*')) {
          continue;
        }

        //图片大小不大于2M
        if (f.size >= 2000000) {
          continue;
        }

        //过滤掉已上传的图片
        let isUploaded = false;
        for (var j = 0; j < $scope.uploadOption.files.length; j++) {
          if ($scope.uploadOption.files[j].filename == f.name) {
            isUploaded = true;
            break;
          }
        }

        //图片还没有上传且不超过最大上传数
        if (!isUploaded && $scope.uploadOption.files.length < $scope.uploadOption.maxNum) {
          $scope.uploadOption.files.push(f);
          if ($scope.uploadOption.files.length == $scope.uploadOption.maxNum) {
            //尝试用ng-show来控制div.img-up-add(新增按钮)的显示隐藏，发现$scope.uploadOption.files更新有延迟，所以用原生js来控制。
            let imgAddBtn = $event.target.previousSibling;
            imgAddBtn.style.display = 'none';
          }

          let reader = new FileReader(); //具体参考html5的FileReader api
          reader.onload = function(e) {
            console.log('e', e);
            //插入正在上传div框
            let divNode = document.createElement('div');
            divNode.className = 'img-thumb img-item';
            divNode.innerHTML = '正在上传...';
            container.insertBefore(divNode, container.firstChild);
          };
          reader.readAsDataURL(f);
        }
      }
      $scope.uploadImg(container);
    }
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
