<style type="text/css" scoped lang="less">
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
        <el-col :span="6" class="text-right">
          <el-button type="primary" plain>导出</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-list" v-loading="pageLoading" >
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
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
      activeLoadTime:[],
      activeUnloadTime:[],
      exportType: {
        type: 'logistic',
        filename: '物流费用统计'
      },
      activeName: 'logistics',
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
          {param:"",title:"车号",width:""},
          {param:"",title:"装车日期",width:""},
          {param:"",title:"卸车日期",width:""},
          {param:"",title:"液厂",width:""},
          {param:"",title:"卸货地",width:"",splitTip:","},
          {param:"",title:"装车吨位",width:""},
          {param:"",title:"卸车吨位",width:""},
          {param:"",title:"亏吨",width:""},
          {param:"",title:"计划到站时间",width:""},
          {param:"",title:"实际到站时间",width:""},
          {param:"",title:"实际离站时间",width:""},
          {param:"",title:"待时",width:""},
          {param:"",title:"备注",width:""},
          {param:"",title:"标准里程",width:""},
          {param:"",title:"实际里程",width:""},
          {param:"",title:"运单类型",width:""},
          {param:"",title:"所属运单",width:"",splitTip:","},
          {param:"",title:"分管调度",width:""},
      ],
      tableData: {},
   
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
        this.getList();
      })
    },
    getList(){

    },
    startSearch(){

    },
  },
  created() {
    this.getList();

  }

}

</script>
