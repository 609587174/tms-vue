export default {
  path: 'transportPowerManage',
  name: 'transportPowerManage',
  meta: {
    isVerificationL: true,
    title: '运力',
    iconName: 'icon-transport',
  },
  component: (resolve) => require(['../page/transportPowerManage/transportPowerManage'], resolve),
  children: [{
    path: 'capacityManage',
    name: 'capacityManage',
    redirect: '/transportPowerManage/capacityManage/capacityList',
    meta: {
      isVerificationL: true,
      title: '运力管理',
    },
    component: (resolve) => require(['../page/transportPowerManage/capacityManage/capacityManage'], resolve),
    children: [{
      path: 'capacityList',
      name: 'capacityList',
      meta: {
        isVerificationL: false,
        title: '运力列表',
      },
      component: (resolve) => require(['../components/transportPowerManage/capacityManage/capacityList'], resolve)
    }, {
      path: 'capacityDetail',
      name: 'capacityDetail',
      meta: {
        isVerificationL: false,
        title: '运力详情',
      },
      component: (resolve) => require(['../components/transportPowerManage/capacityManage/capacityDetail'], resolve)
    }, {
      path: 'editCapacity/:id/:activeStep/',
      name: 'editCapacity',
      meta: {
        isVerificationL: false,
        title: '编辑绑定信息',
      },
      component: (resolve) => require(['../components/transportPowerManage/capacityManage/editCapacity'], resolve)
    }]
  }, {
    path: 'carManage',
    name: 'carManage',
    meta: {
      isVerificationL: true,
      title: '车辆管理',
    },
    component: (resolve) => require(['../page/transportPowerManage/carManageFiled/carManage'], resolve),
    children: [{
        path: 'carHeadManage',
        name: 'carHeadManage',
        meta: {
          isVerificationL: false,
          title: '牵引车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/carHeadManage'], resolve)
      },
      {
        path: 'carTailManage',
        name: 'carTailManage',
        meta: {
          isVerificationL: false,
          title: '挂车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/carTailManage'], resolve)
      },
      {
        path: 'addEditCarHeadManage',
        name: 'addEditCarHeadManage',
        meta: {
          isVerificationL: false,
          title: '新增编辑牵引车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarHeadManage'], resolve)
      },
      {
        path: 'addEditCarTailManage',
        name: 'addEditCarTailManage',
        meta: {
          isVerificationL: false,
          title: '新增编辑挂车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarTailManage'], resolve)
      },
      {
        path: 'showCarHeadManage',
        name: 'showCarHeadManage',
        meta: {
          isVerificationL: false,
          title: '查看牵引车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/showCarHeadManage'], resolve)
      },
      {
        path: 'showCarTailManage',
        name: 'showCarTailManage',
        meta: {
          isVerificationL: false,
          title: '查看挂车管理'
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/showCarTailManage'], resolve)
      }
    ]
  }, {
    path: 'personManage',
    redirect: '/transportPowerManage/personManage/personListManage',
    name: 'personManage',
    meta: {
      isVerificationL: true,
      title: '人员管理',
    },
    component: (resolve) => require(['../page/transportPowerManage/personManage/personManager'], resolve),
    children: [{
        path: 'personListManage',
        name: 'personListManage',
        meta: {
          isVerificationL: false,
          title: '人员列表管理',
        },
        component: (resolve) => require(['../page/transportPowerManage/personManage/personListManager'], resolve)
      },
      {
        path: 'addPerson',
        name: 'addPerson',
        meta: {
          isVerificationL: false,
          title: '新增、编辑人员',
        },
        component: (resolve) => require(['../page/transportPowerManage/personManage/addPerson'], resolve)
      },
     {
        path: 'personDetail',
        name: 'personDetail',
        meta: {
          isVerificationL: false,
          title: '人员详情'
        },
        component: (resolve) => require(['../page/transportPowerManage/personManage/personDetail'], resolve)
      },
    ]
  }]
}
