<template>
  <div class="clearfix upload-img-container {{className}}">
    <div class="img-up-add  img-item" ng-click="triggerClickInput($event)">
      <div class="consult-upload"></div>
    </div>
    <input type="file" name="files" class="img-file-input" onchange="">
    <p class="float-left upload-img-tips"></p>
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

    }
  },
  computed: {


  },
  methods: {

  }
}

</script>
<style scoped>
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
    background: url("/img/plus.png") no-repeat 21px 22px;
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
