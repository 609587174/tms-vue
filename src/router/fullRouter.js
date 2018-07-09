export default [{
  path: '',
  name: 'index',
  redirect: '/dashborad',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [{
    path: 'dashborad',
    name: 'dashborad',
    meta: {
      isVerificationL: true,
      title: '概览',
      iconName: 'icon-dashboard'
    },
    component: (resolve) => require(['../page/dashborad/dashborad'], resolve),
  }, {
    path: 'orders',
    name: 'orders',
    meta: {
      isVerificationL: true,
      title: '订单',
      iconName: 'icon-order',
    },
    component: (resolve) => require(['../page/orders/orders'], resolve),
    children: [{
      path: 'pickupOrders',
      name: 'pickupOrders',
      redirect: '/orders/pickupOrders/ordersList',
      meta: {
        isVerificationL: true,
        title: '提货订单',
      },
      component: (resolve) => require(['../page/orders/pickupOrders/pickupOrders'], resolve),
      children: [{
          path: 'ordersList',
          name: 'pickupOrdersList',
          meta: {
            isVerificationL: false,
            title: '提货订单列表',
          },
          component: (resolve) => require(['../page/orders/pickupOrders/orderList'], resolve),
        },
        {
          path: 'addNewPickUpOrder',
          name: 'addOrder',
          meta: {
            isVerificationL: false,
            title: '新增提货订单',
          },
          component: (resolve) => require(['../page/orders/pickupOrders/addNewPickUpOrder'], resolve),
        },
        {
          path: 'orderDetail',
          name: 'pickupOrdersDetail',
          meta: {
            isVerificationL: false,
            title: '订单详情'
          },
          component: (resolve) => require(['../page/orders/pickupOrders/orderDetail'], resolve),
          children: [{
            path: 'orderDetailTab/:id/:type',
            name: 'pickupOrderDetailTab',
            meta: {
              isVerificationL: false,
              title: '订单详情',
            },
            component: (resolve) => require(['../page/orders/pickupOrders/orderDetail/orderDetailTab'], resolve),
          }, {
            path: 'arrangeCarTab',
            name: 'pickupArrangeCarTab',
            redirect: '/orders/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList',
            meta: {
              isVerificationL: false,
              title: '车辆指派'
            },
            component: (resolve) => require(['../page/orders/pickupOrders/orderDetail/arrangeCarTab'], resolve),
            children: [{
              path: 'arrangeCarList/:id/:type',
              name: 'pickArrangeCarList',
              meta: {
                isVerificationL: false,
                title: '车辆指派列表'
              },
              component: (resolve) => require(['../page/orders/pickupOrders/orderDetail/arrangeCarList'], resolve),
            }, {
              path: 'arrangeCarMap/:id/:type',
              name: 'pickupArrangeCarMap',
              meta: {
                isVerificationL: false,
                title: '地图'
              },
              component: (resolve) => require(['../page/orders/pickupOrders/orderDetail/arrangeCarMap'], resolve),
            }]
          }, {
            path: 'orderRecordsTab/:id/:type',
            name: 'pickupOrderRecordsTab',
            meta: {
              isVerificationL: false,
              title: '订单记录'
            },
            component: (resolve) => require(['../page/orders/pickupOrders/orderDetail/orderRecordsTab'], resolve),
          }]
        }
      ]
    }]

  }, {
    path: 'logisticsManage',
    name: 'logisticsManage',
    meta: {
      isVerificationL: true,
      title: '物流管理',
      iconName: 'icon-road',
    },
    component: (resolve) => require(['../page/logisticsManage/logisticsManage'], resolve),
    children: [{
      path: 'consignmentOrders',
      name: 'consignmentOrders',
      redirect: '/logisticsManage/consignmentOrders/ordersList',
      meta: {
        isVerificationL: false,
        title: '物流调度'
      },
      component: (resolve) => require(['../page/logisticsManage/consignmentOrder/consignmentOrders'], resolve),
      children: [{
          path: 'ordersList',
          name: 'consignmentOrdersList',
          meta: {
            isVerificationL: false,
            title: '托运订单'
          },
          component: (resolve) => require(['../page/logisticsManage/consignmentOrder/orderList'], resolve),
        },
        {
          path: 'orderDetail',
          name: 'consignmentOrderDetail',
          meta: {
            isVerificationL: false,
            title: '运单详情'
          },
          component: (resolve) => require(['../page/logisticsManage/consignmentOrder/orderDetail'], resolve),
          children: [{
            path: 'orderDetailTab/:setpId/:willId',
            name: 'consignmentOrderDetailTab',
            meta: {
              isVerificationL: false,
              title: '运单详情'
            },
            component: (resolve) => require(['../page/logisticsManage/consignmentOrder/orderDetail/orderDetailTab'], resolve),
          }, {
            path: 'orderProcess/:setpId/:willId',
            name: 'consignmentArrangeCarTab',
            meta: {
              isVerificationL: false,
              title: '运单进程',
            },
            component: (resolve) => require(['../page/logisticsManage/consignmentOrder/orderDetail/orderProcess'], resolve),
          }, {
            path: 'routePlayback/:setpId/:willId',
            name: 'consignmentOrderRecordsTab',
            meta: {
              isVerificationL: false,
              title: '轨迹地图',
            },
            component: (resolve) => require(['../page/logisticsManage/consignmentOrder/orderDetail/routePlayback'], resolve),
          }]
        }
      ]
    }]
  }, {
    path: 'mapManage',
    name: 'mapManage',
    meta: {
      isVerificationL: true,
      title: '地图',
      iconName: 'icon-map',
    },
    component: (resolve) => require(['../page/map/mapManage'], resolve),
    children: [{
      path: 'carMonitor',
      name: 'carMonitor',
      redirect: '/mapManage/carMonitor/realTimeMonitor',
      meta: {
        isVerificationL: true,
        title: '地图监控',
      },
      component: (resolve) => require(['../page/map/carMonitor/carMonitor'], resolve),
      children: [{
        path: 'realTimeMonitor',
        name: 'realTimeMonitor',
        meta: {
          isVerificationL: false,
          title: '实时监控',
        },
        component: (resolve) => require(['../page/map/carMonitor/realTimeMonitor'], resolve),
      }, {
        path: 'routePlayback/:id',
        name: 'routePlayback',
        meta: {
          isVerificationL: false,
          title: '轨迹回放',
        },
        component: (resolve) => require(['../page/map/carMonitor/routePlayback'], resolve),
      }]
    }, {
      path: 'landmark',
      name: 'landmark',
      redirect: '/mapManage/landmark/landmarkList',
      meta: {
        isVerificationL: true,
        title: '地标管理',
      },
      component: (resolve) => require(['../page/map/landmark/landmark'], resolve),
      children: [{
        path: 'landmarkList',
        name: 'landmarkList',
        meta: {
          isVerificationL: false,
          title: '地标列表',
        },
        component: (resolve) => require(['../page/map/landmark/landmarkList'], resolve),
      }, {
        path: 'landmarkDetail/:id',
        name: 'landmarkDetail',
        meta: {
          isVerificationL: false,
          title: '地标详情',
        },
        component: (resolve) => require(['../page/map/landmark/landmarkDetail'], resolve),
      }, {
        path: 'landmarkMap',
        name: 'landmarkMap',
        meta: {
          isVerificationL: false,
          title: '地标地图',
        },
        component: (resolve) => require(['../page/map/landmark/landmarkMap'], resolve),
      }]
    }]
  }, {
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
        path: 'editCapacity',
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
  }, {
    path: 'clientManage',
    name: 'clientManage',
    meta: {
      isVerificationL: true,
      title: '客户管理',
      iconName: 'icon-customer',
    },
    component: (resolve) => require(['../page/clientManage/clientManage'], resolve),
    children: [{
      path: 'clientManageSecond',
      name: 'clientManageSecond',
      redirect: '/clientManage/clientManageSecond/privateClientManage',
      meta: {
        isVerificationL: false,
        title: '客户管理',
      },
      component: (resolve) => require(['../page/clientManage/clientManageSecond'], resolve),
      children: [{
          path: 'privateClientManage',
          name: 'privateClientManage',
          meta: {
            isVerificationL: false,
            title: '客户管理',
          },
          component: (resolve) => require(['../page/clientManage/privateClientManage'], resolve)
        }, {
          path: 'addClient',
          name: 'addClient',
          meta: {
            isVerificationL: false,
            title: '新增、编辑客户',
          },
          component: (resolve) => require(['../page/clientManage/addClient'], resolve)
        },
        {
          path: 'clientDetail',
          name: 'clientDetail',
          meta: {
            isVerificationL: false,
            title: '客户详情',
          },
          component: (resolve) => require(['../page/clientManage/clientDetail'], resolve)
        },
        {
          path: 'platformClientManage',
          name: 'platformClientManage',
          meta: {
            isVerificationL: false,
            title: '平台客户管理',
          },
          component: (resolve) => require(['../page/clientManage/platformClientManage'], resolve)
        },
      ]
    }, {
      path: 'standardDataManage',
      name: 'standardDataManage',
      redirect: '/clientManage/standardDataManage/freight/freightDataList',
      meta: {
        isVerificationL: false,
        title: '标准数据管理',
      },
      component: (resolve) => require(['../page/clientManage/standardDataManage/standardDataManage'], resolve),
      children: [{
        path: 'freight',
        name: 'freight',
        meta: {
          isVerificationL: false,
          title: '运费约定',
        },
        component: (resolve) => require(['../page/clientManage/standardDataManage/standardDataManage'], resolve),
        children: [{
          path: 'freightDataList',
          name: 'freightDataList',
          meta: {
            isVerificationL: false,
            title: '运费约定列表',
          },
          component: (resolve) => require(['../page/clientManage/standardDataManage/freight/freightDataList'], resolve)
        }, {
          path: 'freightDetail',
          name: 'freightDetail',
          meta: {
            isVerificationL: false,
            title: '运费约定详情',
          },
          component: (resolve) => require(['../page/clientManage/standardDataManage/freight/freightDetail'], resolve)
        }]
      }, {
        path: 'mileage',
        name: 'mileage',
        meta: {
          isVerificationL: false,
          title: '标准里程',
        },
        component: (resolve) => require(['../page/clientManage/standardDataManage/standardDataManage'], resolve),
        children: [{
          path: 'mileageDataList',
          name: 'mileageDataList',
          meta: {
            isVerificationL: false,
            title: '标准里程列表',
          },
          component: (resolve) => require(['../page/clientManage/standardDataManage/mileage/mileageDataList'], resolve)
        }, {
          path: 'mileageDetail',
          name: 'mileageDetail',
          meta: {
            isVerificationL: false,
            title: '标准里程详情',
          },
          component: (resolve) => require(['../page/clientManage/standardDataManage/mileage/mileageDetail'], resolve)
        }]
      }]
    }],

  }, {
    path: 'statistics',
    name: 'statistics',
    meta: {
      isVerificationL: false,
      title: '数据统计',
      iconName: 'icon-data',
    },
    component: (resolve) => require(['../page/statistics/statistics'], resolve),
    children: [{
      path: 'business',
      name: "business",
      redirect: '/statistics/business/logistics/logisticsList',
      meta: {
        title: '业务统计',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/business/business'], resolve),
      children: [{
        path: 'logistics',
        name: "logistics",
        meta: {
          title: '物流费用',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/statistics/business/logistics/logistics'], resolve),
        children: [{
          path: 'logisticsList',
          name: "logisticsList",
          meta: {
            title: '物流费用列表',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/business/logistics/logisticsList'], resolve)
        }, {
          path: 'editLogistics',
          name: "editLogistics",
          meta: {
            title: '物流费用编辑',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/business/logistics/editLogistics'], resolve)
        }, {
          path: 'logisticsWaybillDetail/:willId/:orderId',
          name: "logisticsWaybillDetail",
          meta: {
            title: '运单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/business/logistics/logisticsWaybillDetail'], resolve)
        }]
      }
      // , {
      //   path: 'income',
      //   name: "income",
      //   meta: {
      //     title: '收入统计',
      //     isVerificationL: false
      //   },
      //   component: (resolve) => require(['../page/statistics/business/income/income'], resolve),
      //   children: [{
      //     path: 'incomeList',
      //     name: "incomeList",
      //     meta: {
      //       title: '收入统计列表',
      //       isVerificationL: false
      //     },
      //     component: (resolve) => require(['../page/statistics/business/income/incomeList'], resolve)
      //   }, {
      //     path: 'editIncome',
      //     name: "editIncome",
      //     meta: {
      //       title: '收入统计编辑',
      //       isVerificationL: false
      //     },
      //     component: (resolve) => require(['../page/statistics/business/income/editIncome'], resolve)
      //   }, {
      //     path: 'incomeWaybillDetail/:willId/:orderId',
      //     name: "incomeWaybillDetail",
      //     meta: {
      //       title: '运单详情',
      //       isVerificationL: false
      //     },
      //     component: (resolve) => require(['../page/statistics/business/income/incomeWaybillDetail'], resolve)
      //   }]
      // }
      ]
    },{
      path: 'costManage',
      name: "costManage",
      redirect: '/statistics/costManage/costImport/costImportList',
      meta: {
        title: '费用管理',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/costManage/costManage'], resolve),
      children: [ {
        path: 'costImport',
        name: "costImport",
        meta: {
          title: '费用导入统计',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/statistics/costManage/costImport/costImport'], resolve),
        children: [{
          path: 'costImportList',
          name: "costImportList",
          meta: {
            title: '费用导入统计列表',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/costManage/costImport/costImportList'], resolve)
        }, {
          path: 'editCostImport',
          name: "editCostImport",
          meta: {
            title: '费用导入统计编辑',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/costManage/costImport/editCostImport'], resolve)
        }, {
          path: 'costImportWaybillDetail/:willId/:orderId',
          name: "costImportWaybillDetail",
          meta: {
            title: '运单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/costManage/costImport/costImportWaybillDetail'], resolve)
        }]
      }
      , {
        path: 'cashCost',
        name: "cashCost",
        meta: {
          title: '现金费用管理',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/statistics/costManage/cashCostManage/cashCost'], resolve),
        children: [{
          path: 'cashCostList',
          name: "cashCostList",
          meta: {
            title: '现金费用管理列表',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/costManage/cashCostManage/cashCostList'], resolve)
        }, {
          path: 'editCashCost',
          name: "editCashCost",
          meta: {
            title: '现金费用管理编辑',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/costManage/cashCostManage/editCashCost'], resolve)
        }, {
          path: 'cashCostWaybillDetail/:willId/:orderId',
          name: "cashCostWaybillDetail",
          meta: {
            title: '运单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/costManage/cashCostManage/cashCostWaybillDetail'], resolve)
        }]
      }
      ]
    }]
  }, {
    path: 'setting',
    name: 'setting',
    meta: {
      isVerificationL: true,
      title: '设置',
      iconName: 'icon-setting',
    },
    component: (resolve) => require(['../page/setting/setting'], resolve),
    children: [{
        path: 'company',
        name: "company",
        redirect: '/setting/company/pages',
        meta: {
          title: '公司主页',
          isVerificationL: true
        },

        component: (resolve) => require(['../page/setting/company/company'], resolve),
        children: [{
            path: 'pages',
            name: "pages",
            meta: {
              title: '公司主页',
              isVerificationL: true
            },
            component: (resolve) => require(['../page/setting/company/pages'], resolve)
          },
          {
            path: 'editPages',
            name: "editPages",
            meta: {
              title: '编辑主页',
              isVerificationL: true
            },
            component: (resolve) => require(['../page/setting/company/editPages'], resolve)
          }
        ]
      }, {
        path: 'organizationalStructure',
        name: "organizationalStructure",
        meta: {
          title: '组织架构',
          isVerificationL: true
        },
        component: (resolve) => require(['../page/setting/organizationalStructure'], resolve)
      },
      {
        path: 'staffsManage',
        name: "staffsManage",
        meta: {
          title: '员工管理',
          isVerificationL: true
        },
        component: (resolve) => require(['../page/setting/staffsManage'], resolve)
      },
      {
        path: 'powerManage',
        name: "powerManage",
        meta: {
          title: '权限管理',
          isVerificationL: true
        },
        component: (resolve) => require(['../page/setting/powerManage'], resolve)
      }
    ]
  }]
}];
