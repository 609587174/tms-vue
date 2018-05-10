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
      component: (resolve) => require(['../page/transportPowerManage/personManage/personManager'], resolve),
      children: [
        {
          path: 'personListManage',
          name: "人员列表管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../page/transportPowerManage/personManage/personListManager'], resolve)
        },
        {
          path: 'addPerson',
          name: "新增、编辑人员",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../page/transportPowerManage/personManage/addPerson'], resolve)
        },
      ]
    }, {
      path: 'clientManage',
      name: '客户管理',
      meta: {
        isVerificationL: false,
        needShowFir: false
      },
      component: (resolve) => require(['../page/transportPowerManage/clientManage/clientManage'], resolve),
      children: [
        {
          path: 'privateClientManage',
          name: "自有客户管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../page/transportPowerManage/clientManage/privateClientManage'], resolve)
        },{
          path: 'addClient',
          name: "新增、编辑客户",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../page/transportPowerManage/clientManage/addClient'], resolve)
        },
        {
          path: 'platformClientManage',
          name: "平台客户管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../page/transportPowerManage/clientManage/platformClientManage'], resolve)
        },
      ]
    }

    ]
  }]
}];