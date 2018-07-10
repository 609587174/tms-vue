<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'油/气导入'" :table-list="thTableList" :back-link="'/statistics/costManage/publicCostManage/oilGas/oilGasList'" :api-name-data="apiNameData"></import-data>
  </div>
</template>
<script>
import importData from '@/components/common/importData'
export default {
  name: 'importTollFee',
  components: {
    importData: importData,
  },
  data() {
    return {
      // requestData:{
      apiNameData: {
        uploadApi: '/imports/corporate/',
        importApi: 'importOilGasData',
        listApi:'getOilGasData'
      },
      thTableList: [{
        title: '加油/气公司',
        param: 'company',
        width: ''
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '费用时间',
        param: 'cost_date',
        width: ''
      }, {
        title: '数量',
        param: 'nums',
        width: ''
      }, {
        title: '单价',
        param: 'unit_price',
        width: ''
      }],
    };
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
};

</script>
