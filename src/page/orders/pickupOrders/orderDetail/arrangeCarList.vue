<style scoped lang="less">
.el-table {
  /deep/ .el-table__fixed-header-wrapper tr th .el-checkbox__inner {
    display: none;
  }
  /deep/ tr td .cell {
    text-align: center;
  }
  /deep/ tr th .cell {
    text-align: center;
  }
}

.detail-tab {
  position: relative;
  .operation-btn {
    position: absolute;
    width: 100%;
    top: -25px;
    z-index: 2;
  }
  .el-tabs__header {
    .el-tabs__nav .el-tabs__item {
      /deep/ &.is-active {
        background: #f2f5fe;
        &:after {
          border: 0!important;
          top: 33px;
        }
      }
    }
  }
  /deep/ .el-table__fixed-right {
    border-top: 1px solid #e4e7ed;
  }
}

.go-return {
  width: 32px;
  height: 32px;
  margin-top: 14px;
}

.el-header p {
  height: 60px;

  font-size: 26px;
  line-height: 60px;

  text-align: center;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <div class="tab-screen">
        <el-header>
          <el-row>
            <el-col :span="3">
              <router-link :to="{path: '/orders/pickupOrders/ordersList'}">
                <div class="go-return icon-back"></div>
              </router-link>
            </el-col>
            <el-col :span="18">
              <p>车辆指派</p>
            </el-col>
          </el-row>
        </el-header>
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon label-position="left">
          <el-row :gutter="0">
            <el-col :span="16" :offset="4">
              <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="nav-tab-setting detail-tab mt-25">
      <div class="operation-btn text-right">
        <el-row :gutter="0">
          <!--  <el-col :span="4">
          <el-form-item label="状态:">
            <el-select v-model="searchFilters.orderStateList" @change="startSearch" placeholder="请选择">
              <el-option v-for="(item,key) in selectData.orderStateListSelect" :key="key" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
          <el-col :span="3" :offset="19" style="line-height:40px;font-size:14px;" v-if="delivery_list.status && delivery_list.status.key!='canceled'">
            需求车数{{now_capacities.length}}/{{delivery_list.require_car_number}}
          </el-col>
          <el-col :span="2" v-if="delivery_list.status && delivery_list.status.key!='canceled'">
            <el-button v-if="operationStatus=='add'" type="primary" plain @click="operation('addCar')">添加车辆</el-button>
            <el-button v-if="operationStatus=='edit'" type="primary" @click="operation('changeCar')">提交修改</el-button>
          </el-col>
          <el-col :span="4" :offset="20" v-if="delivery_list.status && delivery_list.status.key=='canceled'">当前订单已经取消,不可操作</el-col>
        </el-row>
      </div>
      <el-tabs v-model="activeName" @tab-click="clicktabs" :filter-method="filterHandler">
        <el-tab-pane label="列表" name="first">
          <div class="table-list border-top-clear">
            <el-table :data="renderPage_list" ref="multipleTable" stripe style="width: 100%" size="mini" v-loading="pageLoading" @select="checkRows">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
              </el-table-column>
              <el-table-column label="勾选" type="selection" width="55" fixed="right" :selectable="checkSelectable">
              </el-table-column>
              <el-table-column label="状态" width="90" fixed="right">
                <template slot-scope="scope">
                  <el-tag :type="allStatus.indexOf(scope.row.waybill.status)>-1 ? 'success' :(scope.row.waybill.status==='canceled'? 'warning':(noCanceled.indexOf(scope.row.waybill.status).indexOf>-1?'danger': 'primary'))" disable-transitions>{{allStatus.indexOf(scope.row.waybill.status)>-1 ? '已审核' :(scope.row.waybill.status==='canceled'? '已取消过': (noCanceled.indexOf(scope.row.waybill.status).indexOf>-1?'不可取消':'未选择过'))}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center ">
            <el-pagination background layout="prev, pager, next,jumper " :page-count="pageData.totalPage " :page-size="pageData.pageSize " :current-page.sync="pageData.currentPage " @current-change="pageChange " v-if="!pageLoading && pageData.totalPage>1">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderDetailTab',
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      searchFilters: {
        keyword: '',
        field: 'tractor.plate_number',
        orderStateList: '',
      },
      allStatus: ['driver_pending_confirmation', 'to_fluid', 'reach_fluid', 'waiting_seal'],
      noCanceled: ['loading_waiting_audit', 'loading_audit_failed', 'waiting_match', 'already_match', 'to_site', 'reach_site', 'unloading_waiting_audit', 'unloading_audit_failed', 'waiting_settlement', 'in_settlement', 'finished'],
      selectData: {
        fieldSelect: [{
          value: '车号',
          id: 'tractor.plate_number',
        }, {
          value: '姓名',
          id: 'master_driver.name',
        }, {
          value: '电话',
          id: 'master_driver.mobile_phone',
        }],
        orderStateListSelect: [{
          value: '车号',
          id: '1',
        }]
      },
      thTableList: [{
        title: '车号',
        param: 'tractor.plate_number',
        width: ''
      }, {
        title: '变更',
        param: 'waybill.waybill_change_status_display',
        width: ''
      }, {
        title: '运单状态',
        param: 'waybill.status_display',
        width: ''
      }, {
        title: '运单号',
        param: 'waybill.waybill',
        width: ''
      }, {
        title: '挂车',
        param: 'semitrailer.plate_number',
        width: '250'
      }, {
        title: '司机',
        param: 'master_driver.name',
        width: ''
      }, {
        title: '司机电话',
        param: 'master_driver.mobile_phone',
        width: ''
      }, {
        title: '押运',
        param: 'escort_staff.name',
        width: ''
      }, {
        title: '押运电话',
        param: 'escort_staff.mobile_phone',
        width: ''
      }, {
        title: '副驾',
        param: 'vice_driver.name',
        width: ''
      }, {
        title: '副驾电话',
        param: 'vice_driver.mobile_phone',
        width: ''
      }],
      tableData: [],
      tractor_semitrailers_List: [], //运力列表
      renderAll_list: [], //查询筛选后的所有需要渲染列表
      trueAll_list: [], //查询筛选后的所有数据
      upTo_list: [], //最近三天已经被使用的运力
      delivery_list: [], //提货单拥有的运单，审核后
      haveTranspower_list: [], //提货单所拥有的运力,未审核
      renderPage_list: [], //当前页渲染的数据
      alreadyList: {},
      lastSearch_list: [],
      add_capacities: [], //增加的运力表
      del_capacities: [], //取消的运力表
      start_capacities: [],//初始的运力表
      now_capacities: [], //已经选择的运力表
      default_del_capacities:[]//默认需要取消的运力
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    operationStatus: function() {
      return this.$route.params.type;
    }
  },
  methods: {
    checkSelectable: function(row) {
      return !row.isDisable
    },
    filterTag: function(value, row) {
      if (row.waybill.status) {
        return row.waybill.status === value;
      } else {
        return !row.waybill.status
      }
    },
    filterHandler: function(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: `/orders/pickupOrders/orderDetail/arrangeCarTab/arrangeCarMap/${this.id}` });
      }
    },
    checkRows: function(selection, row) {
      var vm = this;
      console.log("selection", selection);
      console.log("row", row);

      var addArr = [];
      selection.forEach((sItem) => {
        var addflag = true;
        vm.now_capacities.forEach((item) => {
          if (item.id == sItem.id) {
            addflag = false;
          }
        });
        if (addflag) {
          addArr.push(sItem);
        }
      });
      this.now_capacities = this.now_capacities.concat(addArr);
      if (row.id) {
        var sendJudge = false;
        selection.forEach(item => {
          if (item.id == row.id) {
            sendJudge = true;
          }
        });
        if (sendJudge) {
          //如果是勾选,那么判断是否在别的订单。
          let postData3 = {
            transport_id: row.id
          };
          this.$$http('searchNoUse', postData3).then((results) => {

            if (results.data && results.data.code == 0) {
              console.log("绑定的订单", results.data.data);
              vm.pageLoading = false;
              if (results.data.data.length > 0) {
                var orderListText = "";
                results.data.data.forEach((item) => {
                  orderListText += item + ",";
                });
                const h = this.$createElement;
                // vm.$confirm({
                //   title: '请注意',
                //   message: h('p', null, [
                //     h('span', null, '车号 ' + row.tractor.plate_number + " 已存在于订单"),
                //     h('i', { style: 'color: teal' }, orderListText + "是否继续添加进入订单")
                //   ]),
                //   showCancelButton: true,
                //   confirmButtonText: '继续添加',
                //   cancelButtonText: '返回',
                //   beforeClose: (action, instance, done) => {
                //     if (action === 'confirm') {
                //       done();

                //     } else {

                //       done();
                //     }
                //   }
                // })
                vm.$confirm('车号 ' + row.tractor.plate_number + " 已存在于订单" + orderListText + "是否继续添加进入订单", '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回',
                  type: 'warning',
                  center: true,
                  showClose: false,
                  closeOnClickModal: false
                }).then(() => {
                  row.bindCheckBox = !row.bindCheckBox;
                  vm.trueAll_list.forEach((Titem) => {
                    if (Titem.id == row.id) {
                      Titem.bindCheckBox = true;
                    }

                  });
                }).catch(() => {
                  vm.$refs.multipleTable.toggleRowSelection(row, false);
                  var new_now_capacities1 = [];
                  vm.now_capacities.forEach((item, index) => {
                    if (item.id != row.id) {
                      new_now_capacities1.push(item);
                    }
                  });
                  vm.now_capacities = new_now_capacities1;
                  vm.trueAll_list.forEach((Titem) => {
                    if (Titem.id == row.id) {
                      Titem.bindCheckBox = false;
                    }
                  });
                });
              } else {
                row.bindCheckBox = !row.bindCheckBox;
                vm.trueAll_list.forEach((Titem) => {
                  if (Titem.id == row.id) {
                    Titem.bindCheckBox = true;
                  }

                });
              }
            }
          }).catch((err) => {
            vm.pageLoading = false;
          });
        } else {
          //如果是取消勾选,判断当前车辆是否能取消勾选
          if (row.waybill.waybill) {
            vm.pageLoading = true;
            vm.$$http("judgeCanCancle", { waybill_id: row.waybill.waybill_id }).then((results) => {
              vm.pageLoading = false;
              if (results.data.code == 0) {
                if (results.data.data.status) {
                  row.bindCheckBox = !row.bindCheckBox;
                  vm.trueAll_list.forEach((Titem) => {
                    if (Titem.id == row.id) {
                      Titem.bindCheckBox = false;
                    }
                  });
                  var new_now_capacities1 = [];
                  vm.now_capacities.forEach((item, index) => {
                    if (item.id != row.id) {
                      new_now_capacities1.push(item);
                    }
                  });
                  vm.now_capacities = new_now_capacities1;
                } else {
                  vm.$confirm('当前运单不能被取消', '请注意', {
                    confirmButtonText: '确认',
                    type: 'warning',
                    showCancelButton: false,
                    center: true,
                    closeOnClickModal: false,
                    showClose: false
                  }).then(() => {
                    vm.$refs.multipleTable.toggleRowSelection(row, true);
                  })
                }
              }
            }).catch(() => {
              vm.pageLoading = false;
              vm.$refs.multipleTable.toggleRowSelection(row, true);
            });
          } else {
            row.bindCheckBox = !row.bindCheckBox;
            vm.trueAll_list.forEach((Titem) => {
              if (Titem.id == row.id) {
                Titem.bindCheckBox = false;
              }
            });
            var new_now_capacities = [];
            vm.now_capacities.forEach((item, index) => {
              if (item.id != row.id) {
                new_now_capacities.push(item);
              }
            });
            vm.now_capacities = new_now_capacities;
          }
        }
      }
    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searchThisByData();
    },
    operation: function(type) {
      var vm = this;
      if (type == 'addCar') {
        if (this.now_capacities.length > 0) {
          var sendData = {
            delivery_order_id: "",
            add_capacities: []
          };
          this.now_capacities.forEach(item => {
            sendData.add_capacities.push(item.id);
          });
          sendData.delivery_order_id = this.delivery_list.id;
          this.pageLoading = true;
          this.$$http("addCarPower", sendData).then((results) => {
            this.pageLoading = false;
            if (results.data.code == 0) {
              if (this.operationStatus == 'add') {
                vm.$router.push({ path: "/orders/pickupOrders/ordersList?goTo=appoint" });
              } else {
                vm.$router.push({ path: "/orders/pickupOrders/ordersList?goTo=determine" });
              }
            }
          }).catch(() => {
            this.pageLoading = false;
          });
        } else {
          vm.$confirm('提交车辆不能为0', '请注意', {
            confirmButtonText: '确认',
            showCancelButton: false,
            type: 'warning',
            center: true,
            closeOnClickModal: false,
            showClose: false
          }).then(() => {

          })
        }
      } else if (type == 'changeCar') {
        var sendData = {
          delivery_order_id: "",
          add_capacities: [],
          del_capacities: [],
          id: this.delivery_list.id,
          yid: this.delivery_list.id,
          delivery_order_id: this.delivery_list.id
        };
        this.now_capacities.forEach(item => {
          var addFalg = true;
          vm.start_capacities.forEach(startItem => {
            if (item.id == startItem.capacity) {
              addFalg = false;
            }
          });
          if (addFalg&&item.waybill&&!(vm.allStatus.indexOf(item.waybill.status)>-1)) {
            sendData.add_capacities.push(item.id);
          }
        });

        this.start_capacities.forEach(item => {
          var cancleFalg = true;
          vm.now_capacities.forEach(nowItem => {
            if (item.capacity == nowItem.id) {
              cancleFalg = false;
            }
          });
          if (cancleFalg&&item.waybill&&vm.allStatus.indexOf(item.status)>-1) {
            sendData.del_capacities.push(item.capacity);
          }
        });
        sendData.del_capacities=sendData.del_capacities.concat(this.default_del_capacities);

        if (sendData.del_capacities.length == 0 && sendData.add_capacities.length == 0) {
          vm.$confirm('您没有任何修改', '请注意', {
            confirmButtonText: '放弃修改',
            cancelButtonText: '继续修改',
            type: 'warning',
            center: true,
          }).then(() => {
            vm.$router.push({ path: "/orders/pickupOrders/ordersList?goTo=determine" });
          }).catch(() => {

          })
        }
        if (vm.now_capacities.length > 0) {
          if (sendData.del_capacities.length > 0 || sendData.add_capacities.length > 0) {
            this.pageLoading = true;
            this.$$http("editCarPower", sendData).then((results) => {
              this.pageLoading = false;
              if (results.data.code == 0) {
                vm.$router.push({ path: "/orders/pickupOrders/ordersList?goTo=determine" });
              }
            }).catch(() => {
              this.pageLoading = false;
            });
          }
        } else {
          vm.$confirm('修改后车辆为0,状态会置为待指派', '请注意', {
            confirmButtonText: '确认提交',
            cancelButtonText: '返回',
            type: 'warning',
            center: true,
            closeOnClickModal: false,
            showClose: false

          }).then(() => {
            vm.$$http("editCarPower", sendData).then((results) => {
              vm.pageLoading = false;
              if (results.data.code == 0) {
                vm.$router.push({ path: "/orders/pickupOrders/ordersList?goTo=determine" });
              }
            }).catch(() => {
              this.pageLoading = false;
            });
          }).catch(() => {

          });
        }
      }
    },
    getList: function() {
      var vm = this;
      let postData = {
        pagination: false,
        complete_status: true
      };
      this.pageLoading = true;
      var getDataNum = 0;

      vm.$$http('searchCapacityList', postData).then((results) => {

        if (results.data && results.data.code == 0) {
          console.log("运力列表", results.data.data);
          vm.tractor_semitrailers_List = results.data.data;
        }
        getDataNum++;
        if (getDataNum == 4) {
          vm.pageLoading = false;
          vm.sortData(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.sortData(false);
        if (getDataNum == 4) {
          vm.pageLoading = false;
        }
        console.log('err', err);
      });
      let postData1 = {
        id: this.id
      };
      vm.$$http('getPickOrderDetail', postData1).then((results) => {
        getDataNum++;

        if (results.data && results.data.code == 0) {
          console.log("当前订单数据", results.data.data);
          vm.delivery_list = results.data.data;
        }
        if (getDataNum == 4) {
          vm.pageLoading = false;
          vm.sortData(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.sortData(false);
        if (getDataNum == 4) {
          vm.pageLoading = false;
        }
        console.log('err', err);
      });
      let postData2 = {};
      vm.$$http('searchNoUse', postData2).then((results) => {
        if (results.data && results.data.code == 0) {
          console.log("最近未指派的车辆数据", results.data);
          vm.upTo_list = results.data.data;
        }
        getDataNum++;
        if (getDataNum == 4) {
          vm.pageLoading = false;
          vm.sortData(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.sortData(false);
        if (getDataNum == 4) {
          vm.pageLoading = false;
        }
        console.log('err', err);
      });
      let postData4 = {
        id: vm.id
      };
      vm.$$http('searchOrderHasPower', postData4).then((results) => {
        if (results.data && results.data.code == 0) {
          console.log("已经添加列表上面的数据", results.data);
          vm.alreadyList = results.data.data;
          if (!results.data.data || !vm.alreadyList.capacities) {
            vm.alreadyList.add_capacities = [];
             vm.alreadyList.capacities = [];
          }
        }
        getDataNum++;
        if (getDataNum == 4) {
          vm.pageLoading = false;
          vm.sortData(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.sortData(false);
        if (getDataNum == 4) {
          vm.pageLoading = false;
        }
        console.log('err', err);
      });

    },
    sortData: function(status) {
      if (status) {
        let operationArr = this.pbFunc.deepcopy(this.tractor_semitrailers_List);
        let newArr = [];
        let fifterArr = [];
        for (let i = 0; i < operationArr.length; i++) { //循环所有运力列表
          var addflag = false;
          for (let j = 0; j < this.delivery_list.trips.length; j++) { //筛选当前订单的列表
            //筛选
            if (operationArr[i].id == this.delivery_list.trips[j].capacity) {
              operationArr[i].waybill = this.delivery_list.trips[j];
              if (this.delivery_list.trips[j].status != "canceled"&&this.delivery_list.trips[j].waybill_change_status!= "canceled") {
                operationArr[i].bindCheckBox = true;
                operationArr[i].isDisable=false;
                this.now_capacities.push(operationArr[i]);
                addflag = true;
              }else if(this.delivery_list.trips[j].waybill_change_status== "canceled"){
                operationArr[i].isDisable=true;
                this.default_del_capacities.push(operationArr[i].id);
                addflag = true;
              }
            }
          }
          if (addflag) {
            newArr.push(operationArr[i]);
          } else {
            fifterArr.push(operationArr[i]);
          }
        }
        fifterArr.forEach((item) => {
          if (!item.waybill) {
            item.waybill = {};
          }
        });
        //筛选出待确认列表中不在已确认列表的数据 加入到绑定选择列表 并且删除
        var fifterArr4 = [];
        for (let findex1 = 0; findex1 < fifterArr.length; findex1++) {
          var addAlreaListflag = false;
          for (let findex4 = 0; findex4 < this.alreadyList.add_capacities.length; findex4++) {
            if (fifterArr[findex1].id == this.alreadyList.add_capacities[findex4]) {
              addAlreaListflag = true;
              break;
            }
          }
          if (addAlreaListflag) {
            fifterArr[findex1].waybill = {};
            fifterArr[findex1].bindCheckBox = true;
            this.now_capacities.push(fifterArr[findex1]);
            newArr.push(fifterArr[findex1]);
          } else {
            fifterArr4.push(fifterArr[findex1]);
          }
        }
        //筛选出最近三天没有使用过的运力
        var fifterArr2 = [];
        for (var findex = 0; findex < fifterArr4.length; findex++) {
          var upaddfalg = false;
          for (let o = 0; o < this.upTo_list.length; o++) {
            if (fifterArr4[findex].id == this.upTo_list[o]) {
              upaddfalg = true;
              break;
            }
          }
          if (!upaddfalg) {
            if (!fifterArr4[findex].waybill) {
              fifterArr4[findex].waybill = {};
            }

            newArr.push(fifterArr4[findex]);
          } else {
            fifterArr2.push(fifterArr4[findex]);
          }
        }
        // var newArr1 = [];
        // for (let m = 0; m < operationArr.length; m++) {
        //   var addflag = true;
        //   for (let n = 0; n < newArr.length; n++) {
        //     if (newArr[n].id == operationArr[m].id) {
        //       addflag = false;
        //     }
        //   }
        //   if (addflag) {
        //     operationArr[m].waybill = {};
        //     newArr1.push(operationArr[m]);
        //   }
        // }
        newArr = newArr.concat(fifterArr2);
        if (this.delivery_list.status.key == 'canceled') {
          newArr.forEach(item => {
            item.isDisable = true;
          });
        }

        this.trueAll_list = newArr;
        this.renderAll_list = newArr;

        this.bindChekboxFunction(0, this.renderAll_list);
      } else {
        console.log("获取数据失败,请刷新页面重试或联系管理员");
      }
    },
    searchThisByData: function(searchPage, type) {
      var keyArr = this.searchFilters.field == '' ? [] : this.searchFilters.field.split(".");
      var value = this.searchFilters.keyword;
      var newArr = [];
      if (keyArr.length == 0) {
        newArr = this.trueAll_list;
      } else {
        for (let i = 0; i < this.trueAll_list.length; i++) {
          var searchParam = this.pbFunc.deepcopy(this.trueAll_list[i]);
          for (let j = 0; j < keyArr.length; j++) {
            searchParam = searchParam[keyArr[j]];
          }
          if (searchParam.indexOf(value) > -1) {
            newArr.push(this.trueAll_list[i]);
          }
        }
      }
      if (type == 'pageChange') {
        newArr = this.lastSearch_list;
      }
      this.renderAll_list = newArr;
      this.bindChekboxFunction(searchPage, newArr);
    },
    bindChekboxFunction: function(page, list) {
      this.pageData.totalPage = Math.ceil(list.length / this.pageData.pageSize);
      this.lastSearch_list = list;
      var vm = this;
      var page_list = this.pbFunc.deepcopy(list).splice(page * this.pageData.pageSize, this.pageData.pageSize);

      this.renderPage_list = page_list;
      var rowsArr = [];
      page_list.forEach((item, index) => {
        if (item.bindCheckBox) {
          rowsArr.push(item);
        }
      });
      var vm = this;
      setTimeout(function() {
        rowsArr.forEach(row => {
          vm.$refs.multipleTable.toggleRowSelection(row, true);
          vm.start_capacities.push(row.waybill || row);
        });
      });
    },
    pageChange: function() {
      setTimeout(() => {
        this.searchThisByData(this.pageData.currentPage - 1, 'pageChange');
      })
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    this.getList();
  }
}

</script>
