<style scoped lang="less">


</style>
<template>
  <div>
    <import-data :import-title="'人员导入'" :table-list="thTableList" :back-link="'/transportPowerManage/personManage/personListManage'" :api-name-data="apiNameData" :post-data="postData"></import-data>
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
        title: '姓名',
        param: 'name',
        width: ''
      }, {
        title: '从业类型',
        param: 'work_type.verbose',
        width: '180'
      }, {
        title: '电话号码',
        param: 'mobile_phone',
        width: ''
      }, {
        title: '绑定车辆',
        param: 'bind_tractors.plate_number',
        width: ''
      }, {
        title: '在职状态',
        param: 'on_job_status.verbose',
        width: ''
      }, {
        title: '驾驶证号',
        param: 'drive_license_number',
        width: ''
      }, {
        title: '从业资格号',
        param: 'qualification_certificate_number',
        width: ''
      },{
        title: '押运证号',
        param: 'escort_license_number',
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
