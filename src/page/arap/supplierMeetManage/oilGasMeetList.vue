<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="加油气应付报表" name="oilGas">
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
              <el-row :gutter="30">
                <el-col :span="10">
                  <el-form-item label="开始日期:">
                    <el-date-picker v-model="activeTime" type="datetimerange" @change="startSearch" :clearable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['16:00:00','16:00:00']"></el-date-picker>
                    <!-- <el-row :gutter="0">
                      <el-col :span="11">
                        <el-date-picker v-model="startTime" type="month" placeholder="选择开始月" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss" @change="dateSelect"></el-date-picker>
                      </el-col>
                      <el-col :span="2" class="text-center">-</el-col>
                      <el-col :span="11">
                        <el-date-picker v-model="endTime" type="month" placeholder="选择结束月" :clearable="false" value-format="yyyy-MM" @change="dateSelect('end')">
                        </el-date-picker>
                      </el-col>
                    </el-row> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right" v-if="false">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="success" @click="addPerson">新增</el-button> -->
          </div>
          <div class="table-list mt-25">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" max-height="600" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :width="item.width" :label="item.title">
              </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="高速公司应付报表" name="highSpeed"></el-tab-pane>
        <el-tab-pane label="付款管理" name="payment"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'oilGasMeetList',

  computed: {

  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'oilGas',
      searchPostData: {}, //搜索参数
      searchFilters: {
        field: 'name',
      },
      activeTime:[],
      selectData: {
        fieldSelect: [
          { id: 'name', value: '加油气公司' },
        ],
        supplierSelect: [], //供应商
      },
      startTime: '', //开始日期
      endTime: '', //结束日期
      thTableList: [{
        title: '加油气公司',
        param: 'name',
        width: '200'
      }, {
        title: '期初余额',
        param: 'first_amount',
        width: ''
      }, {
        title: '消费金额',
        param: 'consumption_price_sum',
        width: ''
      },{
        title: '付款金额',
        param: 'total_amount',
        width: ''
      }, {
        title: '返利金额',
        param: 'return_amount',
        width: ''
      },  {
        title: '期末余额',
        param: 'last_amount',
        width: ''
      }],
      tableData: [],

    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    dateSelect(type) {
      let dates = this.endTime.split('-');
      let days = (new Date(dates[0], dates[1], 0)).getDate();
      if (type === 'end') {
        this.endTime = this.endTime + '-' + days + ' 23:59:59';
      }
      let endDate = this.pbFunc.compareDate(this.startTime, this.endTime);
      if (endDate) {
        this.startSearch();
      } else {
        this.$message.warning('结束日期小于开始日期');
      }

    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        // active_time_start: this.startTime,
        // active_time_end: this.endTime,
      };
      if (this.activeTime.length) {
        postData.active_time_start = this.activeTime[0];
        postData.active_time_end = this.activeTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.$$http('getOilGasMeetList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    getSupplier: function() {
      let postData = {
        need_all: true,
      }
      this.$$http('searchSupplierList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.selectData.supplierSelect = results.data.data;
        }
      }).catch((err) => {})
    },
    handleClick: function(tab, event) {
      if (tab.name === 'highSpeed') {
        this.$router.push({ path: "/arap/supplierMeetManage/highSpeedMeetLsit" });
      }else if(tab.name === 'payment') {
        this.$router.push({ path: "/arap/supplierMeetManage/oilGasPayment" });
      }
    },

    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    },
    payerDate() {
      let payDate = new Date();
      let days = (new Date(payDate.getFullYear(), payDate.getMonth(), 0)).getDate();
      this.startTime = payDate.getFullYear() + '-' + (payDate.getMonth()) + '-' + days + ' 16:00:00';
      // this.endTime = payDate.getFullYear() + '-' + (payDate.getMonth() + 1) + '-' + days + ' 23:23:59';
      this.endTime = payDate.Format("yyyy-MM-dd hh:mm:ss");
      this.activeTime = [this.startTime, this.endTime];
    }
  },
  activated() {
    this.activeName = 'oilGas'
  },
  created: function() {
    this.pbFunc.format();
    this.payerDate();
    this.getList();
    this.getSupplier();
  }
}

</script>
