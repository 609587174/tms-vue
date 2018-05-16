<!-- organizationalStructureList.vue -->
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="人员管理" name="userManage">
          <div class="tab-screen">

          </div>
          <div class="operation-btn text-right">
            <el-button type="primary">编辑部门</el-button>
            <el-button type="success" @click="addPerson">新增部门</el-button>
          </div>


        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'personListManage',
  computed: {
    employmentTypeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: '',
      },
      activeName: 'userManage',
      searchFilters: {
        employmentType: '',
        isBind: '',
        keyword: '',
        field: 'name',
      },
      selectData: {
        isBindSelect: [
          { id: '', value: '全部' },
          { id: '2', value: '未绑定' },
          { id: '3', value: '已绑定' }
        ],
        fieldSelect: [
          { id: 'name', value: '姓名' },
          { id: 'mobile_phone', value: '电话号码' },
        ]
      },
      thTableList: [{
        title: '姓名',
        param: 'name',
        width: ''
      }, {
        title: '从业类型',
        param: 'work_type.verbose',
        width: ''
      }, {
        title: '电话号码',
        param: 'mobile_phone',
        width: ''
      }, {
        title: '绑定车辆',
        param: 'bind_tractors.plate_number',
        width: ''
      }, {
        title: '在职状态',
        param: 'on_job_status.verbose',
        width: '250'
      }, {
        title: '驾驶证号',
        param: 'drive_license_number',
        width: ''
      }, {
        title: '从业资格证号',
        param: 'qualification_certificate_number',
        width: ''
      }, {
        title: '押运证号',
        param: 'escort_license_number',
        width: '250'
      }],
      tableData: []
    }
  },
  methods: {
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        work_type: this.searchFilters.employmentType,
        driver_bind_status: this.searchFilters.isBind,
      };
      postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getDriversList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;
          console.log('this.tableData', this.tableData);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    handleClick: function(tab, event) {
      console.log('tab', tab);
    },
    handleMenuClick: function(command) {
      console.log('command', command);
      this.$router.push({ path: "/transportPowerManage/personManage/personDetail", query: { id: command.id } });
    },
    addPerson: function() {
      this.$router.push({ path: "/transportPowerManage/personManage/addPerson" });
    },
    importList: function() {

    },
    exportList: function() {

    },
    addList: function() {

    },
    pageChange: function() {
      setTimeout(() => {
        console.log('currentPage', this.pageData.currentPage);
        this.getList();
      })

    }
  },
  created: function() {
    this.getList();
  }

}

</script>
<style scoped lang="less">


</style>
