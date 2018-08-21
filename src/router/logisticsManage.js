export default {
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
      isVerificationL: true,
      title: '平台承运调度'
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
  }, {
    path: 'UnderConsignmentOrders',
    name: 'UnderConsignmentOrders',
    component: (resolve) => require(['../page/logisticsManage/UnderConsignmentOrders/UnderConsignmentOrders'], resolve),
    meta: {
      isVerificationL: true,
      title: '线下承运调度'
    },
    redirect: '/logisticsManage/UnderConsignmentOrders/UnderOrdersList',
    children: [{
        path: 'UnderOrdersList',
        name: 'UnderOrdersList',
        meta: {
          isVerificationL: false,
          title: '线下承运调度列表',
        },
        component: (resolve) => require(['../page/logisticsManage/UnderConsignmentOrders/UnderOrdersList'], resolve),
      },
      {
        path: 'addUnderOrder',
        name: 'addUnderOrder',
        meta: {
          isVerificationL: false,
          title: '新增线下承运单',
        },
        component: (resolve) => require(['../page/logisticsManage/UnderConsignmentOrders/addUnderOrder'], resolve),
      },
      {
        path: 'underOrderProcess/:setpId/:willId',
        name: 'underOrderProcess',
        meta: {
          isVerificationL: false,
          title: '运单进程',
        },
        component: (resolve) => require(['../page/logisticsManage/UnderConsignmentOrders/underOrderProcess'], resolve),
      },
    ]
  }]
}
