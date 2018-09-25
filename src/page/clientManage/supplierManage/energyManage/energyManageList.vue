<style scoped lang="less">

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="油气费管理" name="energy">
          asd
        </el-tab-pane>
        <el-tab-pane label="高速费管理" name="tollfee">

      </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tollfeeManageList',
  computed: {
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'energy',
    }
  },
  methods: {
    getList: function() {
      

    },
    handleClick:function(){

    },
    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    }
  },

  created: function() {

  }
}

</script>
