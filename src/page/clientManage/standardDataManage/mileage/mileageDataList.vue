<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="运费约定" name="freight">
        </el-tab-pane>
        <el-tab-pane label="标准里程" name="mileage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="托运方:">
                    <el-select v-model="searchFilters.carriers" :loading="shipperLoading" clearable filterable @change="searchTrader" :remote-method="searchTrader" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.shipperSelect" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="实际液厂:">
                    <el-select v-model="searchFilters.fluid" :loading="fluidLoading" clearable filterable @change="startSearch" :remote-method="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.liquidSelect" :key="item.id" :label="item.fluid_name" :value="item.id">
                        <span>{{ item.fluid_name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.customer_info">{{ item.customer_info.name }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="站点:">
                    <el-select v-model="searchFilters.station" :loading="siteLoading" filterable remote clearable @change="startSearch" :remote-method="getSiteList" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.fluidSiteSelect" :key="key" :label="item.position_name" :value="item.id"></el-option>
                    </el-select>
                    <!-- <el-select v-model="searchFilters.station" :loading="siteLoading" clearable filterable @change="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.fluidSiteSelect" :key="key" :label="item.position_name" :value="item.id"></el-option>
                    </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button>
            <el-button type="primary">导出</el-button> -->
            <el-button type="success" @click="editMile">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title"></el-table-column>
              <el-table-column align="center" :label="'生效托运方'">
                <template slot-scope="scope">
                  <div v-if="scope.row.customer_staffs&&scope.row.customer_staffs.length" :title="scope.row.fluidListStr">
                    <span v-for="(row,key) in scope.row.customer_staffs" class="text-blue"><span v-if="key<5">{{row.carrier_name}}<br></span>
                    </span>
                  </div>
                  <div v-else><span class="text-blue">{{scope.row.traders.name}}</span></div>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="'添加时间'">
                <template slot-scope="scope">
                  {{scope.row.created_at}}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
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
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      pageLoading: false,
      siteLoading: false,
      fluidLoading: false,
      shipperLoading: false,
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
        title: '实际液厂',
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
      }],
      tableData: [],
      shipperObj: ''
    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    searchTrader(shipperId) {
      for (let i in this.selectData.shipperSelect) {
        if (this.selectData.shipperSelect[i].id === shipperId) {
          this.shipperObj = this.selectData.shipperSelect[i];
        }
      }
      if (!shipperId) {
        this.shipperObj = '';
      }
      this.startSearch();
    },
    getList: function(shipper) {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        fluid_factory: this.searchFilters.fluid,
        fluid_site: this.searchFilters.station,
        // trader: this.searchFilters.carriers
      };
      if (this.shipperObj) {
        if (this.shipperObj.source_type === 'ONLINE_TRADER') {
          postData.trader = this.shipperObj.id;
        } else if (this.shipperObj.source_type === 'OFFLINE_TRADER') {
          postData.customer_staff_id = this.shipperObj.id;
        }
      }
      postData = this.pbFunc.fifterObjIsNull(postData);

      // postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getStandardMileList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          for (let i in this.tableData) {
            this.tableData[i].fluidListStr = '';
            for (let j in this.tableData[i].customer_staffs) {
              this.tableData[i].fluidListStr += this.tableData[i].customer_staffs[j].carrier_name + (j < this.tableData[i].customer_staffs.length - 1 ? '，' : '');
            }
          }
          this.pageData.totalCount = results.data.data.count;
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
    getSiteList: function(site) {
      let postData = {
        page: 1,
        page_size: 100,
      }
      this.siteLoading = true;
      if (site) {
        postData.position_name = site;
      }
      this.$$http('getSiteList', postData).then((results) => {
        this.siteLoading = false;
        if (results.data && results.data.code == 0) {
          this.selectData.fluidSiteSelect = results.data.data;
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
      window.open(`#/clientManage/standardDataManage/mileage/mileageDetail?id=${command.id}`, '_blank')
      //this.$router.push({ path: "/clientManage/standardDataManage/mileage/mileageDetail", query: { id: command.id } });
    },
    editMile() {
      //this.$router.push({ path: "/clientManage/standardDataManage/mileage/editMileage" });
      window.open(`#/clientManage/standardDataManage/mileage/editMileage`, '_blank')
    },
    pageChange: function() {
      setTimeout(() => {
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
