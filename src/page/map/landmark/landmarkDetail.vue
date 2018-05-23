<style scoped lang="less">
.img-box {

  img {
    height: 100px;
    width: 100px;
  }
}

.img-review {

  width: 100%;

  img {
    width: 100%;
  }
}

.review-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, .6);
  color: #fff;
}

.img-review-out-box {
  width: 100%;
  height: 100%;
  display: table;
}

.img-review-box {
  display: table-cell;
  vertical-align: middle;
  min-height: 100px;
  max-height: 500px;
  min-width: 100px;
  max-width: 800px;
  .img-review-in-box {
    min-height: 100px;
    max-height: 500px;
    min-width: 100px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  >div {
    position: relative;
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      text-align: center;
      list-style: none;
      img {
        max-width: 500px;
        max-height: 500px;
      }
    }
  }
  .next-preview-img {
    position: absolute;
    top: -30px;
    left: 40%;


    height: 24px;

    font-size: 16px;
    color: #fff;

    background: no-repeat url("/img/prepage.png") center center;
  }
  .previous-preview-img {
    position: absolute;
    top: -30px;
    left: 55%;

    height: 24px;

    font-size: 16px;
    color: #fff;

    background: no-repeat url("/img/nextpage.png") center center;
  }
  .rotate-img {
    position: absolute;
    top: -30px;
    left: 49%;
    color: #fff;


    height: 24px;

    background: no-repeat url("/img/rotate.png") center center;
  }
  .rotate-45 {
    -webkit-transform: rotate(45deg);
    /* Safari and Chrome */
    -moz-transform: rotate(45deg);
    /* Firefox */
    -ms-transform: rotate(45deg);
    /* IE 9 */
    -o-transform: rotate(45deg);
    /* Opera */
    transform: rotate(45deg);
  }
}

</style>
<template>
  <div class="detail-main">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>地标详情</p>
      </el-header>
      <el-main>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                审核操作
              </el-col>
            </el-row>
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>上传时间:</label>
                <div class="detail-form-item">2012-12-12</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>上传来源:</label>
                <div class="detail-form-item">司机上传</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>审核操作:</label>
                <div class="detail-form-item">已审核</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>审核状态:</label>
                <div class="detail-form-item">已审核</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>审核人:</label>
                <div class="detail-form-item">小龙哥</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label><span class="text-red">* </span>审核时间:</label>
                <div class="detail-form-item">2012-12-12</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                地标信息同步
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>地标类型:</label>
                <div class="detail-form-item">加油站</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>地标同步:</label>
                <div class="detail-form-item">一同步</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                地标图片
              </el-col>
            </el-row>
          </div>
          <div class="img-box clearfix">
            <div class="float-left" v-on:click="dialogTableVisible = true"><img src="../../../assets/img/testImg/test_1.jpg" /></div>
            <div class="float-left" v-on:click="dialogTableVisible = true"><img src="../../../assets/img/testImg/test_2.jpg" /></div>
            <div class="float-left" v-on:click="dialogTableVisible = true"><img src="../../../assets/img/testImg/test_3.jpeg" /></div>
            <div class="float-left" v-on:click="dialogTableVisible = true"><img src="../../../assets/img/testImg/test_4.jpg" /></div>
          </div>
          <el-dialog title="图片预览" :visible.sync="dialogTableVisible">
            <div class="clearfix img-review">
              <div class="float-left"><img src="../../../assets/img/testImg/test_1.jpg" /></div>
              <div class="float-left"><img src="../../../assets/img/testImg/test_2.jpg" /></div>
              <div class="float-left"><img src="../../../assets/img/testImg/test_3.jpeg" /></div>
              <div class="float-left"><img src="../../../assets/img/testImg/test_4.jpg" /></div>
            </div>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
    <div class="review-background">
      <div class="img-review-out-box">
        <div class="clearfix img-review-box">
          <div class="img-review-in-box">
            <ul>
              <li>
                <div v-show="previewIndex == 0"><img src="../../../assets/img/testImg/test_1.jpg" /></div>
              </li>
              <li>
                <div v-show="previewIndex == 1"><img src="../../../assets/img/testImg/test_2.jpg" /></div>
              </li>
              <li>
                <div v-show="previewIndex == 2"><img src="../../../assets/img/testImg/test_3.jpeg" /></div>
              </li>
              <li>
                <div v-show="previewIndex == 3"><img src="../../../assets/img/testImg/test_4.jpg" /></div>
              </li>
            </ul>
            <a class="next-preview-img" href="javascript:void(0)" v-on:click="nextImg">下一张</a>
            <a class="previous-preview-img" href="javascript:void(0)" v-on:click="previousImg">上一张</a>
            <a href="javascript:void(0)" v-on:click="rotateImg()" class="rotate-img">旋转</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'landMarkDetail',
  computed: {

  },
  data() {
    return {
      activeName: 'first',
      previewIndex: 0,
      dialogTableVisible: false,
      imgList: [{
        src: '../../../assets/img/testImg/test_1.jpg',
      }, {
        src: '../../../assets/img/testImg/test_2.jpg',
      }, {
        src: '../../../assets/img/testImg/test_3.jpeg',
      }, {
        src: '../../../assets/img/testImg/test_4.jpg',
      }, {
        src: '../../../assets/img/testImg/test_5.jpeg',
      }, {
        src: '../../../assets/img/testImg/test_6.jpg',
      }]
    }
  },
  methods: {
    nextImg() {
      console.log('this', this);
      if (this.previewIndex < 3) {
        this.previewIndex++
      } else {
        this.previewIndex = 0;
      }
    },
    previousImg() {
      if (this.previewIndex === 0) {
        this.previewIndex = 3;
      } else {
        this.previewIndex--;
      }
    },
    rotateImg() {
      let curentDeg = ele.css('transform');
      if (curentDeg) {
        let curentDegNum = curentDeg.replace(/[^0-9]/ig, "");
        let rotateDeg = 90 + Number(curentDegNum);
        ele.css({
          'transform': 'rotate(' + rotateDeg + 'deg)'
        })
      } else {
        ele.css({
          'transform': 'rotate(90deg)'
        })
      }

    }
  },
}

</script>
