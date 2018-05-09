<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="人员管理" name="userManage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" ref="searchFiltersFormSetp" :model="searchFiltersForm" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" size="mini" v-model="searchFiltersForm.search" class="search-filters-screen">
                    <el-select size="mini" v-model="searchFiltersForm.screen" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.screenSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                  <!-- <el-row :gutter="0">
                    <el-col :md="3">
                      <el-select v-model="searchFiltersForm.screen" placeholder="请选择">
                        <el-option v-for="(item,key) in selectData.screenSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :md="10">
                      <el-input :autofocus="true" placeholder="请输入" type="text" v-model="searchFiltersForm.search"></el-input>
                    </el-col>
                  </el-row> -->
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item size="mini" label="从业类型:">
                    <el-select v-model="searchFiltersForm.screen" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.screenSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item size="mini" label="从业类型:">
                    <el-select v-model="searchFiltersForm.screen" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.screenSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item size="mini" label="计划日期:">
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="selectData.data" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item size="mini" label="计划日期:">
                    <el-row :gutter="0" class="margin-clear">
                      <el-col :md="11">
                        <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="selectData.data" style="width: 100%;"></el-date-picker>
                      </el-col>
                      <el-col :md="1" class="text-center color-stance">-</el-col>
                      <el-col :md="11">
                        <el-date-picker size="mini" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="selectData.data" style="width: 100%;"></el-date-picker>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item size="mini" label="从业类型:">
                    <el-select v-model="searchFiltersForm.screen" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.screenSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <div class="tab-screen">
            66666
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <div class="tab-screen">
            555555
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="operation-btn text-right">
      <el-button type="primary" plain>导入</el-button>
      <el-button type="primary">导出</el-button>
      <el-button type="success">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" size="mini">
        <el-table-column prop="date" label="日期" width="500">
        </el-table-column>
        <el-table-column prop="name" label="姓名" >
        </el-table-column>
        <el-table-column prop="province" label="省份">
        </el-table-column>
        <el-table-column prop="city" label="市区">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="zip" label="邮编">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'carBaseInfo',
  computed: {

  },
  data() {
    return {
      activeName: 'userManage',
      searchFiltersForm: {
        screen: '',
        search: '',
        data: ''
      },
      selectData: {
        screenSelect: [
          { id: '1', value: '自有车辆' },
          { id: '2', value: '平台客户' }
        ]
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleClick: function(tab, event) {
      console.log('tab', tab);
    }
  }

}

</script>
<style>


</style>
