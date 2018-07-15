<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'现金费用导入'" :table-list="thTableList" :back-link="'/statistics/costManage/cashCostManage/cashCostList'" :api-name-data="apiNameData" :post-data="postData"></import-data>
  </div>
</template>
<script>
import importData from '@/components/common/importData'
export default {
  name: 'importCashCost',
  components: {
    importData: importData,
  },
  data() {
    return {
      // requestData:{
      apiNameData: {
        uploadApi: '/imports/cash-cost/',
        importApi: 'importCashCostData',
        listApi:'getCashCostData',
        deleteDataApi:'deleteCashCostTemporaryData'
      },
      postData:{
        type:'CashCostManage',
        exportType:'cash'
      },
      thTableList: [{
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '费用时间',
        param: 'cost_date',
        width: '180'
      }, {
        title: '费用类型',
        param: 'cost_type.verbose',
        width: ''
      }, {
        title: '数量',
        param: 'nums',
        width: ''
      }, {
        title: '税前金额',
        param: 'pre_tax_amount',
        width: ''
      }, {
        title: '税后金额',
        param: 'at_amount',
        width: ''
      }, {
        title: '税额',
        param: 'tax_amount',
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
