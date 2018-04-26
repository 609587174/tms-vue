<style lang="less">
@import './assets/css/common.less';

</style>
<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>
<script>
import Vue from 'vue';
import staticData from './api/getStaticData.js';
import userPath from './router/fullRouter';
import * as util from './assets/utils.js';
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
      let localUser = util.session('token');
      if (!localUser) {
        return this.$router.push({ path: '/login', query: { from: this.$router.currentRoute.path } });
      }
      let menuData = staticData.staticData();
      let allowedRouter = this.getRoutes(menuData.data);
      this.extendRoutes(allowedRouter);
      this.$store.state.common.menuData = allowedRouter;
      this.$store.state.common.userData = { name: "测试名称" };
      typeof callback === 'function' && callback();
    },
    getRoutes: function(userInfo) {
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
              console.log(that.$store);
              route.meta['operationJur'] = that.$store.state.common.defaultShow;
            } else {
              route.meta['operationJur'] = hasOperationJur[pathKey]
            }
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, route.path);
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
            redirectConfig(route.children, util.deepcopy(redirectp));
          }
        });
      }
      findLocalRoute(util.deepcopy(userPath[0].children)); //筛选路由
      redirectConfig(allowedRouter);
      return allowedRouter;
    },
    extendRoutes: function(allowedRouter) {
      let that = this;
      let actualRouter = util.deepcopy(allowedRouter);
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
      let originPath = util.deepcopy(userPath);
      originPath[0].children = actualRouter;
      if (originPath[0].meta.needShowFir && Array.isArray(originPath[0].children)) {
        originPath[0].redirect = "./" + originPath[0].children[0].path;
      }
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
      util.session('token', '');
      //清除菜单权限
      this.$root.hashMenus = {};
      //回到登录页
      this.$router.replace({ path: '/login' });
    }
  },
  created: function(newPath) {
    this.signin();
  }
};

</script>
