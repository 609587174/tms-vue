<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'高速费导入'" :table-list="thTableList" :back-link="'/statistics/costManage/publicCostManage/tollFee/tollFeeList'" :api-name-data="apiNameData" :post-data="postData"></import-data>
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
        uploadApi: '/imports/highway/',
        importApi: 'importTollFeeData',
        listApi:'getTollFeeData',
        deleteDataApi:'deleteTollFeeTemporaryData'
      },
      postData:{
        matchingType:'HighwayFeeManage',
        exportType:'highfree'
      },
      thTableList: [{
        title: '高速公司',
        param: 'high_company',
        width: ''
      },{
        title: '卡号类别',
        param: 'cost_type.verbose',
        width: ''
      }, {
        title: '卡号',
        param: 'card_number',
        width: ''
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '费用时间',
        param: 'cost_date',
        width: '180'
      }, {
        title: '消费金额',
        param: 'consume_price',
        width: ''
      }, {
        title: '服务费',
        param: 'service_charge',
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
