<style scoped lang="less">
.loading-review-container {
  /deep/ .el-date-editor.el-input {
    width: 100%;
  }
}

</style>
<template>
  <div class="loading-review-container">
    <el-form ref="examinePoundForm" :model="surePound" status-icon :label-position="'right'" label-width="100px">
      <el-row>
        <el-col :span="20" :offset="2">
          <router-link target="_blank" :to="imgReviewSrc">
            <img :src="surePound.image_url" style='width:100%;max-height:500px'></img>
          </router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划到站时间:">
            计划到站时间
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="实际到站时间:" prop="active_time">
            <el-date-picker v-model="surePound.active_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划站点:">
            计划站点
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车完成时间:" prop="work_start_time">
            <el-date-picker v-model="surePound.work_end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="站点地址:">
            站点地址
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="离站时间:" prop="work_end_time">
            <el-date-picker v-model="surePound.leave_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划卸车吨位:">
            计划卸车吨位
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="实际里程:" prop="active_mile">
            <el-input placeholder="请输入" type="text" v-model="surePound.active_mile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划卸车车号:">
            计划卸车车号
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车毛重(吨):" prop="gross_weight">
            <el-input placeholder="请输入" type="text" v-model="surePound.gross_weight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="主驾:">
            主驾
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车皮重(吨):" prop="tare_weight">
            <el-input placeholder="请输入" type="text" v-model="surePound.tare_weight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="副驾/押运:">
            副驾/押运
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车净重(吨):" prop="net_weight">
            <el-input placeholder="请输入" type="text" v-model="surePound.net_weight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button @click="dialog.sureLoadEx = false">取 消</el-button>
      <el-button type="primary" @click="sendRe('sureLoadExUp')" :loading="buttonLoading.unloadinguditSuccessButton">确 定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'unloadingReview',
  data() {
    return {
      surePound: {},
      buttonLoading: {},
      imgReviewSrc: '',
    };
  },
  props: {

  },
  computed: {

  },
  methods: {
    sendRe() {

    }
  },
  created() {

  }
};

</script>
