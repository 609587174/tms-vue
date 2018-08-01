<!-- personDetail.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="capacityDetail" class="nav-tab">
    <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="车辆绑定信息" name="first">
        <div class="detail-main border-top-clear">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/transportPowerManage/capacityManage/capacityList'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>车辆绑定信息</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main>
              <el-form label-width="120px" :model="headData" status-icon>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        基础信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <el-form-item label="牵引车车牌号:">
                        <div class="detail-form-item">{{headData.tractor.plate_number}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车辆归属:">
                        <div class="detail-form-item">{{headData.tractor.attributes.verbose}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车辆所属:">
                        <div class="detail-form-item">{{headData.tractor.carrier.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <el-form-item label="挂车状态:">
                        <div class="detail-form-item">{{headData.truck_bind_status | formatBindStatus}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="人员状态:">
                        <div class="detail-form-item">{{headData.staff_bind_status | formatBindStatus}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="信息状态:">
                        <div class="detail-form-item">{{headData.complete_status | formatStatus}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form" v-if="headData.semitrailer || headData.car_belong_phone || headData.group">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        挂车绑定信息
                      </el-col>
                      <el-col :span="6" class="text-right">
                        <el-button type="primary" size="mini" plain @click="unbindTruck()">清空该条</el-button>
                        <el-button type="primary" size="mini" @click="goEditDetail(0, headData)">编辑该条</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <el-form-item label="挂车车牌号:">
                        <div class="detail-form-item">{{headData.semitrailer && headData.semitrailer.plate_number}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车辆归属:">
                        <div class="detail-form-item">{{headData.semitrailer && headData.semitrailer.attributes.verbose}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车辆所属:">
                        <div class="detail-form-item">{{headData.semitrailer && headData.semitrailer.carrier.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <el-form-item label="随车电话:">
                        <div class="detail-form-item">{{headData.car_belong_phone}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="车辆分组:">
                        <div class="detail-form-item">{{headData.group && headData.group.group_name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form" v-if="headData.master_driver || headData.vice_driver || headData.escort_staff">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        人员绑定信息
                      </el-col>
                      <el-col :span="6" class="text-right">
                        <el-button type="primary" size="mini" plain @click="unbindStaff()">清空该条</el-button>
                        <el-button type="primary" size="mini" @click="goEditDetail(1, headData)">编辑该条</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <el-form-item label="主驾驶:">
                        <div class="detail-form-item">{{headData.master_driver && headData.master_driver.name}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="电话号码:">
                        <div class="detail-form-item">{{headData.master_driver && headData.master_driver.mobile_phone}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="身份证号码:">
                        <div class="detail-form-item">{{headData.master_driver && headData.master_driver.id_number}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40" v-if="headData.vice_driver">
                    <el-col :span="8">
                      <el-form-item label="副驾驶:">
                        <div class="detail-form-item">{{headData.vice_driver && headData.vice_driver.name}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="电话号码:">
                        <div class="detail-form-item">{{headData.vice_driver && headData.vice_driver.mobile_phone}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="身份证号码:">
                        <div class="detail-form-item">{{headData.vice_driver && headData.vice_driver.id_number}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40" v-if="headData.escort_staff">
                    <el-col :span="8">
                      <el-form-item label="押运员:">
                        <div class="detail-form-item">{{headData.escort_staff && headData.escort_staff.name}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="电话号码:">
                        <div class="detail-form-item">{{headData.escort_staff && headData.escort_staff.mobile_phone}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="身份证号码:">
                        <div class="detail-form-item">{{headData.escort_staff && headData.escort_staff.id_number}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="second">
        <div class="detail-main border-top-clear">
          <el-header>
            <el-row>
              <el-col :span="3">
                <router-link :to="{path: '/transportPowerManage/capacityManage/capacityList'}">
                  <div class="go-return icon-back"></div>
                </router-link>
              </el-col>
              <el-col :span="18">
                <p>操作日志</p>
              </el-col>
            </el-row>
          </el-header>
          <op-log :table-data="logData" :loading-state="logLoading" :pagination="logPagination" v-on:refreshlog="refreshLog"></op-log>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'capacityDetail',
  components: {
    'op-log': () =>
      import ('../../common/opLog')
  },
  data() {
    return {
      logData: [],
      logLoading: false,
      logPagination: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10
      },
      id: '',
      activeTab: '',
      headData: {
        tractor: {
          plate_number: '',
          attributes: {
            verbose: ''
          },
          carrier: {
            name: ''
          }
        },
        semitrailer: {
          plate_number: '',
          attributes: {
            verbose: ''
          },
          carrier: {
            name: ''
          }
        },
        group: {
          group_name: ''
        },
        master_driver: {
          name: '',
          id_number: '',
          mobile_phone: ''
        },
        vice_driver: {
          name: '',
          id_number: '',
          mobile_phone: ''
        },
        escort_staff: {
          name: '',
          id_number: '',
          mobile_phone: ''
        },
        car_belong_phone: '',
        truck_bind_status: '',
        staff_bind_status: '',
        complete_status: ''
      },
      paddingloading: false
    }
  },
  activated() {

  },
  created() {
    this.id = this.$route.query.capacityId;
    this.activeTab = this.$route.query.activeTab;
    if (this.activeTab === 'first') {
      this.getDetail();
    } else if (this.activeTab === 'second') {
      this.getLog(this.logPagination.currentPage);
    }
  },
  filters: {
    formatBindStatus: function(value) {
      return value ? '已绑定' : '未绑定'
    },
    formatStatus: function(value) {
      return value ? '已完善' : '未完善'
    }
  },
  methods: {
    handleTabClick: function(tab) {
      if (tab.name === 'first') {
        this.getDetail();
      }
      if (tab.name === 'second') {
        this.getLog(this.logPagination.currentPage);
      }
    },
    refreshLog: function(page) {
      this.getLog(page);
    },
    getLog: function(page) {
      this.$$http('getCapacityLog', { id: this.id, page: page }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.logData = results.data.data.results;
          this.logPagination.totalPage = Math.ceil(
            results.data.data.count / this.logPagination.pageSize
          );
        } else {
          this.$message.error('数据获取失败');
        }
        this.logLoading = false;
      }).catch(() => {
        this.logLoading = false;
        this.$message.error('数据获取失败');
      });
    },
    getDetail: function() {
      this.paddingloading = true;
      this.$$http('getCapacityDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.headData = results.data.data;
          this.paddingloading = false;
        } else {
          this.paddingloading = false;
          this.$message.error('数据获取失败');
        }
      }).catch(() => {
        this.paddingloading = false;
        this.$message.error('数据获取失败');
      })

    },
    unbindTruck: function() {
      this.$confirm('此操作将一键清空挂车绑定信息，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$$http('unbindTruck', { id: this.id }).then(results => {
          this.$message({
            type: 'success',
            message: '解绑挂车成功!'
          });
          this.getDetail();
        }).catch(error => {

        });
      });
    },
    unbindStaff: function() {
      this.$confirm('此操作将一键清空人员绑定信息，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$$http('unbindStaff', { id: this.id }).then(results => {
          this.$message({
            type: 'success',
            message: '解绑人员成功!'
          });
          this.getDetail();
        }).catch(error => {

        });
      });
    },
    goEditDetail: function(number, data) {
      this.$router.push({ path: `/transportPowerManage/capacityManage/editCapacity/${data.id}/${number}/` });
    },
  }
}

</script>
