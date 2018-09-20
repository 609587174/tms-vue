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
  ]
}
