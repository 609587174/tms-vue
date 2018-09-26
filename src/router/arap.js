 export default {
  path: 'arap',
  name: 'arap',
  meta: {
    isVerificationL: false,
    title: '应收应付',
    iconName: 'icon-wallet',
  },
  component: (resolve) => require(['../page/arap/arap'], resolve),
  children: [{
      path: 'shipperReceivableManage',
      name: "shipperReceivableManage",
      redirect: '/arap/shipperReceivableManage/shipperReceivableList',
      meta: {
        title: '托运方应收管理',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/arap/shipperReceivableManage/shipperReceivableManage'], resolve),
      children: [{
        path: 'shipperReceivableList',
        name: "shipperReceivableList",
        meta: {
          title: '托运方应收报表',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/shipperReceivableManage/shipperReceivableList'], resolve)
      },{
        path: 'receivableManage',
        name: "receivableManage",
        meta: {
          title: '回款管理',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/shipperReceivableManage/receivableManage'], resolve)
      }
      ]
    },
    {
      path: 'supplierMeetManage',
      name: "supplierMeetManage",
      redirect: '/arap/supplierMeetManage/oilGasMeetList',
      meta: {
        title: '供应商应付管理',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/arap/supplierMeetManage/supplierMeetManage'], resolve),
      children: [{
        path: 'oilGasMeetList',
        name: "oilGasMeetList",
        meta: {
          title: '加油气应付报表',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/supplierMeetManage/oilGasMeetList'], resolve)
      },{
        path: 'oilGasPayment',
        name: "oilGasPayment",
        meta: {
          title: '付款管理',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/supplierMeetManage/oilGasPayment'], resolve)
      }
      ]
    },
  ]
}
