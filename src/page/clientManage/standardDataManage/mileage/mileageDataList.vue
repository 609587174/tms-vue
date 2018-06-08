<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="运费约定" name="freight">
        </el-tab-pane>
        <el-tab-pane label="标准里程" name="mileage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="30">
                <el-col :span="6">
                  <el-form-item label="托运方:">
                    <el-select v-model="searchFilters.carriers" @change="startSearch" clearable :loading="shipperLoading" filterable placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.shipperSelect" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="液厂:">
                    <el-select v-model="searchFilters.fluid" :loading="fluidLoading" clearable filterable @change="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.liquidSelect" :key="key" :label="item.fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="站点:">
                    <el-select v-model="searchFilters.station" :loading="siteLoading" clearable filterable @change="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.fluidSiteSelect" :key="key" :label="item.position_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button>
            <el-button type="primary">导出</el-button> -->
            <!-- <el-button type="success" @click="editMile">新增</el-button> -->
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                <!-- <template slot-scope="scope">
                  <div v-if="item.param_two">{{scope.row[item.param][item.param_two]}}</div>
                  <div v-else>
                    <span v-if="item.param==='carriers'">
                      <span v-for="(row,key) in scope.row.carriers" class="text-blue">{{row.carrier_name}}<br></span>

                    </span>
                    <span v-else>{{scope.row[item.param]}}</span>

                  </div>
                </template> -->
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mileageDataList',
  computed: {
    employmentTypeSelect: function() {
      console.log('this.$store.getters.getIncludeAllSelect', this.$store.state.common.selectData.carrier_driver_work_type);
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      pageLoading: false,
      siteLoading:false,
      fluidLoading:false,
      shipperLoading:false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'mileage',
      searchFilters: {
        fluid: '',
        station: '',
        carriers: '',
        field: '',
      },
      selectData: {
        shipperSelect: [], //承运商
        liquidSelect: [], //液厂
        fluidSiteSelect: [], //站点
      },
      thTableList: [{
        title: '液厂',
        param: 'fluid_factory.fluid_name',
        width: ''
      }, {
        title: '站点',
        param: 'fluid_site.position_name',
        width: ''
      }, {
        title: '标准里程',
        param: 'standard_mileage',
        width: ''
      }, {
        title: '生效托运方',
        param: 'traders.name',
        width: '200'
      }, {
        title: '添加时间',
        param: 'created_at',
        width: ''
      }],
      tableData: []
    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        fluid_factory: this.searchFilters.fluid,
        fluid_site: this.searchFilters.station,
        trader: this.searchFilters.carriers
      };
      postData = this.pbFunc.fifterObjIsNull(postData);

      // postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getStandardMileList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          this.pageData.totalCount = results.data.data.count;

          console.log('this.tableData', this.tableData, this.pageData.totalCount);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    getShipperList: function() {
      let postData = {
        // need_all: true
      };
      this.shipperLoading = true;
      this.$$http('getShipperList', postData).then((results) => {
        console.log('results', results.data.data);
        this.shipperLoading = false;
        if (results.data && results.data.code == 0) {
          this.selectData.shipperSelect = this.selectData.shipperSelect.concat(results.data.data);
        }
      }).catch((err) => {
        this.shipperLoading = false;
      })

    },
    getFluidList: function() {
      let postData = {
        // page: 1,
        // page_size: 500,
      }
      this.fluidLoading = true;
      this.$$http('getFulid', postData).then((results) => {
        this.fluidLoading = false;
        if (results.data && results.data.code == 0) {
          this.selectData.liquidSelect = this.selectData.liquidSelect.concat(results.data.data);
        }
      }).catch((err) => {
        this.fluidLoading = false;
      })
    },
    getSiteList: function(query) {
      let postData = {
        // page: 1,
        // page_size: 500,
      }
      this.siteLoading = true;
      this.$$http('getSiteList', postData).then((results) => {
        this.siteLoading = false;
        if (results.data && results.data.code == 0) {
          // this.fluidSiteSelect = results.data.data;
          this.selectData.fluidSiteSelect = this.selectData.fluidSiteSelect.concat(results.data.data);
        }
      }).catch((err) => {
        this.siteLoading = false;
      })
    },
    handleClick: function(tab, event) {
      if (tab.name === 'freight') {
        this.$router.push({ path: "/clientManage/standardDataManage/freight/freightDataList" });
      }
    },
    handleMenuClick: function(command) {
      this.$router.push({ path: "/clientManage/standardDataManage/mileage/mileageDetail", query: { id: command.id } });
    },
    editMile(isEdit){
      // if(isEdit){

      // }else{
        // this.$router.push({ path: "/serviceManage/standardDataManage/editMileage" });
      // }

    },
    pageChange: function() {
      setTimeout(() => {
        console.log('currentPage', this.pageData.currentPage);
        this.getList();
      })
    }
  },
  activated() {
    this.activeName = 'mileage'
  },
  created: function() {
    this.getList();
    this.getShipperList();
    this.getFluidList();
    this.getSiteList();
  }
}

</script>
