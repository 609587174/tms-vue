<style scoped lang="less">
.img-box {

  img {
    height: 100px;
    width: 100px;
  }
}

</style>
<template>
  <div class="detail-main">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>地标详情</p>
      </el-header>
      <el-main v-loading="pageLoading">
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
            <div class="float-left" v-for="(item,key) in imgObject.imgList" :key="key" v-on:click="toShowPreview(key)"><img :src="item.src" /></div>
          </div>
        </div>
      </el-main>
    </el-container>
    <img-review :imgObject.sync='imgObject'></img-review>
  </div>
</template>
<script>
import imgReview from '@/components/common/imgReview';
export default {
  name: 'landMarkDetail',
  components: {
    imgReview: imgReview,
  },
  computed: {

  },
  data() {
    return {
      activeName: 'first',
      pageLoading: 'pageLoading',
      previewIndex: 0,
      dialogTableVisible: false,
      imgObject: {
        imgList: [{
          src: 'http://91lng.cn/img/banner_1.jpg',
        }, {
          src: 'http://91lng.cn/img/banner_2.jpg',
        }, {
          src: 'http://91lng.cn/img/banner_3.jpg',
        }, {
          src: 'http://91lng.cn/img/banner_4.jpg',
        }],
        showPreview: false,
        previewIndex: 0,
      }

    }
  },
  methods: {
    toShowPreview: function(index) {
      this.imgObject.showPreview = true;
      this.imgObject.previewIndex = index;
    },
    getDetail: function() {
      let postData = {
        id: this.id,
      };
      this.pageLoading = true;
      this.$$http('getLandMarkDetail', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    }
  },
  created: function() {
    this.getDetail();
  }
}

</script>
