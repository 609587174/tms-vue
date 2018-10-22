<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
      <el-tab-pane label="费用导入统计" name="costImport"></el-tab-pane>
      <el-tab-pane label="现金费用管理" name="cashCost">
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
                  <el-date-picker v-model="costTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="匹配状态:">
                  <el-select v-model="searchFilters.is_matching" filterable @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.isMatchSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="费用类型:">
                  <el-select v-model="searchFilters.cost_type" filterable @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.costSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="行程内费用:" label-width="100px">
                  <el-select v-model="searchFilters.is_travel" filterable @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.isTravelSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="operation-btn">
          <el-row>
            <!-- <el-col :span="16" class="total-data">
            </el-col> -->
            <el-col :span="24" class="text-right">
              <el-button type="primary" plain @click="importData">导入</el-button>
              <!-- <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button> -->
            </el-col>
          </el-row>
        </div>
        <div class="table-list">
          <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
            <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
              <template slot-scope="scope">
                <div v-if="item.param === 'waybill'">
                  <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
                </div>
                <div v-else>
                  <span v-if="item.param ==='cost_type'||item.param ==='is_matching'||item.param ==='is_travel'">{{scope.row[item.param].verbose}}</span>
                  <span v-else>
                    <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]&&scope.row[item.adjustParam]!=scope.row[item.param]"><span>{{scope.row[item.adjustParam]}}</span></div>
                <div v-if="item.param==='remark_adjust'" class='td-hover' :title="scope.row[item.param]">{{scope.row[item.param]}}</div>
                <span v-else v-html="scope.row[item.param]"></span>
                </span>
        </div>
        </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_adjust.key==='no'" type="primary" size="mini" plain @click="accountAdjust(scope.row)">调账</el-button>
            <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
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
  <el-tab-pane label="对公费用管理" name="publicCost"></el-tab-pane>
  </el-tabs>
  <cash-cost-adjustment-dialog :account-adjust-is-show="accountAdjustIsShow" v-on:closeDialogBtn="closeDialog" :adjust-row="adjustRow"></cash-cost-adjustment-dialog>
  </div>
</template>
<script>
import cashCostAdjustmentDialog from '@/components/statistics/cashCostAdjustmentDialog';
export default {
  name: 'cashCostList',
  computed: {

  },
  components: {
    cashCostAdjustmentDialog: cashCostAdjustmentDialog
  },
  activated: function() {
    this.activeName = 'cashCost';
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
      costTime: this.$route.query.costTime ? (this.$route.query.costTime).split(',') : [], //费用时间
      activeName: 'cashCost',
      searchPostData: {}, //搜索参数
      searchFilters: {
        cost_type: '',
        is_matching: this.$route.query.is_matching ? this.$route.query.is_matching : '',
        is_travel: '',
        keyword: '',
        field: 'plate_number',
      },
      selectData: {
        isMatchSelect: [
          { id: '', value: '全部' },
          { id: 'yes', value: '已匹配' },
          { id: 'no', value: '未匹配' }
        ],
        isTravelSelect: [
          { id: '', value: '全部' },
          { id: 'yes', value: '是' },
          { id: 'no', value: '否' }
        ],
        costSelect: [
          { id: '', value: '全部' },
          { id: 'logistics_high_speed', value: '过路费' },
          // { id: 'logistics_high_speed_cash', value: '过路费（国家）' },
          // { id: 'logistics_high_speed_bridge', value: '过桥费' },
          { id: 'logistics_fuel_cash', value: '现金油/气（有票）' },
          { id: 'logistics_fuel_cash_no_ticket', value: '现金油/气（无票）' },
          { id: 'logistics_park', value: '停车费' },
          { id: 'logistics_maintain', value: '维修费' },
          { id: 'logistics_detector', value: '检测费' },
          { id: 'logistics_other', value: '其它费用' },
        ],
        fieldSelect: [
          { id: 'plate_number', value: '车号' },
          { id: 'lot', value: '批次' }
        ]
      },
      thTableList: [{
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '费用时间',
        param: 'cost_date',
        width: '180',
        isAdjust: true,
        adjustParam: 'cost_date_adjust'
      }, {
        title: '费用类型',
        param: 'cost_type',
        width: ''
      }, {
        title: '数量',
        param: 'nums',
        width: ''
      }, {
        title: '税前金额',
        param: 'pre_tax_amount',
        width: ''
      }, {
        title: '税后金额',
        param: 'at_amount',
        width: ''
      }, {
        title: '税额',
        param: 'tax_amount',
        width: ''
      }, {
        title: '行程内费用',
        param: 'is_travel',
        width: ''
      }, {
        title: '批次',
        param: 'lot',
        width: ''
      }, {
        title: '匹配状态',
        param: 'is_matching',
        width: ''
      }, {
        title: '运单号',
        param: 'waybill',
        width: ''
      }, {
        title: '装车完成时间',
        param: 'work_end_time',
        width: '180'
      },{
        title: '实际液厂',
        param: 'fluid',
        width: ''
      },{
        title: '装车吨位',
        param: 'loading_quantity',
        width: ''
      },{
        title: '添加时间',
        param: 'created_at',
        width: '180'
      }, {
        title: '调账备注',
        param: 'remark_adjust',
        width: '180'
      }, {
        title: '调账时间',
        param: 'adjust_time',
        width: '180'
      }],
      tableData: [],
      accountAdjustIsShow: false, //调账弹窗
      adjustRow: {}, //调账信息
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    closeDialog: function(isSave) {
      this.accountAdjustIsShow = false;
      if (isSave) {
        this.getList();
      }
    },
    // 调账
    accountAdjust(row) {
      this.accountAdjustIsShow = true;
      this.adjustRow = row;
    },
    importData() {
      this.$router.push({ path: `/imports/importData/${'cashCost'}` });
    },
    exportData() {

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
        window.open(`#/statistics/costManage/costImport/costImportWaybillDetail/${row.waybill_id}`, '_blank')
        //this.$router.push({ path: `/statistics/costManage/costImport/costImportWaybillDetail/${row.waybill_id}` });
      } else if (tpye === 'edit') {
        window.open(`#/statistics/costManage/cashCostManage/editCashCost?id=${row.id }`, '_blank')
        //this.$router.push({ path: `/statistics/costManage/cashCostManage/editCashCost`, query: { id: row.id } });
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
      if (this.pbFunc.objSize(this.$route.query)) {
        this.$router.push({ path: this.$route.path })
      }
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        cost_type: this.searchPostData.cost_type,
        is_matching: this.searchPostData.is_matching,
        is_travel: this.searchPostData.is_travel,
      };
      if (this.costTime instanceof Array && this.costTime.length > 0) {
        postData.cost_date_start = this.costTime[0];
        postData.cost_date_end = this.costTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getCashCostStatisticList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;
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
