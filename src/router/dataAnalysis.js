export default {
  path: 'dataAnalysis',
  name: 'dataAnalysis',
  meta: {
    isVerificationL: false,
    title: '承运大数据',
    iconName: 'icon-dataAnalysis'
  },
  component: (resolve) => require(['../page/dataAnalysis/dataAnalysis'], resolve),
  //redirect: '/dashboard/dispatchDashboard',
  children: [{
    path: 'routeManage',
    name: 'routeManage',
    meta: {
      isVerificationL: false,
      title: '路线管理',
    },
    redirect: '/dataAnalysis/routeManage/overview',
    component: (resolve) => require(['../page/dataAnalysis/routeManage/routeManage'], resolve),
    children: [{
      path: 'overview',
      name: 'overview',
      meta: {
        isVerificationL: false,
        title: '路线概览',
      },
      component: (resolve) => require(['../page/dataAnalysis/routeManage/overview'], resolve),
    },{
      path: 'routePlaybackOfStandard',
      name: 'routePlaybackOfStandard',
      meta: {
        isVerificationL: false,
        title: '液厂-站点轨迹',
      },
      component: (resolve) => require(['../page/dataAnalysis/routeManage/routePlaybackOfStandard'], resolve),
    }]
  }, {
    path: 'carAnalysis',
    name: 'carAnalysis',
    meta: {
      isVerificationL: false,
      title: '车辆监控分析',
    },
    redirect: '/dataAnalysis/carAnalysis/carMonitorAnalysis',
    component: (resolve) => require(['../page/dataAnalysis/carMonitorAnalysis/carAnalysis'], resolve),
    children: [{
      path: 'carMonitorAnalysis',
      name: 'carMonitorAnalysis',
      meta: {
        isVerificationL: false,
        title: '车辆监控',
      },
      component: (resolve) => require(['../page/dataAnalysis/carMonitorAnalysis/carMonitorAnalysis'], resolve),
    },{
      path: 'routePlaybackDetail/:id',
      name: 'routePlaybackDetail',
      meta: {
        isVerificationL: false,
        title: '地图轨迹',
      },
      component: (resolve) => require(['../page/dataAnalysis/carMonitorAnalysis/routePlaybackDetail'], resolve),
    }]
  }]
}
