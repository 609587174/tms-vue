<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  line-height: 18px;
}

/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="车辆数据" name="carList">
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
                  <el-date-picker v-model="activeLoadTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际卸车时间:" label-width="105px">
                  <el-date-picker v-model="activeUnloadTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际离站时间:" label-width="105px">
                  <el-date-picker v-model="activateEndTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="装车吨位:" label-width="105px">
                  <el-row>
                    <el-col :span="11">
                      <el-select v-model="searchFilters.loading_quantity_start" filterable @change="startSearch" placeholder="最小吨位">
                        <el-option v-for="(item,key) in selectData.minTonnage" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="2" class="text-center">至</el-col>
                    <el-col :span="11">
                      <el-select v-model="searchFilters.loading_quantity_end" filterable @change="startSearch" placeholder="最大吨位">
                        <el-option v-for="(item,key) in selectData.maxTonnage" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="卸车吨位:" label-width="105px">
                  <el-row>
                    <el-col :span="11">
                      <el-select v-model="searchFilters.actual_quantity_start" filterable @change="startSearch" placeholder="最小吨位">
                        <el-option v-for="(item,key) in selectData.minTonnage" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="2" class="text-center">至</el-col>
                    <el-col :span="11">
                      <el-select v-model="searchFilters.actual_quantity_end" filterable @change="startSearch" placeholder="最大吨位">
                        <el-option v-for="(item,key) in selectData.maxTonnage" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <!-- <el-select v-model="searchFilters.is_matching" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.groupSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select> -->
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分组:" label-width="105px">
                  <el-select v-model="searchFilters.group" filterable @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.groupSelect" :key="key" :label="item.group_name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="路单审核:" label-width="105px">
                  <el-select v-model="searchFilters.audit" filterable @change="startSearch" placeholder="请选择">
                    <el-option v-for="(item,key) in selectData.waybillSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="operation-btn">
          <el-row>
            <el-col :span="18" class="total-data">
              一共{{summary.total}}单，装车吨位 {{summary.loading_quantity_sum}} 吨，卸车吨位 {{summary.actual_quantity}} 吨，标准里程 {{summary.stand_mile_sum}} 公里，实际里程 {{summary.total_actual_mile}} 公里
            </el-col>
            <el-col :span="6">
              <div class="text-right">
                <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportsDispatch'" :ids="ids"></export-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="table-list" v-loading="pageLoading">
          <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
            <el-table-column v-for="(item,key) in thTableList" :key="key" align="center" :label="item.title" :width="item.width">
              <template slot-scope="props">
                <el-tooltip class="item" effect="light" :open-delay="2000" :content="props.row[item.param]" placement="top-start" v-if="item.showHidden&&props.row[item.param]">
                  <el-row v-if="item.splitTip">
                    <el-col v-for="(someItem,someIndex) in props.row[item.param].split(item.splitTip)">{{someItem}}</el-col>
                  </el-row>
                  <span v-if="item.param === 'remark'" >
                    <span class="no-wrap">{{props.row.remark}}</span><i class="el-icon-edit ml-5 cursor-pointer" v-on:click="editMark(props.row)"></i>
                  </span>
                  <span v-if="item.dictionaries">{{item.dictionaries[props.row[item.param].key]}}</span>
                  <span v-if="!item.dictionaries&&!item.splitTip&&item.param !== 'remark'" v-bind:class="{whiteSpan:item.showHidden}">{{props.row[item.param]}}</span>
                </el-tooltip>
                <div v-else-if="item.isHover&&props.row[item.hoverParam].length">
                  <el-popover trigger="hover" placement="bottom">
                    <el-table :data="props.row[item.hoverParam]" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(hoverItem,i) in hoverThTableList" :key="i" :prop="hoverItem.param" align="center" :label="hoverItem.title" :width="140"></el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                      {{props.row[item.param]}}
                    </div>
                  </el-popover>
                </div>
                <div v-else>
                  <el-row v-if="item.splitTip">
                    <el-col v-for="(someItem,someIndex) in props.row[item.param].split(item.splitTip)">{{someItem}}</el-col>
                  </el-row>
                  <span v-if="item.dictionaries">{{item.dictionaries[props.row[item.param].key]}}</span>
                  <span v-if="item.param === 'remark'">
                    无<i class="el-icon-edit ml-5 cursor-pointer" v-on:click="editMark(props.row)"></i>
                  </span>
                  <span v-if="!item.dictionaries&&!item.splitTip&&item.param !== 'remark'" v-bind:class="{whiteSpan:item.showHidden}">{{props.row[item.param]}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" v-if="!scope.row.audit" size="mini" @click="auditOrder(scope.row)">审核</el-button>
                <el-button type="info" v-else size="mini" disabled>已审核</el-button>
              </template>
            </el-table-column>
          </el-table>
          <noData v-if="!pageLoading && tableData.length==0"></noData>
        </div>
        <div class="page-list text-center">
          <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="编辑备注" center :visible.sync="editMarkModalVisibel" width="40%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
      <editMark :deliveryOrderId="deliveryOrderId" :markText="markText" @close="editMarkModalVisibel= false" @successCallback="editSuccess"></editMark>
    </el-dialog>
  </div>
</template>
<script>
import noData from '@/components/common/noData';
import editMark from '@/components/statistics/editMark'
export default {
  name: 'carList',
  computed: {

  },
  activated: function() {
    this.activeName = 'carList';
  },

  components: {
    noData,
    editMark,
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },

      searchStatus: false,
      activeLoadTime: [],
      activeUnloadTime: [],
      activateEndTime: [],
      activeName: 'carList',
      searchPostData: {}, //搜索参数
      searchFilters: {
        keyword: '',
        field: 'plate_number',
        group: '',
        audit: '',
        loading_quantity_start: 0,
        loading_quantity_end: 30,
        actual_quantity_start: 0,
        actual_quantity_end: 30
      },
      selectData: {
        fieldSelect: [
          { id: 'plate_number', value: '车号' },
          { id: 'fluid', value: '液厂' },
          { id: 'station', value: '卸货地' }
        ],
        waybillSelect: [
          { id: '', value: '全部' },
          { id: 'True', value: '已审核' },
          { id: 'False', value: '未审核' }
        ],
        groupSelect: [],
        minTonnage: [],
        maxTonnage: [],
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
      thTableList: [{
        param: "plate_number",
        title: "车号",
        width: "100",
        id: 230,
      }, {
        param: "group",
        title: "车队",
        width: "100",
        id: 231,
      }, {
        param: "work_end_time",
        title: "装车日期",
        width: "160",
        showHidden: true,
        id: 232,
      }, {
        param: "activate_end_time",
        title: "卸车日期",
        width: "160",
        showHidden: true,
        id: 233,
      }, {
        param: "fluid",
        title: "液厂",
        width: "150",
        showHidden: true,
        id: 234,
      }, {
        param: "station",
        title: "卸货地",
        width: "160",
        splitTip: ",",
        showHidden: true,
        id: 235,
      }, {
        param: "loading_quantity",
        title: "装车吨位",
        width: "150",
        id: 236,
      }, {
        param: "actual_quantity",
        title: "卸车吨位",
        width: "150",
        id: 237,
      }, {
        param: "deficiency",
        title: "亏吨",
        width: "150",
        id: 238,
      }, {
        param: "plan_time",
        title: "计划到站时间",
        width: "160",
        showHidden: true,
        id: 239,
      }, {
        param: "activate_start",
        title: "实际到站时间",
        width: "160",
        showHidden: true,
        id: 240,
      }, {
        param: "activate_end",
        title: "实际离站时间",
        width: "160",
        showHidden: true,
        id: 241,
      }, {
        param: "remark",
        title: "备注",
        width: "150",
        showHidden: true,
        id: 242,
      }, {
        param: "stand_mile",
        title: "标准里程",
        width: "100",
        id: 243,
      }, {
        param: "actual_mile",
        title: "实际里程",
        width: "100",
        id: 244,
      }, {
        param: "high_cost",
        title: "高速费",
        width: "100",
        isHover: true,
        hoverParam: "high_cost_hover",
        id: 245,
      }, {
        param: "type",
        title: "运单类型",
        width: "100",
        dictionaries: { 'three': "承运单", "online": "贸易单" },
        id: 246,
      }, {
        param: "waybill",
        title: "所属运单",
        width: "160",
        id: 247,
      }, {
        param: "operation",
        title: "分管调度",
        width: "100",
        id: 248,
      }, ],
      tableData: [],
      total: "0",
      totalMile: "0",
      saveSendData: {},
      summary: {
        total: 0, //多少单
        stand_mile_sum: 0, //标准里程
        loading_quantity_sum: 0, //装车吨位
        actual_quantity: 0, //卸车吨位
        total_actual_mile: 0 //实际里程
      },


      editMarkModalVisibel: false,
      deliveryOrderId: '',
      markText: '',
      lockFalg: false,

      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },

      exportType: {
        type: 'dispatch',
        filename: '调度统计'
      },
      exportPostData: {},
      ids: [],


    }
  },
  methods: {
    editMark(row) {
      console.log('row', row);
      this.deliveryOrderId = row.id;
      this.markText = row.remark;
      console.log('markText', this.markText);
      this.editMarkModalVisibel = true;

    },
    editSuccess() {
      this.getList();
    },
    handleClick(targetName) {
      if (targetName.name == 'logistics') {
        this.$router.push({ path: "/statistics/business/logistics/logisticsList" });
      }
    },
    pageChange() {
      setTimeout(() => {
        this.searchStatus = true;

        this.getList();
      })
    },
    getGroups: function() {
      this.$$http('getGroups').then(results => {
        if (results.data.code === 0) {
          this.selectData.groupSelect = [{
            id: '',
            group_name: '全部'
          }];
          this.groupList = results.data.data.results;
          results.data.data.results.map((n, i) => {
            this.selectData.groupSelect.push(n);
          });
        }
      }).catch(error => {

      });
    },


    auditcheduling(row) {
      let postData = {
        id: row.id,
        audit: 'True'
      }
      this.$$http('auditcheduling', postData).then(results => {
        if (results.data.code === 0) {
          this.getList();
        }
      }).catch(error => {

      });
    },
    tonnageList(num) {
      for (let i = 0; i <= num; i++) {
        if (i !== 0) {
          this.selectData.maxTonnage.push({
            id: i,
            value: i
          })
        }
        if (i < num) {
          this.selectData.minTonnage.push({
            id: i,
            value: i
          })
        }
      }
      // console.log(this.selectData.minTonnage,this.selectData.maxTonnage)
    },
    auditOrder(row) {
      this.$confirm("是否确定审核？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.auditcheduling(row)
        // this.isDeletdStaff(row, isDeleted);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        });
      });
    },
    getList() {
      var sendData = {};
      sendData[this.searchPostData.field] = this.searchPostData.keyword;
      if (this.activeLoadTime instanceof Array && this.activeLoadTime.length > 0) {
        sendData.work_end_time_start = this.activeLoadTime[0];
        sendData.work_end_time_end = this.activeLoadTime[1]; //实际卸货
      }
      if (this.activeUnloadTime instanceof Array && this.activeUnloadTime.length > 0) {
        sendData.activate_end_time_start = this.activeUnloadTime[0]; //计划卸货
        sendData.activate_end_time_end = this.activeUnloadTime[1];
      }

      if (this.activateEndTime instanceof Array && this.activateEndTime.length > 0) {
        sendData.activate_end_start = this.activateEndTime[0]; //计划卸货
        sendData.activate_end_end = this.activateEndTime[1];
      }

      if (this.searchStatus) {
        sendData = this.saveSendData;
        sendData.page = this.pageData.currentPage;
      } else {
        this.saveSendData = sendData;
        this.pageData.currentPage = 1;
        sendData.page = this.pageData.currentPage;
      }
      sendData.loading_quantity_start = this.searchPostData.loading_quantity_start;
      sendData.loading_quantity_end = this.searchPostData.loading_quantity_end;
      sendData.actual_quantity_start = this.searchPostData.actual_quantity_start;
      sendData.actual_quantity_end = this.searchPostData.actual_quantity_end;
      sendData.audit = this.searchPostData.audit;
      sendData.group = this.searchPostData.group;

      sendData.pageSize = this.pageData.pageSize;
      this.pageLoading = true;
      sendData = this.pbFunc.fifterObjIsNull(sendData);
      this.exportPostData = sendData;
      delete this.exportPostData.pageSize;
      this.$$http("statisticDispatchList", sendData).then((results) => {
        this.pageLoading = false;
        this.searchStatus = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;
          this.pageData.totalCount = results.data.data.count;
          this.summary = {
            total: results.data.data && results.data.data.total_count, //多少单
            stand_mile_sum: results.data.data && results.data.data.stand_mile_sum, //标准里程
            loading_quantity_sum: results.data.data && results.data.data.loading_quantity_sum, //装车吨位
            actual_quantity: results.data.data && results.data.data.actual_quantity, //卸车吨位
            total_actual_mile: results.data.data && results.data.data.total_actual_mile, //实际里程
          }
        }
      }).catch(() => {
        this.pageLoading = false;
        //弹出失败
      });
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.searchFilters;
      console.log('searchFilters', this.searchFilters, this.searchPostData)
      if (this.searchPostData.loading_quantity_start >= this.searchPostData.loading_quantity_end) {
        this.$message({
          type: 'error',
          message: '装车吨位最大吨位不得小于或等于最小吨位'
        });
        return false;
      } else if (this.searchPostData.actual_quantity_start >= this.searchPostData.actual_quantity_end) {
        this.$message({
          type: 'error',
          message: '卸车吨位最大吨位不得小于或等于最小吨位'
        });
        return false;
      }
      this.getList();
    },
    // func(obj) {
    //   obj.a = 1
    //   console.log('test1',obj.a)
    //   obj = {}
    //   console.log('test2',obj)
    //   obj.a = 2
    //   console.log('test3',obj.a)
    // },
  },
  created() {
    this.ids = this.thTableList.map(item => item.id);
    this.tonnageList(30),
      this.getGroups();
    this.startSearch();
    // let test = {}
    // this.func(test)
    // console.log('xxxxx',test.a)

  }

}

</script>
