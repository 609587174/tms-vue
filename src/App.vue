<style lang="less">
@import './assets/css/themeStyle.less';
@import './assets/css/common.less';
@import './assets/css/reset.less';
@import './assets/css/tabsStyle.less';
@import './assets/css/buttonStyle.less';
@import './assets/css/tableStyle.less';
@import './assets/css/style.css';
@import './assets/css/detailStyle.less';
@import './assets/css/settingStyle.less';//个人设置
@import './assets/css/dialogStyle.less';//弹窗样式
@import './assets/css/userStyle.less'; //登录 注册 找回密码

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
      // let localUser = this.pbFunc.session('token'); // if (!localUser) { // return this.$router.push({ path: '/login', query: { from: this.$router.currentRoute.path } }); // }

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
            hashMenus['/' + hashKey] = true;
            hasOperationJur['/' + hashKey] = key.operationJur;
            if (Array.isArray(key.sms)) {
              setMenu2Hash(key.sms, key.menu_permission_name);
            }
          }
        });
      };
      setMenu2Hash(userInfo);
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
            console.log('this', that);
            redirectConfig(route.children, that.pbFunc.deepcopy(redirectp));
          }
        });
      }
      findLocalRoute(that.pbFunc.deepcopy(userPath[0].children)); //筛选路由
      redirectConfig(allowedRouter);
      return allowedRouter;
    },
    extendRoutes: function(allowedRouter) {
      let that = this;
      let actualRouter = that.pbFunc.deepcopy(allowedRouter);
      actualRouter.map(e => {
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
      });
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
    console.log('token', token)
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
    vm.signin();
  }
};

</script>
