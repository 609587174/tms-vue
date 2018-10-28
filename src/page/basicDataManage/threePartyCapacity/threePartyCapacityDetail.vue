
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
      <el-tab-pane label="三方运力详情" name="detail">
        <div class="detail-main">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/basicDataManage/threePartyCapacity/threePartyCapacityList'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>三方运力信息</p>
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
                      <label>牵引车牌:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tractor&&detailData.tractor.plate_number)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>车辆所属:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tractor&&detailData.tractor.carrier&&detailData.tractor.carrier.name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>燃料类型:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tractor&&detailData.tractor.fuel_type&&detailData.tractor.fuel_type.verbose)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>挂车牌:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.semitrailer&&detailData.semitrailer.plate_number)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>装载质量:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.semitrailer&&detailData.semitrailer.transport_weight?detailData.semitrailer.transport_weight+' 吨':'')"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>主驾驶:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.master_driver&&detailData.master_driver.name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>电话:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.master_driver&&detailData.master_driver.mobile_phone)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>身份证号:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.master_driver&&detailData.master_driver.id_number)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>驾驶从业资格证号:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.master_driver&&detailData.master_driver.qualification_certificate_number)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>副驾驶:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.vice_driver&&detailData.vice_driver.name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>电话:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.vice_driver&&detailData.vice_driver.mobile_phone)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>身份证号:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.vice_driver&&detailData.vice_driver.id_number)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>驾驶从业资格证号:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.vice_driver&&detailData.vice_driver.qualification_certificate_number)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>押运员:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.escort_staff&&detailData.escort_staff.name)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>电话:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.escort_staff&&detailData.escort_staff.mobile_phone)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>身份证号:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.escort_staff&&detailData.escort_staff.id_number)"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>押运从业资格证号:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.escort_staff&&detailData.escort_staff.qualification_certificate_number)"></div>
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
  name: 'threePartyCapacityDetail',
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
      this.$$http('threePartyCapacityDetail', { tractor_semitrailer_id: this.id }).then((results) => {
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
      this.$router.push({ path: "/basicDataManage/threePartyCapacity/editThreePartyCapacity?activeStep=" + number, query: { id: this.detailData.id, activeStep: number } });
    },

  }
}

</script>
