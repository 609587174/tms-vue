<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="油气费管理" name="energy">
        </el-tab-pane>
        <el-tab-pane label="高速费管理" name="tollfee">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in fieldSelect" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                  </el-input>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <el-button type="success" @click="addList">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tollfeeManageList',
  computed: {},
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'tollfee',
      searchFilters: {
        field: 'name',
        keyword: '',
      },
      fieldSelect: [{
        label: '高速公司名称',
        value: 'name'
      }],
      thTableList: [{
        title: '高速公司名称',
        param: 'name'
      }, {
        title: '类型',
        param: 'type.key',
      }, {
        title: '联系人',
        param: 'contact_name',
      }, {
        title: '联系电话',
        param: 'contact_phone',
      }, {
        title: '地址',
        param: 'detail_address',
      }, {
        title: '添加时间',
        param: 'created_at',
      }],
      tableData: [],
      postDataCopy: {},
      pageLoading: true,

    }
  },
  methods: {
    getList(postData) {
      this.pageLoading = true;
      this.$$http('highSpeedList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    startSearch() {
      this.pageData.currentPage = 1;

      const postData = {
        page: this.pageData.currentPage,
      };
      postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.postDataCopy = Object.assign({}, postData);

      this.getList(this.postDataCopy);

    },
    handleClick() {
      this.$router.push({ path: '/clientManage/supplierManage/energyManageList' });
    },
    pageChange() {
      setTimeout(() => {
        this.postDataCopy.page = this.pageData.currentPage;
        this.getList(this.postDataCopy);
      })
    },
    addList() {
      this.$router.push({ path: '/clientManage/supplierManage/tollfeeManageChange' });
    },
    handleMenuClick(row) {
      console.log('row', row);
      if (row.operator === 'check') {
        this.$router.push({
          path: '/clientManage/supplierManage/tollfeeManageList/tollfeeManageDetalis',
          param: {
            id: row.id
          }
        });
      }
    }
  },

  created: function() {
    this.startSearch();
  }
}

</script>
<style scoped lang="less">


</style>
