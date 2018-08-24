 export default {
   path: 'news',
   name: 'news',
   meta: {
     isVerificationL: false,
     title: '消息通知',
     iconName: 'icon-setting'
   },
   component: (resolve) => require(['../page/news/news'], resolve),
   children: [{
       path: 'systemNotice',
       name: "systemNotice",
       meta: {
         title: '系统通知',
         isVerificationL: false
       },
       component: (resolve) => require(['../page/news/news'], resolve),
       children: [{
         path: 'systemNoticeList',
         name: "systemNoticeList",
         meta: {
           title: '系统通知列表',
           isVerificationL: false
         },
         component: (resolve) => require(['../page/news/systemNotice/systemNoticeList'], resolve)
       }]
     },
     // {
     //   path: 'staffsManage',
     //   name: "staffsManage",
     //   meta: {
     //     title: '员工管理',
     //     isVerificationL: true
     //   },
     //   component: (resolve) => require(['../page/setting/staffsManage'], resolve)
     // }
   ]
 }
