<style scoped lang="less">
.listOrder {
  margin-top: 35px;
}

</style>
<template>
  <div>
    <div class="nav-tab" v-loading="pageLoading">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs"  v-if="show">
        <el-tab-pane :label="statusName.ALL_DRIVER_COUNT" name="first">
          <div v-if="activeName=='first'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs" :countParam="allcounts['ALL_DRIVER_COUNT']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.ALL_MATCH_COUNT" name="second">
          <div v-if="activeName=='second'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs" :countParam="allcounts['ALL_MATCH_COUNT']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.ALL_UNLOAD_COUNT" name="third">
          <div v-if="activeName=='third'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs" :countParam="allcounts['ALL_UNLOAD_COUNT']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.ALL_SETTLEMENT_COUNT" name="fourth">
          <div v-if="activeName=='fourth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs" :countParam="allcounts['ALL_SETTLEMENT_COUNT']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.ALL_CHANGE_COUNT" name="fifth" >
          <div v-if="activeName=='fifth'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs" :countParam="allcounts['ALL_CHANGE_COUNT']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.ALL_FINISH_COUNT" name="sxith">
          <div v-if="activeName=='sxith'">
            <keep-alive>
              <orderStatusComonents :status="activeName" @changeTab="changeTabs" :countParam="allcounts['ALL_FINISH_COUNT']"></orderStatusComonents>
            </keep-alive>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ordersList',
  pageLoading:false,
  components: {
    orderStatusComonents: () =>
      import ("../../../components/order/orderStatusComonents.vue")
  },
  data() {
    return {
      pageStatus: false,
      pageLoading: false,
      fifterParam: {
        keyword: "",
        field: "",
      },
      show:false,
       statusName:{
        ALL_DRIVER_COUNT:'装车',
        ALL_MATCH_COUNT:'匹配卸车',
        ALL_UNLOAD_COUNT:'卸车',
        ALL_SETTLEMENT_COUNT:'结算',
        ALL_CHANGE_COUNT:'变更中',
        ALL_FINISH_COUNT:'历史'
      },
      allcounts:{
        'ALL_DRIVER_COUNT':{},
        'ALL_MATCH_COUNT':{},
        'ALL_UNLOAD_COUNT':{},
        'ALL_SETTLEMENT_COUNT':{},
        'ALL_CHANGE_COUNT':{},
        'ALL_DRIVER_COUNT':{},
      },
      timeParam: [],
      listFifterData: [],
      rules: {},
      activeName: 'first',
      fifterName: 'all',
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'trader_name', value: '托运方' },
          { id: 'order_number', value: '订单号' },
          { id: 'fluid_name', value: '液厂名' },
          { id: 'waybill_number', value: '运单号' },
        ]
      },
    };
  },
  computed: {

  },
  created() {
    this.pageLoading=true;
    this.$$http("getConCount",{}).then(results=>{
        var vm=this;
        vm.show=true;
        this.pageLoading=false;
        if(results.data.code==0){
          var dataBody=results.data.data;
          vm.allcounts=dataBody;
          for(var i in dataBody){
            var nums=0;
            for(var j in dataBody[i]){
                nums+=dataBody[i][j];
            }
            if(nums>99){
              nums="99+";
            }
            vm.statusName[i]+="("+nums+")";
          }
        }
      }).catch(()=>{

      });
  },
  methods: {
    clicktabs: function(targetName) {

    },
    changeTabs: function(fifterName) {
      this.activeName = fifterName;
    },
    goAddNewOder: function() {
      this.$router.push({ path: "/orders/pickupOrders/addNewPickUpOrder" });
    },

  },

};

</script>
