// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuex from 'vuex'
import store from './store/indexStore'
import axios from 'axios';
import * as pbFunc from './assets/utils';
import http from './api/index';
import * as filters from '@/assets/js/filter';
/* 全局注册公用filter */
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.prototype.pbFunc = pbFunc;
Vue.prototype.$$http = http;

// console.log('http', http);

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(vuex);


Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
