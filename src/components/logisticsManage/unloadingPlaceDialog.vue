<template>
  <div>
    <el-dialog :title="title" :visible="unloadingPlaceIsShow" width="40%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="130px" :rules="rules" :model="formRules" status-icon ref="formRules">
          <el-form-item label="卸货站点名称:" prop="tms_station_name">
            <el-input :autofocus="true" placeholder="请输入" v-model="formRules.tms_station_name">
            </el-input>
          </el-form-item>
          <el-form-item label="实际站点名称:" prop="station_id">
            <el-select v-model="formRules.station_id" :loading="siteLoading" filterable remote clearable @change="selectStation" :remote-method="getSiteList" placeholder="请输入选择">
              <el-option v-for="(item,key) in fluidSiteSelect" :key="key" :label="item.position_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卸货站点地址:">
            <span>{{addData.station_address}}</span>
          </el-form-item>
          <el-form-item label="收货人:" prop="consignee">
            <el-input :autofocus="true" placeholder="请输入" v-model="formRules.consignee">
            </el-input>
          </el-form-item>
          <el-form-item label="收货人联系电话:" prop="consignee_phone">
            <el-input :autofocus="true" placeholder="请输入" v-model="formRules.consignee_phone">
            </el-input>
          </el-form-item>
          <el-form-item label="计划到站时间:" prop="plan_arrive_time">
            <el-date-picker v-model="formRules.plan_arrive_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划卸货吨位:" prop="plan_tonnage">
            <el-input :autofocus="true" placeholder="请输入" v-model="formRules.plan_tonnage">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="addUnloadBill" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'unloadingPlaceDialog',
  props: {
    unloadingPlaceIsShow: {
      type: Boolean,
      required: true
    },
    closeDialogBtn: Function,
  },

  data: function() {

    return {
      formRules: {
        tms_station_name: '', //卸货地名称
        station_id: '', //实际站点名称id,
        consignee: '', //收货人
        consignee_phone: '', //收货人联系电话
        plan_arrive_time: '', //计划到站时间
        plan_tonnage: '', //计划需求吨位
      },
      rules: {
        tms_station_name: [
          { required: true, message: '请输入卸货地名称', trigger: 'blur' },
          // { min: 1, max: 20, message: '部门名称字数为1-20字', trigger: 'blur' }
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi, message: '企业名称为中文、英文，不能输入数字、标点符号', trigger: 'blur' },
        ],
        station_id: [
          { required: true, message: '请选择实际站点名称', trigger: 'change' },
        ],
        consignee: [
          { required: true, message: '请输入收货人', trigger: 'change' },
          { required: true, message: '请输入收货人', trigger: 'blur' },
        ],
        consignee_phone: [
          { required: true, message: '请输入收货人联系电话', trigger: 'change' },
          { required: true, message: '请输入收货人联系电话', trigger: 'blur' },
          { pattern: /(^(\(0\d{2}\)|0\d{2}-|\s)?\d{7,8}$)|(^1\d{10}$)/, message: '手机或座机号格式不正确，请重新输入', trigger: 'blur' }
        ],
        plan_arrive_time: [
          { required: true, message: '请选择计划到站时间', trigger: 'blur' },
        ],
        plan_tonnage: [
          { required: true, message: '请输入计划需求吨位', trigger: 'blur' },
          { pattern: /^([1-9]{1,2})+(.[0-9]{0,3})?$/, message: '请输入1-99且最多三位小数的数值', trigger: 'blur' },

        ],
      },
      submitBtn: {
        btnText: '确认并匹配',
        isDisabled: false,
        isLoading: false
      },
      fluidSiteSelect: [], //站点
      title: '卸货地',
      siteLoading: false,
      addData: {
        station_address: '', //站点地址
        business_type: 5, //承运
        order_source: 'TMS', //业务单来源，tms建的传TMS
        short_name: '线下承运', //客户简称
        consumer_id: '514013af8a2b43798fa6969f18fcf8fb',
        consumer_name: '线下承运', //客户名称
        station: '' //实际站点名称
      }
    }
  },
  computed: {
    waybillId() {
      return this.$route.params.waybillId;
    }
  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false);
    },
    selectStation(select) {
      if (select) {
        for (let i in this.fluidSiteSelect) {
          if (select === this.fluidSiteSelect[i].id) {
            this.addData.station = this.fluidSiteSelect[i].position_name;
            this.addData.station_address = this.fluidSiteSelect[i].address;
            this.formRules.consignee = this.fluidSiteSelect[i].contacts;
            this.formRules.consignee_phone = this.fluidSiteSelect[i].tel;
            break;
          }
        }
      } else {
        this.addData.station = '';
        this.addData.station_address = '';
        this.formRules.consignee = '';
        this.formRules.consignee_phone = '';
      }


      // this.formRules.station = select.position_name;
    },
    getSiteList: function(site) {
      let postData = {
        page: 1,
        page_size: 100,
        position_type: 'DELIVER_POSITION',
        simplify: true,
      }
      if (site) {
        postData.position_name = site;
      }
      this.siteLoading = true;
      this.$$http('getLandMarkList', postData).then((results) => {
        this.siteLoading = false;
        if (results.data && results.data.code == 0) {
          this.fluidSiteSelect = results.data.data.results;
        }
      }).catch((err) => {
        this.siteLoading = false;
      })
    },
    addUnloadBill: function() {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.submitBtn.isDisabled = true;
          this.submitBtn.btnText = '确认并匹配中';
          this.submitBtn.isLoading = true;
          let postData = Object.assign(this.formRules, this.addData)
          this.$$http('addUnloadBill', postData).then((results) => {
            this.submitBtn.btnText = '确认并匹配';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '新增卸货单成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', true, results.data.data.data[0]);
            }

          }).catch((err) => {
            this.submitBtn.btnText = '确认并匹配';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            this.$message.error('新增卸货单失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    matchingUnload(id) {
      let postData = {
        waybill_id: this.waybillId,
        match_order_list: [],
        cancel_order_list: []
      }
      postData.match_order_list.push(id);
      this.$$http('unloadBillMatch', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$emit('closeDialogBtn', true);
        }

      }).catch((err) => {

      })

    },
  },
  watch: {
    unloadingPlaceIsShow(curVal, oldVal) {　
      this.formRules = {
        tms_station_name: '', //卸货地名称
        station_id: '', //实际站点名称id,
        consignee: '', //收货人
        consignee_phone: '', //收货人联系电话
        plan_arrive_time: '', //计划到站时间
        plan_tonnage: '', //计划需求吨位
      };　　　　　　　　
      if (this.$refs['formRules']) {
        this.$refs['formRules'].clearValidate();　　　　
      }　　
      this.addData.station_address = '';
    },
  },
  created: function() {
    let currentUrl = document.location.href.toString();
    let domainUrl = '';



    // if (currentUrl.match('ptms.hhtdlng.com')) { //演示环境
    //   this.addData.consumer_id = '';
    // } else if (currentUrl.match('ptms.91lng.cn')) { //预发环境
    //   this.addData.consumer_id = '';
    // } else if (currentUrl.match(`tms.hhtdlng.com`) && !currentUrl.match(`devtms.hhtdlng.com`)) { //测试环境
    //   this.addData.consumer_id = '';
    // } else if (currentUrl.match(`tms.91lng.cn`) && !currentUrl.match(`ptms.91lng.cn`)) { //正式环境
    //   this.addData.consumer_id = '';
    // } else if (currentUrl.match(`devtms.hhtdlng.com`)) { //开发环境
    //   this.addData.consumer_id = 'ffa8f1758c6b4263bfb7bc9a20fa8742';
    // } else {
    //   this.addData.consumer_id = 'ffa8f1758c6b4263bfb7bc9a20fa8742';
    // }

    this.getSiteList();
  }
}

</script>
<style scoped lang="less">
.tms-dialog-form {
  width: 460px;
}

</style>
