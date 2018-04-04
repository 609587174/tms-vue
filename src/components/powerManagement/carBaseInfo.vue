<template>
  <div id="app高规格">
    <el-button type="primary" disabled>{{msg}}</el-button>
    <el-button type="primary" disabled>{{this.$store.state.common.showAmessage}}</el-button>
    <el-button type="primary" disabled>{{showMessage}}</el-button>
    <el-button type="primary" @click='clickbutton'>{{addnum}}</el-button>
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
      showMessage:this.$store.state.common.showAmessage 
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

</style>
