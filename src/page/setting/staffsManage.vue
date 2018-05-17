<template>
  <div class="setting">
    <div class="nav-tab">
      <div class="tab-screen">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row>
            <el-col :span="12">
              <el-input placeholder="请输入" v-model="searchFilters.keyword" class="search-filters-screen">
                <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="setting-content">
      <el-row :gutter="22">
        <el-col :span="5">
          <div class="nav-tab-setting">
            <div class="add-user-btn">
              <el-button type="success" size="medium">新增员工</el-button>
            </div>
            <el-tabs v-model="departmentActive" @tab-click="departmentClick">
              <el-tab-pane label="全部" name="department">
                <div class="department-list">
                  <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item index="1">
                      <i class="tab-icon"></i>
                      <span slot="title">导航一</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                      <i class="tab-icon"></i>
                      <span slot="title">导航二导航</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                      <i class="tab-icon"></i>
                      <span slot="title">导航导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                      <i class="tab-icon"></i>
                      <span slot="title">导航四导航导航导航</span>
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="nav-tab-setting">
            <el-tabs v-model="staffsActive" @tab-click="staffClick">
              <el-tab-pane label="有效" name="valid">
                <div class="position-list table-list">
                  <el-table :data="tableData" stripe style="width: 100%" v-loading="pageLoading">
                    <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="primary" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page-list text-center">
                    <el-pagination background layout="prev, pager, next" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已注销" name="invalid"></el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'personListManage',
  computed: {
    employmentTypeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalPage: '',
      },
      departmentActive: 'department',
      staffsActive:'valid',
      searchFilters: {
        employmentType: '',
        isBind: '',
        keyword: '',
        field: 'name',
      },
      selectData: {
        fieldSelect: [
          { id: 'name', value: '职位' },
          { id: 'mobile_phone', value: '部门' },
        ]
      },
      thTableList: [{
        title: '用户ID',
        param: 'role_name',
        width: ''
      }, {
        title: '职位权限',
        param: 'work_type.verbose',
        width: ''
      }],
      tableData:[]
    }
  },
  methods: {

    departmentClick: function(tab, event) {

    },
    staffClick: function(tab, event) {

    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }

  },
  created: function() {}

}

</script>
<style scoped lang="less">


</style>
