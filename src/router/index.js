import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import carBaseInfo from '@/page/powermanagement/carBaseInfo'


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
          path: '',
          name: 'carBaseInfo',
          component: carBaseInfo
        }
      ]
    }
  ]
})
