<style scoped lang="less">
@deep: ~'>>>';
el-tabs__nav @{deep} .el-tabs__item {
  margin-left: 15px;
}

.seachHeadCarListFrom {
  margin-top: 30px;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}

.operation-button {
  margin-top: 30px;
}

.headList {
  border: 1px solid rgb(222, 222, 222);
  margin-top: 10px;
}

.el-table table {
  thead {
    background-color: rgb(242, 245, 254);
    th {
      text-align: center;
    }
  }
}

</style>
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="clicktabs" type="border-card">
      <el-tab-pane label="牵引车管理" name="first">
        <el-form class="seachHeadCarListFrom" ref="seachHeadCarListFrom" :model="seachListParam" :rules="rules" label-position="'left'" label-width="80px">
          <el-row>
            <el-col :span="5">
              <el-form-item label="挂车牌:">
                <el-input :autofocus="true" placeholder="请输入车牌号" type="text" v-model="seachListParam.plate_number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item label="车架号:">
                <el-input placeholder="请输入车架号" type="text" v-model="seachListParam.vin_number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item label="车辆所属:">
                <el-select v-model="seachListParam.vehicle_type" placeholder="请选择车辆类型">
                  <el-option v-for="(item,key) in selectData.vehicle_type_Select" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-form-item label="品牌型号:">
                <el-select v-model="seachListParam.brand" placeholder="请选择车辆类型">
                  <el-option v-for="(item,key) in selectData.brand_Select" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="primary" @click="searchList">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="挂车管理" name="second">
      </el-tab-pane>
    </el-tabs>
    <el-row class="operation-button">
      <el-col :offset="20" :span="4">
        <el-button type="primary" @click="importList">导入</el-button>
        <el-button type="primary" @click="exportList">导出</el-button>
        <el-button type="primary" @click="addHeadCarPage">新增</el-button>
      </el-col>
    </el-row>
    <div style="background-color:white" class="headList">
      <el-table stripe :data="tableData" v-loading="pageLoading" style="width: 100%;marigin-top:20px;">
        <el-table-column prop="plate_number" label="牵引车车牌号">
        </el-table-column>
        <el-table-column prop="vin_number" label="车架号">
        </el-table-column>
        <el-table-column prop="attributes.verbose" label="车辆归属">
        </el-table-column>
        <el-table-column prop="carrier.name" label="车辆所属">
        </el-table-column>
        <el-table-column prop="vehicle_type.verbose" label="车辆类型">
        </el-table-column>
        <el-table-column prop="brand" label="品牌型号">
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button @click="jumpPage(scope.row,'show')" type="text" size="small">查看</el-button>
            <el-button @click="jumpPage(scope.row,'edit')" type="text" size="small">编辑</el-button>
            <el-button @click="jumpPage(scope.row,'operation')" type="text" size="small">操作日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:30%;margin-top:15px;margin-left:35%;">
        <el-pagination layout="prev, pager, next" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'carHeadManage',
  data() {
    return {
      seachListParam: {
        plate_number: '',
        vin_number: '',
        vehicle_type: '',
        brand: '',
        page: 1
      },
      rules: {},
      activeName: 'first',
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 100,
        pageSize: 10,
      },
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type
      },
      tableData: [],
    }
  },

  methods: {
    addHeadCarPage: function() {
      this.$router.push({ path: "/transportPowerManage/carManage/addEditCarHeadManage" });
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: "/transportPowerManage/carManage/carTailManage" });
      }
    },
    importList: function() {

    },
    exportList: function() {

    },
    searchList: function() {
      var vm = this;
      this.$$http('searchHeadCarList', this.seachListParam).then(function(result) {
        var resultData;
        if (result.data.code == 0) {
          vm.tableData = result.data.data.results;
          vm.pageLoading = false;
        }
      }).catch(function(error) {
        vm.pageLoading = false;
      });
    },
    jumpPage: function(scope, type) {
      if (type = "edit") {

      } else if (type = "show") {

      } else if (type = "operation") {

      }
    },
    pageChange: function() {
      setTimeout(() => {
        console.log('currentPage', this.pageData.currentPage);
      })

    }
  },
  mounted: function() {
    this.searchList();
  }
}

</script>
