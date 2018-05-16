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
        iconName:'icon-lng-dashboard',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      },{
        menu_permission_name: 'Orders',
        name: '订单',
        iconName:'icon-lng-dashboard',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      },{
        menu_permission_name: 'logisticsManage',
        iconName:'icon-road',
        name: '物流管理',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      },{
        menu_permission_name: 'mapManage',
        iconName:'icon-road',
        name: '地图',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      }, {
        menu_permission_name: 'transportPowerManage',
        name: '运力',
        iconName:'icon-map',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        },
        sms: [{
          menu_permission_name: 'capacityManage',
          name: '运力管理',
          operationJur: {
            addButton: false,
            removeButton: false,
            queryButton: true
          }
        },
        {
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
        iconName:'icon-customer',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      }, {
        menu_permission_name: 'statistics',
        name: '数据统计',
        iconName:'icon-data',
        operationJur: {
          addButton: false,
          removeButton: false,
          queryButton: true
        }
      }, {
        menu_permission_name: 'clientManage',
        name: '设置',
        iconName:'icon-setting',
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
