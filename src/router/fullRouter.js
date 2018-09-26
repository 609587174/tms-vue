import dashboard from './dashboard'
import orders from './orders'
import logisticsManage from './logisticsManage'
import mapManage from './mapManage'
import transportPowerManage from './transportPowerManage'
import clientManage from './clientManage'
import setting from './setting'
import statistics from './statistics'
import dataAnalysis from './dataAnalysis'
import news from './news'
import arap from './arap'
import importData from './imports'
export default [{
  path: '',
  name: 'index',
  redirect: '/dashborad',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [
    dashboard,
    orders,
    logisticsManage,
    mapManage,
    transportPowerManage,
    clientManage,
    statistics,
    dataAnalysis,
    setting,
    news,
    arap,
    importData,
  ]
}];
