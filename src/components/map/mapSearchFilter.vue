<template>
  <div class="nav-tab">
    <div class="tab-screen">
      <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
        <el-row :gutter="0">
          <el-col :span="6">
            <el-form-item label="车牌号:">
              <el-select v-model="searchFilters.choosedCar" @change="carChange" filterable placeholder="请输入关键词" :loading="carLoading">
                <el-option v-for="(item,key) in carList" :key="key" :label="item.tractor.plate_number" :value="item.tractor.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="6">
            <el-form-item label="筛选维度:">
              <el-select v-model="searchFilters.optionValue" @change="optionChange" placeholder="请选择">
                <el-option v-for="(item,key) in optionList" :key="key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="searchFilters.optionValue === 'order'">
            <el-form-item label="订单:">
              <el-select v-model="searchFilters.orderValue" @change="orderChange" filterable placeholder="请选择订单" :loading="orderLoading">
                <el-option v-for="(item,key) in orderList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="searchFilters.optionValue === 'time'">
            <el-form-item label="搜索时间:">
              <el-date-picker v-model="searchFilters.choosedTime" :picker-options="timeQuickPick" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="chooseTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="float-left time-spacing" v-if="searchFilters.optionValue === 'time'">{{timeSpacing.day}}天{{timeSpacing.hours}}小时{{timeSpacing.minutes}}分钟</div>
            <div>
              <el-button class="ml-10 float-left" type="primary" @click="startSearch" :disabled="searchBtn.isDisabled" :loading="searchBtn.isloading">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const setEndOfDay = timeObjec => {
  let timeObjectCopy = new Date(timeObjec);
  timeObjectCopy.setHours('23');
  timeObjectCopy.setMinutes('59');
  timeObjectCopy.setSeconds('59');
  return timeObjectCopy;
};
const setStartOfDay = timeObjec => {
  let timeObjectCopy = new Date(timeObjec);
  timeObjectCopy.setHours('00');
  timeObjectCopy.setMinutes('00');
  timeObjectCopy.setSeconds('00');
  return timeObjectCopy;
};
export default {
  name: 'mapSearchFilter',
  props: {
    searchFilters: Object,
    chooseCar: Function,
    searchAndRender: Function,
    searchBtn: Object,
  },
  computed: {
    deviceId: function() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      timeSpacing: {},
      carList: [],
      carLoading: false,
      orderList: [],
      orderLoading: false,
      optionList: [{
          label: '以时间筛选',
          key: 'time'
        },
        {
          label: '以订单筛选',
          key: 'order'
        }
      ],
      timeQuickPick: { //选择时间的快捷按钮
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            let start = setStartOfDay(new Date());
            let end = new Date();
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000);
            let end = new Date(new Date() - 24 * 3600 * 1000);
            start = setStartOfDay(start);
            end = setEndOfDay(end);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '三天内',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000 * 2);
            let end = new Date();
            start = setStartOfDay(start);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '七天内',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000 * 6);
            let end = new Date();
            start = setStartOfDay(start);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            let start = new Date();
            let end = new Date();

            start.setDate('1');
            start = setStartOfDay(start);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      choosedDeviceId: '',
    }
  },
  methods: {
    getCarList: function() {
      return new Promise((resolve, reject) => {
        const postData = {
          pagination: false,
        };
        this.carLoading = true;
        this.$$http('getCarList', postData).then((results) => {
          this.carLoading = false;
          if (results.data && results.data.code == 0 && results.data.data) {
            this.carList = results.data.data;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    getOrderList: function() {
      console.log('loadWayBillOfTruck')
      return new Promise((resolve, reject) => {
        this.orderLoading = true;
        //http://192.168.0.31:8011/api/v1/loadWayBillOfTruck?device_id=21847301217
        const url = `http://namenode:8080/api/v1/loadWayBillOfTruck?device_id=${this.choosedDeviceId}`;
        axios.get(url).then(results => {
          console.log('loadWayBillOfTruck', results);
          this.orderLoading = false;
          if (results.data && results.data.code == 200) {
            const resultsData = results.data.msg;
            console.log('resultsData', resultsData, typeof resultsData);
            this.orderList = resultsData.coord_list;
            console.log('this.orderList', this.orderList);
            resolve(results)
          } else {
            reject(results);
          }
        }).catch(err => {
          reject(err);
        })
      })
    },
    carChange: function() {
      let carNumber = '';
      this.searchFilters.optionValue === 'order' && this.getOrderList();
      for (let i in this.carList) {
        if (this.searchFilters.choosedCar === this.carList[i].tractor.id) {
          this.choosedDeviceId = this.carList[i].device_id;
          carNumber = this.carList[i].tractor.plate_number;
          this.$emit('chooseCar', {
            choosedDeviceId: this.choosedDeviceId,
            carNumber
          })
          this.getOrderList();
          this.searchFilters.orderValue = '';
          break;
        }
      }
    },
    chooseTime: function() {
      if (this.searchFilters.choosedTime && this.searchFilters.choosedTime.length) {
        this.timeSpacing = this.calculateTimeSpacing();
        if (this.timeSpacing.day > 30) {
          if (this.timeSpacing.day === 31 && this.timeSpacing.hours === 0 && this.timeSpacing.minutes === 0) {

          } else {
            this.$message({
              message: '查询时间不超过31天',
              type: 'error'
            });
            this.searchBtn.isDisabled = true;
          }

        } else {
          this.searchBtn.isDisabled = false;
        }
      } else {
        this.searchBtn.isDisabled = true;
      }
    },
    optionChange: function() {
      return
      this.searchFilters.optionValue === 'order' && this.getOrderList();
    },
    orderChange: function() {

    },
    startSearch: function() {
      this.$emit('searchAndRender')
    },

    /*compareTime calculateTimestamps calculateTimeSpacing 组合起来都是为了计算所选择搜索时间间隔的函数*/
    compareTime: function(startTime, endTime) {

      const thisResult = (Date.parse(endTime) - Date.parse(startTime));

      return thisResult;

    },
    calculateTimestamps: function(timestamps) {

      const resultObject = {
        day: Math.floor(timestamps / (24 * 3600 * 1000)),
        hours: Math.floor((timestamps % (24 * 3600 * 1000)) / (3600 * 1000)),
        minutes: Math.floor(((timestamps % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000)),
      }

      return resultObject;

    },
    calculateTimeSpacing: function() {

      let resultObject = {};

      const startTime = this.searchFilters.choosedTime[0];
      const endTime = this.searchFilters.choosedTime[1];
      const timestamps = this.compareTime(startTime, endTime);

      resultObject = this.calculateTimestamps(timestamps);

      return resultObject;

    },
  },
  created() {
    this.choosedDeviceId = this.deviceId;
    this.getCarList();
    this.getOrderList();
    this.timeSpacing = this.calculateTimeSpacing();
  },
}

</script>
<style scoped lang="less">
.time-spacing {
  padding: 0 20px;
  line-height: 40px;
  font-size: 14px;
}

</style>
