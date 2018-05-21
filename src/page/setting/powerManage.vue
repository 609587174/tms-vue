<!-- powerManage.vue -->
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
                  <el-menu :default-active="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item v-for="(item,key) in departmentTableData" v-on:click="getPositionList(item.id,key)" :index="key.toString()" :key="key">
                      <i class="tab-icon"></i>
                      <span slot="title">{{item.group_name}}</span>
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
              <el-tab-pane v-for="(item,key) in positionTableData" :key="key" :label="item.role_name" :name="item.id">
                <div class="position-list table-list">
                  <div class="staff-radio">
                    <!-- <el-radio v-model="isValid" label="1" @change="getStaffsList(currentDepartmentId,currentPositionId,false)">有效</el-radio>
                    <el-radio v-model="isValid" label="2" @change="getStaffsList(currentDepartmentId,currentPositionId,true)">已注销</el-radio> -->
                  </div>
                  <el-table :data="permissionsTableData" border style="width: 100%" size="mini" v-loading="permissionsLoading">
                    <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      <template slot-scope="scope">
                        <div v-if="item.param ==='menu_name'">{{scope.row.menu_name}}</div>
                        <div v-if="item.param ==='menu'">
                          <dl>
                            <dt v-for="(item,key) in scope.row.second_menus">
                              {{item.menu_name}}
                            </dt>
                          </dl>
                        </div>
                        <div v-if="item.param==='desc'">{{}}</div>
                        <div v-if="item.param==='desc'">{{}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <dl>
                          <dt v-for="(item,key) in scope.row.second_menus">
                            <el-checkbox-group v-model="selectMenus">
                              <el-checkbox v-for="(itemThird,index) in item.third_menus" :label="itemThird.menu_name" :key="index">{{itemThird.menu_name}}</el-checkbox>
                            </el-checkbox-group>
                          </dt>
                        </dl>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page-list text-center">
                    <el-pagination background layout="prev, pager, next" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
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
      departmentLoading: true, //部门列表loading
      permissionsLoading: false, //权限列表loading
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalPage: '',
        pageSize: 10
      },
      staffDialog: {
        isShow: false,
        type: 'add'
      }, //员工弹窗bialog
      isValid: '1',
      departmentActive: 'department',
      staffsActive: '',
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
        title: '功能模块',
        param: 'menu_name',
        width: ''
      }, {
        title: '子功能',
        param: 'menu',
        width: ''
      }, {
        title: '说明',
        param: 'department',
        width: ''
      }],
      departmentTableData: [], //部门列表
      positionTableData: [], //职位列表
      permissionsTableData: [], //员工列表
      active: '0',
      currentDepartmentId: '',
      currentPositionId: '',
      staffRow: {}, //编辑信息
      selectMenus:{}
    }
  },
  methods: {
    // 获取部门列表
    getDepartmentList: function() {
      this.departmentLoading = true;
      this.$$http('getDepartmentList', { pagination: false }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.departmentTableData = results.data.data;
          this.active = '0';
          this.departmentLoading = false;
          if (this.departmentTableData.length) {
            this.getPositionList(this.departmentTableData[0].id, this.active)
          }
        }
      }).catch((err) => {
        this.departmentLoading = false;
        this.$message.error('获取部门列表失败');
      })
    },
    // 获取职位列表
    getPositionList: function(departmentId, index) {
      let postData = {
        pagination: false,
        department: departmentId
      }
      this.currentDepartmentId = departmentId;
      this.positionLoading = true;
      this.isValid = '1',
        this.active = index.toString();
      this.$$http('getPositionList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.positionTableData = results.data.data;
          this.positionLoading = false;
          if (this.positionTableData.length) {
            this.staffsActive = this.positionTableData[0].id;
            this.currentPositionId = this.positionTableData[0].id;
          }
        }
      }).catch((err) => {
        this.positionLoading = false;
        this.$message.error('获取职位列表失败');
      })
    },
    // 获取权限列表
    getPermissionsList: function() {
      this.positionLoading = true;
      this.$$http('getPermissionsList', {}).then((results) => {
        if (results.data && results.data.code == 0) {
          this.permissionsTableData = results.data.data;
          this.positionLoading = false;

        }
      }).catch((err) => {
        this.positionLoading = false;
        this.$message.error('获取职位列表失败');
      })
    },
    staffClick: function(tab, event) {
      console.log('职位', tab, event);
      this.currentPositionId = tab.name;
      this.isValid = '1',
        this.getStaffsList(this.currentDepartmentId, tab.name, false)
    },
    handleClick: function(tab, event) {

    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }

  },
  created: function() {
    this.getDepartmentList(); //部门列表
    this.getPermissionsList();
  }

}

</script>
<style scoped lang="less">


</style>
