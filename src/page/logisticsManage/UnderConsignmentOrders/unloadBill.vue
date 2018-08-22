<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="卸货单" name="userManage">
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
                <el-col :span="8">
                  <el-form-item label="计划到站时间:" label-width="105px">
                    <el-date-picker v-model="planTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
            <!-- <el-button type="primary">导出</el-button> -->
            <el-button type="success" @click="addUnloading">新增卸货单</el-button>
            <el-button type="primary" @click="subUnloadBillBtn">提交卸货单</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
              </el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" class="match-btn" v-if="(!scope.row.is_show)&&scope.row.status==='waiting_related'" @click="matchUnload(scope.row)">匹配</el-button>
                  <el-button type="text" size="mini" class="match-btn" v-if="scope.row.is_show&&(isMatch(scope.row.status))" @click="matchUnload(scope.row)">取消匹配</el-button>
                  <!-- <el-button v-if="!scope.row.is_matched" type="danger" size="mini" @click="">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
          <unloading-place-dialog :unloading-place-is-show="unloadingPlaceIsShow" v-on:closeDialogBtn="closeDialog"></unloading-place-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import unloadingPlaceDialog from '@/components/logisticsManage/unloadingPlaceDialog';
export default {
  name: 'unloadBillList',
  components: {
    unloadingPlaceDialog: unloadingPlaceDialog
  },
  computed: {
    waybillId() {
      return this.$route.params.waybillId;
    }
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'userManage',
      searchFilters: {
        employmentType: '',
        isBind: '',
        keyword: '',
        field: 'station',
      },
      selectMenus: [],
      selectData: {

        fieldSelect: [
          { id: 'station', value: '站点名称' },
          { id: 'consignee', value: '收货人' },
          // { id: 'sale_man', value: '业务员' },
        ]
      },
      planTime: [], //计划到站时间
      thTableList: [{
          title: '卸货单编号',
          param: 'order_number',
          width: ''
        }, {
          title: '卸货单状态',
          param: 'status_display',
          width: ''
        }, {
          title: '站点',
          param: 'station',
          width: ''
        }, {
          title: '站点地址',
          param: 'station_address',
          width: ''
        }, {
          title: '计划到站时间',
          param: 'plan_arrive_time',
          width: '180'
        }, {
          title: '计划吨位',
          param: 'plan_tonnage',
          width: ''
        }, {
          title: '收货人',
          param: 'consignee',
          width: ''
        }, {
          title: '收货电话',
          param: 'consignee_phone',
          width: ''
        },
        //  {
        //   title: 'ID',
        //   param: 'id',
        //   width: '320'
        // }
      ],
      tableData: [],
      unloadingPlaceIsShow: false, //新增卸货单弹窗
      matchUnloadId: [], //匹配卸货单ID
      cancelMatchUnloadId: [] //取消匹配卸货单ID
    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        waybill_id: this.waybillId
      };
      if (this.planTime instanceof Array && this.planTime.length > 0) {
        postData.plan_arrive_time_start = this.planTime[0];
        postData.plan_arrive_time_end = this.planTime[1];
      }
      postData[this.searchFilters.field] = this.searchFilters.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getUnloadBillList', postData).then((results) => {
        this.pageLoading = false;

        if (results.data && results.data.code == 0) {
          console.log('results.data', this.matchUnloadId, this.cancelMatchUnloadId)
          this.tableData = results.data.data.data.data;
          for (let i in this.tableData) {
            this.tableData[i].is_show = this.tableData[i].is_matched;
            for (let j in this.matchUnloadId) {

              if (this.tableData[i].id === this.matchUnloadId[j]) {
                // console.log('匹配',this.tableData[i].id, this.matchUnloadId[j])
                this.tableData[i].is_show = true;
                this.tableData[i].status = 'waiting_confirm';
              }
            }
            for (let z in this.cancelMatchUnloadId) {
              if (this.tableData[i].id === this.cancelMatchUnloadId[z]) {
                this.tableData[i].is_show = false;
                this.tableData[i].status = 'waiting_related';
              }
            }
          }
          this.pageData.totalCount = results.data.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    isMatch(status) {
      switch (status) {
        case 'waiting_confirm':
          return true;
        case 'to_site':
          return true;
        case 'modify_manager_check':
          return true;
        case 'modify_department_check':
          return true;
      }
    },
    subUnloadBillBtn() {
      if (this.cancelMatchUnloadId.length || this.matchUnloadId.length) {
        this.$msgbox({
          title: '确认匹配卸货地',
          message: '请确认是否将卸货地匹配至运单，确认后，司机将收到卸货地匹配完成提醒',
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showCancelButton: true,
          type: "warning",
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '提交中...';
              let postData = {
                waybill_id: this.waybillId,
                match_order_list: this.matchUnloadId,
                cancel_order_list: this.cancelMatchUnloadId,
              }
              console.log('提交卸货地', postData)
              this.$$http('unloadBillMatch', postData).then((results) => {
                instance.confirmButtonLoading = false;
                if (results.data && results.data.code == 0) {
                  done();
                  this.getList();
                  this.cancelMatchUnloadId = [];
                  this.matchUnloadId = [];
                } else {
                  setTimeout(() => {
                    instance.confirmButtonText = '确定';
                    instance.confirmButtonLoading = false;
                  }, 300);
                }
              }).catch((err) => {
                setTimeout(() => {
                  instance.confirmButtonText = '确定';
                  instance.confirmButtonLoading = false;
                }, 300);
              })

            } else {
              done();
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          });
        });
      } else {
        this.$message({
          type: 'warning',
          message: '没有可提交的卸货单'
        });
      }
    },
    matchUnload(row) {
      if (row.is_matched) {
        this.cancelMatchUnloadId.push(row.id);
      } else {
        this.matchUnloadId.push(row.id);
      }
      row.is_show = !row.is_show;
      if (row.is_show) {
        row.status = 'waiting_confirm';
      } else {
        row.status = 'waiting_related';
      }
      this.matchUnloadId = Array.from(new Set(this.matchUnloadId));
      this.cancelMatchUnloadId = Array.from(new Set(this.cancelMatchUnloadId))
      if (row.is_show === row.is_matched) {
        console.log('点击', row.is_show, row.is_matched, row.id)
        let arr = row.is_show ? this.cancelMatchUnloadId : this.matchUnloadId;
        arr.splice(arr.findIndex(item => item.id === row.id), 1);
        if (row.is_show) {
          this.cancelMatchUnloadId = arr;
        } else {
          this.matchUnloadId = arr;
        }

      }
      console.log('匹配运单', this.cancelMatchUnloadId, this.matchUnloadId);


    },
    handleClick: function(tab, event) {

    },
    handleMenuClick: function(command) {
      this.$router.push({ path: "/clientManage/clientManageSecond/clientDetail", query: { id: command.id } });
    },
    addUnloading: function() {
      this.unloadingPlaceIsShow = true;

    },
    closeDialog: function(isSave, unloadId) {
      this.unloadingPlaceIsShow = false;

      if (isSave) {
        this.getList();
      }
      if (unloadId) {
        this.matchUnloadId.push(unloadId);
      }

    },
    pageChange: function() {
      setTimeout(() => {
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
.el-checkbox-group {
  display: inline-block;
  margin-right: 10px;
}
.match-btn{
  font-size: 13px;
  line-height: 29px;
}
</style>
