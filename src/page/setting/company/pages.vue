<!-- companyPages.vue -->
<!-- clientDetail.vue -->
<style scoped lang="less">
.trans-fee {
  .table-list {
    margin-bottom: 20px;
  }
}

</style>
<template>
  <div class="detail-main">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>企业信息</p>
      </el-header>
      <el-main v-loading="pageLoading">
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                企业基础信息
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑</el-button>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>企业名称:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(companyData.name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>联系人:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(companyData.contact_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>联系电话:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(companyData.contact_phone)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>公司地址:</label>
                <div class="detail-form-item" v-if="companyData.area">
                <span v-if="companyData.area">{{companyData.area.area_name}}</span><span v-if="companyData.area&&companyData.area.city">{{companyData.area.city.area_name}}</span><span v-if="companyData.area&&companyData.area.city&&companyData.area.city.county">{{companyData.area.city.county.area_name}}</span>{{companyData.detail_address}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>企业类型:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(companyData.carrier_type&&companyData.carrier_type.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>社会机构代码:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(companyData.license_code?companyData.license_code:companyData.organization_code)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'pages',
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
      companyData: {
        carrier: {}
      }

    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    users: function() {

      return this.pbFunc.getLocalData('users', true);
    }
  },
  methods: {
    getDetail: function() {
      this.pageLoading = true;
      this.$$http('getCompany', { carrier_id: this.users.carrier.id }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.companyData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/setting/company/editPages?activeStep=" + number });
    },

  }
}

</script>
