/**
 * Created by wansan on 2017/10/10.
 */
import regularReg from '../../assets/js/regular.js'
export default {
  inintString: "",
  inintObject: {},
  inintArrary: [],
  inint: false,
  inintNum: 5,
  show: false,
  showAmessage: "stor测试测试",
  initAddnum: 1,
  menuData: "",
  userData: "",
  isRoleManger: true,
  isRole: "",
  defaultShow: {
    addButton: true,
    removeButton: true,
    queryButton: false
  },
  unreadNewNum: 0, //未读消息
  selectData: {}, //全局数据
  users: {}, //用户个人信息
  menuList: [],
  wsMsg: null, //websocket
  regular:{
    price:{
      match:/^(\+)?\d+(\.\d{1,2})?$/,
      tips:'请输入数值正数且最多两位小数的数值'
    },
    tonnage:{
      match:/^(\-|\+)?\d+(\.\d{1,3})?$/,
      tips:'请输入数值且最多三位小数的数值'
    },
    variableRate:{
      match:/^(\+)?\d+(\.\d{1,3})?$/,
      tips:'请输入数值正数且最多三位小数的数值'
    },
    variableValue:{
      match:/^(\+)?\d+(\.\d{1,5})?$/,
      tips:'请输入数值正数且最多五位小数的数值'
    },
    mile:{
      match:/^(\-|\+)?\d+(\.\d{1,1})?$/,
      tips:'请输入数值且最多一位小数的数值'
    },
    name:{
      match:/^[\u4e00-\u9fa5]{2,10}$/,
      tips:'请输入2~10个汉字'
    },
    idNumber:{
      // match:regularReg.idCardVa,
      match:/^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2})$/,
      tips:'请输入正确的身份证号码'
    },
    phone:{
      match:/^1\d{10}$/,
      tips:'请输入正确的手机号码'
    }
  }
}
