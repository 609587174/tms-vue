<style scoped lang="less">
.dispatchTitle{
  margin:40px 0 0 15px;
  padding-left:10px;
  border-bottom:1px solid lightgray;
  height:30px;
  line-height:30px;
}
.dashboradContent{
  border:1px solid lightgray;
  border-top:none;
  margin:0 25px 40px 25px;
  padding: 1px;

}
</style>
<template>
  <div v-loading="pageLoading" style="background-color:white" class="detail-main">
   <div class="detail-list detail-form" style="margin:30px 25px 0px 25px;border: 1px solid lightgray;">
    <div class="detail-form-title" style="height: 30px;line-height: 30px;margin:0 ">
      <el-row>
          <el-col :span="2" >
            概览
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dashboradContent">
      <div class="dispatchTitle border-bottom">{{allDashboradTitle[dispatchPage]}}</div>
      <el-row v-for="(itemList,index) in renderDashboard" :key="index" :gutter="40"   style="margin:40px 0">
        <el-col v-for="(item,itemIndex) in itemList" :key="item.key"  :span="4">
          <dashboradSqure :dashboradSqureData="item"></dashboradSqure>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import  dashboradSqure from '@/components/dashboard/dashboardSqure';
export default {
  name: 'allDashborad',
  components: {
    dashboradSqure: dashboradSqure
  },
  data() {
    
    return {
      pageLoading:false,
      allDashboard:{
        'dispatchDashboard':[
          {key:'appoint_count',value:'待添加车辆订单'},
          {key:'loading_waiting_audit_count',value:'待审核装车榜单'},
          {key:'confirm_match_count',value:'待确认卸货单'},
          {key:'unloading_waiting_audit_count',value:'待审核卸车榜单'},
          {key:'waiting_settlement_count',value:'待提交结算'},
        ]
      },
      renderDashboard:[],
      allDashboradTitle:{
        'dispatchDashboard':"物流调度待办事项"
      }
    };
  },
  props:['dispatchPage'],
  computed: {

  },
  methods: {
    getDashboard:function(){
      this.pageLoading=true;
      this.$$http('getDashboard',{}).then((results)=>{
        this.pageLoading=false;
        if(results.data.code==0){
          this.filterDashboard(results.data.data);
        }
      }).catch(()=>{
        this.pageLoading=false;
      });
    },
    filterDashboard:function(allDashboardData){
      var nowDashboard=this.pbFunc.deepcopy(this.allDashboard[this.dispatchPage]);
      var renderDashboardList=[];
      var num=0;
      for(let N in nowDashboard){
        for(let D in allDashboardData){
          if(nowDashboard[N].key==D){
            num++;
            nowDashboard[N].num=allDashboardData[D];
            renderDashboardList.push(nowDashboard[N]);
            if(num==5){
              this.renderDashboard.push(renderDashboardList);
              renderDashboardList=[];
            }
          }
        }
      }
      if(renderDashboardList.length>0){
        this.renderDashboard.push(renderDashboardList);
      }
    }
  },
  created() {
    this.getDashboard();
  }
};

</script>
