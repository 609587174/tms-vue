<style scoped lang="less">


</style>
<template>
  <div>
    <!-- 现金费用导入 -->
    <div v-if="type==='cashCost'">
      <import-cash-cost></import-cash-cost>
    </div>
    <!-- 高速费导入 -->
    <div v-if="type==='tollFee'">
      <import-toll-fee></import-toll-fee>
    </div>
    <!-- 油/气导入 -->
    <div v-if="type==='oilGas'">
      <import-oil-gas></import-oil-gas>
    </div>
    <!-- 人员导入 -->
    <div v-if="type==='personManage'">
      <import-person-manage></import-person-manage>
    </div>
  </div>
</template>
<script>
import importCashCost from '@/components/importData/importCashCost'
import importTollFee from '@/components/importData/importTollFee'
import importOilGas from '@/components/importData/importOilGas'
import importPersonManage from '@/components/importData/importPersonManage'
export default {
  name: 'importData',
  components: {
    importCashCost: importCashCost,
    importTollFee: importTollFee,
    importOilGas: importOilGas,
    importPersonManage: importPersonManage,
  },
  data() {
    return {

    };
  },
  computed: {
    type: function() {
      return this.$route.params.type;
    },
  },
  methods: {

  },
  created() {

  }
};

</script>
