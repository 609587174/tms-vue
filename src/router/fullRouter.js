export default [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    needShowFir: true
  },
  children: [{
    path: 'dashborad',
    name: '概览',
    meta: {
      isVerificationL: false,
      iconName: 'icon-lng-dashboard'
    },
    component: (resolve) => require(['../page/dashborad/dashborad'], resolve),
  }, {
    path: 'orders',
    name: '订单',
    meta: {
      isVerificationL: false,
      iconName: 'icon-lng-dashboard',
    },
    component: (resolve) => require(['../page/orders/orders'], resolve),
    children: [{
        path: 'ordersList',
        name: '提货订单',
        meta: {
          isVerificationL: false,
        },
        component: (resolve) => require(['../page/orders/orderList'], resolve),
      },
      {
        path: 'orderDetail',
        name: '订单详情',
        meta: {
          isVerificationL: false,
        },
        component: (resolve) => require(['../page/orders/orderDetail'], resolve),
        children: [{
          path: 'orderDetailTab',
          name: '订单详情',
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../page/orders/orderDetail/orderDetailTab'], resolve),
        }, {
          path: 'arrangeCarTab',
          name: '车辆指派',
          redirect: '/orders/orderDetail/arrangeCarTab/arrangeCarList',
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../page/orders/orderDetail/arrangeCarTab'], resolve),
          children: [{
            path: 'arrangeCarList',
            name: '车辆指派列表',
            meta: {
              isVerificationL: false,
            },
            component: (resolve) => require(['../page/orders/orderDetail/arrangeCarList'], resolve),
          }, {
            path: 'arrangeCarMap',
            name: '地图',
            meta: {
              isVerificationL: false,
            },
            component: (resolve) => require(['../page/orders/orderDetail/arrangeCarMap'], resolve),
          }]
        }, {
          path: 'orderRecordsTab',
          name: '订单详情',
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../page/orders/orderDetail/orderRecordsTab'], resolve),
        }]
      }
    ]
  }, {
    path: 'logisticsManage',
    name: '物流管理',
    meta: {
      isVerificationL: false,
      iconName: 'icon-road',
    },
    component: (resolve) => require(['../page/logisticsManage/logisticsManage'], resolve),
  }, {
    path: 'mapManage',
    name: '地图',
    meta: {
      isVerificationL: false,
      iconName: 'icon-road',
    },
    component: (resolve) => require(['../page/map/mapManage'], resolve),
  }, {
    path: 'transportPowerManage',
    name: '动力管理',
    meta: {
      isVerificationL: true,
      iconName: 'icon-map',
    },
    component: (resolve) => require(['../page/transportPowerManage/transportPowerManage'], resolve),
    children: [{
      path: 'carManage',
      name: '车辆管理',
      meta: {
        isVerificationL: true,
        iconName: 'icon-transport',
      },
      component: (resolve) => require(['../page/transportPowerManage/carManageFiled/carManage'], resolve),
      children: [{
          path: 'carHeadManage',
          name: "牵引车管理",
          meta: {
            isVerificationL: false,
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
          path: 'showCarTailManage',
          name: "查看挂车管理",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../components/transportPowerManage/carManage/showCarTailManage'], resolve)
        }
      ]

    }, {
      path: 'personManage',
      redirect: '/transportPowerManage/personManage/personListManage',
      name: '人员管理',
      meta: {
        isVerificationL: false,
        needShowFir: false,
      },
      component: (resolve) => require(['../page/transportPowerManage/personManage/personManager'], resolve),
      children: [{
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
        {
          path: 'personDetail',
          name: "人员详情",
          meta: {
            isVerificationL: false
          },
          component: (resolve) => require(['../page/transportPowerManage/personManage/personDetail'], resolve)
        },
      ]
    }]
  }, {
    path: 'clientManage',
    name: '客户管理',
    redirect: '/clientManage/privateClientManage',
    meta: {
      isVerificationL: false,
      iconName: 'icon-customer',
    },
    component: (resolve) => require(['../page/clientManage/clientManage'], resolve),
    children: [{
        path: 'privateClientManage',
        name: "自有客户管理",
        meta: {
          isVerificationL: false
        },
        component: (resolve) => require(['../page/clientManage/privateClientManage'], resolve)
      }, {
        path: 'addClient',
        name: "新增、编辑客户",
        meta: {
          isVerificationL: false
        },
        component: (resolve) => require(['../page/clientManage/addClient'], resolve)
      },
      {
        path: 'platformClientManage',
        name: "平台客户管理",
        meta: {
          isVerificationL: false
        },
        component: (resolve) => require(['../page/clientManage/platformClientManage'], resolve)
      },
    ]
  }, {
    path: 'statistics',
    name: '数据统计',
    meta: {
      isVerificationL: false,
      iconName: 'icon-data',
    },
    component: (resolve) => require(['../page/statistics/statistics'], resolve),
  }, {
    path: 'setting',
    name: '设置',
    meta: {
      isVerificationL: false,
      iconName: 'icon-setting',
    },
    component: (resolve) => require(['../page/setting/setting'], resolve),
  }]
}];
