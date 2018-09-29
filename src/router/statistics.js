 export default {
   path: 'statistics',
   name: 'statistics',
   meta: {
     isVerificationL: true,
     title: '数据统计',
     iconName: 'icon-data',
   },
   component: (resolve) => require(['../page/statistics/statistics'], resolve),
   children: [{
     path: 'business',
     name: "business",
     redirect: '/statistics/business/logistics/logisticsList',
     meta: {
       title: '物流数据',
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
         path: 'logisticsWaybillDetail/:willId',
         name: "logisticsWaybillDetail",
         meta: {
           title: '运单详情',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/statistics/business/logistics/logisticsWaybillDetail'], resolve)
       }]
     }]
   }, {
     path: 'costManage',
     name: "costManage",
     redirect: '/statistics/costManage/costImport/costImportList',
     meta: {
       title: '费用管理',
       isVerificationL: false
     },
     component: (resolve) => require(['../page/statistics/costManage/costManage'], resolve),
     children: [{
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
         path: 'costImportWaybillDetail/:willId',
         name: "costImportWaybillDetail",
         meta: {
           title: '运单详情',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/statistics/costManage/costImport/costImportWaybillDetail'], resolve)
       }]
     }, {
       path: 'cashCostManage',
       name: "cashCostManage",
       meta: {
         title: '现金费用管理',
         isVerificationL: false
       },
       component: (resolve) => require(['../page/statistics/costManage/cashCostManage/cashCost'], resolve),
       children: [{
         path: 'cashCostList',
         name: "cashCostList",
         meta: {
           title: '现金费用列表',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/statistics/costManage/cashCostManage/cashCostList'], resolve)
       }, {
         path: 'editCashCost',
         name: "editCashCost",
         meta: {
           title: '现金费用编辑',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/statistics/costManage/cashCostManage/editCashCost'], resolve)
       }, {
         path: 'cashCostWaybillDetail/:willId',
         name: "cashCostWaybillDetail",
         meta: {
           title: '运单详情',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/statistics/costManage/cashCostManage/cashCostWaybillDetail'], resolve)
       }]
     }, {
       path: 'publicCostManage',
       name: "publicCostManage",
       meta: {
         title: '对公费用管理',
         isVerificationL: false
       },
       component: (resolve) => require(['../page/statistics/costManage/publicCostManage/publicCost'], resolve),
       children: [{
         path: 'tollFee',
         name: "tollFee",
         meta: {
           title: '高速费管理',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/statistics/costManage/publicCostManage/publicCost'], resolve),
         children: [{
           path: 'tollFeeList',
           name: "tollFeeList",
           meta: {
             title: '高速费列表',
             isVerificationL: false
           },
           component: (resolve) => require(['../page/statistics/costManage/publicCostManage/tollFee/tollFeeList'], resolve)
         }, {
           path: 'editTollFee',
           name: "editTollFee",
           meta: {
             title: '高速费编辑',
             isVerificationL: false
           },
           component: (resolve) => require(['../page/statistics/costManage/publicCostManage/tollFee/editTollFee'], resolve)
         }, {
           path: 'tollFeeWaybillDetail/:willId',
           name: "tollFeeWaybillDetail",
           meta: {
             title: '运单详情',
             isVerificationL: false
           },
           component: (resolve) => require(['../page/statistics/costManage/publicCostManage/tollFee/tollFeeWaybillDetail'], resolve)
         }]
       }, {
         path: 'oilGas',
         name: "oilGas",
         meta: {
           title: '油/气费管理',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/statistics/costManage/publicCostManage/publicCost'], resolve),
         children: [{
           path: 'oilGasList',
           name: "oilGasList",
           meta: {
             title: '油/气费列表',
             isVerificationL: false
           },
           component: (resolve) => require(['../page/statistics/costManage/publicCostManage/oilGas/oilGasList'], resolve)
         }, {
           path: 'editOilGas',
           name: "editOilGas",
           meta: {
             title: '油/气费编辑',
             isVerificationL: false
           },
           component: (resolve) => require(['../page/statistics/costManage/publicCostManage/oilGas/editOilGas'], resolve)
         }, {
           path: 'oilGasWaybillDetail/:willId',
           name: "oilGasWaybillDetail",
           meta: {
             title: '运单详情',
             isVerificationL: false
           },
           component: (resolve) => require(['../page/statistics/costManage/publicCostManage/oilGas/oilGasWaybillDetail'], resolve)
         }]
       }]
     }]
   }, {
     path: 'ledger',
     name: "ledger",
     redirect: '/statistics/ledger/ledgerList',
     meta: {
       title: '业务台账',
       isVerificationL: false
     },
     component: (resolve) => require(['../page/statistics/ledger/ledger'], resolve),
     children: [{
       path: 'ledgerList',
       name: "ledgerList",
       meta: {
         title: '业务台账列表',
         isVerificationL: false
       },
       component: (resolve) => require(['../page/statistics/ledger/ledgerList'], resolve),
     }, {
       path: 'ledgerWaybillDetail/:willId',
       name: "ledgerWaybillDetail",
       meta: {
         title: '运单详情',
         isVerificationL: false
       },
       component: (resolve) => require(['../page/statistics/ledger/ledgerWaybillDetail'], resolve)
     }]
   }]
 }
