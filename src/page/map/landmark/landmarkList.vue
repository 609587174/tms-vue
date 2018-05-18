<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="列表" name="first">
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
                <el-col :span="4">
                  <el-form-item label="审核状态:">
                    <el-select v-model="searchFilters.checkStatus" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.checkStatusSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="地标来源:">
                    <el-select v-model="searchFilters.landmarkFrom" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.landmarkFromSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="是否同步:">
                    <el-select v-model="searchFilters.isSynchronize" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.isSynchronizeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <el-button type="primary" plain>导入</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="success">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" border stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图" name="second">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'landMarkList',
  computed: {

  },
  data() {
    return {
      pageData: {
        currentPage: 1,
        totalPage: '',
        pageSize: 10,
      },
      pageLoading: false,
      activeName: 'first',
      selectData: {
        fieldSelect: [{
          value: '卸货站',
          id: '1'
        }, {
          value: '气源液厂',
          id: '2'
        }, {
          value: '加油站',
          id: '3'
        }, {
          value: '加气站',
          id: '4'
        }, {
          value: '停车场',
          id: '5'
        }],
        checkStatusSelect: [{
          value: '全部',
          id: ''
        }, {
          value: '待审核',
          id: '2'
        }, {
          value: '审核通过',
          id: '3'
        }, {
          value: '审核失败',
          id: '4'
        }],
        isSynchronizeSelect: [{
          value: '全部',
          id: ''
        }, {
          value: '已同步',
          id: true
        }, {
          value: '未同步',
          id: false
        }],
        landmarkFromSelect: [{
          value: '全部',
          id: ''
        }, {
          value: '轨迹停留点',
          id: '2'
        }, {
          value: '司机端上传',
          id: '3'
        }]



      },
      searchFilters: {
        keyword: '',
        field: '1',
        checkStatus: '',
        isSynchronize: '',
      }
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: '/mapManage/landMark/landMarkMap' });
      }
    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        work_type: this.searchFilters.checkStatus,
        driver_bind_status: this.searchFilters.isBind,
      };

      postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getDriversList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          this.pageData.totalPage = Math.ceil(parseInt(results.data.data.count) / this.pageData.pageSize);

          console.log('this.tableData', this.tableData, this.pageData.totalPage);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
  },
  activated: function() {
    this.activeName = 'first';
  },
}

</script>
