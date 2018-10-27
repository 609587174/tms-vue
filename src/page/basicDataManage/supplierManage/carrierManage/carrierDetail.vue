<!-- carrierDetail.vue -->
<!-- clientDetail.vue -->
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
      <el-tab-pane label="承运商详情" name="detail">
        <div class="detail-main">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/basicDataManage/supplierManage/carrierManage/carrierManagelist'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>承运商信息</p>
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
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>承运商:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>联系人:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.contact_name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>联系方式:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.contact_phone)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>地址:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.detail_address)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>社会机构代码:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.license_code?detailData.license_code:detailData.organization_code)"></div>
                    </div>
                  </el-col>

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
  name: 'carrierDetail',
  data() {
    return {
      pageLoading: false,
      activeStep: 0,
      activeName: 'detail',
      detailData: {
        carrier_type: {
          verbose: ''
        },
        is_valid: {
          verbose: ''
        },
      },
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
      this.pageLoading = true;
      this.$$http('getCarrierDetail', { carrier_id: this.id }).then((results) => {
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
      this.$router.push({ path: "/basicDataManage/supplierManage/carrierManage/editCarrier?activeStep=" + number, query: { id: this.detailData.id, activeStep: number } });
    },

  }
}

</script>
