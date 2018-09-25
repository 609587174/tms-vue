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
        <transition name="el-fade-in-linear">
            <el-form class="addTailcarform" label-width="150px" ref="energyManageFrom" :rules="rules" :model="energyManageFrom" status-icon :label-position="'left'">
              
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" >取消</el-button>
                  <el-button type="primary" >保存</el-button>
                </el-col>
              </el-row>
            </div>
        </transition>
        
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'energyManageChange',
  data() {
    return {
      titleType: "新增加油气费公司",
      editable: false,
      pageLoading: false,
      energyManageFrom:{

      },
      rules: {

      }
    }
  },
  created() {
  
  },
  goDetalis:function(){

  },
  computed: {
    selectData: function() {
      return {
        
      }
    },
    returnPage: function() {
      return (this.$route.query.operate === 'edit') ? '详情页' : '列表页';
    },
  },
  methods: {
    VaDate:function(){
      
    },
    updateFrom: function(operation, formName) {
      
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
    createFrom: function(operation, formName) {
      
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
