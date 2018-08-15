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
  getLedgerList: {
    url: '/statistic/ledger/',
    method: 'get',
    desc: '业务台账列表',
    param: {

    }
  },
  exportLedgerData: {
    url: '/exports/ledger/',
    method: 'get',
    desc: '业务台账',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 logistic'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  importPersonData: {
    url: '/imports/export-carrier-driver/',
    method: 'post',
    desc: '导入人员信息到库',
    param: {
      import: {
        desc: 'all'
      }
    }
  },
  getPersonTemporaryData: {
    url: '/imports/export-carrier-driver/',
    method: 'get',
    desc: '获取临时表',
    param: {
      import: {
        desc: 'all'
      }
    }
  },
  getPersonTemporaryData: {
    url: '/imports/base-carrier-driver/',
    method: 'get',
    desc: '导入人员数据进临时列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页显示的条数'
      }
    }
  },
  deletePersonTemporaryData: {
    url: '/imports/bulk_driver_destroy/',
    method: 'delete',
    desc: '清除人员临时表',
    param: {

    }
  },
  exportIncomeData: {
    url: '/exports/income/',
    method: 'get',
    desc: '费用导入统计导出',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 logistic'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  getExportTableTitle: {
    url: '/exports/header/',
    method: 'get',
    desc: '导出列表头部',
    param: {
      page_arg: {
        desc: '表格类型'
      },
      need_all: {
        desc: '全部'
      }
    }
  },
  getUnreadNewNum: {
    url: '/notifications/web_messages/unread_count/',
    method: 'get',
    desc: '未读信息的条数',
    param: {

    }
  },
  batchReadMessages: {
    url: '/notifications/web_messages/bulk_read/',
    method: 'put',
    desc: '消息批量已读',
    param: {
      ids: {
        desc: 'id'
      }
    }
  },
  getMessagesList: {
    url: '/notifications/web_messages/',
    method: 'get',
    desc: '通知消息列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页条数'
      }
    }
  },
  exportsTemplate: {
    url: '/exports/cost/template/',
    method: 'post',
    desc: '下载模板',
    param: {

    }
  },
  deleteOilGasTemporaryData: {
    url: '/imports/bulk_corporate_destroy/',
    method: 'delete',
    desc: '清除油/气费临时表',
    param: {

    }
  },
  deleteOilGasTemporaryData: {
    url: '/imports/bulk_corporate_destroy/',
    method: 'delete',
    desc: '清除油/气费临时表',
    param: {

    }
  },
  deleteTollFeeTemporaryData: {
    url: '/imports/bulk_high_destroy/',
    method: 'delete',
    desc: '清除高速费临时表',
    param: {

    }
  },
  deleteCashCostTemporaryData: {
    url: '/imports/bulk_cash_destroy/',
    method: 'delete',
    desc: '清除现金费用临时表',
    param: {
      data: {
        desc: '运单'
      },
      type: {
        desc: '类型'
      }
    }
  },
  matchingWaybill: {
    url: '/imports/matching-waybill/matching/',
    method: 'post',
    desc: '匹配运单',
    param: {
      data: {
        desc: '运单'
      },
      type: {
        desc: '类型'
      }
    }
  },
  getWaybillData: {
    url: '/imports/matching-waybill/search/',
    method: 'get',
    desc: '运单前后七天列表',
    param: {
      datetime: {
        desc: '费用时间'
      },
      plate_number: {
        desc: '车牌号'
      }
    }
  },
  importOilGasData: {
    url: '/imports/export-corporate/',
    method: 'post',
    desc: '导入油/气费用统计系统',
    param: {
      import: {
        desc: 'all'
      }
    }
  },
  getOilGasData: {
    url: '/imports/corporate/',
    method: 'get',
    desc: '导入油/气费用临时列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页显示的条数'
      }
    }
  },
  updateOilGasStatistic: {
    url: '/statistic/corporate/:id/',
    method: 'patch',
    desc: '油气费详情',
    param: {

    }
  },
  getOilGasStatisticDetail: {
    url: '/statistic/corporate/:id/',
    method: 'get',
    desc: '油气费详情',
    param: {

    }
  },
  getOilGasStatisticList: {
    url: '/statistic/corporate/',
    method: 'get',
    desc: '油气费列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页显示的条数'
      },
      plate_number: {
        desc: '车牌号'
      }
    }
  },
  importTollFeeData: {
    url: '/imports/export-highway/',
    method: 'post',
    desc: '导入现金费用统计系统',
    param: {
      import: {
        desc: 'all'
      }
    }
  },
  getTollFeeData: {
    url: '/imports/highway/',
    method: 'get',
    desc: '导入高速费用临时列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页显示的条数'
      }
    }
  },
  updateTollFeeStatistic: {
    url: '/statistic/highway-fee/:id/',
    method: 'patch',
    desc: '更新高速费',
    param: {

    }
  },
  getTollFeeStatisticDetail: {
    url: '/statistic/highway-fee/:id/',
    method: 'get',
    desc: '高速费详情',
    param: {

    }
  },
  getTollFeeStatisticList: {
    url: '/statistic/highway-fee/',
    method: 'get',
    desc: '高速费列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页显示的条数'
      },
      plate_number: {
        desc: '车牌号'
      }
    }
  },
  getCashCostStatisticDetail: {
    url: '/statistic/cash-cost/:id/',
    method: 'get',
    desc: '现金费用详情',
    param: {

    }
  },
  updateCashCostStatistic: {
    url: '/statistic/cash-cost/:id/',
    method: 'patch',
    desc: '更新现金费用',
    param: {

    }
  },
  getCashCostStatisticList: {
    url: '/statistic/cash-cost/',
    method: 'get',
    desc: '现金费用列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页显示的条数'
      },
      plate_number: {
        desc: '车牌号'
      }
    }
  },
  getCashCostData: {
    url: '/imports/cash-cost/',
    method: 'get',
    desc: '导入现金费用临时列表',
    param: {
      page: {
        desc: '当前页数'
      },
      page_size: {
        desc: '一页显示的条数'
      }
    }
  },
  importCashCostData: {
    url: '/imports/export-cash-cost/',
    method: 'post',
    desc: '导入现金费用统计系统',
    param: {
      import: {
        desc: 'all'
      }
    }
  },
  uploadCashCostData: {
    url: '/imports/cash-cost/',
    method: 'post',
    desc: '上传现金费用',
    param: {
      file: {
        desc: '待上传的excel文件'
      }
    }
  },
  exportLogisticData: {
    url: '/exports/logistic/',
    method: 'get',
    desc: '物流费用统计',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 logistic'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  exportSemitrailerData: {
    url: '/exports/semitrailer/',
    method: 'get',
    desc: '导出挂车',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 semitrailer'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  exportTruckData: {
    url: '/exports/truck/',
    method: 'get',
    desc: '导出牵引车',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 tractor'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  exportPersonData: {
    url: '/exports/driver/',
    method: 'get',
    desc: '导出人员管理',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 carrier_driver'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  updateIncomeStatistic: {
    url: '/statistic/income/:id/',
    method: 'patch',
    desc: '收入统计详情',
    param: {
      plan_time: {
        desc: '计划装车时间'
      },
      check_quantity: {
        desc: '核算吨位'
      },
      stand_mile: {
        desc: '标准里程'
      },
      label_price: {
        desc: '标准运价'
      },
      freight_value: {
        desc: '运费费率'
      },
      change_value: {
        desc: '运费金额'
      },
      waiting_price: {
        desc: '卸车待时金额'
      },
      waiting_charges: {
        desc: '运费合计'
      },
      remark: {
        desc: '备注'
      },
    }
  },
  getIncomeStatisticDetail: {
    url: '/statistic/income/:id/',
    method: 'get',
    desc: '收入统计详情',
    param: {
      id: {
        desc: '收入统计ID'
      },
    }
  },
  getIncomeStatisticList: {
    url: '/statistic/income/',
    method: 'get',
    desc: '收入统计列表',
    param: {
      waybill: {
        desc: '运单号'
      },
      company: {
        desc: '托运方'
      },
      plate_number: {
        desc: '托运方'
      },
      active_time_start: {
        desc: '实际装车时间 开始'
      },
      active_time_end: {
        desc: '实际装车时间 结束'
      },
      leave_time_end: {
        desc: '实际离站时间 结束'
      },
      leave_time_start: {
        desc: '实际离站时间 开始'
      },
    }
  },
  getFreightDetail: {
    url: '/carrier/trans_fee/:id/',
    method: 'get',
    desc: '运费详情',
    param: {

    }
  },
  updateLogisticStatistic: {
    url: '/statistic/logistic/:id/',
    method: 'patch',
    desc: '物流费用详情',
    param: {
      plan_time: {
        desc: '计划装车时间'
      },
      check_quantity: {
        desc: '核算吨位'
      },
      stand_mile: {
        desc: '标准里程'
      },
      label_price: {
        desc: '标准运价'
      },
      freight_value: {
        desc: '运费费率'
      },
      change_value: {
        desc: '运费金额'
      },
      waiting_price: {
        desc: '卸车待时金额'
      },
      waiting_charges: {
        desc: '运费合计'
      },
      remark: {
        desc: '备注'
      },
    }
  },
  getLogisticStatisticDetail: {
    url: '/statistic/logistic/:id/',
    method: 'get',
    desc: '物流费用详情',
    param: {
      id: {
        desc: '物流费用ID'
      },
    }
  },
  getLogisticStatisticList: {
    url: '/statistic/logistic/',
    method: 'get',
    desc: '物流费用列表',
    param: {
      waybill: {
        desc: '运单号'
      },
      company: {
        desc: '托运方'
      },
      plate_number: {
        desc: '托运方'
      },
      active_time_start: {
        desc: '实际装车时间 开始'
      },
      active_time_end: {
        desc: '实际装车时间 结束'
      },
      leave_time_end: {
        desc: '实际离站时间 结束'
      },
      leave_time_start: {
        desc: '实际离站时间 开始'
      },
    }
  },
  getFreightDetail: {
    url: '/carrier/trans_fee/:id/',
    method: 'get',
    desc: '运费详情',
    param: {

    }
  },
  getShipperList: {
    url: '/map/bpm_standard_mileages/all_traders/',
    method: 'get',
    desc: '托运方列表',
    param: {

    }
  },
  getFreightList: {
    url: '/carrier/trans_fee/',
    method: 'get',
    desc: '获取运费列表',
    param: {
      agreements__carrier: {
        desc: '承运商id'
      },
      agreements__fluid: {
        desc: '液厂id'
      },
    }
  },
  updateCompany: {
    url: '/carrier/carriers/:id/',
    method: 'patch',
    desc: '修改企业信息',
    param: {
      id: {
        desc: '企业ID'
      }
    }
  },
  getCompany: {
    url: '/carrier/carriers/:carrier_id/',
    method: 'get',
    desc: '企业信息',
    param: {
      carrier_id: {
        desc: '企业ID'
      }
    }
  },
  addCustomer: {
    url: '/carrier/customer/',
    method: 'post',
    desc: '新增客户',
    param: {
      name: {
        desc: '客户名称'
      },
      contact_name: {
        desc: '联系人'
      },
      contact_phone: {
        desc: '联系电话'
      },
      detail_address: {
        desc: '详细地址'
      },
      deficiency_standard: {
        desc: '亏吨标准'
      },
      customer_type: {
        desc: '客户基础资料是否可修改，OWN为自己添加的客户，可以修改，PLAT为拉取的平台客户数据，不可修改'
      },
      free_hour: {
        desc: '免费等待时长(小时)'
      },
      overtime_price: {
        desc: '超时计算单价(元/小时)'
      },
      license3in1_code: {
        desc: '社会机构代码（三合一）'
      },
      license_code: {
        desc: '组织机构代码（非三合一）'
      },
      license_pic: {
        desc: '营业执照图片'
      }
    }
  },
  updateCustomer: {
    url: '/carrier/customer/:customer_id/',
    method: 'patch',
    desc: '更新客户',
    param: {
      name: {
        desc: '客户名称'
      },
      contact_name: {
        desc: '联系人'
      },
      contact_phone: {
        desc: '联系电话'
      },
      detail_address: {
        desc: '详细地址'
      },
      deficiency_standard: {
        desc: '亏吨标准'
      },
      customer_type: {
        desc: '客户基础资料是否可修改，OWN为自己添加的客户，可以修改，PLAT为拉取的平台客户数据，不可修改'
      },
      free_hour: {
        desc: '免费等待时长(小时)'
      },
      overtime_price: {
        desc: '超时计算单价(元/小时)'
      },
      license3in1_code: {
        desc: '社会机构代码（三合一）'
      },
      license_code: {
        desc: '组织机构代码（非三合一）'
      },
      license_pic: {
        desc: '营业执照图片'
      }
    }
  },
  getCustomerDetail: {
    url: '/carrier/customer/:customer_id/',
    method: 'get',
    desc: '客户管理',
    param: {
      customer_id: {
        desc: '客户ID'
      }
    }
  },
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
  getCapacityLog: {
    url: '/truck/tractor_semitrailers/:id/operate_records/',
    method: 'get',
    desc: '获取运力管理操作日志',
    param: {}
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
  unbindTruck: {
    url: '/truck/tractor_semitrailers/:id/cancel_bind_semitrailer/',
    method: 'PATCH',
    desc: '解绑挂车',
    param: {}
  },
  unbindStaff: {
    url: '/truck/tractor_semitrailers/:id/cancel_driver_staff/',
    method: 'PATCH',
    desc: '解绑人员',
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
  deleteInsuranceFromTail: {
    url: '/truck/semitrailers/:id/semitrailer_insurances/',
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
  getPickOrderDetail: {
    url: '/order/delivery-order/:id/',
    method: 'get',
    desc: '托运单详情',
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
    url: '/order/trader/unload-area/',
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
    // url: '/order/fluid/',
    url: '/map/bpm_standard_mileages/all_fluid_factories/',
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
  searchConOrderList: {
    url: '/order/section-trips/',
    method: 'get',
    desc: '获取运单列表',
    param: {


    }
  },
  getConOrderDetail: {
    url: '/order/waybill/:id/',
    method: 'get',
    desc: '获取运单详情',
    param: {


    }
  },
  getTransPowerInfo: {
    url: '/truck/tractor_semitrailers/:id/',
    method: 'get',
    desc: '获取运力详情',
    param: {


    }
  },
  getTransPowerInfoList: {
    url: '/truck/tractor_semitrailers/',
    method: 'get',
    desc: '获取运力详情列表',
    param: {


    }
  },
  searchNoUse: {
    url: '/order/delivery-order/check-capacity/',
    method: 'get',
    desc: '获取3天没用的运力id',
    param: {


    }
  },
  searchDeliveryOrder: {
    url: '/order/delivery-order/list-capacity/',
    method: 'get',
    desc: '获取托运单数据',
    param: {

    }
  },
  getSiteList: {
    // url: '/map/fluid_sites/',
    url: '/map/bpm_standard_mileages/all_fluid_sites/',
    method: 'get',
    desc: '获取LNG站点列表',
    param: {
      position_name: {
        desc: '站点名称',
      },
      page: {
        desc: '当前页数',
      },
      page_size: {
        desc: '每页数量',
      },
    }
  },
  getSiteDetail: {
    url: '/map/fuild_sites/:id/',
    method: 'get',
    desc: '获取LNG站点详情',
    param: {

    }
  },
  getStandardMileList: {
    // url: '/map/standard_mileages/',
    url: '/map/bpm_standard_mileages/',
    method: 'get',
    desc: '获取标准里程列表',
    param: {

    }
  },
  addStandardMileList: {
    url: '/map/standard_mileages/',
    method: 'post',
    desc: '新增标准里程',
    param: {
      fluid_site_id: {
        desc: '站点资源id',
      },
      fluid_factory_id: {
        desc: '液厂资源id',
      },
      standard_mileage: {
        desc: '标准里程',
      },
      is_active: {
        desc: '是否启用',
      }
    }
  },
  getStandardMileDetail: {
    // url: '/map/standard_mileages/:id/',
    url: '/map/bpm_standard_mileages/:id/',
    method: 'get',
    desc: '标准里程详情',
    param: {

    }
  },
  patchStandardMileDetail: {
    url: '/map/standard_mileages/:id/',
    method: 'PATCH',
    desc: '标准里程更新',
    param: {
      fluid_site_id: {
        desc: '站点资源id',
      },
      fluid_factory_id: {
        desc: '液厂资源id',
      },
      standard_mileage: {
        desc: '标准里程',
      },
    }
  },
  delStandardMile: {
    url: '/map/standard_mileages/:id/',
    method: 'DELETE',
    desc: '删除标准里程',
    param: {


    }
  },
  getMenusList: {
    url: '/permissions/menus/user_menus/',
    method: 'get',
    desc: '获取当前登录用户可访问菜单',
    param: {

    }
  },
  getLandMarkList: {
    url: '/map/land_marks/',
    method: 'get',
    desc: '地标列表',
    param: {

    }
  },
  getLandMarkDetail: {
    url: '/map/land_marks/:id/',
    method: 'get',
    desc: '地标详情',
    param: {

    }
  },
  editCarPower: {
    url: '/order/delivery-order/:yid/patch-capacity/',
    method: 'PATCH',
    desc: '修改运力',
    param: {

    }

  },
  addCarPower: {
    url: '/order/delivery-order/add-capacity/',
    method: 'POST',
    desc: '添加运力',
    param: {

    }
  },
  patchLandMarkDetail: {
    url: '/map/land_marks/:id/',
    method: 'patch',
    desc: '地标详情',
    param: {

    }
  },
  getRecordsData: {
    url: '/order/delivery-order/record/',
    method: 'get',
    desc: '获取订单记录列表',
    param: {

    }
  },
  upOrderPlan: {
    url: '/order/delivery-order/status/',
    method: 'PUT',
    desc: "提交修改计划",
    param: {

    }
  },
  judgeCanCancle: {
    url: '/order/waybill/cancel/',
    method: 'post',
    desc: "判断运单是否可以被取消勾选",
    param: {

    }
  },
  upStatus: {
    url: '/order/interrupt-record/',
    method: 'post',
    desc: "运单变更",
    param: {

    }
  },
  realTimeMonitor: {
    url: '/map/vehicle_monitors/map_init/',
    method: 'get',
    desc: "实时监控",
    param: {

    }
  },
  changeOrderStatus: {
    url: '/order/section-trips/:id/change-status/',
    method: 'PUT',
    desc: "变更运单状态",
    param: {

    }
  },
  searchOrderHasPower: {
    url: '/order/delivery-order/list-capacity/',
    method: 'get',
    desc: "提货订单所拥有的运力列表",
    param: {

    }
  },
  getDeviceDetail: {
    url: '/map/vehicle_monitors/:id/',
    method: 'get',
    desc: "获取设备详细信息",
    param: {

    }
  },
  getTripRecords: {
    url: '/map/vehicle_monitors/:id/trip_records/',
    method: 'get',
    desc: "车辆轨迹查询",
    param: {
      start_time: {
        desc: '开始时间',
      },
      end_time: {
        desc: '结束时间，不填则默认当前时间',
      },
      page: {
        desc: '当前页数',
      },
      page_size: {
        desc: '当前每页条数，默认为1000条每页',
      },
    }
  },
  getOfflineAndStopRecords: {
    url: '/map/vehicle_monitors/:id/stopping_offline_info/',
    method: 'get',
    desc: "轨迹停留点，离线点",
    param: {
      start_time: {
        desc: '开始时间',
      },
      end_time: {
        desc: '结束时间，不填则默认当前时间',
      },
      page: {
        desc: '当前页数',
      },
      page_size: {
        desc: '当前每页条数，默认为1000条每页',
      },
    }
  },
  getCarList: {
    url: '/map/vehicle_monitors/',
    method: 'get',
    desc: "车辆相关信息列表",
    param: {
      plate_number: {
        desc: '车牌号',
      },
      waybill_vehicle_status: {
        desc: '车辆运单状态',
      },
    }
  },
  orderProcess: {
    url: '/order/section-trips/record/',
    method: 'get',
    desc: "获取分段进程",
    param: {

    }
  },
  examineLoad: {
    url: '/order/section-trips/:id/weight-note/',
    method: 'put',
    desc: "运单分段修改状态",
    param: {

    }
  },
  getPundList: {
    url: '/order/section-trips/weight-note/',
    method: 'GET',
    desc: "获取磅单数据",
    param: {

    }
  },
  sureMatch: {
    url: '/order/section-trips/confirm/',
    method: 'PUT',
    desc: "确认卸货单",
    param: {

    }
  },
  getSeal: {
    url: '/order/section-trips/car-seal/',
    method: 'GET',
    desc: "获取铅封数据",
    param: {

    }
  },
  getCount: {
    url: '/order/delivery-order/count/',
    method: 'GET',
    desc: "获取订单数目",
    param: {

    }
  },
  getConCount: {
    url: '/order/section-trips/count/',
    method: 'GET',
    desc: "获取运单数目",
    param: {

    }
  },
  getSectionTrips: {
    url: '/order/section-trips/:id/',
    method: 'GET',
    desc: "获取运单分段详情",
    param: {

    }
  },
  getFulidDetalis: {
    url: '/order/actual-fluid/:id/',
    method: 'GET',
    desc: "获取液厂详情",
    param: {

    }
  },
  getStationDetalis: {
    url: '/order/fluid-site/:id/',
    method: 'GET',
    desc: "获取站点详情",
    param: {

    }
  },
  searchCapacityFreeList: {
    url: '/truck/tractor_semitrailers/free_tractor_semitrailers/',
    method: 'get',
    desc: "获取空闲且已完善的运力",
    param: {

    }
  },
  getDashboard: {
    url: '/order/section-trips/dashborad/',
    method: 'get',
    desc: "获取概览数据",
    param: {

    }
  },
  getTmsDashboard: {
    url: '/statistic/dashborad/',
    method: 'get',
    desc: "获取概览数据2",
    param: {

    }
  }
}


export default api;
