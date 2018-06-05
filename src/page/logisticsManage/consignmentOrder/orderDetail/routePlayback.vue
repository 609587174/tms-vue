<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second">
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
          订单记录
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'routePlayback',
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      activeName: 'third',
      pageLoading: true,
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderDetailTab/${this.id}` });
      }
      if (targetName.name == 'second') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderProcess/${this.id}` });
      }
    },
  },
  activated: function() {
    this.activeName = 'third';
  },
  created: function() {

  }
}

</script>
