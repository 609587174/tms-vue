<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="人员管理" name="userManage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" ref="searchFiltersFormSetp" :model="searchFiltersForm" status-icon>
              <!-- <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" size="mini" v-model="searchFiltersForm.search" class="search-filters-screen">
                    <el-select size="mini" v-model="searchFiltersForm.screen" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.screenSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>
              </el-row> -->
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item size="mini" label="姓名:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="searchFiltersForm.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item size="mini" label="电话号码:">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="searchFiltersForm.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item size="mini" label="从业类型:">
                    <el-select v-model="searchFiltersForm.employmentType" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.employmentTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item size="mini" label="是否绑定:">
                    <el-select v-model="searchFiltersForm.isBind" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.isBindSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              <!--   <el-col :span="4">
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
                </el-col> -->

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
    <div class="table-list">
      <el-table :data="tableData" stripe style="width: 100%" size="mini">
        <el-table-column v-for="(item,key) in thTableList"  :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">查看</el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>操作日志</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
        userName:'',
        phone:'',
        employmentType: '',
        isBind: '',
        data: ''
      },
      selectData: {
        employmentTypeSelect: [
          { id: '', value: '全部' },
          { id: '1', value: '驾驶员' },
          { id: '2', value: '押运员' },
          { id: '3', value: '驾驶/押运员' }
        ],
        isBindSelect:[
          { id: '', value: '全部' },
          { id: '2', value: '未绑定' },
          { id: '3', value: '已绑定' }
        ],
      },
      thTableList: [{
          title: '姓名',
          param:'date',
          width: ''
        },{
          title: '从业类型',
          param:'name',
          width: ''
        },{
          title: '电话号码',
          param:'province',
          width: ''
        },{
          title: '绑定车辆',
          param:'city',
          width: ''
        },{
          title: '在职状态',
          param:'address',
          width: '200'
        },{
          title: '驾驶证号',
          param:'zip',
          width: ''
        },{
          title: '从业资格证号',
          param:'citys',
          width: ''
        },{
          title: '押运证号',
          param:'addresss',
          width: '200'
        }],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        citys: '普陀区',
        addresss: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        citys: '普陀区',
        addresss: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        citys: '普陀区',
        addresss: '上海市普陀区金沙江路 1518 弄'
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
