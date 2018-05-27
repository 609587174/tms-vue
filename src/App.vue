<style lang="less">
@import './assets/css/themeStyle.less';
@import './assets/css/common.less';
@import './assets/css/reset.less';
@import './assets/css/tabsStyle.less';
@import './assets/css/buttonStyle.less';
@import './assets/css/tableStyle.less';
@import './assets/css/style.css';
@import './assets/css/detailStyle.less';
@import './assets/css/settingStyle.less'; //个人设置
@import './assets/css/dialogStyle.less'; //弹窗样式
@import './assets/css/userStyle.less'; //登录 注册 找回密码
@import './assets/css/capacityList';

</style>
<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>
<script>
import Vue from 'vue';
import staticData from './api/getStaticData.js';
import userPath from './router/fullRouter';

export default {
  name: 'App',
  data() {
    return {
      menuData: null,
      userData: null
    }
  },
  methods: {
    signin: function(callback) {
      let menuData = staticData.staticData();
      let allowedRouter = this.getRoutes(menuData.data);
      console.log('allowedRouter', allowedRouter);
      this.extendRoutes(allowedRouter);
      this.$store.state.common.menuData = allowedRouter;
      this.$store.state.common.userData = { name: "测试名称" };
      typeof callback === 'function' && callback();
    },
    getRoutes: function(userInfo) { //根据后端返回菜单数据，动态的获取路由信息
      if (!userInfo) {
        return console.warn("菜单获取失败");
      }
      let that = this;
      let allowedRouter = [];
      let hashMenus = {},
        hasOperationJur = {};
      let setMenu2Hash = function(array, base) {
        array.map(key => {
          if (key.menu_permission_name) {
            let hashKey = ((base ? base + '/' : '') + key.menu_permission_name).replace(/^\//, '');
            //console.log('hashKey', hashKey);
            hashMenus['/' + hashKey] = true;
            hasOperationJur['/' + hashKey] = key.operationJur;
            if (Array.isArray(key.sms)) {
              setMenu2Hash(key.sms, key.menu_permission_name);
            }
          }
        });
      };
      console.log('hashMenus', hashMenus);
      setMenu2Hash(userInfo);
      console.log("userInfo", userInfo);
      this.$root.hashMenus = hashMenus;
      let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(function(route) {
          let pathKey = (base ? base + '/' : '/') + route.path;
          if (hashMenus[pathKey] || !route.meta.isVerificationL) {
            if (!route.meta.isVerificationL) {
              route.meta['operationJur'] = that.$store.state.common.defaultShow;
            } else {
              route.meta['operationJur'] = hasOperationJur[pathKey]
            }
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, pathKey);
            }
            replyResult.push(route);
          }
        });
        if (base) {
          return replyResult;
        } else {
          allowedRouter = allowedRouter.concat(replyResult);
        }
      }
      let redirectConfig = function(routeArr, redirectPath) {

        routeArr.forEach(function(route) {
          if (Array.isArray(route.children) && route.meta.needShowFir) {
            let redirectp = (redirectPath ? "" : "./") + (redirectPath ? (redirectPath + "/" + route.children[0].path) : (route.path + "/" + route.children[0].path));
            route.redirect = redirectp;
            // console.log('this', that);
            redirectConfig(route.children, that.pbFunc.deepcopy(redirectp));
          }
        });
      }
      findLocalRoute(that.pbFunc.deepcopy(userPath[0].children)); //筛选路由
      redirectConfig(allowedRouter);
      return allowedRouter;
    },
    buildDictionary: function() {
      let dictionaryObject = {
        dashborad: 'OVERVIEW', //概览
        orders: 'ORDER', //订单
        pickupOrders: 'DELIVERY_ORDER', //提货订单
        consignmentOrders: 'CONSIGNMENT_ORDER', //托运订单
        logisticsManage: 'LOGISTICS_MANAGEMENT', //物流管理
        dispatch: 'LOGISTICS_DISPATCH', //物流调度
        mapManage: 'MAP', //地图
        carMonitor: 'MAP_MONITOR', //地图监控
        standardMile: 'STANDARD_MILEAGE_MANAGEMENT', //标准里程
        landmark: 'LANDMARK_INFO', //地标管理
        routeManage: 'ROUTE_MANAGEMENT', //路线管理
        transportPowerManage: 'CAPACITY_MANAGEMENT', //运力
        capacityManage: 'CAPACITY_MANAGEMENT_SECOND', //运力管理 (这里没有)
        carManage: 'TRUCK_MANAGEMENT', //车辆管理(这里没有)
        personManage: 'STAFF_MANAGEMENT', //人员管理
        deviceManage: 'DEVICE_MANAGEMENT', //设备管理
        clientManage: 'CUSTOMER_MANAGEMENT', //客户管理有问题
        statistics: 'DATA_STATISTICS', //数据统计
        businessStatistics: 'BUSINESS_STATISTICS', //业务统计
        dataAnalysis: 'DATA_ANALYSIS', //数据分析
        setting: 'SETTINGS', //设置
        organizationalStructure: 'ORGANIZE_STRUCTURE_SETTINGS', //组织架构
        staffsManage: 'CARRIER_STAFFS_MANAGEMENT', //员工管理
        powerManage: 'PERMISSION_MANAGEMENT', //权限管理
        userSetting: 'PERSONAL_SETTINGS', //个人设置
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
                console.log('dictionaryObject[i]', i);
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
      let actualRouter = that.pbFunc.deepcopy(allowedRouter);
      /*actualRouter.map(e => {
        //复制子菜单信息到meta用于实现导航相关效果，非必需
        if (e.children) {
          if (!e.meta) e.meta = {};
          e.meta.children = e.children;
        }
        //为动态路由添加独享守卫
        return e.beforeEnter = function(to, from, next) {
          if (that.$root.hashMenus[to.path] || !to.meta.isVerificationL) {
            next()
          } else {
            next('/401')
          }
        }
      });*/
      let originPath = that.pbFunc.deepcopy(userPath);

      originPath[0].children = actualRouter;

      console.log('originPath', originPath);
      //注入路由
      that.$router.addRoutes(originPath.concat([{
        path: '*',
        redirect: '/404'
      }]));
    },
    loginDirect: function(newPath) {
      this.signin(() => {
        this.$router.replace({ path: newPath || '/' });
      });
      //this.pathIn(true);
    },
    isHasTokenAndMenu: function(menuList, token) {
      if (!menuList.length || !token) {
        this.$message.error('验证信息缺失，请重新登录');
        this.$router.replace({ path: '/login' });
      }
    },
    pathIn: function(isGoFirstPath) {
      let allowedRouter = [];
      let menuList = this.pbFunc.getLocalData('menuList', true);
      let menuDictionaryObject = this.findDictionary(menuList);
      let token = this.pbFunc.getLocalData('token', true);
      console.log('this.$router', this.$route.path, menuList, menuDictionaryObject);
      this.isHasTokenAndMenu(menuList, token);
      allowedRouter = this.getRoutesList(menuDictionaryObject);
      this.extendRoutes(allowedRouter);
      this.$store.state.common.menuData = allowedRouter;
      this.$store.state.common.userData = { name: "测试名称" };
      console.log('this.$router', allowedRouter[0]);
      if (isGoFirstPath) { this.$router.replace({ path: allowedRouter[0].path }); }

    },
    getRoutesList: function(menuDictionaryObject) {

      let newRoute = []
      let userPathChild = this.pbFunc.deepcopy(userPath[0].children);

      for (let i in menuDictionaryObject) {
        for (let j in userPathChild) {
          if (userPathChild[j].name === i) {

            if (userPathChild[j].children && userPathChild[j].children.length) { //如果有二级菜单，必定有一级菜单只需要循环二级菜单
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
      //清除session
      this.pbFunc.setLocalData('token', '');
      //清除菜单权限
      this.$root.hashMenus = {};
      //回到登录页
      this.$router.replace({ path: '/login' });
    }
  },
  created: function(newPath) {
    let vm = this;
    let token = vm.pbFunc.getLocalData('token', true);
    // console.log('token', token)
    if (token) {
      this.$$http('getUser', {}).then((results) => {
        if (results.data && results.data.code === 0) {
          this.$store.state.common.users = results.data.data;
        }
      }).catch((err) => {
        this.$message.error('获取用户信息失败');
      })
    }
    this.$$http("getSelectData", {}).then(function(reslut) {
      if (reslut.data.code == 0)
        vm.$store.state.common.selectData = reslut.data.data;
    });
    vm.pathIn();
  }
};

</script>
