<style lang="less">
.capacity-list {
  .capacity-list-header {
    padding: 10px 20px;
    border: 1px solid #e4e7ed;
    background: #fff;
    .search-filters-form {
      .el-row {
        margin-top: 10px;
      }
    }
    .input-with-select {
      .el-input-group__prepend {
        background-color: #fff;
      }
      .el-select .el-input {
        width: 180px;
      }
    }
  }
  .capacity-list-content {
  }
}
</style>
<template>
  <div class="capacity-list">
    <div class="capacity-list-header">
      <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom" :rules="rules" label-position="left">
        <el-row :gutter="0">
          <el-col :span="12">
            <el-input placeholder="请输入内容" size="mini" v-model="filterParam.keyword" class="input-with-select">
              <el-select v-model="filterParam.field" size="mini" slot="prepend" placeholder="请选择">
                <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="完善状态:" size="mini">
              <el-select v-model="filterParam.completeStatus" placeholder="请选择">
                <el-option
                  v-for="item in selectData.completeStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="挂车绑定状态:" size="mini" label-width="100px">
              <el-select v-model="filterParam.truckBindStatus" placeholder="请选择">
                <el-option
                  v-for="item in selectData.truckBindStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="人员绑定状态:" size="mini" label-width="100px">
              <el-select v-model="filterParam.staffBindStatus" placeholder="请选择">
                <el-option
                  v-for="item in selectData.staffBindStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分组:" size="mini" label-width="50px">
              <el-select v-model="filterParam.group" placeholder="请选择">
                <el-option
                  v-for="item in selectData.groupOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operation-btn text-right">
      <el-button type="primary" @click="importList">导入</el-button>
      <el-button type="primary" @click="exportList">导出</el-button>
      <el-button type="primary" @click="addHeadCarPage">分组设置</el-button>
    </div>
    <div class="capacity-list-content">
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="jumpPage({operator:'show',rowData:scope.row})">查看</el-button>
              <el-dropdown trigger="click" @command="jumpPage">
                <span class="el-dropdown-link">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{operator:'show',rowData:scope.row}">查看</el-dropdown-item>
                  <el-dropdown-item :command="{operator:'operation',rowData:scope.row}">操作日志</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "capacityList",
  data() {
    return {
      filterParam: {
        keyword: "",
        field: "",
        completeStatus: 0,
        truckBindStatus: 0,
        staffBindStatus: 0,
        group: 0
      },
      seachListParam: {
        tractor_plate_number: '',
        semitrailer_plate_number: '',
        car_belong_phone: '',
        complete_status: '',
        truck_bind_status: '',
        staff_bind_status: '',
        group: '',
        driver_staff_name: '',
        page: 1
      },
      rules: {},
      activeName: "first",
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10
      },
      thTableList: [
        {
          title: "牵引车车牌号",
          param: "tractor.plate_number",
          width: ""
        },
        {
          title: "当前绑定挂车",
          param: "semitrailer.plate_number",
          width: ""
        },
        {
          title: "随车电话",
          param: "car_belong_phone",
          width: ""
        },
        {
          title: "车辆所属",
          param: "tractor.attributes.verbose",
          width: ""
        },
        {
          title: "分组",
          param: "group.group_name"
        },
        {
          title: "主驾驶",
          param: "master_driver.name",
          width: ""
        },
        {
          title: "副驾驶",
          param: "vice_driver.name",
          width: ""
        },
        {
          title: "押运员",
          param: "escort_staff.name",
          width: ""
        },
        {
          title: "挂车绑定状态",
          param: "truck_bind_status",
          width: ""
        },
        {
          title: "人员绑定状态",
          param: "staff_bind_status",
          width: ""
        },
        {
          title: "完善状态",
          param: "complete_status",
          width: ""
        }
      ],
      selectData: {
        fieldSelect: [
          { id: "tractor_plate_number", value: "牵引车号" },
          { id: "semitrailer_plate_number", value: "挂车号" },
          { id: "driver_staff_name", value: "人员" },
          { id: "car_belong_phone", value: "号码" }
        ],
        completeStatusOptions: [
          {
            value: 0,
            label: "全部"
          },
          {
            value: true,
            label: "已完善"
          },
          {
            value: false,
            label: "未完善"
          }
        ],
        truckBindStatusOptions: [
          {
            value: 0,
            label: "全部"
          },
          {
            value: true,
            label: "未绑定"
          },
          {
            value: false,
            label: "已绑定"
          }
        ],
        staffBindStatusOptions: [
          {
            value: 0,
            label: "全部"
          },
          {
            value: true,
            label: "未绑定"
          },
          {
            value: false,
            label: "已绑定"
          }
        ],
        groupOptions: [
          {
            value: 0,
            label: "全部"
          }
        ],
      },
      tableData: []
    };
  },

  methods: {
    addHeadCarPage: function() {
      this.$router.push({
        path: "/transportPowerManage/carManage/addEditCarHeadManage"
      });
    },
    clicktabs: function(targetName) {
      if (targetName.name == "second") {
        this.$router.push({
          path: "/transportPowerManage/carManage/carTailManage"
        });
      }
    },
    importList: function() {},
    exportList: function() {},
    searchList: function() {
      var vm = this;
      if (this.seachListParam[this.filterParam.field]) {
        this.seachListParam[this.filterParam.field] = this.filterParam.keyword;
      }
      this.$$http("searchCapacityList", this.seachListParam)
        .then(function(result) {
          var resultData;
          if (result.data.code == 0) {
            vm.tableData = result.data.data.results;
            vm.pageData.totalPage = Math.ceil(
              result.data.count / vm.pageData.pageSize
            );
            vm.pageLoading = false;
          }
        })
        .catch(function(error) {
          vm.pageLoading = false;
        });
    },
    jumpPage: function(scope) {
      if (scope.operator == "edit") {
      } else if (scope.operator == "show") {
        this.$router.push({
          path:
            "/transportPowerManage/carManage/showCarHeadManage?headId=" +
            scope.rowData.id
        });
      } else if (scope.operator == "operation") {
      }
    },
    pageChange: function() {
      this.seachListParam.page = this.pageData.currentPage;
      this.searchList();
    }
  },
  activated: function() {
    this.activeName = "first";
  },
  mounted: function() {
    this.searchList();
  }
};
</script>
