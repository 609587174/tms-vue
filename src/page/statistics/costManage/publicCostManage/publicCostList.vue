<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

.nav-tab-setting {
  position: relative;
  .public-btn {
    position: absolute;
    top: -15px;
    right: 11px;
    z-index: 1;
    display: inline-block;
  }
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="费用导入统计" name="costImport"></el-tab-pane>
        <el-tab-pane label="现金费用管理" name="cashCost"></el-tab-pane>
        <el-tab-pane label="对公费用管理" name="publicCost">
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
                  <el-form-item label="费用时间:" label-width="105px">
                    <el-date-picker v-model="costTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否匹配:">
                    <el-select v-model="searchFilters.station" filterable @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.isMatchSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                <el-form-item label="费用类型:">
                  <el-select v-model="searchFilters.station" filterable @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.costSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="nav-tab-setting mt-25">
      <div class="public-btn">
        <el-button type="primary" plain @click="importData">导入</el-button>
        <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button>
      </div>
      <el-tabs v-model="costActive">
        <el-tab-pane label="高速费管理" name="tollFee">
          <div class="table-list">
            <el-table :data="tableData.data?tableData.data.results:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
                <template slot-scope="scope">
                  <div v-if="item.param === 'waybill'">
                    <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
                  </div>
                  <div v-else>{{scope.row[item.param]}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="油/气费管理" name="oilGas"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'publicCostList',
  computed: {

  },
  activated: function() {
    this.activeName = 'publicCost';
  },
  data() {
    return {
      pageLoading: false,
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
      costTime: [], //费用时间
      activeName: 'publicCost',
      costActive: 'tollFee',
      searchFilters: {
        is_reconciliation: [],
        keyword: '',
        field: 'plate_number',
      },
      selectData: {
        isMatchSelect: [
          { id: '', value: '全部' },
          { id: 'unfinished', value: '已匹配' },
          { id: 'finished', value: '未匹配' }
        ],
        // costSelect: [
        //   { id: '', value: '全部' },
        //   { id: 'unfinished', value: '过路费（普通）' },
        //   { id: 'finished', value: '过路费（国家）' },
        //   { id: 'unfinished', value: '过桥费' },
        //   { id: 'finished', value: '现金油/气（有票）' },
        //   { id: 'unfinished', value: '现金油/气（无票）' },
        //   { id: 'finished', value: '停车费' },
        //   { id: 'unfinished', value: '维修费' },
        //   { id: 'finished', value: '检测费' },
        //   { id: 'unfinished', value: '其它费用' },
        // ],
        fieldSelect: [
          { id: 'plate_number', value: '车号' }
        ]
      },
      thTableList: [{
        title: '加油/气公司',
        param: 'order',
        width: ''
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '费用时间',
        param: 'order',
        width: ''
      }, {
        title: '数量',
        param: 'plate_number',
        width: ''
      }, {
        title: '单价',
        param: 'fluid',
        width: ''
      }, {
        title: '消费金额',
        param: 'station',
        width: ''
      }, {
        title: '是否匹配运单',
        param: 'leave_time',
        width: ''
      }, {
        title: '运单号',
        param: 'waybill',
        width: ''
      }],
      tableData: []
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    importData() {
      this.$router.push({ path: `/statistics/costManage/publicCostManage/importPublicCost` });
    },
    exportData() {

    },
    clicktabs: function(targetName) {
      if (targetName.name === 'costImport') {
        this.$router.push({ path: `/statistics/costManage/costImport/costImportList` });
      } else if (targetName.name === 'cashCost') {
        this.$router.push({ path: `/statistics/costManage/cashCostManage/cashCostList` });
      } else if (targetName.name === 'publicCost') {
        this.$router.push({ path: `/statistics/costManage/publicCostManage/publicCostList` });
      }
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        this.$router.push({ path: `/statistics/costManage/costImport/costImportWaybillDetail/${row.waybill_id}/${row.order_id}` });
      }
      // else if (tpye === 'edit') {
      //   this.$router.push({ path: `/statistics/business/income/editIncome`, query: { id: row.id } });
      // }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.getList(this.statusActive);

    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        is_reconciliation: this.searchFilters.is_reconciliation
      };
      if (this.costTime instanceof Array && this.costTime.length > 0) {
        postData.leave_time_start = this.costTime[0];
        postData.leave_time_end = this.costTime[1];
      }
      postData[this.searchFilters.field] = this.searchFilters.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getIncomeStatisticList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;

          this.pageData.totalCount = results.data.data.count;

          console.log('this.tableData', this.tableData, this.pageData.totalCount);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    }
  },
  created() {
    this.getList(this.statusActive);
  }

}

</script>
