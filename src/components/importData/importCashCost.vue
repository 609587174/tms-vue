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
        uploadApi: '/imports/cash-cost/', //上传导入数据接口url
        importApi: 'importCashCostData', //导入系统apiName
        listApi: 'getCashCostData', //上传之后临时表apiName
        deleteDataApi: 'deleteCashCostTemporaryData' //清空临时表apiName
      },
      postData: {
        matchingType: 'CashCostManage', //匹配运单type
        exportType: 'cash' //导出模板类型参数
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
      }, {
        title: '是否为行程内费用',
        param: 'is_travel.verbose',
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
