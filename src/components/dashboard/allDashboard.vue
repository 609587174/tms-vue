<style scoped lang="less">
.dispatchTitle{
  margin:40px 0 0 10px;
  padding:1px;
  height:40px;
  line-height:40px;
}
.dashboradContent{
  border-top:none;
  margin:0 25px 0px 25px;
  padding: 1px;
  font-weight:bold;
}
.el-col-4{
  width:190px;
}
.isheight{
  height:0px;
  margin:0 0 0 10px;
}
.marginNone{
  margin:0 0 0 10px;
}
</style>
<template>
  <div v-loading="pageLoading" style="background-color:white" class="detail-main">
    
    <div v-for="(itemList,index) in renderDashboard" :key="index">
      <div class="dashboradContent">
        <div class="dispatchTitle border-bottom" v-bind:class="{isheight:itemList.title=='',marginNone:index>=1}">{{itemList.title}}</div>
        <el-form class="search-filters-form" label-width="80px" status-icon ref="seachHeadCarListFrom" v-if="itemList.searchShow" style="margin-top:30px;">
          <el-row>
            <el-col :span="8">
              <el-form-item align="right" label="时间搜索:" >
                  <el-date-picker  style="width:100%" :editable="editable"  :clearable="clearable" v-model="itemList.searchData" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left:20px;">
              <el-button @click="getDashboard(renderDashboard)">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row  v-for="(Ritem,Rindex) in itemList.renderDashboard" :gutter="20"  style="margin:0 0 40px 0" :key="Rindex">
          <el-col  v-for="(item,itemIndex) in Ritem"  :span="4" style="margin-top:15px;" :key="item.key">
            <dashboradSqure   :dashboradSqureData="item" @clickExtendTable="clickExtendTable" :sendTime="itemList.searchData" :sendTimeName="itemList.sendTimeName" :activeData="extendgetData"></dashboradSqure> 
          </el-col>
          <el-collapse-transition>
          <el-col :span="24" :id="'extendTab-'+extendgetData.key" v-if="Rindex==extendgetData.index&&extendgetData.extendTableType==itemList.type&&tableShowSatus"><dashboardTable :dashboardTableData="extendData[extendgetData.key]" :tableType="extendgetData.key" :time="itemList.searchData"></dashboardTable></el-col>
        </el-collapse-transition>
        </el-row>

      </div>
    </div>
  </div>
</template>
<script>
import  dashboradSqure from '@/components/dashboard/dashboardSqure';
import  dashboardTable from '@/components/dashboard/dashboardTable';
export default {
  name: 'allDashborad',
  components: {
    dashboradSqure: dashboradSqure,
    dashboardTable: dashboardTable
  },
  data() {
    return {
      pageLoading:false,
      editable:false,
      clearable:false,
      extendData:{},
      extendgetData:{},
      tableShowSatus:false,
      defaultStart:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()-1) + " 16:00:00",
      defaultEnd:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + " 16:00:00",
      allDashboard:{
        'dispatchDashboard':[
          {//采购概览
          'dashboardSqureData':[
              {key:'appoint_count',value:'待添加车辆订单',goUrl:'/orders/pickupOrders/ordersList?goTo=appoint',dimension:"单"},
              {key:'loading_waiting_audit_count',value:'待审核装车榜单',goUrl:'/logisticsManage/consignmentOrders/ordersList?goTo=first&secondActiveName=loading_waiting_audit',dimension:"单"},
              {key:'confirm_match_count',value:'待确认卸货单',goUrl:'/logisticsManage/consignmentOrders/ordersList?goTo=second&secondActiveName=confirm_match',dimension:"单"},
              {key:'unloading_waiting_audit_count',value:'待审核卸车榜单',goUrl:'/logisticsManage/consignmentOrders/ordersList?goTo=third&secondActiveName=unloading_waiting_audit',dimension:"单"},
              {key:'waiting_settlement_count',value:'待提交结算',goUrl:'/logisticsManage/consignmentOrders/ordersList?goTo=fourth&secondActiveName=waiting_settlement',dimension:"单"},
            ],
            'searchShow':false,
            'type':'dispatch_centre_schedule',
            'title':'待办事项',
            'urlSend':'getDashboard',
          }
        ],
        'importStatisticsDashboard':[
          {//导入统计概览
          'dashboardSqureData':[
              {key:'match_cash_cost_count',value:'已匹配(现金费用)',goUrl:'/statistics/costManage/cashCostManage/cashCostList?is_matching=yes',dimension:"笔"},
              {key:'unmatch_cash_cost_count',value:'未匹配(现金费用)',goUrl:'/statistics/costManage/cashCostManage/cashCostList?is_matching=no',dimension:"笔"},
            ],
            'searchShow':true,
            'type':'import_dashborad_cash_cost',
            'title':'数据概览',
            'searchData':[],
            'urlSend':'getTmsDashboard',
            'sendTimeName':'costTime'
          },
          {//导入统计概览
          'dashboardSqureData':[
              {key:'match_highway_count',value:'已匹配(高速费)',goUrl:'/statistics/costManage/publicCostManage/tollFee/tollFeeList?is_matching=yes',dimension:"笔"},
              {key:'unmatch_highway_count',value:'未匹配(高速费)',goUrl:'/statistics/costManage/publicCostManage/tollFee/tollFeeList?is_matching=no',dimension:"笔"},
              {key:'match_corprate_count',value:'已匹配(油／气费)',goUrl:'/statistics/costManage/publicCostManage/oilGas/oilGasList?is_matching=yes',dimension:"笔"},
              {key:'unmatch_corprate_count',value:'未匹配(油／气费)',goUrl:'/statistics/costManage/publicCostManage/oilGas/oilGasList?is_matching=no',dimension:"笔"}
            ],
            'searchShow':true,
            'type':'import_dashborad_highway',
            'title':'',
            'searchData':[],
            'urlSend':'getTmsDashboard',
            'sendTimeName':'costTime',
          }
        ],
      },
      renderDashboard:[],
    };
  },
  props:['dispatchPage'],
  computed: {
    
  },
  methods: {
    clickExtendTable:function(backItem,isOnlySearch){
      var vm=this;
      if(this.extendgetData&&(this.extendgetData.key==backItem.key)&&!isOnlySearch){
        vm.$set(this,'tableShowSatus',!this.tableShowSatus);
        vm.extendgetData={};
      }else{
        if(backItem.extendTable){
          this.allDashboard[this.dispatchPage].forEach(item=>{
            item.dashboardSqureData.forEach((Iitem)=>{
              if(Iitem.key==backItem.key){
                Iitem.extendTableType=item.type;
                var sendData={};
                sendData.filter_type=Iitem.key;
                sendData.start_time=item.searchData[0];
                sendData.end_time=item.searchData[1];
                vm.$$http('getDetalisDashboard',sendData).then((results)=>{
                  if(results.data.code==0){
                    vm.$set(vm.extendData,Iitem.key,results.data.data);
                    vm.$set(vm,'extendgetData',Iitem);
                    vm.tableShowSatus=true;
                  }
                });
              }
            });
          });
        }
      }
    },
    getDashboard:function(dashboardSearch){
      this.pageLoading=true;
      var vm=this;
      var searchArr=[]
      if(dashboardSearch){
        searchArr=dashboardSearch
      }else{
        searchArr=this.allDashboard[vm.dispatchPage];
      }
      const promises = searchArr.map(function (item) {
        return new Promise((resolve, reject) => {
          var sendData={};
          if(item['searchData']){
            if(item['searchData'].length==0){
              sendData.start_time=vm.defaultStart;
              sendData.end_time=vm.defaultEnd;
              item.searchData=[vm.defaultStart,vm.defaultEnd];
            }else{
              sendData.start_time=item['searchData'][0];
              sendData.end_time=item['searchData'][1];

            }
          }
          sendData.filter_type=item['type'];
          vm.$$http(item.urlSend,sendData).then((results)=>{
            if(results.data.code==0){
              vm.filterDashboard(results.data.data,item);
              resolve(results);
            }else{
              vm.pageLoading=false;
              reject(results);
            }
          }).catch((err) => {
            reject(err);
          })
        })
      });
      // this.$$http('getDashboard',{}).then((results)=>{
      //   this.pageLoading=false;
      //   if(results.data.code==0){
      //     this.filterDashboard(results.data.data);
      //   }
      // }).catch(()=>{
      //   this.pageLoading=false;
      // });
      if(this.extendgetData&&this.tableShowSatus){
        this.clickExtendTable(this.extendgetData,true);
      }
      Promise.all(promises).then(result => {
        if(result.length==searchArr.length){
          vm.pageLoading=false;
        }
      })
      .catch(e => console.log(e));
    },
    filterDashboard:function(allDashboardData,Dashboard){
      var renderDashboardList=[];
      var nowDashboard=Dashboard.dashboardSqureData;
      var num=0;
      var index=0;
      Dashboard.renderDashboard=[];
      for(let N in nowDashboard){
        for(let D in allDashboardData){
          if(nowDashboard[N].key==D){
            num++;
            nowDashboard[N].index=index;
            this.$set(nowDashboard[N],'num',allDashboardData[D]);
            renderDashboardList.push(nowDashboard[N]);
            if(num==5){
              if(!Dashboard.renderDashboard){
                Dashboard.renderDashboard=[];
              }
              Dashboard.renderDashboard.push(renderDashboardList);
              renderDashboardList=[];
              index++;
            }
          }
        }
      }
      if(renderDashboardList.length>0){
        if(!Dashboard.renderDashboard){
          Dashboard.renderDashboard=[];
        }
        Dashboard.renderDashboard.push(renderDashboardList);
      }
      this.$set(this,'renderDashboard',this.allDashboard[this.dispatchPage]);
      //this.renderDashboard=;
    }
  },
  created() {
    this.getDashboard();
  },
  watch: {
    renderDashboard: {
      handler(val, oldVal) {

      },
      deep: true
    }
  }
};

</script>
