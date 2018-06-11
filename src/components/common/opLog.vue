<style scoped lang="less">
.table-list {
  border-bottom: 0;
}

</style>
<template>
  <div>
    <div class="table-list">
      <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="logLoading">
        <el-table-column label="操作人" prop="operator.nick_name">
        </el-table-column>
        <el-table-column label="操作" prop="operation_type[0].verbose">
        </el-table-column>
        <el-table-column label="说明">
          <template slot-scope="scope">
            <p v-for="(item, key) in scope.row.remarks">{{item}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" prop="operation_time">
        </el-table-column>
      </el-table>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next,jumper" :page-count="pagination.totalPage" :page-size="pagination.pageSize" :current-page.sync="pagination.currentPage" @current-change="pageChange" v-if="!logLoading && pagination.totalPage>1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'opLog',
  computed: {

  },
  data() {
    return {}
  },
  methods: {
    pageChange: function() {
      setTimeout(() => {
        this.$emit('refreshlog', this.pagination.currentPage);
      });
    }
  },
  created() {},
  activated() {},
  props: {
    pagination: Object,
    tableData: Array,
    logLoading: Boolean
  },
}

</script>
