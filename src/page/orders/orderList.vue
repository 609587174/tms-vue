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
                  <el-form-item label="计划装货时间:" prop="buyInsuranceDate">
                    <el-date-picker v-model="seachListParam.YTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
              <orderFifterList :ListData="listFifterData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待指派" name="assign">
          <div v-if="fifterName=='assign'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="waitConfirm">
          <div v-if="fifterName=='waitConfirm'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已确认" name="confirm">
          <div v-if="fifterName=='confirm'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史" name="history">
          <div v-if="fifterName=='history'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData"></orderFifterList>
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
      listFifterData = [],
      listData: [{
        "id": "订单号:c2354b01-5779-4b8c-99f0-ff10af9cfaf8",
        "supplier": {
          "id": "b7bb9038-f983-44f4-94ea-523d2b77de22",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_name": "承运方:诸城新奥燃气有限公司",
          "supplier_abbreviation": "",
          "business_type": "其它",
          "city": "",
          "address": "",
          "contact_person": "",
          "contact_phone": "",
          "supplier_type": "0",
          "contract_url": null,
          "contract_date": null,
          "contract_limit_date": null,
          "operator_id": null
        },
        "fluid": {
          "id": "90c77f10-7305-4710-8baa-e4cbbc6ab7d0",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_id": "9db34e5a-ef65-45ca-9fb1-712422a0019c",
          "fluid_name": "文安驿",
          "employee_id": null,
          "gas_type": "",
          "province": "陕西省",
          "city": "延安市",
          "area": "延川县",
          "address": "文安驿镇",
          "actual_address": "文安驿",
          "linkman": "",
          "contact_phone": "",
          "map_position": "ee66314b-a315-46b7-aa88-9657d387575f"
        },
        "yunfei": "标准运费:15.2/吨/公里",
        "created_at": "2018-05-16 11:18:03",
        "updated_at": "2018-05-16 11:18:03",
        "created_timestamp": 1526440683,
        "is_deleted": 0,
        "order_number": "201805160003",
        "status": "confirmed",
        "plan_time": "2018-05-16",
        "require_car_number": 0,
        "plan_tonnage": "15吨",
        "discount_price": "0.000",
        "business_price": "0.000",
        "unit_price": "0.000",
        "desc": "111",
        "unload_area": null,
        "carry_type": "c9c159a0-1722-4cff-b896-df31f20b32e3",
        "unload_area_info": [{ address: "瑞美丰润宝龙", distance: "200km" }, { address: "富海玉田祥泰", distance: "500km" }],
        "carry_type_info": {
          "id": "c9c159a0-1722-4cff-b896-df31f20b32e3",
          "created_at": "2018-05-16 11:13:37",
          "updated_at": "2018-05-16 11:13:39",
          "created_timestamp": 234343,
          "is_deleted": 0,
          "consignment_type": "own",
          "carrier": "[]",
          "carry_name": "托运方:四川浩海"
        }
      }, {
        "id": "订单号:c2354b01-5779-4b8c-99f0-ff10af9cfaf8",
        "supplier": {
          "id": "b7bb9038-f983-44f4-94ea-523d2b77de22",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_name": "承运方:诸城新奥燃气有限公司",
          "supplier_abbreviation": "",
          "business_type": "其它",
          "city": "",
          "address": "",
          "contact_person": "",
          "contact_phone": "",
          "supplier_type": "0",
          "contract_url": null,
          "contract_date": null,
          "contract_limit_date": null,
          "operator_id": null
        },
        "fluid": {
          "id": "90c77f10-7305-4710-8baa-e4cbbc6ab7d0",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_id": "9db34e5a-ef65-45ca-9fb1-712422a0019c",
          "fluid_name": "文安驿",
          "employee_id": null,
          "gas_type": "",
          "province": "陕西省",
          "city": "延安市",
          "area": "延川县",
          "address": "文安驿镇",
          "actual_address": "文安驿",
          "linkman": "",
          "contact_phone": "",
          "map_position": "ee66314b-a315-46b7-aa88-9657d387575f"
        },
        "yunfei": "标准运费:15.2/吨/公里",
        "created_at": "2018-05-16 11:18:03",
        "updated_at": "2018-05-16 11:18:03",
        "created_timestamp": 1526440683,
        "is_deleted": 0,
        "order_number": "201805160003",
        "status": "appoint",
        "plan_time": "2018-05-16",
        "require_car_number": 0,
        "plan_tonnage": "15吨",
        "discount_price": "0.000",
        "business_price": "0.000",
        "unit_price": "0.000",
        "desc": "这个很危险哦,小心",
        "unload_area": null,
        "carry_type": "c9c159a0-1722-4cff-b896-df31f20b32e3",
        "unload_area_info": [{ address: "瑞美丰润宝龙", distance: "200km" }, { address: "富海玉田祥泰", distance: "500km" }],
        "carry_type_info": {
          "id": "c9c159a0-1722-4cff-b896-df31f20b32e3",
          "created_at": "2018-05-16 11:13:37",
          "updated_at": "2018-05-16 11:13:39",
          "created_timestamp": 234343,
          "is_deleted": 0,
          "consignment_type": "own",
          "carrier": "[]",
          "carry_name": "托运方:四川浩海"
        }
      }, {
        "id": "订单号:c2354b01-5779-4b8c-99f0-ff10af9cfaf8",
        "supplier": {
          "id": "b7bb9038-f983-44f4-94ea-523d2b77de22",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_name": "承运方:诸城新奥燃气有限公司",
          "supplier_abbreviation": "",
          "business_type": "其它",
          "city": "",
          "address": "",
          "contact_person": "",
          "contact_phone": "",
          "supplier_type": "0",
          "contract_url": null,
          "contract_date": null,
          "contract_limit_date": null,
          "operator_id": null
        },
        "fluid": {
          "id": "90c77f10-7305-4710-8baa-e4cbbc6ab7d0",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_id": "9db34e5a-ef65-45ca-9fb1-712422a0019c",
          "fluid_name": "文安驿",
          "employee_id": null,
          "gas_type": "",
          "province": "陕西省",
          "city": "延安市",
          "area": "延川县",
          "address": "文安驿镇",
          "actual_address": "文安驿",
          "linkman": "",
          "contact_phone": "",
          "map_position": "ee66314b-a315-46b7-aa88-9657d387575f"
        },
        "yunfei": "标准运费:15.2/吨/公里",
        "created_at": "2018-05-16 11:18:03",
        "updated_at": "2018-05-16 11:18:03",
        "created_timestamp": 1526440683,
        "is_deleted": 0,
        "order_number": "201805160003",
        "status": "determine",
        "plan_time": "2018-05-16",
        "require_car_number": 0,
        "plan_tonnage": "15吨",
        "discount_price": "0.000",
        "business_price": "0.000",
        "unit_price": "0.000",
        "desc": "这个很危险哦,小心",
        "unload_area": null,
        "carry_type": "c9c159a0-1722-4cff-b896-df31f20b32e3",
        "unload_area_info": [{ address: "瑞美丰润宝龙", distance: "200km" }, { address: "富海玉田祥泰", distance: "500km" }],
        "carry_type_info": {
          "id": "c9c159a0-1722-4cff-b896-df31f20b32e3",
          "created_at": "2018-05-16 11:13:37",
          "updated_at": "2018-05-16 11:13:39",
          "created_timestamp": 234343,
          "is_deleted": 0,
          "consignment_type": "own",
          "carrier": "[]",
          "carry_name": "托运方:四川浩海"
        }
      }, {
        "id": "订单号:c2354b01-5779-4b8c-99f0-ff10af9cfaf8",
        "supplier": {
          "id": "b7bb9038-f983-44f4-94ea-523d2b77de22",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_name": "承运方:诸城新奥燃气有限公司",
          "supplier_abbreviation": "",
          "business_type": "其它",
          "city": "",
          "address": "",
          "contact_person": "",
          "contact_phone": "",
          "supplier_type": "0",
          "contract_url": null,
          "contract_date": null,
          "contract_limit_date": null,
          "operator_id": null
        },
        "fluid": {
          "id": "90c77f10-7305-4710-8baa-e4cbbc6ab7d0",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_id": "9db34e5a-ef65-45ca-9fb1-712422a0019c",
          "fluid_name": "文安驿",
          "employee_id": null,
          "gas_type": "",
          "province": "陕西省",
          "city": "延安市",
          "area": "延川县",
          "address": "文安驿镇",
          "actual_address": "文安驿",
          "linkman": "",
          "contact_phone": "",
          "map_position": "ee66314b-a315-46b7-aa88-9657d387575f"
        },
        "yunfei": "标准运费:15.2/吨/公里",
        "created_at": "2018-05-16 11:18:03",
        "updated_at": "2018-05-16 11:18:03",
        "created_timestamp": 1526440683,
        "is_deleted": 0,
        "order_number": "201805160003",
        "status": "loaded",
        "plan_time": "2018-05-16",
        "require_car_number": 0,
        "plan_tonnage": "15吨",
        "discount_price": "0.000",
        "business_price": "0.000",
        "unit_price": "0.000",
        "desc": "这个很危险哦,小心",
        "unload_area": null,
        "carry_type": "c9c159a0-1722-4cff-b896-df31f20b32e3",
        "unload_area_info": [{ address: "瑞美丰润宝龙", distance: "200km" }, { address: "富海玉田祥泰", distance: "500km" }],
        "carry_type_info": {
          "id": "c9c159a0-1722-4cff-b896-df31f20b32e3",
          "created_at": "2018-05-16 11:13:37",
          "updated_at": "2018-05-16 11:13:39",
          "created_timestamp": 234343,
          "is_deleted": 0,
          "consignment_type": "own",
          "carrier": "[]",
          "carry_name": "托运方:四川浩海"
        }
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
          { id: 'plate_number', value: '托运商' },
          { id: 'vin_number', value: '订单号' },
          { id: 'vin_number', value: '液厂' }

        ]
      },
    };
  },
  computed: {

  },
  methods: {
    clicktabs: function(targetName) {

    },
    searchList: function() {
      this.$$http(sendData)
    },
    clickFifter: function(targetName) {
      var status = targetName.name;
      //重新查询一次数据
      if (status == "all") {
        this.listFifterData = this.listData;
      } else {
        this.listFifterData = [this.listData[0]];
      }
    }
  },
  created() {

  }
};

</script>
