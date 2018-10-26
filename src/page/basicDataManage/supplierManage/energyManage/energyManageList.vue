<style scoped lang="less">

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="加油气公司" name="energy">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom">
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
        <el-tab-pane label="高速公司" name="tollfee">

        </el-tab-pane>
        <el-tab-pane label="承运商管理" name="carrierManage"></el-tab-pane>
      </el-tabs>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" @click="exportList">导出</el-button> -->
        <el-button type="success" @click="addEnergy">新增</el-button>
      </div>
      <div class="table-list" v-loading="pageLoading" >
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="jumpPage({operator:'show',rowData:scope.row})">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <noData v-if="!pageLoading && tableData.length==0"></noData>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next,jumper" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import noData from '@/components/common/noData';
export default {
  name: 'tollfeeManageList',
  computed: {
  },
  components: {
    noData,
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      fifterParam: {
        keyword: "",
        field: "name",
      },
      activeName: 'energy',
      thTableList: [{
        title: '加油气公司',
        param: 'name',
        width: ''
      }, {
        title: '类型',
        param: 'type.verbose',
        width: ''
      }, {
        title: '联系人',
        param: 'contact_name',
        width: ''
      }, {
        title: '联系电话',
        param: 'contact_phone',
        width: ''
      }, {
        title: '地址',
        param: 'detail_address',
        width: '250'
      }, {
        title: '添加时间',
        param: 'created_at',
        width: ''
      }],
      seachListParam: {

      },
      pageStatus: false,
      tableData:[],
      selectData: {
        fieldSelect: [
          { id: 'name', value: '加油气公司' },
        ]
      },
    }
  },
  methods: {
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
      sendData.pageSize = 10;
      this.$$http('searchEnergyList', sendData).then(function(result) {
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
    exportList:function(){

    },
    jumpPage:function(scope){
      // this.$router.push({ path: `/basicDataManage/supplierManage/energyManage/energyManageDetalis/${scope.rowData.id}` });
      window.open(`#/basicDataManage/supplierManage/energyManage/energyManageDetalis/${scope.rowData.id}`, '_blank')
    },
    addEnergy:function(){
      // this.$router.push({ path: "/basicDataManage/supplierManage/energyManage/energyManageChange?operate=add" });
      window.open(`#/basicDataManage/supplierManage/energyManage/energyManageChange?operate=add`, '_blank')
    },
    handleClick:function(targetName){
      if (targetName.name == 'tollfee') {
        this.$router.push({ path: "/basicDataManage/supplierManage/tollfeeManage/tollfeeManageList" });
      }else if(targetName.name === 'carrierManage'){
        this.$router.push({ path: '/basicDataManage/supplierManage/carrierManage/carrierManagelist' });
      }
    },
    pageChange: function() {
      setTimeout(() => {
        this.pageStatus = true;
        this.searchList();
      })
    }
  },

  created: function() {
    this.searchList();
  }
}

</script>
