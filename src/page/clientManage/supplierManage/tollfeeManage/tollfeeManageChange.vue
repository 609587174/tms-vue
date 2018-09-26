<template>
  <div id="addeditTailCarPage" class="detail-main">
    <el-container>
      <el-header class="mt-5">
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnBack"></div>
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-row>
        <el-col class="stepTitle mt-25">
          基础信息
        </el-col>
      </el-row>
      <el-main v-loading="pageLoading">
        <el-form class="addTailcarform" label-width="90px" ref="tollfeeManageFrom" :rules="rules" :model="tollfeeManageFrom" status-icon :label-position="'right'">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="高速公司:" prop="name">
                <el-input placeholder="请输入" type="text" v-model="tollfeeManageFrom.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类型:">
                <el-select v-model="tollfeeManageFrom.type" placeholder="请选择">
                  <el-option v-for="(item,key) in typeSelect" :key="key" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="联系人:">
                <el-input placeholder="请输入" type="text" v-model="tollfeeManageFrom.contact_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式:" prop="contact_phone">
                <el-input placeholder="请输入" type="text" v-model="tollfeeManageFrom.contact_phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址:">
                <el-input placeholder="请输入" type="text" v-model="tollfeeManageFrom.detail_address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="detail-btn">
          <el-row>
            <el-col :span="12" :offset="6" class="text-center">
              <el-button type="success" @click="returnBack">取消</el-button>
              <el-button type="primary" @click="saveForm" :loading="saveBtn.isLoading" :disabled="saveBtn.isLoading">保存</el-button>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'tollfeeManageChange',
  computed: {
    id() {
      return this.$route.query.id;
    },
    titleType() {
      return this.$route.query.id ? '编辑高速费公司' : '新增高速费公司'
    }
  },
  data() {
    return {
      pageLoading: false,
      detailData: {},
      tollfeeManageFrom: {
        name: '',
        type: '',
        contact_name: '',
        contact_phone: '',
        detail_address: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入高速公司名称', trigger: 'blur' },
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{1,20})$/gi, message: '姓名为1～20个汉字', trigger: 'blur' }
        ],
        contact_phone: [
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '请输入手机号或者座机号', trigger: 'blur' }
        ]
      },
      saveBtn: {
        isLoading: false,
      },
      typeSelect: [{
        label: 'A卡',
        value: 'A'
      }, {
        label: 'B卡',
        value: 'B'
      }]
    }
  },
  methods: {
    saveForm() {
      this.saveBtn.isLoading = true;
      this.$refs['tollfeeManageFrom'].validate((valid) => {
        if (valid) {
          this.saveFormAjax();
        } else {
          this.saveBtn.isLoading = false;
        }
      });
    },
    saveFormAjax() {

      let postData = Object.assign({}, this.tollfeeManageFrom);
      let apiName = 'addHighSpeed';

      if (this.id) {
        postData.id = this.id;
        apiName = 'fixHighSpeed';
      }

      this.$$http(apiName, postData).then((results) => {

        this.saveBtn.isLoading = false;

        if (results.data && results.data.code == 0 && results.data.data) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });

          this.returnBack();
        }
      }).catch((err) => {
        this.saveBtn.isLoading = false;
      })
    },
    getDetail() {
      const postData = {
        id: this.id,
      }
      this.pageLoading = true;
      this.$$http('highSpeedDetail', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
          this.tollfeeManageFrom = {
            name: this.detailData.name,
            type: this.detailData.type && this.detailData.type.key,
            contact_name: this.detailData.contact_name,
            contact_phone: this.detailData.contact_phone,
            detail_address: this.detailData.detail_address,
          }

        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    returnBack() {
      if (this.id) {
        this.$router.push({ path: `/clientManage/supplierManage/tollfeeManage/tollfeeManageDetalis/${this.id}` });
      } else {
        this.$router.push({ path: "/clientManage/supplierManage/tollfeeManage/tollfeeManageList" });
      }
    }
  },
  created() {
    this.id && this.getDetail();
  },
}

</script>
<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin: 0 0;
}

.addTailcarform {
  margin: 30px 5%;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}

#addeditTailCarPage {
  border: 1px solid rgb(222, 222, 222);
}

.alone-insurance-form {
  border: 1px solid rgb(222, 222, 222);
  border-top: none;
  padding: 30px 30px 0 20px;
}

.insurance-form-head {
  background-color: #f1f1f1;
  height: 41px;
  line-height: 41px;
}

#addeditTailCarPage {
  background-color: white;
}

.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 46px;
  text-align: center; // font-size: 18px;
  line-height: 46px;
}

.detail-main .go-return {
  margin-top: 22px;
}

.right-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  pointer: cursor;
}

</style>
