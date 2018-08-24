export default {
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

}
