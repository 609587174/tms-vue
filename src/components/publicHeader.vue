<template>
  <a href="" title="胜通tms" class="logo">胜通tms</a>
  <div class="nav">
    <div class="usermenu" v-if="user.name">
      欢迎您：{{user.name}}
      <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
      <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'publicHeader',
  data: function() {
    return {
      user: { name: "aa" },
    }
  }
}

</script>
<style scoped>


</style>
