<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'现金费用导入'" :table-list="thTableList" :back-link="'/statistics/costManage/cashCostManage/cashCostList'" :api-name-data="apiNameData"></import-data>
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
        importApi: '',
        listApi:'getCashCostData'
      },
      thTableList: [{
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '费用时间',
        param: 'order',
        width: ''
      }, {
        title: '费用类型',
        param: 'company',
        width: ''
      }, {
        title: '数量',
        param: 'plate_number',
        width: ''
      }, {
        title: '税前金额',
        param: 'fluid',
        width: ''
      }, {
        title: '税后金额',
        param: 'station',
        width: ''
      }, {
        title: '税额',
        param: 'active_time',
        width: ''
      }, {
        title: '是否匹配运单',
        param: 'leave_time',
        width: ''
      }, {
        title: '运单号',
        param: 'waybill',
        width: ''
      }, {
        title: '添加时间',
        param: 'freight',
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
