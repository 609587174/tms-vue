<style scoped lang="less">
.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}
.linh40{
  height:40px;
  line-height:40px;
}
.cancleCarBtn{
  position: absolute;
  left: 0px;
  top: 0px;
  line-height: 40px;
  text-align: center;
  height: 40px;
  font-size: 18px;
  cursor:pointer;
}
    
</style>
<template>
  <div class="detail-main">
    <el-container>
      <!-- <el-header>
  <el-row>
    <el-col :span="1" class="left-arrow-d"><i class="icon-down-arrow" v-on:click="goOrderList"></i></el-col>
    <el-col :span="22">
      <p>新增提货单</p>
    </el-col>
  </el-row>
</el-header>
 -->
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="goOrderList"></div>
          </el-col>
          <el-col :span="20">
            <p>新增线下承运单</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-loading="loadingArr.pageLoading" class="mt-30">
        <div>
          <el-form class="addPickOrder" label-width="120px" :model="pickOrderParam" status-icon :rules="rules" ref="addPickOrderForm">
            <div class="detail-form-title text-center">提货计划详情</div>
            <div class="detail-form">
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="托运客户:" prop="customer_id">
                    <el-select v-model="pickOrderParam.customer_id" filterable placeholder="请选择"  v-loading="loadingArr.customerLoading" @change="bindTextFunc('customer')">
                      <el-option v-for="(item,key) in selectData.customerList" :key="item.id" :label="item.contact_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂名称:" prop="fluid">
                    <el-select v-model="pickOrderParam.fluid" filterable placeholder="请选择" v-loading="loadingArr.fluidLoading" @change="bindTextFunc('fluid')">
                      <el-option v-for="(item,key) in selectData.fluidList" :key="item.id" :label="item.fluid_name" :value="item.id">
                      </el-option>
                    </el-select>
                   <!--  <el-input placeholder="请输入" type="text" v-model="pickOrderParam.fluid"></el-input> -->
                  </el-form-item>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="计划装车时间:" prop="plan_time">
                    <el-date-picker v-model="pickOrderParam.plan_time" type="datetime" placeholder="选择日期时间" default-time="00:00:00" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="需求车辆:" prop="require_car_number">
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.require_car_number" @change="needcarNumChange"> </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="计划吨位:" prop="plan_tonnage">
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.plan_tonnage"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
           
            <div class="detail-form-title text-center">添加车辆</div>
            <div class="detail-form"  v-loading="loadingArr.carloading">
              <el-row v-for="(aitem,aindex) in addCarList" style="position:relative;margin-top:20px;">
                <el-col :span="1"  class="cancleCarBtn" v-if="aindex!=0">
                  <i class="el-icon-error" style="color:red;" @click="deleteCarByIndex(aindex)"></i>
                </el-col>
                <el-col :span="5" :offset="1">
                   <el-select v-model="addCarList[aindex].id" filterable placeholder="请选择" @change="carListChange(aindex)" style="max-width:220px;">
                      <el-option v-for="(item,key) in selectData.carList"  :label="item.tractor.plate_number" :value="item.id">
                      </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="linh40">
                  挂车号:{{aitem.semitrailer.plate_number}}
                </el-col>
                <el-col :span="5" class="linh40">
                  主驾:<span>{{aitem.master_driver.name}}</span><span style="margin-left:10px;">{{aitem.master_driver.mobile_phone}}</span>
                </el-col>
                <el-col :span="5" class="linh40">
                  副驾/押运:
                  <span v-if="aitem.vice_driver"><span>{{aitem.vice_driver.name}}</span><span style="margin-left:10px;">{{aitem.vice_driver.mobile_phone}}</span></span>
                  <span v-if="!aitem.vice_driver&&aitem.escort_staff"><span>{{aitem.escort_staff.name}}</span><span style="margin-left:10px;">{{aitem.escort_staff.mobile_phone}}</span></span>
                </el-col>
              </el-row>
              <el-row style="position:relative;margin-top:20px;">
                <el-col :span="1"  class="cancleCarBtn" style="font-size:22px;">
                  <i class="el-icon-circle-plus" style="color:#85ce61;" @click="addACar"></i>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="6" :offset="9">
                <el-button type="success" @click="goOrderList">取消</el-button>
                <el-button type="primary" @click="upOrder" style="margin-left:20px;">提交</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-main>
    </el-container>
   <el-dialog title="确认生成线下承运单" :visible.sync="sureAdd" center width="40%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;"  v-loading="loadingArr.createdLoading">
      <el-form label-width="125px" status-icon>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货液厂:</label>
              <div class="detail-form-item" v-html="pbFunc.dealNullData(bindText.fluidName)"></div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货时间:</label>
              <div class="detail-form-item" v-html="pbFunc.dealNullData(pickOrderParam.plan_time)"></div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货车数:</label>
              <div class="detail-form-item" v-if="pickOrderParam.require_car_number!=''"><span v-html="pbFunc.dealNullData(pickOrderParam.require_car_number)"></span>车</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货吨位:</label>
              <div class="detail-form-item" v-if="pickOrderParam.plan_tonnage!=''"><span v-html="pbFunc.dealNullData(pickOrderParam.plan_tonnage)"></span>吨</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>托运客户:</label>
              <div class="detail-form-item" v-html="pbFunc.dealNullData(bindText.customerName)"></div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="sureAdd = false">返 回</el-button>
       <el-button type="primary" @click="sendRe">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addUnderOrder',
  data() {
    var needNumVa = (rule, value, callback) => {
      if (!value.match(/^[0-9]\d{0,1}$/) || value == '0') {
        callback(new Error("只能是1-99的正整数"));
      } else {
        callback();
      }
    };
    var planTongVa = (rule, value, callback) => {
      if ((!(value + "").match(/^([1-9]\d{0,1})(\.\d{1,3})?$/)) || value == '0' || parseInt(value) > 99) {
        callback(new Error("不能大于99且最多3位小数"));
      } else {
        callback();
      }
    };
    var discountVa = (rule, value, callback) => {
      if(value==""){
       callback();
      }else{
       if (parseInt(value) > parseInt(this.pickOrderParam.unit_price)) {
          callback(new Error("不能大于采购价"));
        } else if (!((value + "").match(/^\d+(\.\d+)?$/) || value == '' || value == null)) {
          callback(new Error("只能输入数字"));
        } else {
          callback();
        }
      }
    }
    return {
      lockFalg: false,
      sureAdd: false,
      loadingArr: {
        supplierLoading: false,
        carloading:false,
        fluidLoading:false,
        customerLoading:false,
        createdLoading:false
      },
      bindText:{
        fluidName:"",
        customerName:"",
      },
      addCarList:[{
        id:"",
        master_driver:{},
        vice_driver:{},
        semitrailer:{}
      }],
      pickOrderParam: {
        customer_id: "",
        fluid: "",
        plan_time: '',
        require_car_number: '',
        trader: '',
        plan_tonnage: '',
        type:'three',
        consignment_type:'external',
        carriers:'',

      },
      rules: {
        customer_id: [
          { required: true, message: '请选择托运客户', trigger: 'change' },
        ],
        fluid: [
          { required: true, message: '请选择液厂', trigger: 'change' },
        ],
        plan_time: [
          { required: true, message: '请填写计划时间', trigger: 'blur' },
        ],
        require_car_number: [
          { validator: needNumVa, trigger: 'blur' }
        ],
        plan_tonnage: [
          { validator: planTongVa, trigger: 'blur' }
        ],
      },
      selectData: {
        carList:[],
        fluidList:[],
        customerList:[]

      }
    };
  },
  computed: {
    users: function() {
      return this.pbFunc.getLocalData('users', true);
    }
  },
  methods: {
    bindTextFunc:function(type){
      if(type=='fluid'){
        for(let i in this.selectData.fluidList){
          if(this.selectData.fluidList[i].id==this.pickOrderParam.fluid){
            this.bindText.fluidName=this.selectData.fluidList[i].fluid_name;
            break;
          }
        }
      }else if(type=='customer'){
        for(let i in this.selectData.customerList){
          if(this.selectData.customerList[i].id==this.pickOrderParam.customer_id){
            this.bindText.customerName=this.selectData.customerName[i].contact_name ;
            break;
          }
        }
      }
    },
    sendRe:function(){
      var vm=this;
      var sendData = this.pbFunc.deepcopy(this.pickOrderParam);
      this.loadingArr.createdLoading = true;
      let capacities=[];
      for(let i in this.addCarList){
        if(this.addCarList[i].id!=""){
          capacities.push(this.addCarList[i].id);
        }
      }
      sendData.capacities=capacities;
      this.$$http("cratePickUpOrder", sendData).then((results) => {
        this.loadingArr.createdLoading = false;
        if (results.data.code == 0) {
          this.$alert('线下承运单已经生成,请前往“线下承运调度”列表查看并跟进', '确认生成线下承运单', {
            confirmButtonText: '确定',
            callback: action => {
              vm.$router.push({ path: "/logisticsManage/UnderConsignmentOrders/underOrdersList" });
            }
          }); 
        }else{
           this.$alert('由于网络不稳定等原因，订单无法生成，请刷新重试', '生成线下承运单失败', {
            confirmButtonText: '确定',
            callback: action => {
              
            }
          }); 
        }
      }).catch(() => {
        this.loadingArr.createdLoading = false;
      });
    },
    addACar:function(){
      this.addCarList.push({id:"",master_driver:{},vice_driver:{},semitrailer:{}});
    },
    carListChange:function(index){
      for(var carIndex in this.selectData.carList){
        if(this.addCarList[index].id==this.selectData.carList[carIndex].id){
          this.$set(this.addCarList,index,this.pbFunc.deepcopy(this.selectData.carList[carIndex]));
        }
      }
    },
    deleteCarByIndex:function(index){
      this.addCarList.splice(index,1);
    },
    needcarNumChange:function(){
      if(!isNaN(parseInt(this.pickOrderParam.require_car_number))){
        if(this.pickOrderParam.require_car_number>this.addCarList.length){
          var middleArr=[];
          for(var i=0;i<this.pickOrderParam.require_car_number-this.addCarList.length;i++){
            middleArr.push({id:"",master_driver:{},vice_driver:{},semitrailer:{}});
          }
          this.addCarList=this.addCarList.concat(middleArr);
        }else if(this.pickOrderParam.require_car_number<this.addCarList.length){
          var delNum=this.addCarList.length-this.pickOrderParam.require_car_number;
          var middleArr=this.pbFunc.deepcopy(this.addCarList);
          for(var  j=this.addCarList.length-1;j>0;j--){
            if(this.addCarList[j].id==""){
              delNum--;
              this.addCarList.splice(j,1);
              if(delNum==0){
                break;
              }
            }
          }
        }
      }
    },
    goOrderList: function() {
      this.$router.push({ path: "/logisticsManage/UnderConsignmentOrders/underOrdersList" });
    },
    upOrder: function() {
      this.$refs['addPickOrderForm'].validate((valid) => {
        if (valid) {
          this.sureAdd = true;
        }else{
          this.$alert('请根据填写界面红字处提醒，对不合规数据进行修改后再次提交', '无法生成', {
            confirmButtonText: '确定',
            callback: action => {
            
            }
          });
        }
      });
    }, 
    getFluid:function(){
      this.loadingArr.fluidLoading=true;
      this.$$http("getFluidsFormAdd",{}).then((results)=>{
        if(results.data.code==0){
          this.selectData.fluidList=results.data.data;
        }
        this.loadingArr.fluidLoading=false;
      }).catch(()=>{
        this.loadingArr.fluidLoading=false;
      });
    },
    getCustomer:function(){
      this.loadingArr.customerLoading=true;
      this.$$http("getCustomerFormAdd",{pagination:false,customer_type:'OWN'}).then((results)=>{
        if(results.data.code==0){
          this.selectData.customerList=results.data.data;
        }
        this.loadingArr.customerLoading=false;
      }).catch(()=>{
        this.loadingArr.customerLoading=false;
      });      
    },
    getCarData: function() {
      this.loadingArr.carloading=true;
      this.$$http('searchCapacityList',{pagination:false,complete_status:true}).then((results)=>{
        this.loadingArr.carloading=false;
        if(results.data.code==0){
          this.selectData.carList=results.data.data;
        }
      }).catch((err)=>{
        this.loadingArr.carloading=false;
      });
    },
    getCarriesId:function(){
      this.$$http('updateCompany',{id:this.users.carrier.id}).then((results)=>{
        if(results.data.code==0){
          this.$$http('getCarriesId',{credit_code:results.data.data.license_code}).then((reData)=>{
            if(reData.data.code==0){
              this.pickOrderParam.carriers=[reData.data.data.data[0].id];
            }
          });
        }
      }).catch(()=>{  

      });
    },
  },
  created() {
    this.getCarData();
    this.getCustomer();
    this.getFluid();
    this.getCarriesId();
  }
};

</script>
