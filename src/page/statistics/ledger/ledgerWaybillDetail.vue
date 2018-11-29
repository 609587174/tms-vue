<!-- waybillDetail.vue -->
<style type="text/css"  scoped lang="less">
  .detail-main{
    border-top: 0;
  }
</style>
<template>

    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first">
          <!-- <waybill-detail></waybill-detail> -->
          <waybill-detail :back-link="'/statistics/ledger/ledgerList'" :is-check="true"></waybill-detail>
        </el-tab-pane>
      </el-tabs>
    </div>

</template>
<script>
import waybillDetail from '@/components/logisticsManage/waybillDetail';
export default {
  name: 'incomeWaybillDetail',
  components: {
    waybillDetail: waybillDetail
  },
  computed: {

  },
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    clicktabs: function(targetName) {

    },

  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {

  }
}

</script>
<style scoped lang="less">
.detail-main {
  min-height: 500px;
}
