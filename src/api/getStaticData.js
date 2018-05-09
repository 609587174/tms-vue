import instance from './index';
const getPosition = function() {
  return {
    depgroup: {

    }
  };
}
const staticData = function() {
  return {
    data: [
      {
        menu_permission_name: 'dashborad',
        name: '概览',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      },{
        menu_permission_name: 'Orders',
        name: '订单',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      },{
        menu_permission_name: 'logisticsManage',
        name: '物流管理',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      }, {
        menu_permission_name: 'transportPowerManage',
        name: '动力管理',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        },
        sms: [{
          menu_permission_name: 'carManage',
          name: '车辆管理',
          operationJur: {
            addButton: false,
            removeButton: false,
            queryButton: true
          }
        },
          {
            menu_permission_name: 'personManage',
            name: '人员管理',
            operationJur: {
              addButton: false,
              removeButton: false,
              queryButton: true
            }
          }
        ]
      }, {
        menu_permission_name: 'clientManage',
        name: '客户管理',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      }, {
        menu_permission_name: 'statistics',
        name: '数据统计',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      }, {
        menu_permission_name: 'clientManage',
        name: '设置',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      }
    ]
  }
}
export default {
  getPosition,
  staticData
}
