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
              <el-button type="success" size="medium" @click="staffsDialog('add')">新增员工</el-button>
            </div>
            <el-tabs v-model="departmentActive" @tab-click="departmentClick">
              <el-tab-pane label="部门" name="department">
                <div class="department-list">
                  <el-menu :default-active="active" class="el-menu-vertical-demo" v-loading="departmentLoading">
                    <el-menu-item v-for="(item,key) in departmentTableData" v-on:click="getPositionList(item,key)" :index="key.toString()" :key="key">
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
                    <el-radio v-model="isValid" label="1">有效</el-radio>
                    <el-radio v-model="isValid" label="2">已注销</el-radio>
                  </div>
                  <el-table :data="tableData" stripe style="width: 100%" v-loading="pageLoading">
                    <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="primary" @click="handleMenuClick({operator:'check',id:scope.row.id})">修改</el-button>
                        <el-button type="primary" plain @click="handleMenuClick({operator:'check',id:scope.row.id})">注销</el-button>
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
    <staff-dialog :staff-dialog="staffDialog" :department-list="departmentTableData"  v-on:closeDialogBtn="closeDialog"></staff-dialog>
  </div>
</template>
<script>
import staffDialog from '../../components/setting/staffDialog';
export default {
  name: 'personListManage',
  components: {
    staffDialog: staffDialog
  },
  data() {
    return {
      positionLoading: true, //职位列表loading
      departmentLoading: true, //部门列表loading
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalPage: '',
      },
      staffDialog: {
        isShow: false,
        type: 'add'
      }, //员工弹窗bialog
      isValid: '1',
      departmentActive: 'department',
      staffsActive: 'valid',
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
        title: '登录用户名',
        param: 'role_name',
        width: ''
      }, {
        title: '姓名',
        param: 'nick_name',
        width: ''
      }, {
        title: '部门',
        param: 'role_name',
        width: ''
      }, {
        title: '职位',
        param: 'carrier_role',
        width: ''
      }, {
        title: '电话',
        param: 'phone',
        width: ''
      }, {
        title: '邮箱',
        param: 'email',
        width: ''
      }],
      departmentTableData: [], //部门列表
      positionTableData: [], //职位列表
      tableData: [],
      active: '0'
    }
  },
  methods: {
    staffsDialog: function(operation, row) {
      this.staffDialog.isShow = true;
      this.staffDialog.type = operation;
      // this.departmentRow = this.departmentTableData[this.active];
      if (operation === 'update') {
        this.positionRow = row
        console.log('职位info', row)

      }
    },
    closeDialog: function(isSave) {

      this.staffDialog.isShow = false;
      if (isSave) {
        // this.getPositionList(this.departmentRow, this.active); //职位列表
      }

    },
    // 获取部门列表
    getDepartmentList: function() {
      this.departmentLoading = true;
      this.$$http('getDepartmentList', { pagination: false }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.departmentTableData = results.data.data;
          this.active = '0';
          this.departmentLoading = false;
          if (this.departmentTableData.length) {
            this.getPositionList(this.departmentTableData[0], this.active)
          }

        }
      }).catch((err) => {
        this.departmentLoading = false;
        this.$message.error('获取部门列表失败');
      })
    },
    // 获取职位列表
    getPositionList: function(departmentInfo, index) {
      let postData = {
        pagination: false,
        department: departmentInfo.id
      }
      this.positionLoading = true;
      this.active = index.toString();
      this.$$http('getPositionList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.positionTableData = results.data.data;
          this.positionLoading = false;
          if (this.positionTableData.length) {
            this.staffsActive = this.positionTableData[0].id;
          }
        }
      }).catch((err) => {
        this.departmentLoading = false;
        this.$message.error('获取部门列表失败');
      })
    },
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
  created: function() {
    this.getDepartmentList(); //部门列表
  }

}

</script>
<style scoped lang="less">


</style>
