import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let baseRoute = [{
  path: '/login',
  name: '登录',
  component: (resolve) => require(['../page/login.vue'], resolve)
},{
  path: '/register',
  name: '注册',
  component: (resolve) => require(['../page/register.vue'], resolve)
}, {
  path: '/forgetPassword',
  name: '找回密码',
  component: (resolve) => require(['../page/forgetPassword.vue'], resolve)
}, {
  path: '/401',
  name: '无权访问',
  component: (resolve) => require(['../page/common/401.vue'], resolve)
}, {
  path: '/404',
  name: '找不到页面',
  component: (resolve) => require(['../page/common/404.vue'], resolve)
}];
let router = new Router({
  routes: baseRoute
});
router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName : '');
  next();
});

export default router;
