import instance from './index';
const getPosition = function() {
  return {
    depgroup: {

    }
  };
}
const staticData = function() {
  return {
    data: [{
        menu_permission_name: "transportPowerManage",
        name: "动力管理",
        operationJur: { addButton: false, removeButton: false, queryButton: true },
        sms: [{
            menu_permission_name: "carManage",
            name: "车辆管理",
            operationJur: { addButton: false, removeButton: false, queryButton: true }
          },
          {
            menu_permission_name: "personManage",
            name: "人员管理",
            operationJur: { addButton: false, removeButton: false, queryButton: true }
          }
        ]
      },
      { menu_permission_name: "exPro", name: "一级菜单2", operationJur: { addButton: false, removeButton: false, queryButton: true } }
    ]
  }
}
export default {
  getPosition,
  staticData
}
