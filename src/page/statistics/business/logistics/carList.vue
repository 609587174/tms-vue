<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}
.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  line-height:18px;
}
/deep/ .total-data {
  line-height: 40px;
}
</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="物流数据" name="logistics">
   
    
    </el-tab-pane>
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
        </el-row>
      </el-form>
    </div>

    <div class="operation-btn">
      <el-row>
      <el-col :span="18" class="total-data">
          一共{{total}}单，总里程 {{totalMile}} 公里
        </el-col>
        <!-- <el-col :span="6" class="text-right" >
          <el-button type="primary" plain>导出</el-button>
        </el-col> -->
      </el-row>
    </div>
    <div class="table-list" v-loading="pageLoading" >
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
          <el-table-column v-for="(item,key) in thTableList" :key="key"  align="center" :label="item.title" :width="item.width">
            <template slot-scope="props">
              <el-tooltip class="item" effect="light" :open-delay="2000" :content="props.row[item.param]" placement="top-start" v-if="item.showHidden&&props.row[item.param]">
               <el-row v-if="item.splitTip">
                <el-col v-for="(someItem,someIndex) in props.row[item.param].split(item.splitTip)">{{someItem}}</el-col>
               </el-row>
               <span v-if="item.dictionaries">{{item.dictionaries[props.row[item.param].key]}}</span>
               <span v-if="!item.dictionaries&&!item.splitTip" v-bind:class="{whiteSpan:item.showHidden}">{{props.row[item.param]}}</span>
              </el-tooltip>
              <div v-else>
              <el-row v-if="item.splitTip">
                <el-col v-for="(someItem,someIndex) in props.row[item.param].split(item.splitTip)">{{someItem}}</el-col>
               </el-row>
               <span v-if="item.dictionaries">{{item.dictionaries[props.row[item.param].key]}}</span>
               <span v-if="!item.dictionaries&&!item.splitTip" v-bind:class="{whiteSpan:item.showHidden}">{{props.row[item.param]}}</span>
             </div>
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
  </div>
</template>
<script>
import noData from '@/components/common/noData';
export default {
  name: 'carList',
  computed: {

  },
  activated: function() {
    this.activeName = 'carList';
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

      searchStatus: false,
      activeLoadTime:[],
      activeUnloadTime:[],
      activeName: 'carList',
      searchFilters: {
        keyword: '',
        field: 'plate_number',
      },
      selectData: {
        fieldSelect: [
          { id: 'plate_number', value: '车号' }
        ]
      },
      thTableList: [
          {param:"plate_number",title:"车号",width:"100"},
          {param:"work_end_time",title:"装车日期",width:"160",showHidden:true},
          {param:"activate_end_time",title:"卸车日期",width:"160",showHidden:true},
          {param:"fluid",title:"实际液厂",width:"150",showHidden:true},
          {param:"station",title:"卸货地",width:"160",splitTip:",",showHidden:true},
          {param:"loading_quantity",title:"装车吨位",width:"150"},
          {param:"actual_quantity",title:"卸车吨位",width:"150"},
          {param:"deficiency",title:"亏吨",width:"150"},
          {param:"plan_time",title:"计划装车时间",width:"160",showHidden:true},
          {param:"activate_start",title:"实际到厂时间",width:"160",showHidden:true},
          {param:"activate_end",title:"实际离站时间",width:"160",showHidden:true},
          {param:"remark",title:"备注",width:"150",showHidden:true},
          {param:"stand_mile",title:"标准里程",width:"100"},
          {param:"actual_mile",title:"实际里程",width:"100"},
          {param:"type",title:"运单类型",width:"100",dictionaries:{'three':"承运单","online":"贸易单"}},
          {param:"waybill",title:"所属运单",width:"160"},
          {param:"operation",title:"分管调度",width:"100"},
      ],
      tableData: [],
      total:"0",
      totalMile:"0",
      saveSendData:{}
    }
  },
  methods: {
    handleClick(targetName){
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
    getList(){
      var sendData={};
      sendData[this.searchFilters.field] = this.searchFilters.keyword;
      if (this.activeLoadTime instanceof Array && this.activeLoadTime.length > 0) {
        sendData.work_end_time_start = this.activeLoadTime[0];
        sendData.work_end_time_end = this.activeLoadTime[1]; //实际卸货
      }
      if (this.activeUnloadTime instanceof Array && this.activeUnloadTime.length > 0) {
        sendData.activate_end_time_start = this.activeUnloadTime[0]; //计划卸货
        sendData.activate_end_time_end = this.activeUnloadTime[1];
      }
      if (this.searchStatus) {
        sendData = this.saveSendData;
        sendData.page = this.pageData.currentPage;
      } else {
        this.saveSendData = sendData;
        this.pageData.currentPage = 1;
        sendData.page = this.pageData.currentPage;
      }
      sendData.pageSize = this.pageData.pageSize;
      this.pageLoading=true;
      this.$$http("statisticDispatchList", sendData).then((results) => {
        this.pageLoading=false;
        this.searchStatus=false;
        if(results.data&&results.data.code==0){
          this.tableData=results.data.data.results;
          this.pageData.totalCount = results.data.data.count;
          this.total=results.data&&results.data.data.total_count;
          this.totalMile=results.data&&results.data.data.total_actual_mile;
        }
      }).catch(()=>{
        this.pageLoading=false;
        //弹出失败
      });
    },
    startSearch(){
      this.getList();
    },
  },
  created() {
    this.getList();

  }

}

</script>
