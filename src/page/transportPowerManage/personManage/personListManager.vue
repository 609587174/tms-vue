<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="人员管理" name="userManage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                  </el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="从业类型:">
                    <el-select v-model="searchFilters.employmentType" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in employmentTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否绑定:">
                    <el-select v-model="searchFilters.isBind" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.isBindSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
            <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button>
            <el-button type="success" @click="addPerson">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      activeName: 'userManage',
      searchFilters: {
        employmentType: '',
        isBind: '',
        keyword: '',
        field: 'name',
      },
      selectData: {
        isBindSelect: [
          { id: '', value: '全部' },
          { id: false, value: '未绑定' },
          { id: true, value: '已绑定' }
        ],
        fieldSelect: [
          { id: 'name', value: '姓名' },
          { id: 'mobile_phone', value: '电话号码' },
        ]
      },
      thTableList: [{
        title: '姓名',
        param: 'name',
        width: ''
      }, {
        title: '从业类型',
        param: 'work_type.verbose',
        width: ''
      }, {
        title: '电话号码',
        param: 'mobile_phone',
        width: '160'
      }, {
        title: '绑定车辆',
        param: 'bind_tractors.plate_number',
        width: ''
      }, {
        title: '在职状态',
        param: 'on_job_status.verbose',
        width: ''
      }, {
        title: '驾驶证号',
        param: 'drive_license_number',
        width: ''
      }, {
        title: '从业资格证号',
        param: 'qualification_certificate_number',
        width: '200'
      }, {
        title: '押运证号',
        param: 'escort_license_number',
        width: '250'
      }],
      tableData: []
    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    exportData() {
      let postData = {
        filename: '人员管理',
        page_arg: 'carrier_driver',
        work_type: this.searchFilters.employmentType,
        driver_bind_status: this.searchFilters.isBind,
        ids: []
      };
      for (let i = 57; i <= 88; i++) {
        postData.ids.push(i.toString());
      }
      postData[this.searchFilters.field] = this.searchFilters.keyword;
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }

      this.$$http('exportPersonData', postData).then((results) => {
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
        if (results.data && results.data.code == 0) {
          window.open(results.data.data.filename);
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        } else {
          this.$message.error('导出失败');
        }
      }).catch((err) => {
        this.$message.error('导出失败');
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
      })
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        work_type: this.searchFilters.employmentType,
        driver_bind_status: this.searchFilters.isBind,
      };

      postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getDriversList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    handleClick: function(tab, event) {

    },
    handleMenuClick: function(command) {
      this.$router.push({ path: "/transportPowerManage/personManage/personDetail", query: { id: command.id } });
    },
    addPerson: function() {
      this.$router.push({ path: "/transportPowerManage/personManage/addPerson", query: { operate: 'add' } });
    },
    importList: function() {
      this.$router.push({ path: "/orders/orderDetail/orderDetailTab/1" });
    },
    exportList: function() {

    },
    addList: function() {

    },
    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    }
  },
  created: function() {
    this.getList();
  }
}

</script>
<style scoped lang="less">


</style>
