<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
      <el-tab-pane label="费用导入统计" name="costImport">
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
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="实际装车时间:" label-width="105px">
                  <el-date-picker v-model="leaveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="卸货完成时间:" label-width="105px">
                  <el-date-picker v-model="activeTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="operation-btn">
          <el-row>
            <el-col :span="20" class="total-data">
              一共{{tableData.data&&tableData.data.waybill?tableData.data.waybill:0}}单，报销费用合计{{tableData.data&&tableData.data.inco?tableData.data.inco:0}}元
            </el-col>
            <el-col :span="4" class="text-right">
              <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportIncomeData'"></export-button>
            </el-col>
          </el-row>
        </div>
        <div class="table-list">
          <el-table :data="tableData.data?tableData.data.results:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':tableData.data&&!tableData.data.results.length}">
            <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
              <template slot-scope="scope">
                <div v-if="item.param === 'waybill'">
                  <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
                  <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
                </div>
                <div v-else>{{scope.row[item.param]}}</div>
              </template>
            </el-table-column>
            <el-table-column label="报销费用合计" align="center" width="130" fixed="right">
              <template slot-scope="scope">
                <div>{{scope.row.income}}</div>
              </template>
            </el-table-column>
            <el-table-column label="行程外费用" align="center" width="140" fixed="right">
              <template slot-scope="scope">
                <div>{{scope.row.extra_fee}}</div>
              </template>
            </el-table-column>
          </el-table>
          <no-data v-if="!pageLoading && !tableData.data.results.length"></no-data>
        </div>
        <div class="page-list text-center">
          <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="现金费用管理" name="cashCost"></el-tab-pane>
      <el-tab-pane label="对公费用管理" name="publicCost"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'costImportList',
  computed: {

  },
  activated: function() {
    this.activeName = 'costImport';
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      leaveTime: [], //卸货完成时间
      activeTime: [], //实际装车时间
      activeName: 'costImport',
      exportType: {
        type: 'income',
        filename: '费用导出统计'
      },
      searchPostData: {}, //搜索参数
      searchFilters: {
        is_reconciliation: [],
        keyword: '',
        field: 'waybill',
      },
      selectData: {
        isReconciliationsSelect: [
          { id: '', value: '全部' },
          { id: 'unfinished', value: '未对账' },
          { id: 'finished', value: '已对账' }
        ],
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'staff', value: '人员' },
          { id: 'plate_number', value: '车号' }
        ]
      },
      thTableList: [{
        title: '运单号',
        param: 'waybill',
        width: ''
      }, {
        title: '托运方',
        param: 'company',
        width: '200'
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '实际装车时间',
        param: 'active_time',
        width: '180'
      }, {
        title: '卸货完成时间',
        param: 'leave_time',
        width: '180'
      }, {
        title: '外油/气',
        param: 'ex_oil',
        width: ''
      }, {
        title: '公司油/气',
        param: 'com_oil',
        width: ''
      }, {
        title: '高速费',
        param: 'high_cost',
        width: ''
      }, {
        title: '过路费（普通）',
        param: 'road_toll_com',
        width: ''
      }, {
        title: '过路费（国家）',
        param: 'road_toll_state',
        width: ''
      }, {
        title: '过桥费',
        param: 'pontage',
        width: ''
      }, {
        title: '现金油/气（有票）',
        param: 'logistics_fuel_cash',
        width: ''
      }, {
        title: '现金油/气（无票）',
        param: 'logistics_fuel_cash_no_ticket',
        width: ''
      }, {
        title: '检测费',
        param: 'detection_cost',
        width: ''
      }, {
        title: '维修费',
        param: 'maintenance_cost',
        width: ''
      }, {
        title: '停车费',
        param: 'parking_fee',
        width: ''
      }, {
        title: '其它费用',
        param: 'other_cost',
        width: ''
      }, {
        title: '主驾',
        param: 'master_driver',
        width: ''
      }, {
        title: '副驾',
        param: 'vice_driver',
        width: ''
      }, {
        title: '押运员',
        param: 'escort_staff',
        width: ''
      }],
      tableData: [],
      exportPostData: {}, //导出筛选
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    clicktabs: function(targetName) {
      if (targetName.name === 'costImport') {
        this.$router.push({ path: `/statistics/costManage/costImport/costImportList` });
      } else if (targetName.name === 'cashCost') {
        this.$router.push({ path: `/statistics/costManage/cashCostManage/cashCostList` });
      } else if (targetName.name === 'publicCost') {
        this.$router.push({ path: `/statistics/costManage/publicCostManage/tollFee/tollFeeList` });
      }
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        this.$router.push({ path: `/statistics/costManage/costImport/costImportWaybillDetail/${row.waybill_id}` });
      }
      // else if (tpye === 'edit') {
      //   this.$router.push({ path: `/statistics/business/income/editIncome`, query: { id: row.id } });
      // }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();

    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        is_reconciliation: this.searchPostData.is_reconciliation
      };
      if (this.leaveTime instanceof Array && this.leaveTime.length > 0) {
        postData.leave_time_start = this.leaveTime[0];
        postData.leave_time_end = this.leaveTime[1];
      }
      if (this.activeTime instanceof Array && this.activeTime.length > 0) {
        postData.active_time_start = this.activeTime[0];
        postData.active_time_end = this.activeTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.$$http('getIncomeStatisticList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    }
  },
  created() {
    this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
    this.getList();
  }

}

</script>
