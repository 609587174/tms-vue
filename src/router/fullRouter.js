export default [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    needShowFir: true
  },
  children: [{
    path: 'carBaseInfo',
    name: 'carBaseInfo',
    meta: {
      isVerificationL: true,
      needShowFir: true
    },
    component: (resolve) => require(['../components/powermanagement/CarBaseInfo'], resolve),
    children: [{
      path: 'testTitle',
      name: "测试二级菜单",
      meta: {
        isVerificationL: false
      },
      component: (resolve) => require(['../components/powermanagement/TestTitle'], resolve)
    }]
  },
    {
      path: 'exPro',
      name: 'exPro',
      meta: {
        isVerificationL: false,
        needShowFir: false
      },
      component: (resolve) => require(['../components/powermanagement/ExPro'], resolve)
    },
    {
      path: 'exBuy',
      name: 'exBuy',
      meta: {
        isVerificationL: false,
        needShowFir: false
      },
      component: (resolve) => require(['../components/powermanagement/ExBuy'], resolve)
    }
  ]
}];
