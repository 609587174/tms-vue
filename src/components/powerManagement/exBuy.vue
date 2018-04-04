<template>
  <div id="searchList" >

      <div>
        <div style="margin-top: 15px;">
           <div style="float:left;height: 40px;line-height: 40px;font-size: 14px;">筛选维度：</div><el-input placeholder="请输入内容" v-model="input2" class="input-with-select">
            <el-select v-model="selectValues" slot="prepend" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
          </el-select>
          <el-button slot="append" type="primary">搜索</el-button>
        </el-input>
        </div>
      </div>

      <div>
        <div></div>
        <div></div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'carBaseInfo',
  computed: {
        addnum () {
        return this.$store.state.common.initAddnum+1
      }
    },
  data () {
    return {
      msg:'子组件' , 
      selectValues:'',
      input2:"",
      showMessage:this.$store.state.common.showAmessage,
       options: [{
          value: '1',
          label: '客户管理'
        }, {
          value: '2',
          label: '客户简称'
        }, {
          value: '3',
          label: '客户单号'
        }, {
          value: '4',
          label: '供应商'
        }],
    }
  },
  methods :{
     clickbutton:function(){
      console.log(this);
      this.showMessage="改变后";
       this.$store.dispatch("ChangeinitParam","newValues");
     }
  }
  
}

</script>

<style>
  #searchList{
    margin:30px 0;
    padding: 0 30px;
    
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-input-group{
    width: 80%;
  }
</style>
