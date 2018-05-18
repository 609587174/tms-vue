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
                  <el-menu :default-active="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-loading="departmentLoading">
                    <el-menu-item v-for="(item,key) in departmentTableData" v-on:click="getPositionList(item,key)" :index="key.toString()" :key="key">
                      <i class="tab-icon"></i>
                      <span slot="title">{{item.group_name}}</span>
                    </el-menu-item>
                  </el-menu>
                  <div class="text-center department-btn">
                    <el-button type="primary" plain size="medium" @click="organizationDialog('department','update')">编辑部门</el-button>
                    <el-button type="primary" size="medium" @click="organizationDialog('department','add')">新增部门</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="add-user-btn">
              <el-button type="success" size="medium">新增职位</el-button>
            </div>
          <div class="nav-tab-setting nav-tab-mt">
            <div class="position-list table-list">
              <el-table :data="positionTableData" stripe style="width: 100%" v-loading="positionLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                    <el-button type="primary" size="mini" plain @click="handleMenuClick({operator:'check',id:scope.row.id})">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page-list text-center">
                <el-pagination background layout="prev, pager, next" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!positionLoading && pageData.totalPage>1">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <department-dialog :department-dialog="departmentDialog" :department-row="departmentRow" v-on:closeDialogBtn="closeDialog"></department-dialog>
  </div>
</template>
<script>
import departmentDialog from '../../components/setting/departmentDialog';
export default {
  name: 'personListManage',
  computed: {
    employmentTypeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  components: {
    departmentDialog: departmentDialog
  },
  data() {
    return {
      positionLoading: true, //职位列表loading
      departmentLoading: true, //部门列表loading
      positionDialog: false, //职位弹窗bialog
      departmentDialog: {
        isShow: false,
        type: 'add',
        row: {}
      }, //部门弹窗bialog
      pageData: {
        currentPage: 1,
        totalPage: '',
      },
      active: '0',
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
      departmentTableData: [], //部门列表
      positionTableData: [], //职位列表
      departmentRow: {}, //当前所选部门
    }

  },
  methods: {

    /**
     * organizationDialog  显示部门、职位弹窗
     * @param  {string} typeDialog  [必填][展示弹窗类型（department部门，position职位）]
     * @param  {string} operation   [必填][是否编辑或者新增（add新增，update编辑）]
     * @return {[type]}
     */
    organizationDialog: function(typeDialog, operation) {

      if (typeDialog === 'department') {
        this.departmentDialog.isShow = true;
        this.departmentDialog.type = operation;
        if (operation === 'update') {
          console.log('修改的部门',this.active,this.departmentTableData[this.active])
          if (this.departmentTableData.length) {
            this.departmentRow = this.departmentTableData[this.active];
          }
        }
      }
      console.log('弹窗', this.departmentDialog)
    },
    closeDialog: function(type, isSave) {
      if (type === 'department') {
        this.departmentDialog.isShow = false;
        if (isSave) {
          this.getDepartmentList(); //部门列表
        }
      }

      console.log('this.departmentDialog', this.departmentDialog)
    },
    // 获取部门列表
    getDepartmentList: function() {
      this.departmentLoading = true;
      this.$$http('getDepartmentList', { pagination: false }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.departmentTableData = results.data.data;
          this.active = '0';
          this.departmentLoading = false;
          if(this.departmentTableData.length){
            this.getPositionList(this.departmentTableData[0],this.active)
          }

        }
      }).catch((err) => {
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
      console.log('查看职位')
      this.$$http('getPositionList', postData).then((results) => {
        console.log('职位列表', results.data);

        if (results.data && results.data.code == 0) {
          this.positionTableData = results.data.data;
          this.positionLoading = false;
        }
      }).catch((err) => {
        this.$message.error('获取部门列表失败');
      })
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
  }

}

</script>
<style scoped lang="less">


</style>
