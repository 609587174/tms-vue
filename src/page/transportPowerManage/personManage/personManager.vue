<template>
  <div>
    <el-tabs @tab-click="handleClick">
      <el-tab-pane label="人员管理" name="first">
      </el-tab-pane>
    </el-tabs>
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'carBaseInfo',
  computed: {

  },
  data() {
    return {

    }
  },
  methods: {
    handleClick: function(tab, event) {
      console.log('tab', tab);
    }
  }

}

</script>
<style>


</style>
