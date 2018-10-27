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
      title: '托运方管理',
    },
    component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperManage'], resolve),
    children: [{
      path: 'shipperManageList',
      name: 'shipperManageList',
      meta: {
        isVerificationL: false,
        title: '托运方列表',
      },
      component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperManageList'], resolve)
    },{
      path: 'shipperDetail/:id',
      name: 'shipperDetail',
      meta: {
        isVerificationL: false,
        title: '托运方详情',
      },
      component: (resolve) => require(['../page/basicDataManage/shipperManage/shipperDetail'], resolve)
    },{
      path: 'editShipper',
      name: 'editShipper',
      meta: {
        isVerificationL: false,
        title: '托运方编辑',
      },
      component: (resolve) => require(['../page/basicDataManage/shipperManage/editShipper'], resolve)
    }]
  },{
    path: 'standardDataSet',
    name: 'standardDataSet',
    redirect: '/basicDataManage/standardDataSet/freight/freightDataList',
    meta: {
      isVerificationL: true,
      title: '标准数据设置',
    },
    component: (resolve) => require(['../page/basicDataManage/standardDataSet/standardDataSet'], resolve),
    children: [{
      path: 'freight',
      name: 'freight',
      meta: {
        isVerificationL: false,
        title: '运费约定',
      },
      component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freight'], resolve),
      children: [{
        path: 'freightDataList',
        name: 'freightDataList',
        meta: {
          isVerificationL: false,
          title: '运费约定列表',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freightDataList'], resolve)
      },{
        path: 'freightDetail/:id',
        name: 'freightDetail',
        meta: {
          isVerificationL: false,
          title: '运费约定详情',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freightDetail'], resolve)
      }]
    },{
      path: 'mileage',
      name: 'mileage',
      meta: {
        isVerificationL: false,
        title: '标准里程',
      },
      component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/mileage'], resolve),
      children: [{
        path: 'mileageDataList',
        name: 'mileageDataList',
        meta: {
          isVerificationL: false,
          title: '标准里程列表',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/mileageDataList'], resolve)
      },{
        path: 'mileageDetail/:id',
        name: 'mileageDetail',
        meta: {
          isVerificationL: false,
          title: '标准里程详情',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/mileageDetail'], resolve)
      },{
        path: 'editMileage',
        name: 'editMileage',
        meta: {
          isVerificationL: false,
          title: '编辑、新增标准里程',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/editMileage'], resolve)
      }]
    }]
  },{
    path: 'capacityManage',
    redirect: '/basicDataManage/capacityManage/transportManage/capacityList',
    name: 'capacityManage',
    meta: {
      isVerificationL: true,
      title: '运力管理',
      iconName: 'icon-transport',
    },
    component: (resolve) => require(['../page/basicDataManage/capacityManage/capacityManage'], resolve),
    children: [{
      path: 'transportManage',
      name: 'transportManage',
      meta: {
        isVerificationL: true,
        title: '运力管理',
      },
      component: (resolve) => require(['../page/basicDataManage/capacityManage/transportManage/transportManage'], resolve),
      children: [{
        path: 'capacityList',
        name: 'capacityList',
        meta: {
          isVerificationL: false,
          title: '运力列表',
        },
        component: (resolve) => require(['../page/basicDataManage/capacityManage/transportManage/transportList'], resolve),
        // component: (resolve) => require(['../components/transportPowerManage/capacityManage/capacityList'], resolve)
      },{
        path: 'capacityDetail/:id/:activeTab/',
        name: 'capacityDetail',
        meta: {
          isVerificationL: false,
          title: '运力详情',
        },
        component: (resolve) => require(['../components/transportPowerManage/capacityManage/capacityDetail'], resolve)
      },{
        path: 'editCapacity/:id/:activeStep/',
        name: 'editCapacity',
        meta: {
          isVerificationL: false,
          title: '编辑绑定信息',
        },
        component: (resolve) => require(['../components/transportPowerManage/capacityManage/editCapacity'], resolve)
      }]
    },{
      path: 'personManage',
      name: 'personManage',
      meta: {
        isVerificationL: true,
        title: '人员管理',
      },
      component: (resolve) => require(['../page/basicDataManage/capacityManage/personManage/personManager'], resolve),
      children: [{
        path: 'personListManage',
        name: 'personListManage',
        meta: {
          isVerificationL: false,
          title: '人员列表管理',
        },
        component: (resolve) => require(['../page/basicDataManage/capacityManage/personManage/personListManager'], resolve)
      },{
        path: 'addPerson',
        name: 'addPerson',
        meta: {
          isVerificationL: false,
          title: '新增、编辑人员',
        },
        component: (resolve) => require(['../page/basicDataManage/capacityManage/personManage/addPerson'], resolve)
      },{
        path: 'personDetail/:id/',
        name: 'personDetail',
        meta: {
          isVerificationL: false,
          title: '人员详情'
        },
        component: (resolve) => require(['../page/basicDataManage/capacityManage/personManage/personDetail'], resolve)
      }]
    }, {
      path: 'carManage',
      name: 'carManage',
      meta: {
        isVerificationL: true,
        title: '车辆管理',
      },
      component: (resolve) => require(['../page/basicDataManage/capacityManage/carManageFiled/carManage'], resolve),
      children: [{
        path: 'tractorManage',
        name: 'tractorManage',
        meta: {
          isVerificationL: false,
          title: '牵引车管理',
        },
        component: (resolve) => require(['../page/basicDataManage/capacityManage/carManageFiled/tractorManageList'], resolve)
      },{
        path: 'carTailManage',
        name: 'carTailManage',
        meta: {
          isVerificationL: false,
          title: '挂车管理',
        },
        component: (resolve) => require(['../page/basicDataManage/capacityManage/carManageFiled/trailerManageList'], resolve)
      },{
        path: 'editTractorManage',
        name: 'editTractorManage',
        meta: {
          isVerificationL: false,
          title: '新增编辑牵引车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarHeadManage'], resolve)
      },{
        path: 'editCarTailManage',
        name: 'editCarTailManage',
        meta: {
          isVerificationL: false,
          title: '新增编辑挂车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarTailManage'], resolve)
      },{
        path: 'tractorDetail/:id/',
        name: 'tractorDetail',
        meta: {
          isVerificationL: false,
          title: '查看牵引车管理',
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/showCarHeadManage'], resolve)
      },{
        path: 'carTailDetail/:id/',
        name: 'carTailDetail',
        meta: {
          isVerificationL: false,
          title: '查看挂车管理'
        },
        component: (resolve) => require(['../components/transportPowerManage/carManage/showCarTailManage'], resolve)
      }]
    }]
  },{
    path: 'threePartyCapacity',
    name: 'threePartyCapacity',
    meta: {
      isVerificationL: true,
      title: '三方运力',
    },
    component: (resolve) => require(['../page/basicDataManage/threePartyCapacity/threePartyCapacity'], resolve),
    redirect: '/basicDataManage/threePartyCapacity/threePartyCapacityList',
    children: [{
      path: 'threePartyCapacityList',
      name: 'threePartyCapacityList',
      meta: {
        isVerificationL: false,
        title: '三方运力',
      },
      component: (resolve) => require(['../page/basicDataManage/threePartyCapacity/threePartyCapacityList'], resolve),
    },{
      path: 'editThreePartyCapacity',
      name: 'editThreePartyCapacity',
      meta: {
        isVerificationL: false,
        title: '三方运力编辑',
      },
      component: (resolve) => require(['../page/basicDataManage/threePartyCapacity/editThreePartyCapacity'], resolve),
    },{
      path: 'threePartyCapacityDetail/:id/',
      name: 'threePartyCapacityDetail',
      meta: {
        isVerificationL: false,
        title: '三方运力详情',
      },
      component: (resolve) => require(['../page/basicDataManage/threePartyCapacity/threePartyCapacityDetail'], resolve),
    }]
  },{
    path: 'supplierManage',
    name: 'supplierManage',
    meta: {
      isVerificationL: true,
      title: '供应商管理',
    },
    component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierManage'], resolve),
    redirect: '/basicDataManage/supplierManage/energyManage/energyManageList',
    children: [{
        path: 'energyManage',
        name: 'energyManage',
        meta: {
          isVerificationL: false,
          title: '油气费管理',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/energyManage/energyManage'], resolve),
        children: [{
            path: 'energyManageList',
            name: 'energyManageList',
            meta: {
              isVerificationL: false,
              title: '油气费管理列表',
            },
            component: (resolve) => require(['../page/basicDataManage/supplierManage/energyManage/energyManageList'], resolve),
          },
          {
            path: 'energyManageChange',
            name: 'energyManageChange',
            meta: {
              isVerificationL: false,
              title: '油气费新增或编辑',
            },
            component: (resolve) => require(['../page/basicDataManage/supplierManage/energyManage/energyManageChange'], resolve),
          }, {
            path: 'energyManageDetalis/:id',
            name: 'energyManageDetalis',
            meta: {
              isVerificationL: false,
              title: '油气费详情',
            },
            component: (resolve) => require(['../page/basicDataManage/supplierManage/energyManage/energyManageDetalis'], resolve),
          }
        ]
    },{
      path: 'tollfeeManage',
      name: 'tollfeeManage',
      meta: {
        isVerificationL: false,
        title: '高速费管理',
      },
      component: (resolve) => require(['../page/basicDataManage/supplierManage/tollfeeManage/tollfeeManage'], resolve),
      children: [{
          path: 'tollfeeManageList',
          name: 'tollfeeManageList',
          meta: {
            isVerificationL: false,
            title: '高速费管理列表',
          },
          component: (resolve) => require(['../page/basicDataManage/supplierManage/tollfeeManage/tollfeeManagelist'], resolve),
        },
        {
          path: 'tollfeeManageChange',
          name: 'tollfeeManageChange',
          meta: {
            isVerificationL: false,
            title: '高速费新增或编辑',
          },
          component: (resolve) => require(['../page/basicDataManage/supplierManage/tollfeeManage/tollfeeManageChange'], resolve),
        }, {
          path: 'tollfeeManageDetalis/:id',
          name: 'tollfeeManageDetalis',
          meta: {
            isVerificationL: false,
            title: '高速费详情',
          },
          component: (resolve) => require(['../page/basicDataManage/supplierManage/tollfeeManage/tollfeeManageDetalis'], resolve),
        }
      ]
    },{
      path: 'carrierManage',
      name: 'carrierManage',
      meta: {
        isVerificationL: false,
        title: '承运商管理',
      },
      component: (resolve) => require(['../page/basicDataManage/supplierManage/carrierManage/carrierManage'], resolve),
      children: [{
          path: 'carrierManageList',
          name: 'carrierManageList',
          meta: {
            isVerificationL: false,
            title: '承运商管理列表',
          },
          component: (resolve) => require(['../page/basicDataManage/supplierManage/carrierManage/carrierManagelist'], resolve),
      },{
        path: 'editCarrier',
        name: 'editCarrier',
        meta: {
          isVerificationL: false,
          title: '承运商新增或编辑',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/carrierManage/editCarrier'], resolve),
      },{
        path: 'carrierDetail/:id',
        name: 'carrierDetail',
        meta: {
          isVerificationL: false,
          title: '承运商',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/carrierManage/carrierDetail'], resolve),
      }
      ]
    }]
  }]
}
