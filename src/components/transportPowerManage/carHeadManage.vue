<template>
  <el-tabs v-model="activeName" @tab-click="clicktabs" type="border-card">
    <el-tab-pane label="牵引车管理" name="first">
      <el-button @click="addHeadCarPage">新增</el-button>
    </el-tab-pane>
    <el-tab-pane label="挂车管理" name="second">
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'carBaseInfo',
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    addHeadCarPage: function() {
      this.$router.push({ path: "/transportPowerManage/carManage/addCarHeadManage" });
    },
    clicktabs: function() {

    }
  }
}

</script>
<style>


</style>
