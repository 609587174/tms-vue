<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
          <div id="addPerson" class="detail-mian">
            <el-container>
              <el-main>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        提货订单信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>订单号:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>订单生成时间:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>托运方:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>需求车数:</label>
                        <div class="detail-form-item">11111</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        运输信息
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list">
                    <el-table :data="tableData" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        运单信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>运单号:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>运单生成时间:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>托运方:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>承运方:</label>
                        <div class="detail-form-item">11111</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        费用约定
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>计费方式:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>标准运价:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>标准里程:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>气差允许范围:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>待时计算标准:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>待时计费标准:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆指派" name="second">
        </el-tab-pane>
        <el-tab-pane label="订单记录" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderDetailTab',
  data() {
    return {
      activeName: 'first',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        four: 'xxx',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        four: 'xxx',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        four: 'xxx',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        four: 'xxx',
      }],
      thTableList: [{
        title: '装卸地',
        param: 'name',
      }, {
        title: '标准里程',
        param: 'address',
      }, {
        title: '计划时间',
        param: 'date',
      }, {
        title: '计划吨位',
        param: 'four',
      }],
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: "/orders/orderDetail/arrangeCarTab" });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: "/orders/orderDetail/orderRecordsTab" });
      }
    },
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {

  }
}

</script>
