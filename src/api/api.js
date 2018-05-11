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
  login: {
    url: '/backend/account/login/',
    method: 'post',
    desc: '登录',
    param: {
      username: {
        desc: '用户名',
      },
      password: {
        desc: '密码',
      }
    }
  },
  register: {
    url: '/api/user/register',
    method: 'post',
    desc: '注册',
    param: {
      username: {
        desc: '用户名',
      },
      password: {
        desc: '密码',
      },
      name: {
        desc: '昵称',
      }
    }
  },
  globalData: {
    url: '/common/global_enums/',
    method: 'get',
    desc: '全局数据',
    param: {

    }
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
    desc: '获取牵引车',
    param: {

    }
  }
}

export default api;
