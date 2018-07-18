<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
      <el-tab-pane label="物流费用统计" name="logistics">
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
                  <el-date-picker v-model="activeTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际离站时间:" label-width="105px">
                  <el-date-picker v-model="leaveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="operation-btn">
          <el-row>
            <el-col :span="20" class="total-data">
              一共{{tableData.data&&tableData.data.waybill?tableData.data.waybill:0}}单，运费总计{{tableData.data&&tableData.data.waiting_charg?tableData.data.waiting_charg:0}}元
            </el-col>
            <el-col :span="4" class="text-right">
              <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportLogisticData'"></export-button>
              <!-- <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button> -->
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
            <el-table-column label="运费合计" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                <div>{{scope.row.waiting_charges}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
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
      <!-- <el-tab-pane label="收入统计" name="income"></el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'logisticsList',
  computed: {

  },
  activated: function() {
    this.activeName = 'logistics';
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      exportType: {
        type: 'logistic',
        filename: '物流费用统计'
      },
      activeName: 'logistics',
      leaveTime: [], //实际离站时间
      activeTime: [], //实际装车时间
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
          { id: 'company', value: '托运方' },
          { id: 'plate_number', value: '车号' }
        ]
      },
      thTableList: [{
        title: '运单号',
        param: 'waybill',
        width: ''
      }, {
        title: '业务单号',
        param: 'order',
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
        title: '实际液厂',
        param: 'fluid',
        width: ''
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
      }, {
        title: '计划装车时间',
        param: 'plan_time',
        width: '180'
      }, {
        title: '实际装车时间',
        param: 'activate_start',
        width: '180'
      }, {
        title: '实际离站时间',
        param: 'activate_end',
        width: '180'
      }, {
        title: '装车吨位',
        param: 'loading_quantity',
        width: ''
      }, {
        title: '实收吨位',
        param: 'actual_quantity',
        width: ''
      }, {
        title: '亏吨',
        param: 'deficiency',
        width: ''
      }, {
        title: '核算吨位',
        param: 'check_quantity',
        width: ''
      }, {
        title: '标准里程',
        param: 'stand_mile',
        width: ''
      }, {
        title: '起步价',
        param: 'label_price',
        width: ''
      }, {
        title: '运费费率',
        param: 'freight_value',
        width: ''
      }, {
        title: '运费金额',
        param: 'change_value',
        width: ''
      }, {
        title: '卸车待时金额',
        param: 'waiting_price',
        width: ''
      }],
      tableData: [],
      exportPostData: {} //导出筛选
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'logistics') {
        this.$router.push({ path: `/statistics/business/logistics/logisticsList` });
      } else if (targetName.name == 'income') {
        this.$router.push({ path: `/statistics/business/income/incomeList` });
      }
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        this.$router.push({ path: `/statistics/business/logistics/logisticsWaybillDetail/${row.waybill_id}/${row.order_id}` });
      } else if (tpye === 'edit') {
        this.$router.push({ path: `/statistics/business/logistics/editLogistics`, query: { id: row.id } });
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList(this.statusActive);

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
      this.$$http('getLogisticStatisticList', postData).then((results) => {
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
    this.getList(this.statusActive);
  }

}

</script>
