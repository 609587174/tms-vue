<style scoped lang="less">


</style>
<template>
  <div id="addPerson" class="detail-mian">
    <el-container v-loading="pageLoading">
      <el-header style="margin-top:15px;">
        <el-row>
          <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span>
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading">
        <transition name="el-fade-in-linear">
          <div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addForm" :rules="rules" :model="userForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="4">
                  &nbsp;
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂名称:" prop="fluid_factory">
                    <el-select filterable remote :remote-method="searchFluid" :loading="searchFluidLoading" v-model="userForm.fluid_factory" placeholder="请输入搜索">
                      <el-option v-for="(item,key) in fluidFactorySelect" :key="key" :label="item.fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂详细地址:">
                    {{fluidAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="4">
                  &nbsp;
                </el-col>
                <el-col :span="8">
                  <el-form-item label="站点名称:" prop="fluid_site">
                    <el-select v-model="userForm.fluid_site" placeholder="请选择">
                      <el-option v-for="(item,key) in fluidSiteSelect" :key="key" :label="item.fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="站点详细地址:">
                    {{fluidAddress}}
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="4">
                  &nbsp;
                </el-col>
                <el-col :span="8">
                  <el-form-item label="标准里程:" prop="standard_mileage">
                    <el-input placeholder="请输入" type="text" v-model="userForm.standard_mileage"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="启用状态:">
                    <el-switch v-model="userForm.is_active"></el-switch>
                  </el-form-item>
                </el-col>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="saveAndReview()" :loading="saveAndReviewBtn.isLoading" :disabled="saveAndReviewBtn.isDisabled">{{saveAndReviewBtn.btnText}}</el-button>
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
  },
  data() {
    return {
      pageLoading: false,
      fluidAddress: '',
      siteAddress: '',
      searchFluidLoading: false,
      saveAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      userForm: {
        fluid_factory: '',
        fluid_site: '',
        standard_mileage: '',
        is_active: false,
      },
      rules: {
        fluid_factory: [ //姓名
          { required: true, message: '请选择液厂', trigger: 'blur' },
        ],
        fluid_site: [
          { required: true, message: '请选择站点', trigger: 'blur' },
        ],
        standard_mileage: [ //从业类型
          { required: true, message: '请输入标准里程', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' },
        ],
      },
      fluidFactorySelect: [],
      fluidSiteSelect: [],
    }
  },
  methods: {
    saveAndReview: function() {

    },
    returnToPage: function() {

    },
    getfuildList: function() {
      let postData = {
        page: 1,
        page_size: 100,
      }
      this.searchFluidLoading = true;
      this.$$http('getFulid', postData).then((results) => {
        console.log('results', results);
        this.searchFluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.fuildList = results.data.data;
        }
      }).catch((err) => {
        this.searchFluidLoading = false;
      })
    },
    searchFluid: function() {
      let postData = {
        page: 1,
        page_size: 100,
      }
      this.searchFluidLoading = true;
      this.$$http('getFulid', postData).then((results) => {
        console.log('results', results);
        this.searchFluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.fuildList = results.data.data;
        }
      }).catch((err) => {
        this.searchFluidLoading = false;
      })
    },
  },
  created: function() {
    this.getfuildList();
  }

}

</script>
