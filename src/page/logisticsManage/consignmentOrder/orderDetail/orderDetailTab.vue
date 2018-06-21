</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first">
          <waybill-detail :back-link="'/logisticsManage/consignmentOrders/ordersList'"></waybill-detail>
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second">
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import waybillDetail from '@/components/logisticsManage/waybillDetail';
export default {
  name: 'orderDetailTab',
  components: {
    waybillDetail: waybillDetail
  },
  computed: {
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    }
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      detailData: {
        delivery_order: {},
      },
      transPowerData: {
        tractor: {
          carrier: {}
        },
        master_driver: {},
        vice_driver: {},
        escort_staff: {}
      },
      loadArr: [{}],
      unloadArr: []
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderProcess/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/routePlayback/${this.setpId}/${this.willId}` });
      }
    },
    // getOrderDetail: function() {
    //   this.pageLoading = true;
    //   var vm = this;
    //   let postData = {
    //     id: this.willId
    //   }
    //   this.$$http('getConOrderDetail', postData).then((results) => {
    //     this.pageLoading = false;
    //     console.log('results', results);
    //     if (results.data && results.data.code == 0 && results.data.data) {
    //       this.detailData = results.data.data;
    //       /* 获取运力 */
    //       var unloadArr = [],
    //         loadArr = [];

    //       for (var i = 0; i < vm.detailData.trips.length; i++) {
    //         if (vm.detailData.trips[i].section_type.key == 'unload') {
    //           unloadArr.push(vm.detailData.trips[i]);
    //         } else {
    //           loadArr.push(this.detailData.trips[i]);
    //         }
    //       }
    //       vm.unloadArr = unloadArr;
    //       vm.loadArr = loadArr;
    //       if (vm.detailData.trips && vm.detailData.trips.length && vm.detailData.trips[0].capacity) {
    //         vm.getTransPowerInfo(vm.detailData.trips[0].capacity);
    //       }
    //     } else {
    //       vm.$message({
    //         message: results.data.msg,
    //         type: 'error'
    //       });
    //     }
    //   }).catch((err) => {

    //   })
    // },
    // getTransPowerInfo: function(id) {
    //   let postData = {
    //     id: id
    //   }
    //   this.$$http('getTransPowerInfo', postData).then((results) => {
    //     console.log('getTransPowerInfo', results);
    //     if (results.data && results.data.code == 0 && results.data.data) {
    //       this.transPowerData = results.data.data;
    //       console.log('this.transPowerData', this.transPowerData);
    //     } else {
    //       this.$message({
    //         message: results.data.msg,
    //         type: 'error'
    //       });
    //     }
    //   }).catch((err) => {

    //   })
    // }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    console.log('this.$route', this.$route.params.id, this.id);
    // this.getOrderDetail();
  }
}

</script>
<style scoped lang="less">
.detail-main {
  min-height: 500px;
}
