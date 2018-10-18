<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="物流数据" name="logistics">
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
                <el-form-item label="实际到厂时间:" label-width="105px">
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
              <el-col :span="6">
                <el-form-item label="是否对账:">
                  <el-select v-model="searchFilters.is_reconciliation" @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.isReconciliationsSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="是否开票:">
                  <el-select v-model="searchFilters.is_invoice" filterable @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.isInvoiceSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          </el-form>
        </div>
        <div class="operation-btn">
          <el-row>
            <el-col :span="18" class="total-data">
              一共{{tableDataObj.waybill?tableDataObj.waybill:0}}单，运费总计{{tableDataObj.waiting_charg?tableDataObj.waiting_charg:0}}元
            </el-col>
            <el-col :span="6" class="text-right">
              <el-button type="primary" plain @click="batchReconciliation('reconciliation')">批量对账</el-button>
              <el-button type="success" @click="batchReconciliation('invoice')">批量开票</el-button>
              <!-- <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportLogisticData'"></export-button> -->
              <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('logistic')">{{exportBtn.text}}</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table-list">
          <el-table :data="tableDataObj.data?tableDataObj.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableDataObj.len}" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
              <template slot-scope="scope">
                <div v-if="item.param === 'waybill'">
                  <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
                  <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
                </div>
                <div v-else-if="item.param ==='is_invoice'||item.param ==='is_reconciliation'">{{scope.row[item.param].verbose}}</div>
                <div v-else>
                  <span v-if="item.param ==='station'" v-html="scope.row[item.param]"></span>
                  <div v-else>
                    <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]&&scope.row[item.adjustParam]!=scope.row[item.param]">
                      <span>{{scope.row[item.adjustParam]}}</span>
                    </div>
                    <div v-if="item.param==='remark_adjust'||item.param==='remark'" class='td-hover' :title="scope.row[item.param]">{{scope.row[item.param]}}</div>
                    <span v-else v-html="scope.row[item.param]"></span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="运费合计" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                <div>
                  <div class="adjust" v-if="scope.row.waiting_charges_dvalue"><span>{{scope.row.waiting_charges_dvalue}}</span></div>
                  {{scope.row.waiting_charges}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="140" fixed="right">
              <template slot-scope="scope">
                <!-- <div v-if="scope.row.is_adjust.key==='no'">
              <el-button type="primary" size="mini" plain @click="accountAdjust(scope.row)">调账</el-button>
              <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
            </div> -->
                <div v-if="scope.row.is_reconciliation.key==='finished'&&scope.row.is_invoice.key==='no'">
                  <el-button type="success" size="mini" plain v-if="scope.row.is_adjust.key==='no'" @click="accountAdjust(scope.row)">调账</el-button>
                  <el-button type="success" size="mini" v-if="scope.row.is_invoice.key==='no'" @click="reconciliations(false,scope.row.id,'','invoice')">开票</el-button>
                </div>
                <div v-if="scope.row.is_reconciliation.key==='unfinished'">
                  <el-button type="primary" plain size="mini" @click="reconciliations(false,scope.row.id,'','reconciliation')">对账</el-button>
                  <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <no-data v-if="!pageLoading && !tableDataObj.len"></no-data>
        </div>
        <div class="page-list text-center">
          <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
          </el-pagination>
        </div>
        <logistics-adjustment-dialog :account-adjust-is-show="accountAdjustIsShow" v-on:closeDialogBtn="closeDialog" :adjust-row="adjustRow"></logistics-adjustment-dialog>
      </el-tab-pane>
      <el-tab-pane label="车辆数据" name="carList">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import logisticsAdjustmentDialog from '@/components/statistics/logisticsAdjustmentDialog';
export default {
  name: 'logisticsList',
  computed: {

  },
  components: {
    logisticsAdjustmentDialog: logisticsAdjustmentDialog
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
      tableDataObj: {
        len: '', //长度
        data: [], //内容
        waybill: '', //物流单数
        waiting_charg: '', //运费合计
      },
      exportType: {
        type: 'logistic',
        filename: '物流费用统计'
      },
      activeName: 'logistics',
      leaveTime: [], //实际离站时间
      activeTime: [], //实际到厂时间
      searchPostData: {}, //搜索参数
      searchFilters: {
        is_reconciliation: '',
        is_invoice: '',
        keyword: '',
        field: 'plate_number',
      },
      selectData: {
        isReconciliationsSelect: [
          { id: '', value: '全部' },
          { id: 'unfinished', value: '未对账' },
          { id: 'finished', value: '已对账' }
        ],
        isInvoiceSelect: [
          { id: '', value: '全部' },
          { id: 'yes', value: '已开票' },
          { id: 'no', value: '未开票' }
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
        },
        //  {
        //   title: '业务单号',
        //   param: 'order',
        //   width: ''
        // },
        {
          title: '托运方',
          param: 'company',
          width: '200',
          isAdjust: true,
          adjustParam: 'company_adjust'
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
          width: '200'
        }, {
          title: '计划装车时间',
          param: 'plan_time',
          width: '180'
        }, {
          title: '实际到厂时间',
          param: 'activate_start',
          width: '180'
        }, {
          title: '装车完成时间',
          param: 'work_end_time',
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
          width: '',
          isAdjust: true,
          adjustParam: 'check_quantity_dvalue'
        }, {
          title: '标准里程',
          param: 'stand_mile',
          width: '',
          isAdjust: true,
          adjustParam: 'stand_mile_dvalue'
        }, {
          title: '实际里程',
          param: 'actual_mile',
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
          title: '标准运价',
          param: 'stand_freight',
          width: ''
        }, {
          title: '气差金额',
          param: 'difference_value',
          width: ''
        }, {
          title: '分卸费',
          param: 'lcl_cost',
          width: ''
        }, {
          title: '运费金额',
          param: 'change_value',
          width: ''
        }, {
          title: '卸车待时金额',
          param: 'waiting_price',
          width: ''
        }, {
          title: '是否对账',
          param: 'is_reconciliation',
          width: ''
        }, {
          title: '是否开票',
          param: 'is_invoice',
          width: ''
        }, {
          title: '备注',
          param: 'remark',
          width: '170'
        }, {
          title: '对账时间',
          param: 'reconciliation_time',
          width: '180'
        }, {
          title: '调账时间',
          param: 'adjust_time',
          width: '180'
        }, {
          title: '调账备注',
          param: 'remark_adjust',
          width: '180'
        }, {
          title: '开票时间',
          param: 'invoice_time',
          width: '180'
        }
      ],
      exportTable: [{
        title: '运单号',
        id: 91
      }, {
        title: '托运方',
        id: 93
      }, {
        title: '调账托运方',
        id: 188
      }, {
        title: '车牌号',
        id: 94
      }, {
        title: '实际液厂',
        id: 95
      }, {
        title: '站点名称',
        id: 96
      }, {
        title: '计划装车时间',
        id: 97
      }, {
        title: '实际到厂时间',
        id: 98
      }, {
        title: '装车完成时间',
        id: 177
      }, {
        title: '实际离站时间',
        id: 99
      }, {
        title: '装车吨位',
        id: 100
      }, {
        title: '实收吨位',
        id: 101
      }, {
        title: '亏吨',
        id: 102
      }, {
        title: '核算吨位',
        id: 103
      }, {
        title: '调账核算吨位差值',
        id: 189
      }, {
        title: '标准里程',
        id: 104
      }, {
        title: '实际里程',
        id: 192
      }, {
        title: '调账标准里程差值',
        id: 191
      }, {
        title: '起步价',
        id: 105
      }, {
        title: '运费费率',
        id: 106
      }, {
        title: '标准运价',
        id: 185
      }, {
        title: '气差金额',
        id: 174
      }, {
        title: '分卸费',
        id: 173
      }, {
        title: '运费金额',
        id: 108
      }, {
        title: '卸车待时金额',
        id: 109
      }, {
        title: '是否对账',
        id: 176
      }, {
        title: '是否开票',
        id: 175
      }, {
        title: '备注',
        id: 186
      }, {
        title: '对账时间',
        id: 184
      }, {
        title: '调账时间',
        id: 172
      }, {
        title: '调账备注',
        id: 171
      }, {
        title: '开票时间',
        id: 183
      }, {
        title: '运费合计',
        id: 107
      }, {
        title: '调账运费合计差值',
        id: 190
      }],
      tableData: {},
      multipleSelection: [], //所选数据 
      exportPostData: {}, //导出筛选
      accountAdjustIsShow: false, //调账弹窗
      adjustRow: {}, //调账信息
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
    }
  },
  methods: {
    postDataFilter(postData) {
      for (let i in postData) {
        if (i === 'page' || i === 'page_size') {
          delete postData[i];
        }
      }
      return postData;
    },
    exportTableData(type) {
      let postData = {
        filename: '物流数据',
        page_arg: type,
        ids: []
      };
      for (let i in this.exportTable) {
        postData.ids.push(this.exportTable[i].id);
      }
      this.exportPostData = this.postDataFilter(this.exportPostData);
      let newPostData = Object.assign(this.exportPostData, postData);
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }
      this.$$http('exportLogisticData', newPostData).then((results) => {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(targetName) {
      if (targetName.name == 'carList') {
        this.$router.push({ path: "/statistics/business/logistics/carList" });
      }
    },
    // // 全部对账
    // getUnReconciliations() {
    //   let postData = {
    //     is_reconciliation: this.searchPostData.is_reconciliation
    //   };
    //   if (this.leaveTime instanceof Array && this.leaveTime.length > 0) {
    //     postData.leave_time_start = this.leaveTime[0];
    //     postData.leave_time_end = this.leaveTime[1];
    //   }
    //   if (this.activeTime instanceof Array && this.activeTime.length > 0) {
    //     postData.active_time_start = this.activeTime[0];
    //     postData.active_time_end = this.activeTime[1];
    //   }
    //   postData.batch = 'unfinished';
    //   postData[this.searchPostData.field] = this.searchPostData.keyword;
    //   postData = this.pbFunc.fifterObjIsNull(postData);
    //   this.reconciliationsBtn.isDisabled = true;
    //   this.reconciliationsBtn.isLoading = true;
    //   this.$$http('getConsignmentStatisticsList', postData).then((results) => {
    //     this.reconciliationsBtn.isDisabled = false;
    //     this.reconciliationsBtn.isLoading = false;
    //     if (results.data && results.data.code == 0) {
    //       this.reconciliations(true, '', results.data);
    //     }
    //   }).catch((err) => {
    //     this.reconciliationsBtn.isDisabled = false;
    //     this.reconciliationsBtn.isLoading = false;
    //   })
    // },
    // 批量对账、开票弹窗
    batchReconciliation(type) {
      let ids = [];
      let price = 0;
      for (let i in this.multipleSelection) {
        if (this.multipleSelection[i].is_reconciliation.key === 'unfinished' && type === 'reconciliation') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].waiting_charges) * 100;
        }
        if (this.multipleSelection[i].is_invoice.key === 'no' && this.multipleSelection[i].is_reconciliation.key === 'finished' && type === 'invoice') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].waiting_charges) * 100;
        }
      }
      this.reconciliations(true, ids, price / 100, type);
    },
    // 单个/批量 对账  开票
    reconciliations(isAll, ids, price, type) {
      let content = '';
      let postData = {};
      let title = '';
      if (type === 'reconciliation') {
        postData.is_reconciliation = 'finished';
        title = '对账';
      } else if (type === 'invoice') {
        postData.is_invoice = 'yes';
        title = '开票';
      }
      if (isAll) {
        if (ids.length) {
          content = '未' + title + '共有' + ids.length + '单，运费合计' + price + '元，是否要对所选运单进行批量' + title + '？';
          postData.id = ids;

        } else {
          this.$message({
            message: '请勾选未' + title + '数据',
            type: 'warning'
          });
        }
      } else {
        content = '是否确认' + title + '？';
        postData.id = ids.split(',');
      }

      if (ids.length) {
        this.$confirm(content, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$$http('batchLogisticStatisticsStatus', postData).then((results) => {
            if (results.data && results.data.code == 0) {
              this.getList();
            }
          })
        }).catch(() => {});
      }
    },
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
    clicktabs: function(targetName) {
      if (targetName.name == 'logistics') {
        this.$router.push({ path: `/statistics/business/logistics/logisticsList` });
      } else if (targetName.name == 'income') {
        this.$router.push({ path: `/statistics/business/income/incomeList` });
      }
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        window.open(`#/statistics/business/logistics/logisticsWaybillDetail/${row.waybill_id}`, '_blank')
        //this.$router.push({ path: `/statistics/business/logistics/logisticsWaybillDetail/${row.waybill_id}` });
      } else if (tpye === 'edit') {
        window.open(`#/statistics/business/logistics/editLogistics?id=${row.id }`, '_blank')
        //this.$router.push({ path: `/statistics/business/logistics/editLogistics`, query: { id: row.id } });
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
        is_reconciliation: this.searchPostData.is_reconciliation,
        is_invoice: this.searchPostData.is_invoice,
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
          for (let i in this.tableData.data.results) {
            this.tableData.data.results[i].check_quantity_dvalue = '';
            this.tableData.data.results[i].stand_mile_dvalue = '';
            this.tableData.data.results[i].waiting_charges_dvalue = '';
            if (this.tableData.data.results[i].check_quantity_adjust) {
              this.tableData.data.results[i].check_quantity_dvalue = (parseFloat(this.tableData.data.results[i].check_quantity_adjust) * 1000 - parseFloat(this.tableData.data.results[i].check_quantity) * 1000) / 1000;
            }
            if (this.tableData.data.results[i].stand_mile_adjust) {
              this.tableData.data.results[i].stand_mile_dvalue = (parseFloat(this.tableData.data.results[i].stand_mile_adjust) * 10 - parseFloat(this.tableData.data.results[i].stand_mile) * 10) / 10;
            }
            if (this.tableData.data.results[i].waiting_charges_adjust) {
              this.tableData.data.results[i].waiting_charges_dvalue = (parseFloat(this.tableData.data.results[i].waiting_charges_adjust) * 100 - parseFloat(this.tableData.data.results[i].waiting_charges) * 100) / 100;
              this.tableData.data.results[i].waiting_charges_dvalue = (this.tableData.data.results[i].waiting_charges_dvalue).toFixed(2);
            }
            this.tableData.data.results[i].station = this.tableData.data.results[i].station.replace(/,/g, '<br/>');
          }
          this.tableDataObj = {
              len: this.tableData.data.results.length, //长度
              data: this.tableData.data.results, //内容
              waybill: this.tableData.data.waybill, //物流单数
              waiting_charg: this.tableData.data.waiting_charg, //运费合计
            },
            this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    }
  },
  created() {
    this.getList();
  }

}

</script>
