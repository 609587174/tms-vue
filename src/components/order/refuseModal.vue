<template>
  <div>
    <el-form label-width="125px" status-icon>
      <el-row>
        <el-col :span="18" :offset="3">
          <el-form-item label="拒绝原因:">
            <el-select v-model="loadPoundReason" placeholder="请选择车辆归属">
              <el-option v-for="(item,key) in selectData.loadPoundReasonList" :key="key" :label="item.text" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="loadPoundReason=='other'">
        <el-col :span="18" :offset="3">
          <el-form-item label="其他原因:">
            <el-input type="textarea" v-model="otherInput" style="width:80%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button @click="$emit('close')">返 回</el-button>
      <el-button type="primary" @click="refuse" :loading="isLoading" :disabled="isLoading">确认拒绝</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'refuseModal',
  data() {
    return {
      selectData: {
        loadPoundReasonList: [{
            key: "磅单照片不清晰",
            text: "磅单照片不清晰"
          },
          {
            key: "虚假磅单照片",
            text: "虚假磅单照片"
          }, {
            key: "吨位信息错误",
            text: "吨位信息错误"
          }, 
          {
            key: "运单错误",
            text: "运单错误"
          },
          {
            key: "other",
            text: "其他原因"
          }
        ]
      },
      loadPoundReason: '磅单照片不清晰',
      otherInput: '',
      isLoading: false,

    };
  },
  components: {

  },
  props: {
    weightId: String,
    close: Function,
    successCallback: Function,
  },
  computed: {

  },
  methods: {

    refuse() {

      let sendData = {
        id: this.weightId,
        is_checked: 'refuse',
        reason: this.loadPoundReason === 'other' ? this.otherInput : this.loadPoundReason,
      };

      this.isLoading = true;

      this.$$http("examineLoad", sendData).then(results => {
        this.isLoading = false;
        if (results.data.code == 0) {
          this.$emit('successCallback');
          this.$emit('close');
          this.$message({
            type: "success",
            message: "审核拒绝成功"
          })
        }
      }).catch(() => {
        this.isLoading = false;
      });

    },
  },
  created() {


  },
};

</script>
<style scoped lang="less">


</style>
