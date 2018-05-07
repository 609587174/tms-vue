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
        isVerificationL: true,
        needShowFir: false
      },
      component: (resolve) => require(['../page/transportPowerManage/carManageFiled/carManage'], resolve),
      children: [{
          path: 'carHeadManage',
          name: "牵引车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carManage/carHeadManage'], resolve)
        },
        {
          path: 'carTailManage',
          name: "挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carManage/carTailManage'], resolve)
        },
        {
          path: 'addEditCarHeadManage',
          name: "新增编辑牵引车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarHeadManage'], resolve)
        },
        {
          path: 'addEditCarTailManage',
          name: "新增编辑挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarTailManage'], resolve)
        },
        {
          path: 'showCarHeadManage',
          name: "查看牵引车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carManage/showCarHeadManage'], resolve)
        },
        {
          path: 'showCarHeadManage',
          name: "查看挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carManage/showCarTailManage'], resolve)
        }
      ]

    }, {
      path: 'personManage',
      name: '人员管理',
      meta: {
        isVerificationL: false,
        needShowFir: false
      },
      component: (resolve) => require(['../page/transportPowerManage/personManager/personManager'], resolve),
      children: [
        {
          path: 'personListManage',
          name: "人员管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../page/transportPowerManage/personManager/personListManager'], resolve)
        },
      ]
    }]
  }]
}];
