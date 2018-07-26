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
  name: 'importPersonManage',
  components: {
    importData: importData,
  },
  data() {
    return {
      // requestData:{
      apiNameData: {
        uploadApi: '/imports/base-carrier-driver/',
        importApi: 'importPersonData',
        listApi:'getPersonTemporaryData',
        deleteDataApi:'deletePersonTemporaryData'
      },
      postData:{
        exportType:'driver'
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
        title: '人员所属',
        param: 'staff_type.SELF_OWNED_TRUCK',
        width: ''
      },
      {//
        title: '身份证号',
        param: 'id_number',
        width: ''
      },
      {
        title: '在职状态',
        param: 'on_job_status.verbose',
        width: ''
      },
      {
        title: '性别',
        param: 'gender.verbose',
        width: ''
      },{
        title: '家属姓名',
        param: 'family_member_name',
        width: ''
      },{
        title: '家属联系方式',
        param: 'family_member_phone',
        width: '160'
      },
      {//
        title: '准驾类型',
        param: 'drive_license_allow_type',
        width: ''
      },{
        title: '详细地址',
        param: 'detail_address',
        width: ''
      },
      {
        title: '驾驶证档案编号',
        param: 'drive_license_number',
        width: '180'
      },
      {
        title: '驾驶证发证时间',
        param: 'drive_license_issue_date',
        width: '180'
      }, {
        title: '驾驶证到期时间',
        param: 'drive_license_due_date',
        width: '180'
      }, {
        title: '驾驶证发证机关',
        param: 'drive_license_issue_organ',
        width: '180'
      },{
        title: '从业资格号',
        param: 'qualification_certificate_number',
        width: ''
      },
      {
        title: '从业资格证发证时间',
        param: 'qualification_certificate_issue_date',
        width: '200'
      },
      {
        title: '从业资格证到期时间',
        param: 'qualification_certificate_due_date',
        width: '200'
      },
      {
        title: '从业资格证发证机关',
        param: 'qualification_certificate_issue_organ',
        width: '200'
      },{
        title: '押运证号',
        param: 'escort_license_number',
        width: ''
      },{
        title: '押运证发证时间',
        param: 'escort_license_issue_date',
        width: '180'
      },{
        title: '押运证到期时间',
        param: 'escort_license_due_date',
        width: '180'
      },{
        title: '押运证发证机关',
        param: 'escort_license_issue_organ',
        width: '180'
      },{
        title: '录用日期',
        param: 'labour_employ_date',
        width: ''
      },{
        title: '上岗日期',
        param: 'labour_on_work_date',
        width: ''
      },{
        title: '下岗日期',
        param: 'labour_off_work_date',
        width: ''
      },{
        title: '合同起始日期',
        param: 'contract_start_date',
        width: '160'
      },{
        title: '合同截止日期',
        param: 'contract_due_date',
        width: '160'
      },{
        title: '转正日期',
        param: 'contract_correct_date',
        width: ''
      },{
        title: '体检日期',
        param: 'heath_examination_date',
        width: ''
      },{
        title: '体检备注',
        param: 'heath_examination_remark',
        width: ''
      },{
        title: '出生日期',
        param: 'birthday',
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
