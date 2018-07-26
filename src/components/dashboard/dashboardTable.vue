<style scoped lang="less">

</style>
<template>
  
  <div class="table-list" style="margin-top:20px;width: 500px">
     <el-table
      :data="dashboardTableData" max-height="250"  size="mini" stripe>
      <el-table-column v-for="(item,key) in renderTableData" :key="key"  :prop="item.param" align="center" :label="item.title" @click="operation(item)"></el-table-column>
        <!-- <template slot-scope="scope">
          <span @click="operation(item)">{{item[]}}</span>
        </template> -->
    </el-table>

  </div>
</template>
<script>
export default {
  name: 'dashboardTable',
  data() {
    return {
      renderTableData:[],
      tableData:{
       
      }
    };
  },
  computed: {

  },
  methods: {
    fifterData:function(){
      for(var i in this.tableData){
        if(i==this.tableType){
          this.$set(this,'renderTableData',this.tableData[i]);
        }
      }
    },
    operation:function(item){
      if(item.showDetalis){

      }else if (item.goTopage){
        var pathParam="";
        if(item.timeParam){
          pathParam+=`&&${time.timeParam}=${this.sendTime[0]},${this.sendTime[1]}`
        }
        if(item.statusType){
          pathParam+=`&&${time.statusType}=${this.sendStatusType}`
        }
        this.$router.push({ path: `{item.goTopage}`+pathParam });
      }
    }
  },
  created() {
    this.fifterData();
  },
  props:['dashboardTableData','tableType','sendStatusType'],
  watch:{
    dashboardTableData: {
      handler(val, oldVal) {
        this.fifterData();
      },
      deep: true
    }
  }
};

</script>
