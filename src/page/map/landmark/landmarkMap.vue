<style scoped lang="less">
#map-container {
  width: 100%;
  height: 600px;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="列表" name="first">
        </el-tab-pane>
        <el-tab-pane label="地图" name="second">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.position_type" slot="prepend" placeholder="请选择">
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
                      <el-option v-for="(item,key) in selectData.checkStatusSelect" :key="key" :label="item.value" :value="item.id"></el-option>
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
                    <el-select v-model="searchFilters.is_active" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.isSynchronizeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div id="map-container"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
console.log('AMap', AMap);
//创建地图
let landmarkMap;
export default {
  name: 'landMarkMap',
  computed: {

  },
  data() {
    return {
      activeName: 'second',
      searchFilters: {
        keyword: '',
        position_type: '1',
        checkStatus: '',
        is_active: '',
      },
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
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: '/mapManage/landmark/landmarkList' });
      }
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        //position_name: this.searchFilters.keyword,
        //position_type: this.searchFilters.position_type,
        //is_active: this.searchFilters.is_active
      };

      //postData[this.searchFilters.field] = this.searchFilters.keyword;

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
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
  },
  mounted: function() {
    landmarkMap = new AMap.Map('map-container', {
      zoom: 5
    });
  },
  activated: function() {
    this.activeName = 'second';
  },

}

</script>
