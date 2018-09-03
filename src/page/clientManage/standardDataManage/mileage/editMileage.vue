<!-- editMileage.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">标准里程信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="editForm" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="实际液厂:" prop="fluid">
                    <el-select :loading="searchFluidLoading" filterable remote clearable v-model="userForm.fluid" placeholder="请输入选择" @change="chooseFluid" :remote-method="getFluidList">
                      <el-option v-for="(item,key) in fluidFactorySelect" :key="key" :label="item.position_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="液厂详细地址:">
                    {{fluidAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="站点:" prop="customer_station_id">
                    <el-select v-model="userForm.customer_station_id" :loading="searchSiteLoading" filterable remote clearable @change="chooseSite" :remote-method="getSiteList" placeholder="请输入选择">
                      <el-option v-for="(item,key) in fluidSiteSelect" :key="key" :label="item.position_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="站点详细地址:">
                    {{siteAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="标准里程:" prop="mile">
                    <el-input placeholder="请输入" type="text" v-model="userForm.mile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生效托运方:" prop="customer_staff_ids">
                    <el-select filterable :loading="carrierLoading" multiple v-model="userForm.customer_staff_ids" placeholder="请选择">
                      <el-option v-for="(item,key) in carrierSelect" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="启用状态:">
                    <el-switch v-model="userForm.isActiveName"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button type="primary" @click="saveAndReview" :loading="saveAndReviewBtn.isLoading" :disabled="saveAndReviewBtn.isDisabled">{{saveAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'editStandardMile',
  computed: {
    returnPage: function() {
      return this.$route.query.id ? '详情页' : '列表页';
    },
    id: function() {
      return this.$route.query.id || '';
    },
    titleType: function() {
      return this.$route.query.id ? '编辑标准里程' : '新增标准里程';
    },
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
  },
  data() {
    return {
      pageLoading: '',
      fluidAddress: '',
      siteAddress: '',
      searchFluidLoading: false,
      searchSiteLoading: false,
      carrierLoading: false,
      saveAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      userForm: {
        fluid: '',
        customer_station_id: '',
        mile: '',
        customer_staff_ids: [],
        isActiveName: true,
      },
      rules: {
        fluid: [ //姓名
          { required: true, message: '请选择液厂', trigger: 'blur' },
        ],
        customer_station_id: [
          { required: true, message: '请选择站点', trigger: 'blur' },
        ],
        mile: [ //从业类型
          { required: true, message: '请输入标准里程', trigger: 'blur' },
          // { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '请输入数字', trigger: 'blur' }
        ],
        customer_staff_ids: [
          { required: true, message: '请选择承运商', trigger: 'blur' },
        ],
      },
      fluidFactorySelect: [],
      fluidSiteSelect: [],
      carrierSelect: [],
      detailData: {}
    }
  },
  methods: {
    returnToPage: function() {
      if (this.id) {
        this.$router.push({ path: '/clientManage/standardDataManage/mileage/mileageDetail', query: { id: this.id } })
      } else {
        this.$router.push({ path: '/clientManage/standardDataManage/mileage/mileageDataList' })
      }
    },

    getFluidList: function(fluid) {
      let postData = {
        page: 1,
        page_size: 100,
        simplify: true,
        position_type: 'LNG_FACTORY'
      };
      if (fluid) {
        postData.position_name = fluid;
      }
      this.searchFluidLoading = true;
      this.$$http('getLandMarkList', postData).then((results) => {
        this.searchFluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.fluidFactorySelect = results.data.data.results;
        }
      }).catch((err) => {
        this.searchFluidLoading = false;
      })
    },
    getSiteList: function(site) {
      let postData = {
        page: 1,
        page_size: 100,
        position_type: 'DELIVER_POSITION',
        simplify: true,
      }
      this.searchSiteLoading = true;
      if (site) {
        postData.position_name = site;
      }
      this.$$http('getLandMarkList', postData).then((results) => {
        this.searchSiteLoading = false;
        if (results.data && results.data.code == 0) {
          this.fluidSiteSelect = results.data.data.results;
        }
      }).catch((err) => {
        this.searchSiteLoading = false;
      })
    },
    getCarrierList: function() {
      let postData = {
        pagination: false
      };
      this.carrierLoading = true;
      this.$$http('getCustomerList', postData).then((results) => {
        this.carrierLoading = false;
        if (results.data && results.data.code == 0) {
          this.carrierSelect = results.data.data;
        }
      }).catch((err) => {
        this.carrierLoading = false;
      })
    },

    chooseFluid: function() {
      console.log('this.userForm.fluid', this.userForm.fluid);
      for (let i in this.fluidFactorySelect) {
        if (this.userForm.fluid === this.fluidFactorySelect[i].id) {
          this.fluidAddress = this.fluidFactorySelect[i].address;
          break;
        }
      }
    },
    chooseSite: function() {
      for (let i in this.fluidSiteSelect) {
        if (this.userForm.customer_station_id === this.fluidSiteSelect[i].id) {
          this.siteAddress = this.fluidSiteSelect[i].address;
          break;
        }
      }
    },
    saveAndReview: function() {
      let apiName = 'addStandardMileList';
      let postData = this.userForm;
      if (postData.isActiveName) {
        postData.is_active = 'effective';
      } else {
        postData.is_active = 'ineffective';
      }
      // postData.carriers = this.userForm.carriersList.join(',');
      if (this.id) {
        apiName = 'patchStandardMileDetail';
        postData.id = this.id;
      }
      this.saveAndReviewBtn.isDisabled = true;
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          this.saveAndReviewBtn.btnText = '提交中';
          this.saveAndReviewBtn.isLoading = true;
          this.$$http(apiName, postData).then((results) => {
            console.log('results', results);
            this.saveAndReviewBtn.btnText = '保存并退出';
            this.saveAndReviewBtn.isLoading = false;
            this.saveAndReviewBtn.isDisabled = false;
            if (results.data && results.data.code === 0) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              if(this.id){
                this.$router.push({ path: '/clientManage/standardDataManage/mileage/mileageDetail', query: { id: results.data.data.id } });
              }else{
                this.$router.push({ path: '/clientManage/standardDataManage/mileage/mileageDataList'});
              }

            }
          }).catch((err) => {
            this.saveAndReviewBtn.btnText = '保存并退出';
            this.saveAndReviewBtn.isLoading = false;
            this.saveAndReviewBtn.isDisabled = false;
          })
        } else {
          this.saveAndReviewBtn.isDisabled = false;
        }
      });
    },
    getDetail: function() {
      let postData = {
        id: this.id,
      };
      //postData[this.searchFilters.field] = this.searchFilters.keyword;
      this.pageLoading = true;
      this.$$http('getStandardMileDetail', postData).then((results) => {
        console.log('results', results.data.data);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
          this.userForm = {
            fluid: this.detailData.fluid_factory.id,
            customer_station_id: this.detailData.fluid_site.id,
            mile: this.detailData.standard_mileage,
            customer_staff_ids: [],
            isActiveName: this.detailData.is_active.key === 'effective' ? true : false,
          }
          if (this.detailData.customer_staffs && this.detailData.customer_staffs.length) {
            for (let i in this.detailData.customer_staffs) {
              this.userForm.customer_staff_ids.push(this.detailData.customer_staffs[i].id);
            }
          } else {
            this.userForm.carriers.push(this.detailData.traders.id);
          }
          this.fluidAddress = this.detailData.fluid_factory.actual_address;
          this.siteAddress = this.detailData.fluid_site.address;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
  },
  created: function() {
    this.getFluidList();
    this.getSiteList();
    this.getCarrierList();
    if (this.id) {
      this.getDetail();
    }
  }

}

</script>
