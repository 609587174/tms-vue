 export default {
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
       title: '托运方管理',
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
         path: 'editClient',
         name: 'editClient',
         meta: {
           isVerificationL: false,
           title: '编辑托运方',
         },
         component: (resolve) => require(['../page/clientManage/editClient'], resolve)
       },
       {
         path: 'clientDetail',
         name: 'clientDetail',
         meta: {
           isVerificationL: false,
           title: '托运方详情',
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

 }
