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
                  <el-option v-for="(item,key) in selectData.vehicle_type_Select" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-form-item label="品牌型号:">
                <el-select v-model="seachListParam.brand" placeholder="请选择车辆类型">
                  <el-option v-for="(item,key) in selectData.brand_Select" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="primary">搜索</el-button>
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
      <el-table border :data="tableData" v-loading="pageLoading" style="width: 100%;marigin-top:20px;">
        <el-table-column prop="plate_number" label="牵引车车牌号">
        </el-table-column>
        <el-table-column prop="vin_number" label="车架号">
        </el-table-column>
        <el-table-column prop="attributes" label="车辆归属">
        </el-table-column>
        <el-table-column prop="carrier" label="车辆所属">
        </el-table-column>
        <el-table-column prop="vehicle_type" label="车辆类型">
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
        brand: ''
      },
      rules: {},
      activeName: 'first',
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 100,
        pageSize: 10,
      },
      tableData: [{
        id: "123",
        plate_number: '鲁FM2350',
        vin_number: "LZZPCLSB3GJ076323",
        attributes: "自有车辆",
        carrier: "龙口市胜通能源有限公司",
        vehicle_type: "重型半挂牵引车",
        brand: "豪瀚ZZ4255N3246D1",
      }, {
        id: "123",
        plate_number: '鲁FM2350',
        vin_number: "LZZPCLSB3GJ076323",
        attributes: "自有车辆",
        carrier: "龙口市胜通能源有限公司",
        vehicle_type: "重型半挂牵引车",
        brand: "豪瀚ZZ4255N3246D1",
      }],
      selectData: {
        vehicle_type_Select: [
          { id: "1", value: "自营车辆" },
          { id: "2", value: "三方车辆" },
          { id: "3", value: "租凭车辆" }
        ],
        brand_Select: [
          { id: "1", value: "重型半挂牵引车" },
          { id: "2", value: "轻型半挂牵引车" }
        ],
      }
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
    setTimeout(() => {
      this.pageLoading = false;
    }, 2000)
  }
}

</script>
