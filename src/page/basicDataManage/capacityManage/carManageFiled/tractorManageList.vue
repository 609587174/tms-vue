<style>


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="tabName" type="card" @tab-click="handleClick">
        <el-tab-pane label="运力管理" name="transportManage"></el-tab-pane>
        <el-tab-pane label="人员管理" name="personManage"></el-tab-pane>
        <el-tab-pane label="车辆管理" name="carManage">
          <!-- <tractor-list></tractor-list> -->
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom" :rules="rules">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen" @keyup.native.13="searchList">
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
    </div>
    <div class="nav-tab-setting mt-25">
      <div class="public-btn">
        <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportTruckData'"></export-button>
        <el-button type="success" @click="addHeadCarPage">新增</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="clicktabs">
        <el-tab-pane label="牵引车管理" name="first">
          <div class="table-list" v-loading="pageLoading">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
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
            <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="挂车管理" name="second"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tractorManageList',
  data() {
    return {
      importVisible: false,
      pageStatus: false,
      tabName:'carManage',
      fifterParam: {
        keyword: "",
        field: "plate_number",
      },
      exportType: {
        type: 'tractor',
        filename: '牵引车管理'
      },
      seachListParam: {
        plate_number: '',
        vin_number: '',
        brand: '',
      },
      rules: {},
      activeName: 'first',
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      thTableList: [{
        title: '牵引车车牌号',
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
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'plate_number', value: '车牌号' },
          { id: 'vin_number', value: '车架号' },
          { id: 'brand', value: '品牌型号' },
        ]
      },
      tableData: [],
      saveSendData: {},
      exportPostData: {}, //导出筛选
    }
  },

  methods: {
    addHeadCarPage: function() {
      // this.$router.push({ path: "/basicDataManage/capacityManage/carManage/addEditCarHeadManage" });
      window.open(`#/basicDataManage/capacityManage/carManage/editTractorManage`, '_blank')
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: "/basicDataManage/capacityManage/carManage/carTailManage" });
      }
    },
    handleClick(tab, event){
      if(tab.name === 'personManage'){
        this.$router.push({ path: `/basicDataManage/capacityManage/personManage/personListManage` });
      }else if(tab.name === 'transportManage'){
        this.$router.push({ path: `/basicDataManage/capacityManage/transportManage/capacityList` });
      }
    },
    importList: function() {

    },
    searchList: function(pageNum) {
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
      this.exportPostData = sendData;
      this.$$http('searchHeadCarList', sendData).then(function(result) {
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
        // this.$router.push({ path: `/basicDataManage/capacityManage/carManage/tractorDetail/${scope.rowData.id}` });
        window.open(`#/basicDataManage/capacityManage/carManage/tractorDetail/${scope.rowData.id}`, '_blank')
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
    this.activeName = 'first';
    this.tabName = 'carManage';
  },
  mounted: function() {
    this.searchList();
  }
}

</script>

