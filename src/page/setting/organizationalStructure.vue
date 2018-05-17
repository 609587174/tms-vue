<!-- organizationalStructureList.vue -->
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
            <el-tabs v-model="departmentActive" @tab-click="handleClick">
              <el-tab-pane label="用户管理" name="department">
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
                  <div class="text-center department-btn">
                    <el-button type="primary" plain size="medium">编辑部门</el-button>
                    <el-button type="primary" size="medium">新增部门</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="nav-tab-setting">
            <div class="add-user-btn">
              <el-button type="success" size="medium">新增职位</el-button>
            </div>
            <el-tabs v-model="departmentActive" @tab-click="handleClick">
              <el-tab-pane label="用户管理" name="department">
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
              <el-tab-pane label="用户管理1" name="department8"></el-tab-pane>
              <el-tab-pane label="用户管理2" name="department1"></el-tab-pane>
              <el-tab-pane label="用户管理3" name="department2"></el-tab-pane>
              <el-tab-pane label="用户管理4" name="department3"></el-tab-pane>

              <el-tab-pane label="用户管理5" name="department4"></el-tab-pane>
              <el-tab-pane label="用户管理6" name="department5"></el-tab-pane>
              <el-tab-pane label="用户管理7" name="department6"></el-tab-pane>
              <el-tab-pane label="用户管理8" name="department9"></el-tab-pane>

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
        title: '姓名',
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

    handleClick: function(tab, event) {

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
