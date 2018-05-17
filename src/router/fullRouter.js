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
    children:[{
      path: 'pickupOrders',
      name: '提货订单',
      meta: {
        isVerificationL: false,
        iconName: 'icon-lng-dashboard',
      },
      component: (resolve) => require(['../page/orders/pickupOrder/pickupOrders'], resolve),
      children: [{
        path: 'ordersList',
        name: '提货订单',
        meta: {
          isVerificationL: false,
        },
        component: (resolve) => require(['../page/orders/pickupOrder/orderList'], resolve),
      },
      {
        path: 'orderDetail',
        name: '订单详情',
        meta: {
          isVerificationL: false,
        },
        component: (resolve) => require(['../page/orders/pickupOrder/orderDetail'], resolve),
        children: [{
          path: 'orderDetailTab/:id',
          name: '订单详情',
          meta: {
            isVerificationL: false,

          },
          component: (resolve) => require(['../page/orders/pickupOrder/orderDetail/orderDetailTab'], resolve),
        }, {
          path: 'arrangeCarTab',
          name: '车辆指派',
          redirect: '/orders/pickupOrder/orderDetail/arrangeCarTab/arrangeCarList',
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../page/orders/pickupOrder/orderDetail/arrangeCarTab'], resolve),
          children: [{
            path: 'arrangeCarList/:id',
            name: '车辆指派列表',
            meta: {
              isVerificationL: false,
            },
            component: (resolve) => require(['../page/orders/pickupOrder/orderDetail/arrangeCarList'], resolve),
          }, {
            path: 'arrangeCarMap/:id',
            name: '地图',
            meta: {
              isVerificationL: false,
            },
            component: (resolve) => require(['../page/orders/pickupOrder/orderDetail/arrangeCarMap'], resolve),
          }]
        }, {
          path: 'orderRecordsTab/:id',
          name: '订单记录',
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../page/orders/pickupOrder/orderDetail/orderRecordsTab'], resolve),
        }]
      }
    ]
    },{
      path: 'consignmentOrders',
      name: '托运订单',
      meta: {
        isVerificationL: false,
      },
      component: (resolve) => require(['../page/orders/consignmentOrder/consignmentOrders'], resolve),
      children: [{
        path: 'ordersList',
        name: '托运订单',
        meta: {
          isVerificationL: false,
        },
        component: (resolve) => require(['../page/orders/consignmentOrder/orderList'], resolve),
      },
      {
        path: 'orderDetail',
        name: '订单详情',
        meta: {
          isVerificationL: false,
        },
        component: (resolve) => require(['../page/orders/consignmentOrder/orderDetail'], resolve),
        children: [{
          path: 'orderDetailTab/:id',
          name: '订单详情',
          meta: {
            isVerificationL: false,

          },
          component: (resolve) => require(['../page/orders/consignmentOrder/orderDetail/orderDetailTab'], resolve),
        }, {
          path: 'arrangeCarTab/:id',
          name: '车辆指派',
          redirect: '/orders/consignmentOrder/orderDetail/arrangeCarTab/arrangeCarList',
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../page/orders/consignmentOrder/orderDetail/arrangeCarTab'], resolve),
          children: [{
            path: 'arrangeCarList/:id',
            name: '车辆指派列表',
            meta: {
              isVerificationL: false,
            },
            component: (resolve) => require(['../page/orders/consignmentOrder/orderDetail/arrangeCarList'], resolve),
          }, {
            path: 'arrangeCarMap/:id',
            name: '地图',
            meta: {
              isVerificationL: false,
            },
            component: (resolve) => require(['../page/orders/consignmentOrder/orderDetail/arrangeCarMap'], resolve),
          }]
        }, {
          path: 'orderRecordsTab/:id',
          name: '订单记录',
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../page/orders/consignmentOrder/orderDetail/orderRecordsTab'], resolve),
        }]
      }
    ]
    }]

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
    name: '运力',
    meta: {
      isVerificationL: true,
      iconName: 'icon-map',
    },
    component: (resolve) => require(['../page/transportPowerManage/transportPowerManage'], resolve),
      children: [{
        path: 'capacityManage',
        name: '运力管理',
        meta: {
          isVerificationL: true,
          iconName: 'icon-transport',
        },
        component: (resolve) => require(['../page/transportPowerManage/capacityManage/capacityManage'], resolve),
        children: [{
          path: 'capacityList',
          name: "运力列表",
          meta: {
            isVerificationL: false,
          },
          component: (resolve) => require(['../components/transportPowerManage/capacityManage/capacityList'], resolve)
        }]
      },{
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
          isVerificationL: false,
          notRenderMenu:true,
        },
        component: (resolve) => require(['../page/clientManage/privateClientManage'], resolve)
      }, {
        path: 'addClient',
        name: "新增、编辑客户",
        meta: {
          isVerificationL: false,
          notRenderMenu:true,
        },
        component: (resolve) => require(['../page/clientManage/addClient'], resolve)
      },
      {
        path: 'platformClientManage',
        name: "平台客户管理",
        meta: {
          isVerificationL: false,
          notRenderMenu:true,
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
