import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/HelloWorld'
import carBaseInfo from '@/components/powermanagement/carBaseInfo'
import exPro from '@/components/powermanagement/exPro'
import exBuy from '@/components/powermanagement/exBuy'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '/carBaseInfo',
          name: 'carBaseInfo',
          component: carBaseInfo
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '/exPro',
          name: 'exPro',
          component: exPro
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '/exBuy',
          name: 'exBuy',
          component: exBuy
        }
      ]
    }
  ]
})
