<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'油/气费导入'" :table-list="thTableList" :back-link="'/statistics/costManage/publicCostManage/oilGas/oilGasList'" :api-name-data="apiNameData" :post-data="postData"></import-data>
  </div>
</template>
<script>
import importData from '@/components/common/importData'
export default {
  name: 'importOilGas',
  components: {
    importData: importData,
  },
  data() {
    return {
      // requestData:{
      apiNameData: {
        uploadApi: '/imports/corporate/',
        importApi: 'importOilGasData',
        listApi:'getOilGasData',
        deleteDataApi:'deleteOilGasTemporaryData'
      },
      postData:{
        matchingType:'CorporateBusinessManage',
        exportType:'corporate'
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
      }, {
        title: '消费金额',
        param: 'consumption_price',
        width: ''
      }, {
        title: '是否为行程内费用',
        param: 'is_travel.verbose',
        width: ''
      }, {
        title: '备注',
        param: 'comment',
        width: '170',
        isEllipsis:true
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
