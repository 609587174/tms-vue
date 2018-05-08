<style scoped lang="less">
.el-tabs__item {
  margin-left: 15px;
}

</style>
<template>
  <el-tabs v-model="activeName" @tab-click="clicktabs" type="border-card">
    <el-tab-pane label="牵引车管理" name="first">
    </el-tab-pane>
    <el-tab-pane label="挂车管理" name="second">
      <el-button @click="addTailCarPage">新增</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'carTailManage',
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    addTailCarPage: function() {
      this.$router.push({ path: "/transportPowerManage/carManage/addEditCarTailManage" });
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: "/transportPowerManage/carManage/carHeadManage" });
      }
    }
  }
}

</script>
