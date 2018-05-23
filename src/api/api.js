/**
 * @description 接口文档API,用于后端接口查询
 * @param
 *   url:后端接口url（必需）
 *   method:后端接口方法（必需）
 *   desc:后端接口描述 （可选）
 *   param:接口参数 （可选）
 *     desc:参数描述（可选）
 */

const api = {
  getCustomerList: {
    url: '/carrier/customer/',
    method: 'get',
    desc: '客户管理',
    param: {
      name: {
        desc: '客户名称'
      },
      contact_name: {
        desc: '联系人'
      },
      contact_phone: {
        desc: '联系电话'
      }
    }
  },
  getPermissionsList: {
    url: '/permissions/menus/',
    method: 'get',
    desc: '系统可分配菜单 权限列表',
    param: {

    }
  },
  getPositionDetail: {
    url: '/carrier/roles/:id/',
    method: 'get',
    desc: '获取职位详情',
    param: {
      id: {
        desc: '职位ID'
      }
    }
  },
  addStaff: {
    url: '/carrier/users/',
    method: 'post',
    desc: '新增员工',
    param: {
      username: {
        desc: '用户名'
      },
      password: {
        desc: '密码'
      },
      phone: {
        desc: '电话号码'
      },
      nick_name: {
        desc: '姓名'
      },
      email: {
        desc: '邮箱'
      },
      carrier_role: {
        desc: '职位资源id'
      }
    }
  },
  updateStaff: {
    url: '/carrier/users/:id/',
    method: 'PATCH',
    desc: '修改员工',
    param: {
      username: {
        desc: '用户名'
      },
      is_deleted: {
        desc: '是否删除该用户'
      },
      phone: {
        desc: '电话号码'
      },
      password: {
        desc: '密码'
      },
      nick_name: {
        desc: '姓名'
      },
      email: {
        desc: '邮箱'
      },
      carrier_role: {
        desc: '职位资源id'
      }
    }
  },
  getStaffs: {
    url: '/carrier/users/',
    method: 'get',
    desc: '员工列表',
    param: {
      pagination: {
        desc: '是否分页'
      },
      is_deleted: {
        desc: '是否删除该用户'
      },
      department: {
        desc: '部门资源id'
      },
      carrier_role: {
        desc: '职位资源id'
      }
    }
  },
  addPosition: {
    url: '/carrier/roles/',
    method: 'post',
    desc: '新增职位',
    param: {
      department: {
        desc: '部门ID'
      },
      role_name: {
        desc: '职位名称'
      }
    }
  },
  updatePosition: {
    url: '/carrier/roles/:carrier_role_id/',
    method: 'PATCH',
    desc: '修改职位',
    param: {
      carrier_role_id: {
        desc: '职位ID'
      },
      role_name: {
        desc: '职位名称'
      },
      permissions: {
        desc: '权限列表'
      }
    }
  },
  deletePosition: {
    url: '/carrier/roles/:carrier_role_id/',
    method: 'DELETE',
    desc: '修改职位',
    param: {
      carrier_role_id: {
        desc: '职位ID'
      }
    }
  },
  addDepartment: {
    url: '/carrier/departments/',
    method: 'post',
    desc: '新增部门',
    param: {
      group_name: {
        desc: '部门名称'
      }
    }
  },
  updateDepartment: {
    url: '/carrier/departments/:id/',
    method: 'PATCH',
    desc: '修改部门',
    param: {
      group_name: {
        desc: '部门名称'
      },
      id: {
        desc: '部门id'
      }
    }
  },
  getDepartmentList: {
    url: '/carrier/departments/',
    method: 'get',
    desc: '部门列表',
    param: {
      page: {
        desc: '分页'
      },
      pagination: {
        desc: '是否分页'
      }
    }
  },
  getPositionList: {
    url: '/carrier/roles/',
    method: 'get',
    desc: '职位列表',
    param: {
      page: {
        desc: '分页'
      },
      pagination: {
        desc: '是否分页'
      },
      department: {
        desc: '部门ID'
      }
    }
  },
  login: {
    url: '/auth/login/',
    method: 'post',
    notNeedToken: true,
    desc: '登录',
    param: {
      username: {
        desc: '用户名',
      },
      password: {
        desc: '密码',
      },
      verify_key: {
        desc: '验证码key值'
      },
      verify_code: {
        desc: '验证码'
      }
    }
  },
  signOut: {
    url: '/auth/logout/',
    method: 'post',
    desc: '退出登录',
    param: {

    }
  },
  register: {
    url: '/user/users/register/',
    method: 'post',
    notNeedToken: true,
    desc: '注册',
    param: {
      nick_name: {
        desc: '用户名',
      },
      password: {
        desc: '密码',
      },
      confirm_password: {
        desc: '确认密码',
      },
      phone: {
        desc: '手机号码',
      },
      verify_key: {
        desc: '图形验证码key值',
      },
      message_verify_code: {
        desc: '手机验证码'
      }
    }
  },
  forgetPassword: {
    url: '/auth/reset_password/',
    method: 'post',
    notNeedToken: true,
    desc: '找回密码',
    param: {
      phone: {
        desc: '手机号码',
      },
      message_verify_code: {
        desc: '手机号码',
      },
      password: {
        desc: '新密码',
      },
      confirm_password: {
        desc: '重复密码',
      }
    }
  },
  addCarrier: {
    url: '/carrier/carriers/',
    method: 'post',
    desc: '创建承运商',
    param: {
      user_id: {
        desc: 'user_id',
      },
      name: {
        desc: '企业名称',
      },
      contact_name: {
        desc: '联系姓名',
      },
      contact_phone: {
        desc: '联系电话',
      },
      area: {
        desc: '所在区域',
      },
      detail_address: {
        desc: '详细地址'
      },
      carrier_type: {
        desc: '企业类型'
      }
    }
  },
  imageVerifyCode: {
    url: '/common/image_verify_code/',
    method: 'get',
    notNeedToken: true,
    desc: '图形验证码',
    param: {

    }
  },
  messageVerifyCode: {
    url: '/common/message_verify_code/',
    method: 'post',
    notNeedToken: true,
    desc: '图形验证码',
    param: {
      phone: {
        desc: '手机号码',
      }
    }
  },
  globalData: {
    url: '/common/global_enums/',
    method: 'get',
    notNeedToken: true,
    desc: '全局数据',
    param: {

    }
  },
  getUser: {
    url: '/user/users/profile/',
    method: 'get',
    desc: '获取用户个人信息',
    param: {

    }
  },
  searchCapacityList: {
    url: '/truck/tractor_semitrailers/',
    method: 'get',
    desc: '查询运力列表',
    param: {}
  },
  getGroups: {
    url: '/carrier/carrier_groups/',
    method: 'get',
    desc: '获取运力管理分组数据',
    param: {}
  },
  getCapacityDetail: {
    url: '/truck/tractor_semitrailers/:id/',
    method: 'GET',
    desc: '获取运力详情',
    param: {}
  },
  bindTruck: {
    url: '/truck/tractor_semitrailers/:id/bind_semitrailer/',
    method: 'PATCH',
    desc: '绑定挂车',
    param: {}
  },
  bindStaff: {
    url: '/truck/tractor_semitrailers/:id/bind_driver_staff/',
    method: 'PATCH',
    desc: '绑定人员',
    param: {}
  },
  forceBindTruck: {
    url: '/truck/tractor_semitrailers/:id/force_bind_semitrailer/',
    method: 'PATCH',
    desc: '强制绑定挂车',
    param: {}
  },
  forceBindStaff: {
    url: '/truck/tractor_semitrailers/:id/force_bind_driver_staff/',
    method: 'PATCH',
    desc: '强制绑定人员',
    param: {}
  },
  searchHeadCarList: {
    url: '/truck/tractors/',
    method: 'get',
    desc: '查询牵引车列表',
    param: {

    }
  },
  getSelectData: {
    url: '/common/global_enums/',
    method: 'get',
    desc: '获取全部下拉数据',
    param: {

    }
  },
  creatHeadFrom: {
    url: '/truck/tractors/',
    method: 'post',
    desc: '创建牵引车',
    param: {

    }
  },
  upadteHeadFrom: {
    url: '/truck/tractors/:id/',
    method: 'PATCH',
    desc: '更新牵引车',
    param: {

    }
  },
  deleteInsuranceFrom: {
    url: '/truck/tractors/:id/tractor_insurances/',
    method: 'delete',
    desc: '删除保险',
    param: {

    }
  },
  getHeadDetalis: {
    url: '/truck/tractors/:id/',
    method: 'get',
    desc: '获取牵引车详细信息',
    param: {

    }
  },
  searchTailCarList: {
    url: '/truck/semitrailers/',
    method: 'get',
    desc: '获取挂车列表',
    param: {

    }
  },
  creatTailFrom: {
    url: '/truck/semitrailers/',
    method: 'post',
    desc: '创建挂车',
    param: {

    }
  },

  getTailDetalis: {
    url: '/truck/semitrailers/:id/',
    method: 'get',
    desc: '获取挂车详细信息',
    param: {

    }
  },

  upadteTailFrom: {
    url: '/truck/semitrailers/:id/',
    method: 'PATCH',
    desc: '更新挂车',
    param: {

    }
  },
  getDriversList: {
    url: '/carrier/carrier_drivers/',
    method: 'get',
    desc: '获取承运商司机列表',
    param: {
      id: {
        desc: '资源id',
      },
      name: {
        desc: '司机名称',
      },
      work_type: {
        desc: '从业类型',
      },
      mobile_phone: {
        desc: '手机号码',
      },
      on_job_status: {
        desc: '在离职状态',
      },
      bind_tractors: {
        desc: '绑定车辆',
      }
    }
  },
  getDriversDetail: {
    url: '/carrier/carrier_drivers/:id/',
    method: 'get',
    desc: '获取承运商司机详情',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },
  addDrivers: {
    url: '/carrier/carrier_drivers/',
    method: 'post',
    desc: '承运商司机创建',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },
  patchDrivers: {
    url: '/carrier/carrier_drivers/:id/',
    method: 'patch',
    desc: '承运商司机更新',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },
  getProvince: {
    url: '/common/area/provinces/',
    method: 'get',
    notNeedToken: true,
    desc: '获取省列表',
    param: {

    }
  },
  getCity: {
    url: '/common/area/provinces/:province_id/',
    method: 'get',
    notNeedToken: true,
    desc: '获取市列表',
    param: {

    }
  },
  getArea: {
    url: '/common/area/cities/:city_id/',
    method: 'get',
    notNeedToken: true,
    desc: '获取区域列表',
    param: {

    }
  },
  deleteDriverTraining: {
    url: '/carrier/carrier_drivers/:id/carrier_driver_training/',
    method: 'delete',
    desc: '承运商司机培训记录删除',
    param: {

    }
  },
  getOrderDetail: {
    url: '/api/v1/waybills/:id/',
    method: 'get',
    desc: '运单详情',
    param: {

    }
  },

  getLandmarkList: {
    url: '/position/base_position/',
    method: 'get',
    desc: '坐标列表',
    param: {

    }
  },

  getCarriers: {
    url: '/order/trader/carriers/',
    method: 'get',
    desc: '获取承运商',
    param: {

    }
  },

  getUnload: {
    url: '/order/trader/unload_area/',
    method: 'get',
    desc: '获取卸货区域',
    param: {

    }
  },

  getSupplier: {
    url: '/order/supplier/',
    method: 'get',
    desc: '获取供应商',

    param: {

    }
  },

  getLandmarkDetail: {
    url: '/position/base_position/',
    method: 'get',
    desc: '坐标详情',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },

  getFulid: {
    url: '/order/fluid/',
    method: 'get',
    desc: '获取液厂',
    param: {

    }
  },

  cratePickUpOrder: {
    url: '/order/delivery-order/',
    method: 'POST',
    desc: '创建提货订单',
    param: {

    }
  },

  searchPickOrderList: {
    url: '/order/delivery-order/',
    method: 'get',
    desc: '获取提货单列表',
    param: {


    }
  },
}

export default api;
