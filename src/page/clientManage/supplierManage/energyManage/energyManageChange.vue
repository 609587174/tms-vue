<template>
  <div id="addeditTailCarPage" class="detail-main">
    <el-container>
      <el-header class="mt-5">
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="goDetalis"></div>
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
            <el-form class="addTailcarform" label-width="150px" ref="energyManageFrom" :rules="rules" :model="energyManageFrom" status-icon :label-position="'left'">
                <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="加油气公司:" prop="name">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="energyManageFrom.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="类型:" prop="type">
                  <el-select v-model="energyManageFrom.type"  placeholder="请选择" prop="contact_name">
                    <el-option v-for="(item,key) in selectData.typeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="联系人:" prop="contact_name">
                    <el-input  placeholder="请输入" type="text" v-model="energyManageFrom.contact_name"></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="联系方式:" prop="contact_phone">
                    <el-input placeholder="请输入" type="num" v-model="energyManageFrom.contact_phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="地址:" prop="detail_address">
                     <el-input  placeholder="请输入客户名称" type="text" v-model="energyManageFrom.detail_address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" @click="operation('cancle')">取消</el-button>
                  <el-button type="primary" @click="operation('save')">保存</el-button>
                </el-col>
              </el-row>
            </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'energyManageChange',
  data() {
    var phoneVa = (rule, value, callback) => {
      if (value.match(/^\d{3,4}-?\d{7,8}$/)||value.match(/^[1][3,4,5,7,8][0-9]{9}$/)||value=="") {
        callback();
      } else {
        callback(new Error("应为11位手机号或12位座机号"));
      }
    };
    return {
      titleType: "新增加油气费公司",
      editable: false,
      pageLoading: false,
      energyManageFrom:{
        
      },
      energyManageFromArr:['name','type','contact_name','contact_phone','detail_address'],
      rules: {
        name:[
          { required: true, message: '加油气公司为1~20个字符', trigger: 'blur' },
          { min: 1, max: 20, message: '为1~20个字符', trigger: 'blur' }
        ],
        contact_phone:[
          { validator:phoneVa , trigger: 'blur' },
        ]
      },
      energyId:"",
    }
  },
  created() {
    if(this.$route.query.energyId){
      this.energyId=this.$route.query.energyId;
      this.getInitData();
    }
  },
  
  computed: {
    selectData: function() {
      return {
        typeSelect:[{verbose:"油",key:"OIL"},{verbose:"气",key:"GAS"}]
      }
    },
    returnPage: function() {
      return (this.$route.query.operate === 'edit') ? '详情页' : '列表页';
    },
  },
  methods: {
    goDetalis:function(){
      if(this.$route.query.operate === 'edit'){
        this.$router.push({ path: `/clientManage/supplierManage/energyManage/energyManageDetalis/${this.energyId}` });
      }else{
        this.$router.push({ path: "/clientManage/supplierManage/energyManage/energyManageList" });
      }
    },
    updateFrom: function() {
      this.validatorFrom('energyManageFrom',(results)=>{
        if(results){
          var sendData = this.pbFunc.deepcopy(this.energyManageFrom);
          sendData = this.pbFunc.fifterObjIsNull(sendData);
          sendData = this.pbFunc.fifterbyArr(sendData, this.energyManageFromArr);
          sendData.id=this.energyId;
          this.$$http('updateEnergy', sendData).then((result) => {
            this.pageLoading = false;
            if (result.data.code == 0) {
              this.goDetalis();
            }
          }).catch(() => {
            this.pageLoading = false;
          });
        }
      });
    },
    getInitData:function(){
      this.pageLoading = true;
      this.$$http('energyDetalis', { id: this.energyId }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.energyManageFrom = results.data.data;
          this.energyManageFrom.type=this.energyManageFrom.type.key;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    validatorFrom: function(formName, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback(true);
        } else {
          callback(false);
          return false;
        }
      });
    },
    createFrom: function() {
      this.validatorFrom('energyManageFrom',(results)=>{
        if(results){
          var sendData = this.pbFunc.deepcopy(this.energyManageFrom);
          sendData = this.pbFunc.fifterObjIsNull(sendData);
          sendData = this.pbFunc.fifterbyArr(sendData, this.energyManageFromArr)
          this.$$http('creatEnergy', sendData).then((result) => {
            this.pageLoading = false;
            if (result.data.code == 0) {
              this.goDetalis();
            }
          }).catch(() => {
            this.pageLoading = false;
          });
        }
      });
    },
    operation:function(type){
      if(type=="cancle"){
        if(this.$route.query.operate === 'edit'){
          this.$router.push({ path: "/clientManage/supplierManage/energyManage/energyManageDetalis?energyId=" + this.energyId });
        }else{
          this.$router.push({ path: "/clientManage/supplierManage/energyManage/energyManageList" });
        }
      }else if(type=="save"){
        if(this.$route.query.operate === 'edit'){
          this.updateFrom();
        }else{
          this.createFrom();
        }
      }
    },
  }
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
