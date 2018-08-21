export default {
  path: 'setting',
  name: 'setting',
  meta: {
    isVerificationL: true,
    title: '设置',
    iconName: 'icon-setting'
  },
  component: (resolve) => require(['../page/setting/setting'], resolve),
  children: [{
      path: 'company',
      name: "company",
      redirect: '/setting/company/pages',
      meta: {
        title: '公司主页',
        isVerificationL: true
      },

      component: (resolve) => require(['../page/setting/company/company'], resolve),
      children: [{
          path: 'pages',
          name: "pages",
          meta: {
            title: '公司主页',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/company/pages'], resolve)
        },
        {
          path: 'editPages',
          name: "editPages",
          meta: {
            title: '编辑主页',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/company/editPages'], resolve)
        }
      ]
    }, {
      path: 'organizationalStructure',
      name: "organizationalStructure",
      meta: {
        title: '组织架构',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/setting/organizationalStructure'], resolve)
    },
    {
      path: 'staffsManage',
      name: "staffsManage",
      meta: {
        title: '员工管理',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/setting/staffsManage'], resolve)
    },
    {
      path: 'powerManage',
      name: "powerManage",
      meta: {
        title: '权限管理',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/setting/powerManage'], resolve)
    }
  ]
}
