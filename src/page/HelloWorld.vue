<template>
  <div class="hello">
    <div class="linkList">
      <div v-bind:class="{ 'navActive': navList.isCarPage}" @click="toOtherTab('isCarPage')"><router-link to="/carBaseInfo" >贸易单</router-link></div>
      <div v-bind:class="{ 'navActive': navList.isexPro }"  @click="toOtherTab('isexPro')"> <router-link to="/exPro" >外提单</router-link></div>
      <div v-bind:class="{ 'navActive': navList.isexBuy }"  @click="toOtherTab('isexBuy')"><router-link to="/exBuy" >外采单</router-link></div>
    </div>
    <div style="margin-top:30;">
        <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.$router.path,
      navList:{
        isCarPage:this.$router.currentRoute.path==='/carBaseInfo'?true:false,
        isexPro:this.$router.currentRoute.path==='/exPro'?true:false,
        isexBuy:this.$router.currentRoute.path==='/exBuy'?true:false
      }
    }
  },
  created:function(){  
    console.log(this.$router.currentRoute.path);
  },
  methods:{
    toOtherTab:function(type){
        this.navList.isCarPage=false;
        this.navList.isexPro=false;
        this.navList.isexBuy=false;
        this.navList[type]=true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
a {
    color: #42b983;
    text-decoration:none;
    display: block;
    padding: 0 20px;
    margin-right: 5px;
    font-size: 16px;
    line-height: 42px;
    color: #979797;
    border: 1px solid #ccc;
    border-radius: 8px 8px 0 0;
    background: #f6fbff;
}
.navActive a{
    color: #434343;
    border-bottom-color: #fff;
    background: #fff;
}
.linkList {
  height: 40px;
  div{
    height: 50px;
  }
}
.linkList div{
    float: left;
}
</style>
