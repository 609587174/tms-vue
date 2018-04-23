export default [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../page/mainFirst'], resolve),
  children: [{
      path: '/carBaseInfo',
      name: 'carBaseInfo',
      meta:{isVerificationL:true},
      component: (resolve) => require(['../components/powermanagement/carBaseInfo'], resolve),
      children:[{
        path:'testTitle',
        name:"测试二级菜单",
        meta:{isVerificationL:false},
        component: (resolve) => require(['../components/powermanagement/exBuy'], resolve)
      }]
    },
    {
      path: '/exPro',
      name: 'exPro',
      meta:{isVerificationL:true},
      component: (resolve) => require(['../components/powermanagement/exPro'], resolve)
    },
    {
      path: '/exBuy',
      name: 'exBuy',
      meta:{isVerificationL:true},
      component: (resolve) => require(['../components/powermanagement/exBuy'], resolve)
    }
  ]
}];