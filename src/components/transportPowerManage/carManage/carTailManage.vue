<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="牵引车管理" name="first">
        </el-tab-pane>
        <el-tab-pane label="挂车管理" name="second">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom" :rules="rules">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen" @keyup.native.13="pageChange">
                    <el-select size="mini" v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
                  </el-input>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
        <!-- <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button> -->
        <el-button type="success" @click="addHeadCarPage">新增</el-button>
      </div>
      <div class="table-list" v-loading="pageLoading">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" :class="{'tabal-height-500':!tableData.length}">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="jumpPage({operator:'show',rowData:scope.row})">查看</el-button>
              <el-dropdown trigger="click" @command="jumpPage">
                <span class="el-dropdown-link">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{operator:'show',rowData:scope.row}">查看</el-dropdown-item>
                  <el-dropdown-item :command="{operator:'operation',rowData:scope.row}">操作日志</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <no-data v-if="!pageLoading && !tableData.length"></no-data>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next,jumper" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'carTailManage',
  data() {
    return {
      pageStatus: false,
      fifterParam: {
        keyword: "",
        field: "plate_number",
      },
      seachListParam: {
        plate_number: '',
        vin_number: '',
      },
      rules: {},
      activeName: 'second',
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      thTableList: [{
        title: '挂车车牌号',
        param: 'plate_number',
        width: ''
      }, {
        title: '车架号',
        param: 'vin_number',
        width: ''
      }, {
        title: '车辆归属',
        param: 'attributes.verbose',
        width: ''
      }, {
        title: '车辆所属',
        param: 'carrier.name',
        width: ''
      }, {
        title: '车辆类型',
        param: 'vehicle_type.verbose',
        width: '250'
      }, {
        title: '品牌型号',
        param: 'brand',
        width: ''
      }],
      selectData: {
        fieldSelect: [
          { id: 'plate_number', value: '车牌号' },
          { id: 'vin_number', value: '车架号' },
        ]
      },
      tableData: [],
      saveSendData: {}
    }
  },

  methods: {
    addHeadCarPage: function() {
      this.$router.push({ path: "/transportPowerManage/carManage/addEditCarTailManage", query: { operate: 'add' } });
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {

        this.$router.push({ path: "/transportPowerManage/carManage/carHeadManage" });
      }
    },
    importList: function() {

    },
    exportData() {
      let vm = this;
      let sendData = this.pbFunc.deepcopy(this.seachListParam);
      sendData[this.fifterParam.field] = this.fifterParam.keyword;
      if (vm.pageStatus) {
        sendData = this.saveSendData;
      } else {
        this.saveSendData = sendData;
      }
      sendData.filename = '挂车管理';
      sendData.page_arg = 'semitrailers';
      sendData.ids = ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56'];
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }

      this.$$http('exportSemitrailerData', sendData).then((results) => {
        console.log('results', results.data.data.results);
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
    searchList: function() {
      var vm = this;
      var sendData = this.pbFunc.deepcopy(this.seachListParam);
      sendData[this.fifterParam.field] = this.fifterParam.keyword;
      vm.pageLoading = true;
      if (vm.pageStatus) {
        sendData = this.saveSendData;
        sendData.page = vm.pageData.currentPage;
      } else {
        this.saveSendData = sendData;
        sendData.page = 1;
      }
      this.$$http('searchTailCarList', sendData).then(function(result) {
        var resultData;
        vm.pageStatus = false;
        if (result.data.code == 0) {
          vm.tableData = result.data.data.results;
          vm.pageData.totalPage = Math.ceil(result.data.data.count / vm.pageData.pageSize);
          vm.pageLoading = false;
        }
      }).catch(function(error) {
        vm.pageLoading = false;
      });
    },
    jumpPage: function(scope) {
      if (scope.operator == "edit") {

      } else if (scope.operator == "show") {
        this.$router.push({ path: "/transportPowerManage/carManage/showCarTailManage?tailId=" + scope.rowData.id });
      } else if (scope.operator == "operation") {

      }
    },

    pageChange: function() {
      setTimeout(() => {
        this.pageStatus = true;
        this.searchList();
      });
    }
  },
  activated: function() {
    this.activeName = 'second';
  },
  mounted: function() {
    this.searchList();
  }
}

</script>
