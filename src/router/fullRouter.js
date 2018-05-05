export default [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    needShowFir: true
  },
  children: [{
    path: 'transportPowerManage',
    name: '动力管理',
    meta: {
      isVerificationL: true,
      needShowFir: true
    },
    component: (resolve) => require(['../page/transportPowerManage/transportPowerManage'], resolve),
    children: [{
      path: 'carManage',
      name: '车辆管理',
      meta: {
        isVerificationL: false,
        needShowFir: false
      },
      component: (resolve) => require(['../page/transportPowerManage/carManage'], resolve),
      children: [{
          path: 'carHeadManage',
          name: "牵引车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carHeadManage'], resolve)
        },
        {
          path: 'carTailManage',
          name: "挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carTailManage'], resolve)
        },
        {
          path: 'editCarHeadManage',
          name: "编辑挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/editCarHeadManage'], resolve)
        },
        {
          path: 'addCarHeadManage',
          name: "新增挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/addCarHeadManage'], resolve)
        },
        {
          path: 'showCarHeadManage',
          name: "查看挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/showCarHeadManage'], resolve)
        }
      ]
    }, {
      path: 'personManage',
      name: '人员管理',
      meta: {
        isVerificationL: false,
        needShowFir: false
      },
      component: (resolve) => require(['../page/transportPowerManage/personManage'], resolve)
    }]
  }]
}];
