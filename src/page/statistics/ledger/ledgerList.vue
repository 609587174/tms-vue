<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div class="nav-tab">
    <div class="tab-screen border-top">
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
            <el-form-item label="卸货完成时间:" label-width="105px">
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
          一共{{tableDataObj.waybill?tableDataObj.waybill:0}}单，运费总计{{tableDataObj.waiting_charges?tableDataObj.waiting_charges:0}}元，报销费用合计{{tableDataObj.income?tableDataObj.income:0}}元，行程外费用合计{{tableDataObj.extra_fee?tableDataObj.extra_fee:0}}元
        </el-col>
        <el-col :span="4" class="text-right">
          <!-- <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportLedgerData'"></export-button> -->
          <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('ledger')">{{exportBtn.text}}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-list">
      <el-table :data="tableDataObj.data?tableDataObj.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableDataObj.len}">
        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
          <template slot-scope="scope">
            <div v-if="item.param === 'waybill'">
              <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
              <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
            </div>
            <div v-else>
              <span v-if="item.param ==='station'" v-html="scope.row[item.param]"></span>
              <div v-else>
                <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]">
                  <span>{{scope.row[item.adjustParam]}}</span>
                </div>
                <!-- <span v-if="!item.isHover" v-html="scope.row[item.param]"></span> -->
                <div v-if="item.isHover&&scope.row[item.hoverParam].length" class="cursor-pointer">
                  <el-popover trigger="hover" placement="bottom">
                    <el-table :data="scope.row[item.hoverParam]" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(hoverItem,i) in hoverThTableList" :key="i" :prop="hoverItem.param" align="center" :label="hoverItem.title" :width="140"></el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                      {{scope.row[item.param]}}
                    </div>
                  </el-popover>
                </div>
                <div v-else v-html="scope.row[item.param]"></div>
              </div>
              <!-- <span v-else>{{scope.row[item.param]}}</span> &&scope.row[item.adjustParam]!=scope.row[item.param]-->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="运费合计" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <div class="adjust" v-if="scope.row.waiting_charges_differ"><span>{{scope.row.waiting_charges_differ}}</span></div>
            <div>{{scope.row.waiting_charges}}</div>
            <!-- ===={{totalTableList.length}} -->
          </template>
        </el-table-column>

        <el-table-column v-for="(totalItem,key) in totalTableList"  :prop="totalItem.param" align="center" fixed="right" :label="totalItem.title" :width="totalItem.width?totalItem.width:140">
          <template slot-scope="scope">
            <div v-if="totalItem.isHover&&scope.row[totalItem.hoverParam].length" class="cursor-pointer">
                  <el-popover trigger="hover" placement="top">
                    <el-table :data="scope.row[totalItem.hoverParam]" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(hoverItem,i) in hoverThTableList" :key="i" :prop="hoverItem.param" align="center" :label="hoverItem.title" :width="140"></el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                      {{scope.row[totalItem.param]}}
                    </div>
                  </el-popover>
                </div>
            <div v-else>{{scope.row[totalItem.param]}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="现金费用合计" align="center" width="110" fixed="right">
          <template slot-scope="scope">
            <div>{{scope.row.cash_total}}</div>
          </template>
        </el-table-column>
        <el-table-column label="对公费用合计" align="center" width="110" fixed="right">
          <template slot-scope="scope">
            <div>{{scope.row.com_total}}</div>
          </template>
        </el-table-column>
        <el-table-column label="报销费用合计" align="center" width="120" fixed="right">
          <template slot-scope="scope">
            <div>{{scope.row.income}}</div>
          </template>
        </el-table-column>
        <el-table-column label="行程外费用" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <div>{{scope.row.extra_fee}}</div>
          </template>
        </el-table-column> -->
      </el-table>
      <no-data v-if="!pageLoading && !tableDataObj.len"></no-data>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ledgerList',
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
      tableDataObj: {
        len: '', //长度
        data: [], //内容
        waybill: '', //业务台账单数
        waiting_charges: '', //运费合计
        income: '', //报销费用合计
        extra_fee: '', //行程费用合计
      },
      exportType: {
        type: 'ledger',
        filename: '业务台账'
      },
      activeName: 'logistics',
      leaveTime: [], //实际离站时间
      activeTime: [], //实际到厂时间
      searchPostData: {}, //搜索参数
      searchFilters: {
        keyword: '',
        field: 'plate_number',
      },
      selectData: {
        isReconciliationsSelect: [
          { id: '', value: '全部' },
          { id: 'unfinished', value: '未对账' },
          { id: 'finished', value: '已对账' }
        ],
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'plate_number', value: '车号' },
          { id: 'company', value: '托运方' },
        ]
      },
      hoverThTableList: [{
        title: '费用类型',
        param: 'fee_type',
      }, {
        title: '金额',
        param: 'money'
      }, {
        title: '交易地点',
        param: 'trading_places'
      }],
      totalTableList: [{
        title: '现金费用合计',
        param: 'cash_total',
        width: '110',
        isHover: true,
        hoverParam: 'cash_total_hover'
      }, {
        title: '对公费用合计',
        param: 'com_total',
        width: '110',
        isHover: true,
        hoverParam: 'com_total_hover'
      }, {
        title: '报销费用合计',
        param: 'income',
        width: '120',
        isHover: true,
        hoverParam: 'income_hover'
      }, {
        title: '行程外费用',
        param: 'extra_fee',
        width: '100',
        isHover: true,
        hoverParam: 'extra_fee_hover'
      }],
      thTableList: [{
          title: '运单号',
          param: 'waybill',
          width: ''
        }, {
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
          width: ''
        }, {
          title: '实际到厂时间',
          param: 'activate_start',
          width: '180'
        }, {
          title: '装车完成时间',
          param: 'work_end_time',
          width: '180'
        }, {
          title: '卸货完成时间',
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
          adjustParam: 'check_quantity_differ'
        }, {
          title: '实际里程',
          param: 'actual_mile',
          width: ''
        }, {
          title: '标准里程',
          param: 'stand_mile',
          width: '',
          isAdjust: true,
          adjustParam: 'stand_mile_differ'
        }, {
          title: '标准运价',
          param: 'stand_freight',
          width: ''
        }, {
          title: '气差金额',
          param: 'difference_value',
        }, {
          title: '分卸费',
          param: 'lcl_cost',
        }, {
          title: '运费金额',
          param: 'change_value',
          width: ''
        }, {
          title: '卸车待时金额',
          param: 'waiting_price',
          width: ''
        }, {
          title: '外油/气',
          param: 'ex_oil',
          width: '',
          isHover: true,
          hoverParam: 'ex_oil_hover'
        }, {
          title: '外油/气量',
          param: 'ex_nums',
          width: ''
        }, {
          title: '公司油/气',
          param: 'com_oil',
          width: '',
          isHover: true,
          hoverParam: 'com_oil_hover'
        }, {
          title: '公司油/气量',
          param: 'com_nums',
          width: ''
        }, {
          title: '高速消费金额',
          param: 'high_cost',
          width: '',
          isHover: true,
          hoverParam: 'high_cost_hover'
        }, {
          title: '高速服务费',
          param: 'service_charge',
          width: ''
        }, {
          title: '过路费',
          param: 'road_toll_com',
          width: '',
          isHover: true,
          hoverParam: 'road_toll_com_hover'
        },
        // {
        //   title: '过路费（国家）',
        //   param: 'road_toll_state',
        //   width: ''
        // }, {
        //   title: '过桥费',
        //   param: 'pontage',
        //   width: ''
        // },
        {
          title: '现金油/气（有票）',
          param: 'logistics_fuel_cash',
          width: '',
          isHover: true,
          hoverParam: 'logistics_fuel_cash_hover'
        }, {
          title: '现金油/气量（有票）',
          param: 'cash_nums',
          width: '160'
        }, {
          title: '现金油/气（无票）',
          param: 'logistics_fuel_cash_no_ticket',
          width: '',
          isHover: true,
          hoverParam: 'logistics_fuel_cash_no_ticket_hover'
        }, {
          title: '现金油/气量（无票）',
          param: 'cash_no_ticket_nums',
          width: '160'
        }, {
          title: '年审费',
          param: 'detection_cost',
          width: '',
          isHover: true,
          hoverParam: 'detection_cost_hover'
        }, {
          title: '维修费',
          param: 'maintenance_cost',
          width: '',
          isHover: true,
          hoverParam: 'maintenance_cost_hover'
        }, {
          title: '停车费',
          param: 'parking_fee',
          width: '',
          isHover: true,
          hoverParam: 'parking_fee_hover'
        }, {
          title: '其他费用',
          param: 'other_cost',
          width: '',
          isHover: true,
          hoverParam: 'other_cost_hover'
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
        }
      ],
      exportTable: [{
        title: '运单号',
        id: 138
      }, {
        title: '托运方',
        id: 139
      }, {
        title: '调账托运方',
        id: 205
      }, {
        title: '实际到厂时间',
        id: 143
      }, {
        title: '卸货完成时间',
        id: 144
      }, {
        title: '车牌号',
        id: 140
      }, {
        title: '实际液厂',
        id: 141
      }, {
        title: '站点名称',
        id: 142
      }, {
        title: '装车吨位',
        id: 145
      }, {
        title: '实收吨位',
        id: 146
      }, {
        title: '亏吨',
        id: 147
      }, {
        title: '核算吨位',
        id: 148
      }, {
        title: '调账核算吨位差值',
        id: 200
      }, {
        title: '标准里程',
        id: 150
      }, {
        title: '调账标准里程差值',
        id: 204
      }, {
        title: '实际里程',
        id: 170
      }, {
        title: '气差金额',
        id: 198
      }, {
        title: '分卸费',
        id: 197
      }, {
        title: '运费金额',
        id: 169
      }, {
        title: '卸车待时金额',
        id: 149
      }, {
        title: '标准运价',
        id: 187
      }, {
        title: '高速费',
        id: 162
      }, {
        title: '服务费',
        id:207
      },{
        title: '外油/气量',
        id: 178
      }, {
        title: '外油/气',
        id: 151
      }, {
        title: '公司油/气量',
        id: 179
      }, {
        title: '公司油/气',
        id: 152
      }, {
        title: '过路费',
        id: 153
      }, {
        title: '现金油/气(有票)量',
        id: 180
      }, {
        title: '现金油/气(有票)',
        id: 156
      }, {
        title: '现金油/气(无票)量',
        id: 181
      }, {
        title: '现金油/气(无票)',
        id: 157
      }, {
        title: '检测费',
        id: 158
      }, {
        title: '维修费',
        id: 159
      }, {
        title: '停车费',
        id: 160
      }, {
        title: '其他费用',
        id: 161
      }, {
        title: '主驾',
        id: 163
      }, {
        title: '副驾驶',
        id: 164
      }, {
        title: '押运',
        id: 165
      }, {
        title: '运费合计',
        id: 166
      }, {
        title: '调账运费合计差值',
        id: 202
      }, {
        title: '现金费用合计',
        id: 195
      }, {
        title: '对公费用合计',
        id: 196
      }, {
        title: '报销费用合计',
        id: 167
      }, {
        title: '行程外费用',
        id: 168
      }],
      tableData: [],
      exportPostData: {}, //导出筛选
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
        filename: '业务台账',
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
      this.$$http('exportLedgerData', newPostData).then((results) => {
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
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },

    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        window.open(`#/statistics/ledger/ledgerWaybillDetail/${row.waybill_id}`, '_blank')
        //this.$router.push({ path: `/statistics/ledger/ledgerWaybillDetail/${row.waybill_id}` });
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
      this.$$http('getLedgerList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          for (let i in this.tableData.data.results) {
            this.tableData.data.results[i].station = (this.tableData.data.results[i].station.join(',')).replace(/,/g, '<br/>');
            // this.tableData.data.results[i].station = this.tableData.data.results[i].station.replace(/,/g, '<br/>');
            // this.tableData.data.results[i].ex_oil_hover = [{
            //   fee_type: '过路费',
            //   money: 100
            // }, {
            //   fee_type: '过路费',
            //   money: 100
            // }, {
            //   fee_type: '过路费',
            //   money: 100
            // }]
          }
          this.tableDataObj = {
              len: this.tableData.data.results.length, //长度
              data: this.tableData.data.results, //内容
              waybill: this.tableData.data.waybill, //业务台账单数
              waiting_charges: this.tableData.data.waiting_charges, //运费合计
              income: this.tableData.data.income, //报销费用合计
              extra_fee: this.tableData.data.extra_fee, //行程费用合计
            },
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
