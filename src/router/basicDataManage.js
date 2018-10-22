export default {
  path: 'basicDataManage',
  name: 'basicDataManage',
  meta: {
    isVerificationL: true,
    title: '基础数据管理',
    iconName: 'icon-transport',
  },
  component: (resolve) => require(['../page/basicDataManage/basicDataManage'], resolve),
  children: [{
    path: 'shipperManage',
    name: 'shipperManage',
    redirect: '/basicDataManage/shipperManage/shipperManageList',
    meta: {
      isVerificationL: true,
      title: '运力管理',
    },
    component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperManage'], resolve),
    children: [{
      path: 'capacityList',
      name: 'capacityList',
      meta: {
        isVerificationL: false,
        title: '运力列表',
      },
      component: (resolve) => require(['../components/basicDataManage/shipperManage/shipperManageList'], resolve)
    }]
  }]
}
