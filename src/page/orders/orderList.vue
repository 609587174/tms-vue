<style scoped lang="less">
.listOrder {
  margin-top: 35px;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="公有提货单" name="first">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom" :rules="rules">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen">
                    <el-select v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
                  </el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="8">
                  <el-form-item label="运单日期:" prop="buyInsuranceDate">
                    <el-date-picker v-model="seachListParam.YTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装货日期:" prop="buyInsuranceDate">
                    <el-date-picker v-model="seachListParam.TTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卸货时间:" prop="buyInsuranceDate">
                    <el-date-picker v-model="seachListParam.XTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="listOrder nav-tab">
      <el-tabs v-model="fifterName" type="card" @tab-click="clickFifter">
        <el-tab-pane label="全部" name="all">
          <div v-if="fifterName=='all'">
            <keep-alive>
              <orderFifterList :ListData="listData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待指派" name="assign">
          <div v-if="fifterName=='assign'">
            <keep-alive>
              <orderFifterList :ListData="listData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="waitConfirm">
          <div v-if="fifterName=='waitConfirm'">
            <keep-alive>
              <orderFifterList :ListData="listData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已确认" name="confirm">
          <div v-if="fifterName=='confirm'">
            <keep-alive>
              <orderFifterList :ListData="listData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史" name="history">
          <div v-if="fifterName=='history'">
            <keep-alive>
              <orderFifterList :ListData="listData"></orderFifterList>
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
  components: {
    orderFifterList: () =>
      import ("../../components/order/orderFifterList.vue")
  },
  data() {
    return {
      fifterParam: {
        keyword: "",
        field: "",
      },
      seachListParam: {
        YTime: [],
        XTime: [],
        ZTime: [],
        brand: '',
        page: 1
      },
      listData: [{
        orderid: '订单号:12987122',
        TYcompany: '托运方:XXX公司',
        CYcompany: '承运方:XXX公司',
        JHweight: '标准运费:1.56/吨/公里',
        desc: '备注:上海市普陀区真北路',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        orderid: '订单号:12987122',
        TYcompany: '托运方:XXX公司',
        CYcompany: '承运方:XXX公司',
        JHweight: '标准运费:1.56/吨/公里',
        desc: '备注:上海市普陀区真北路',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店'
      }, {
        orderid: '订单号:12987122',
        TYcompany: '托运方:XXX公司',
        CYcompany: '承运方:XXX公司',
        JHweight: '标准运费:1.56/吨/公里',
        desc: '备注:上海市普陀区真北路',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店'
      }, {
        orderid: '订单号:12987122',
        TYcompany: '托运方:XXX公司',
        CYcompany: '承运方:XXX公司',
        JHweight: '标准运费:1.56/吨/公里',
        desc: '备注:上海市普陀区真北路',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店'
      }],
      rules: {},
      activeName: 'first',
      fifterName: 'all',
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'plate_number', value: '挂车牌' },
          { id: 'vin_number', value: '车架号' },
        ]
      },
    };
  },
  computed: {

  },
  methods: {
    clicktabs: function() {

    },
    searchList: function() {

    },
    clickFifter: function() {

    }
  },
  created() {

  }
};

</script>
