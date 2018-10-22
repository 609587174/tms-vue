export default {
  path: 'basicDataManage',
  name: 'basicDataManage',
  meta: {
    isVerificationL: true,
    title: '基础数据管理',
    iconName: 'icon-transport',
  },
  component: (resolve) => require(['../page/basicDataManage/basicDataManage'], resolve),
  children: [{
    path: 'shipperManage',
    name: 'shipperManage',
    redirect: '/basicDataManage/shipperManage/shipperManageList',
    meta: {
      isVerificationL: true,
      title: '托运方管理',
    },
    component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperManage'], resolve),
    children: [{
      path: 'shipperManageList',
      name: 'shipperManageList',
      meta: {
        isVerificationL: false,
        title: '托运方列表',
      },
      component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperManageList'], resolve)
    },{
      path: 'shipperDetail/:id',
      name: 'shipperDetail',
      meta: {
        isVerificationL: false,
        title: '托运方详情',
      },
      component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperDetail'], resolve)
    },{
      path: 'editShipper',
      name: 'editShipper',
      meta: {
        isVerificationL: false,
        title: '托运方编辑',
      },
      component: (resolve) => require(['../page/basicDataManage/shipperManage/editShipper'], resolve)
    }]
  },{
    path: 'standardDataSet',
    name: 'standardDataSet',
    redirect: '/basicDataManage/standardDataSet/freight/freightDataList',
    meta: {
      isVerificationL: true,
      title: '标准数据设置',
    },
    component: (resolve) => require(['../page/basicDataManage/standardDataSet/standardDataSet'], resolve),
    children: [{
      path: 'freight',
      name: 'freight',
      meta: {
        isVerificationL: false,
        title: '运费约定',
      },
      component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freight'], resolve),
      children: [{
        path: 'freightDataList',
        name: 'freightDataList',
        meta: {
          isVerificationL: false,
          title: '运费约定列表',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freightDataList'], resolve)
      },{
        path: 'freightDetail/:id',
        name: 'freightDetail',
        meta: {
          isVerificationL: false,
          title: '运费约定详情',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freightDetail'], resolve)
      }]
    },
  {
    path: 'mileage',
    name: 'mileage',
    meta: {
      isVerificationL: false,
      title: '标准里程',
    },
    component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/mileage'], resolve),
    children: [{
      path: 'mileageDataList',
      name: 'mileageDataList',
      meta: {
        isVerificationL: false,
        title: '标准里程列表',
      },
      component: (resolve) => require(['../page//basicDataManage/standardDataSet/mileage/mileageDataList'], resolve)
    },
    //  {
    //   path: 'mileageDetail',
    //   name: 'mileageDetail',
    //   meta: {
    //     isVerificationL: false,
    //     title: '标准里程详情',
    //   },
    //   component: (resolve) => require(['../page/clientManage/standardDataManage/mileage/mileageDetail'], resolve)
    // }, {
    //   path: 'editMileage',
    //   name: 'editMileage',
    //   meta: {
    //     isVerificationL: false,
    //     title: '编辑、新增标准里程',
    //   },
    //   component: (resolve) => require(['../page/clientManage/standardDataManage/mileage/editMileage'], resolve)
    // }
    ]
  }
  ]
    // children: [{
    //   path: 'shipperManageList',
    //   name: 'shipperManageList',
    //   meta: {
    //     isVerificationL: false,
    //     title: '托运方列表',
    //   },
    //   component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperManageList'], resolve)
    // },{
    //   path: 'shipperDetail/:id',
    //   name: 'shipperDetail',
    //   meta: {
    //     isVerificationL: false,
    //     title: '托运方详情',
    //   },
    //   component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperDetail'], resolve)
    // },{
    //   path: 'editShipper',
    //   name: 'editShipper',
    //   meta: {
    //     isVerificationL: false,
    //     title: '托运方编辑',
    //   },
    //   component: (resolve) => require(['../page/basicDataManage/shipperManage/editShipper'], resolve)
    // }]
  }]
}
