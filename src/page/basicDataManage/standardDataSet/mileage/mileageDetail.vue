<style scoped lang="less">
.trans-fee {
  .table-list {
    margin-bottom: 20px;
  }
}

.detail-main {
  border-top: 0;
}

</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="标准里程详情" name="detail">
        <div class="detail-main">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/basicDataManage/standardDataSet/mileage/mileageDataList'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>标准里程信息</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main v-loading="pageLoading">
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      基础信息
                    </el-col>
                    <el-col :span="6" class="text-right" v-if="detailData.source_type==='offline'">
                      <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>实际液厂:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.fluid_factory&&detailData.fluid_factory.fluid_name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="label-list">
                      <label>液厂地址:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.fluid_factory&&detailData.fluid_factory.actual_address)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>站点:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.fluid_site&&detailData.fluid_site.position_name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="label-list">
                      <label>站点地址:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.fluid_site&&detailData.fluid_site.address)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>标准里程:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.standard_mileage)"></div>
                    </div>
                  </el-col>
                  <!-- <el-col :span="8">
                    <div class="label-list">
                      <label>启用状态:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.is_active?'已生效':'未生效')"></div>
                    </div>
                  </el-col> -->
                  <el-col :span="8">
                    <div class="label-list">
                      <label>生效托运方:</label>
                      <div class="detail-form-item">
                        <div v-if="detailData.customer_staffs&&detailData.customer_staffs.length">
                          <span v-for="(item,key) in detailData.customer_staffs" :key="key">{{item.carrier_name}}<br/></span>
                        </div>
                        <span v-else v-html="pbFunc.dealNullData(detailData.traders&&detailData.traders.name)"></span>
                      </div>
                    </div>
                  </el-col>

                </el-row>
                <el-row :gutter="10">

                </el-row>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'mileageDetail',
  data() {
    return {
      pageLoading: false,
      activeStep: 0,
      activeName: 'detail',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      detailData: {},
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  methods: {

    getDetail: function() {
      let postData = {
        id: this.id,
      };
      this.pageLoading = true;
      this.$$http('getStandardMileDetail', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    handleRemove: function(file, fileList) {

    },
    handlePreview: function(file) {

    },
    handleClick() {

    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/basicDataManage/standardDataSet/mileage/editMileage?activeStep=" + number, query: { id: this.detailData.id, activeStep: number } });
    },

  }
}

</script>
