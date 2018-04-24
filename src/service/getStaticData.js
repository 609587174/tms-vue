import instance from './index';
const getPosition= function(){
    return {
    	depgroup:{

    	}
    };
}
const staticData= function(){
    return {
        data:[{menu_permission_name:"carBaseInfo",name:"一级菜单1",operationJur:{addButton:false,removeButton:false,queryButton:true}},{menu_permission_name:"exPro",name:"一级菜单2",operationJur:{addButton:false,removeButton:false,queryButton:true}}]
    }
}
export default{
	getPosition,
	staticData
}