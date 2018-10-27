<style lang="less">
@import './assets/css/themeStyle.less';
@import './assets/css/common.less';
@import './assets/css/reset.less';
@import './assets/css/icon.less'; //icon
@import './assets/css/tabsStyle.less';
@import './assets/css/buttonStyle.less';
@import './assets/css/tableStyle.less';
@import './assets/css/style.css';
@import './assets/css/detailStyle.less';
@import './assets/css/settingStyle.less'; //个人设置
@import './assets/css/dialogStyle.less'; //弹窗样式
@import './assets/css/userStyle.less'; //登录 注册 找回密码
@import './assets/css/elementReset';
@import './assets/css/news.less'; //消息通知

</style>
<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>
<script>
import Vue from 'vue';
import staticData from './api/getStaticData.js';
import userPath from './router/fullRouter';
import noData from '@/components/common/noData';
import exportButton from '@/components/common/exportButton';

Vue.component("noData", noData);
Vue.component("exportButton", exportButton);
Vue.filter('dateFilter', function(value) {
  let dates = [];
  if (value) {
    dates = value.split(' ');
  }
  return dates.length ? dates[0] : value;
})
export default {
  name: 'App',
  data() {
    return {
      menuData: null,
      userData: null
    }
  },
  methods: {
    buildDictionary: function() {
      let dictionaryObject = {
        dashboard: 'OVERVIEW', //概览
        orders: 'ORDER', //订单
        pickupOrders: 'DELIVERY_ORDER', //提货订单
        dispatchDashboard: 'OVERVIEW_DISPATCH_SECOND', //调度概览
        importStatisticsDashboard: 'IMPORT_OVERVIEW_SECOND', //导入统计概览
        // consignmentOrders: 'CONSIGNMENT_ORDER', //托运订单
        logisticsManage: 'LOGISTICS_MANAGEMENT', //物流管理
        consignmentOrders: 'LOGISTICS_DISPATCH', //物流调度
        UnderConsignmentOrders: 'OFFLINE_LOGISTICS_DISPATCH',
        mapManage: 'MAP', //地图
        carMonitor: 'MAP_MONITOR', //地图监控
        standardMile: 'STANDARD_MILEAGE_MANAGEMENT', //标准里程
        landmark: 'LANDMARK_INFO', //地标管理
        routeManage: 'ROUTE_MANAGEMENT', //路线管理

        basicDataManage:'BASE_DATA_MANAGEMENT',//基础数据管理
        shipperManage:'CUSTOMER_MANAGEMENT_SECOND',//托运方管理
        standardDataSet:'STANDARD_MILEAGE_MANAGEMENT',//标准数据设置
        capacityManage:'CAPACITY_MANAGEMENT',//运力管理
        supplierManage:'OIL_GAS_COMPANY_MANAGEMENT',//供应商管理
        threePartyCapacity:'THIRD_CAPACITY_SECOND',

        // transportPowerManage: 'CAPACITY_MANAGEMENT', //运力
        // capacityManage: 'CAPACITY_MANAGEMENT_SECOND', //运力管理
        // carManage: 'TRUCK_MANAGEMENT', //车辆管理
        // personManage: 'STAFF_MANAGEMENT', //人员管理
        deviceManage: 'DEVICE_MANAGEMENT', //设备管理
        clientManage: 'CUSTOMER_MANAGEMENT', //客户管理
        standardDataManage: 'STANDARD_MILEAGE_MANAGEMENT', //标准数据管理
        clientManageSecond: 'CUSTOMER_MANAGEMENT_SECOND', //客户管理二级菜单
        statistics: 'DATA_STATISTICS', //数据统计
        business: 'BUSINESS_STATISTICS', //物流数据
        costManage: 'EXPENSE_MANAGEMENT', //费用管理

        supplierManage: 'SUPPLIER_MANAGEMENT_SECOND', //供应商管理
        energyManageList: 'OIL_GAS_COMPANY_MANAGEMENT', //加油气公司管理
        tollfeeManageList: 'HIGHWAY_COMPANY_MANAGEMENT', //高速公司管理

        ledger: 'BUSINESS_ACCOUNT_SECOND', //业务台账
        dataAnalysis: 'DATA_ANALYSIS', //数据分析
        arap: 'PAYMENT_MANAGEMENT', //应收应付
        shipperReceivableManage: 'TRADER_PAY_MANAGEMENT_SECOND', //托运方应收管理
        supplierMeetManage: 'SUPPLIER_PAY_MANAGEMENT_SECOND', //供应商应付管理

        setting: 'SETTINGS', //设置
        company: 'CARRIER_SETTINGS', //公司主页
        organizationalStructure: 'ORGANIZE_STRUCTURE_SETTINGS', //组织架构
        staffsManage: 'CARRIER_STAFFS_MANAGEMENT', //员工管理
        powerManage: 'PERMISSION_MANAGEMENT', //权限管理
        userSetting: 'PERSONAL_SETTINGS', //个人设置

        dataAnalysis: 'CARRING_DATA_MANAGEMENT',
        routeManage: 'CARRING_ROUTE_SECOND',
        carAnalysis: 'VEHICLE_MONITOR_SECOND',




      }
      return dictionaryObject;
    },

    findDictionary: function(menuList) {
      let findDictionaryObject = {};
      let dictionaryObject = this.buildDictionary();
      for (let i in dictionaryObject) {
        for (let j in menuList) {
          if (menuList[j].menu_key === dictionaryObject[i]) { //寻找一级菜单
            findDictionaryObject[i] = dictionaryObject[i];
          };
          if (menuList[j].second_menus && menuList[j].second_menus.length) { //寻找二级菜单
            for (let k in menuList[j].second_menus) {
              if (menuList[j].second_menus[k].menu_key === dictionaryObject[i]) {
                findDictionaryObject[i] = dictionaryObject[i];
              }
            }
          };
        }
      }
      return findDictionaryObject;
    },

    extendRoutes: function(allowedRouter) {
      let that = this;

      let originPath = that.pbFunc.deepcopy(userPath);
      /*
       ** 这里注入相应权限的路由，暂时不做。
       ** let actualRouter = that.pbFunc.deepcopy(allowedRouter);
       **  originPath[0].children = actualRouter;
       */
      //注入路由
      that.$router.addRoutes(originPath.concat([{
        path: '*',
        redirect: '/404'
      }]));

    },
    loginDirect: function(newPath) {
      this.pathIn(true);
    },
    isHasTokenAndMenu: function(menuList, token) {
      this.$router.afterEach((to, from) => {
        if (!to.path.match(/(^\/$)|login|register|registerCompany|registerSuccess|forgetPassword|401|404/) && !from.path.match(/login/)) {
          if (!menuList || !token) {
            this.$message.error('验证信息缺失，请重新登录');
            this.$router.replace({ path: '/login' });

          }
        }
      })
    },
    pathIn: function(isGoFirstPath) {
      let allowedRouter = [];
      let menuList = this.pbFunc.getLocalData('menuList', true);
      let menuDictionaryObject = this.findDictionary(menuList);
      let token = this.pbFunc.getLocalData('token', true);
      //this.isHasTokenAndMenu(menuList, token);
      allowedRouter = this.getRoutesList(menuDictionaryObject);
      this.extendRoutes(allowedRouter);
      this.$store.state.common.menuData = allowedRouter;
      this.$store.state.common.userData = { name: "测试名称" };
      if (isGoFirstPath) {
        if (allowedRouter[0] && allowedRouter[0].children && allowedRouter[0].children.length) {
          this.$router.replace({ name: allowedRouter[0].children[0].name });
        } else {
          this.$router.replace({ path: allowedRouter[0].path });
        }
      }

    },
    getRoutesList: function(menuDictionaryObject) {

      let newRoute = []
      let userPathChild = this.pbFunc.deepcopy(userPath[0].children);

      for (let i in menuDictionaryObject) {
        for (let j in userPathChild) {
          if (userPathChild[j].name === i) {

            if (userPathChild[j].children && userPathChild[j].children.length) {
              let pathCopy = this.pbFunc.deepcopy(userPathChild[j]);
              pathCopy.children = []; //保留一级菜单，去除二级菜单
              for (let m in menuDictionaryObject) {
                for (let k in userPathChild[j].children) {
                  if (userPathChild[j].children[k].name === m) {
                    pathCopy.children.push(userPathChild[j].children[k]);
                  }
                }
              }
              newRoute.push(pathCopy);
            } else {
              newRoute.push(userPathChild[j]);
            }

          }
        }
      }
      return newRoute;
    },
    logoutDirect: function() {
      localStorage.clear();
      //清除session
      //this.pbFunc.setLocalData('token', '');
      //清除菜单
      //this.pbFunc.setLocalData('menuList', '');
      //回到登录页
      // this.$router.replace({ path: '/login' });
    }
  },
  created: function(newPath) {
    let vm = this;
    let users = vm.pbFunc.getLocalData('users', true);
    let token = vm.pbFunc.getLocalData('token', true);
    if (!users && token) {
      this.$$http('getUser', {}).then((results) => {
        if (results.data && results.data.code === 0) {
          this.$store.state.common.users = results.data.data;
          vm.pbFunc.setLocalData('users', results.data.data, true);
        }
      }).catch((err) => {
        this.$message.error('获取用户信息失败');
      })
    } else {
      this.$store.state.common.users = vm.pbFunc.getLocalData('users', true);
    }
    this.$$http("getSelectData", {}).then(function(reslut) {
      if (reslut.data.code == 0)
        vm.$store.state.common.selectData = reslut.data.data;
    });
    vm.pathIn();
  }
};

</script>
