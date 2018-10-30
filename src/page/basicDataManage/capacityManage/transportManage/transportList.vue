<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="运力管理" name="transportManage">
          <capacity-list></capacity-list>
        </el-tab-pane>
        <el-tab-pane label="人员管理" name="personManage"></el-tab-pane>
        <el-tab-pane label="车辆管理" name="carManage"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import capacityList from '@/components/transportPowerManage/capacityManage/capacityList';
export default {
  name: 'transportList',
  components:{
    capacityList:capacityList
  },
  computed: {

  },

  data() {
    return {
      activeName:'transportManage'
    }
  },
  methods: {
    handleClick(tab, event){
      if(tab.name === 'personManage'){
        this.$router.push({ path: `/basicDataManage/capacityManage/personManage/personListManage` });
      }else if(tab.name === 'carManage'){
        this.$router.push({ path: `/basicDataManage/capacityManage/carManage/tractorManage` });
      }
    }
  },
  activated: function() {
    this.activeName = 'transportManage';
  },

}

</script>
<style>


</style>
