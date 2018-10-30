<template>
  <div>
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
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="完善状态:">
                <el-select v-model="searchFilters.complete_status" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.perfectSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" plain>导入</el-button> -->
        <!-- <el-button type="primary">导出</el-button> -->
        <el-button type="success" @click="goEditDetail">新增</el-button>
      </div>
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
          </el-table-column>
          <el-table-column label="完善状态" align="center" width="140">
            <template slot-scope="scope">
              <div>{{scope.row.complete_status?'已完善':'未完善'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleMenuClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <noData v-if="!pageLoading && tableData.length==0"></noData>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'threePartyCapacityList',
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
      searchPostData: {}, //搜索参数
      searchFilters: {
        complete_status: '',
        keyword: '',
        field: 'tractor_plate_number',
      },
      selectData: {
        perfectSelect: [
          { id: false, value: '未完善' },
          { id: true, value: '已完善' }
        ],
        fieldSelect: [
          { id: 'tractor_plate_number', value: '牵引车号' },
          { id: 'semitrailer_plate_number', value: '挂车号' },
          { id: 'driver_staff_name', value: '人员' },
          { id: 'car_belong_phone', value: '号码' },
        ]
      },
      thTableList: [{
        title: '牵引车号',
        param: 'tractor.plate_number',
        width: ''
      }, {
        title: '当前绑定挂车号',
        param: 'semitrailer.plate_number',
        width: ''
      }, {
        title: '车辆所属',
        param: 'tractor.carrier.name',
        width: ''
      }, {
        title: '主驾驶',
        param: 'master_driver.name',
        width: ''
      }, {
        title: '主驾身份证号',
        param: 'master_driver.id_number',
        width: '180'
      }, {
        title: '主驾电话号码',
        param: 'master_driver.mobile_phone',
        width: ''
      }, {
        title: '副驾驶',
        param: 'vice_driver.name',
        width: ''
      }, {
        title: '押运员',
        param: 'escort_staff.name',
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
    goEditDetail() {
      // this.$router.push({ path: '/basicDataManage/supplierManage/carrierManage/editCarrier' });
      window.open(`#/basicDataManage/threePartyCapacity/editThreePartyCapacity`, '_blank')
    },
    handleClick: function(tab, event) {

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
        own_capacity: true,
        complete_status: this.searchPostData.complete_status
      };
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getThreePartyCapacityList', postData).then((results) => {

        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    handleMenuClick(row) {
      // this.$router.push({ path: '/basicDataManage/carrierManage/carrierDetail', query: { id: row.id } });
      window.open(`#/basicDataManage/threePartyCapacity/threePartyCapacityDetail/${row.id}/`, '_blank')

    }
  },
  created() {
    this.getList();
  }

}

</script>
<style>


</style>
