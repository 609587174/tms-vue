<style scoped lang="less">

.setting {
  .setting-content {
    .nav-tab-setting {
      .department-list {
        padding-bottom: 0;
        .el-menu{
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
<template>
  <div class="setting">
    <div class="nav-tab">
      <div class="tab-screen border-top">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row>
            <el-col :span="12">
              <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="setting-content mt-25">
      <el-row :gutter="22">
        <el-col :span="5">
          <div class="nav-tab-setting">
            <el-tabs v-model="departmentActive">
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
          <div class="nav-tab-setting nav-tab-width">
            <div class="add-user-btn">
              <el-button type="success" size="medium" @click="staffsDialog('add')">新增员工</el-button>
            </div>
            <el-tabs v-model="staffsActive" @tab-click="staffClick">
              <el-tab-pane v-for="(item,key) in positionTableData" :key="key" :label="item.role_name" :name="item.id">
                <div class="position-list">
                  <div class="staff-radio">
                    <el-radio v-model="isValid" label="1" @change="getStaffsList(departmentRow,currentPositionId,false,true)">有效</el-radio>
                    <el-radio v-model="isValid" label="2" @change="getStaffsList(departmentRow,currentPositionId,true,true)">已注销</el-radio>
                  </div>
                  <div class="table-list">

                    <el-table :data="staffsTableData" stripe style="width: 100%" size="mini" v-loading="staffLoading" :class="{'tabal-height-500':!staffsTableData.length}">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      </el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <div v-if="!scope.row.is_deleted">
                            <el-button type="primary" size="mini" @click="staffsDialog('update',scope.row)">修改</el-button>
                            <el-button type="primary" size="mini" plain @click="isDeletdStaffOp(scope.row,true)">注销</el-button>
                          </div>
                          <div v-if="scope.row.is_deleted">
                            <el-button type="primary" size="mini" plain @click="isDeletdStaffOp(scope.row,false)">启用</el-button>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                    <no-data v-if="!staffLoading && !staffsTableData.length"></no-data>
                    <div class="page-list text-center">
                      <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
                      </el-pagination>
                    </div>
                  </div>
                </div>

              </el-tab-pane>
            </el-tabs>
            <div class="user-no-data" v-if="!positionTableData.length&&!staffLoading">
              <no-data v-if="!staffLoading && !positionTableData.length"></no-data>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <staff-dialog :staff-dialog="staffDialog" :department-list="departmentTableData" :staff-row="staffRow" v-on:closeDialogBtn="closeDialog"></staff-dialog>
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
      departmentLoading: true, //部门列表loading
      staffLoading: false, //员工列表loading
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10
      },
      staffDialog: {
        isShow: false,
        type: 'add'
      }, //员工弹窗bialog
      isValid: '1',
      departmentActive: 'department',
      staffsActive: '',
      searchPostData:{},
      searchFilters: {
        keyword: '',
        field: 'nick_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'nick_name', value: '姓名' },
          { id: 'phone', value: '电话号码' },
        ]
      },
      thTableList: [{
        title: '登录用户名',
        param: 'username',
        width: ''
      }, {
        title: '姓名',
        param: 'nick_name',
        width: ''
      }, {
        title: '部门',
        param: 'department.group_name',
        param_two: '',
        width: ''
      }, {
        title: '职位',
        param: 'carrier_role.role_name',
        param_two: '',
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
      staffsTableData: [], //员工列表
      tableData: [],
      active: '0',
      departmentRow: '',
      currentPositionId: '',
      staffRow: {} //编辑信息
    }
  },
  methods: {
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getStaffsList(this.departmentRow, this.currentPositionId, this.isValid === '1' ? false : true);
    },
    pageChange() {
      setTimeout(() => {
        this.getStaffsList(this.departmentRow, this.currentPositionId, this.isValid === '1' ? false : true);
      });
    },
    staffsDialog: function(operation, row) {
      this.staffDialog.isShow = true;
      this.staffDialog.type = operation;
      // this.departmentRow = this.departmentTableData[this.active];
      if (operation === 'update') {
        this.staffRow = row;
        this.staffRow.departmentKey = this.departmentRow.department_number;
      }
    },
    closeDialog: function(isSave) {
      this.staffDialog.isShow = false;
      if (isSave) {
        this.getPositionList(this.departmentRow, this.active); //职位列表
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
      this.departmentRow = departmentInfo;
      this.positionLoading = true;
      this.isValid = '1';
      this.active = index.toString();
      this.$$http('getPositionList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.positionTableData = results.data.data;
          this.positionLoading = false;
          if (this.positionTableData.length) {
            this.staffsActive = this.positionTableData[0].id;
            this.currentPositionId = this.positionTableData[0].id;
            this.getStaffsList(departmentInfo, this.staffsActive, false, true);
          }
        }
      }).catch((err) => {
        this.positionLoading = false;
        this.$message.error('获取职位列表失败');
      })
    },
    // 获取员工列表
    getStaffsList: function(departmentInfo, positionId, isDeletd, isReset) {
      if (isReset) {
        this.pageData.currentPage = 1;
      }
      let postData = {
        department: departmentInfo.id,
        is_deleted: isDeletd,
        page: this.pageData.currentPage,
        carrier_role: positionId,
      };
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.staffLoading = true;
      this.$$http('getStaffs', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.staffsTableData = results.data.data.results;
          this.staffLoading = false;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.staffLoading = false;
        this.$message.error('获取员工列表失败');
      })
    },
    // 注销 激活员工
    isDeletdStaff: function(row, isDeletd) {
      let postData = {
        username: row.username,
        nick_name: row.nick_name,
        phone: row.phone,
        email: row.email,
        department: row.department.id,
        carrier_role: row.carrier_role.id,
        is_deleted: isDeletd,
        id: row.id
      }
      this.$$http('updateStaff', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$message({
            message: isDeletd ? '员工注销成功' : '员工启用成功',
            type: 'success'
          });
          this.pageData.currentPage = 1;
          this.getStaffsList(this.departmentRow, this.currentPositionId, !isDeletd, true)
        }
      }).catch((err) => {
        this.$message.error(isDeletd ? '员工注销失败' : '员工启用失败');
      })
    },
    //
    isDeletdStaffOp: function(row, isDeleted) {
      if (isDeleted) {
        this.$confirm("确定注销该员工？注销后可在“已注销”中找回。", "注销员工", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.isDeletdStaff(row, isDeleted);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消注销员工'
            });
          });
      } else {
        this.$confirm("确定启用该员工？启用后该员工回到启用前的职位中，并可获得原有系统操作权限", "启用员工", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.isDeletdStaff(row, isDeleted);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消启用员工'
            });
          });
      }

    },
    staffClick: function(tab, event) {
      this.currentPositionId = tab.name;
      this.isValid = '1';
      this.getStaffsList(this.departmentRow, tab.name, false, true)
    },


  },
  created: function() {
    this.getDepartmentList(); //部门列表
  }

}

</script>

