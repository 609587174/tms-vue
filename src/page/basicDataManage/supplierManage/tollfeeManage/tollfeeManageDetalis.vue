<!-- 新增或者修改 -->
<style scoped lang="less">
.detail-main {
  min-height: 500px;
  border-top: 0 none;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="高速公司详情" name="first">
          <div class="detail-main" v-loading="pageLoading">
            <el-container v-show="!pageLoading">
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: '/basicDataManage/supplierManage/tollfeeManage/tollfeeManageList'}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>高速公司详情</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        基础信息
                      </el-col>
                      <el-col :span="6" class="text-right">
                        <el-button type="primary" size="mini" @click="goEditDetail()">编辑</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>高速公司:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.name)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>类型:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.type && detailData.type.key)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
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
                    <el-col :span="8">
                      <div class="label-list">
                        <label>地址:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.detail_address)"></div>
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
  </div>
</template>
<script>
export default {
  name: 'energyManageDetalis',
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      detailData: {},

    }
  },
  methods: {
    clicktabs(targetName) {

    },
    getDetail() {
      const postData = {
        id: this.id,
      }
      this.pageLoading = true;
      this.$$http('highSpeedDetail', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    goEditDetail() {
      this.$router.push({
        path: '/basicDataManage/supplierManage/tollfeeManage/tollfeeManageChange',
        query: {
          id: this.id
        }
      });
    },
  },
  activated() {
    this.activeName = 'first';
  },
  created() {
    this.getDetail();
  }
}

</script>
