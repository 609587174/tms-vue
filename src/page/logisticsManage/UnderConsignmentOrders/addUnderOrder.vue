<style scoped lang="less">
.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

.linh40 {
  height: 40px;
  line-height: 40px;
  font-size:14px;
}

.cancleCarBtn {
  position: absolute;
  left: 0px;
  top: 0px;
  line-height: 40px;
  text-align: center;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
}
.waitMatch{
  cursor:pointer;
  margin-left:15px;
  color:#409EFF;
}
.alreayMatch{
  cursor:pointer;
  margin-left:15px;
  color:#F56C6C;
}
.unloadList {
  margin-top: 30px;
}
.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
                    <el-select v-model="pickOrderParam.customer_id" filterable placeholder="请选择" v-loading="loadingArr.customerLoading" @change="bindTextFunc('customer')">
                      <el-option v-for="(item,key) in selectData.customerList" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际液厂:" prop="fluid">
                    <el-select v-model="pickOrderParam.fluid" filterable placeholder="请选择" v-loading="loadingArr.fluidLoading" @change="bindTextFunc('fluid')">
                      <el-option v-for="(item,key) in selectData.fluidList" :key="item.id" :label="item.fluid_name" :value="item.id">
                        <span>{{ item.fluid_name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.customer_info">{{ item.customer_info.name }}</span>
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
                <el-col :span="8">
                  <el-form-item label="备注:" prop="mark">
                    <el-input placeholder="请输入" type="textarea" v-model="pickOrderParam.mark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="detail-form-title text-center">添加车辆</div>
            <div class="detail-form" v-loading="loadingArr.carloading">
              <el-row v-for="(aitem,aindex) in addCarList" style="position:relative;margin-top:20px;">
                <el-col :span="1" class="cancleCarBtn" v-if="aindex!=0">
                  <i class="el-icon-error" style="color:red;" @click="deleteCarByIndex(aindex)"></i>
                </el-col>
                <el-col :span="4" :offset="1">
                  <el-select v-model="addCarList[aindex].id" filterable placeholder="请选择" @change="carListChange(aindex)" style="max-width:220px;">
                    <el-option v-for="(item,key) in selectData.renderCarLIst" :label="item.tractor.plate_number" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" style="font-size:14px;line-height:40px;" :offset="1">
                <el-tooltip placment="right-end">
                  <div slot="content" style="width:250px;">
                    <div>可预先匹配卸货地，司机、调度等角色可在装车阶段查看卸货地信息。</div>
                    <div>装车审核通过后，系统自动匹配卸货地，也可在此时变更卸货地。</div>
                  </div>
                  <span><img style="margin-left:5px;vertical-align:middle" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                </el-tooltip>
                  预匹配卸货地:
                  <span v-if="aitem.unloadInfo.length==0" class="waitMatch" @click="changeUnload(aitem.id)">匹配卸货地</span>
                  <el-tooltip placement="right-end" v-else>
                    <div slot="content" style="width:250px;"> 
                      <el-row v-for="(unloadItem,unloadIndex) in aitem.unloadInfo" v-bind:class="{unloadList:unloadIndex!=0}">
                        <el-col >业务单号:{{unloadItem.order_number}}</el-col>
                        <el-col style="margin-top:10px;">站点:{{unloadItem.station}}</el-col>
                        <el-col style="margin-top:10px;">需求液厂:{{unloadItem.actual_fluid_name}}</el-col>
                        <el-col style="margin-top:10px;">计划吨位:{{unloadItem.plan_tonnage}}吨</el-col>
                        <el-col style="margin-top:10px;">到站时间:{{unloadItem.plan_arrive_time}}</el-col>
                      </el-row>
                    </div>
                    <span  class="alreayMatch" @click="changeUnload(aitem.id)">已选卸货地</span>
                  </el-tooltip>
                </el-col>
                <el-col :span="5" class="linh40 whiteSpan" >
                  车辆所属:<el-tooltip class="item" effect="light" :open-delay="1000" :content="aitem.tractor.carrier.name" placement="top-start" v-if="aitem.tractor.carrier">
                    <span >{{aitem.tractor.carrier.name}}</span>
                  </el-tooltip>
                </el-col>
                <el-col :span="5" style="font-size:14px;line-height:40px;" v-if="aitem.id">
                  <el-tooltip placement="right-end">
                    <div slot="content" style="width:250px;"> 
                      <el-row style="margin-bottom:15px;">
                        <el-col style="margin-top:10px;">挂车号:{{aitem.semitrailer.plate_number}}</el-col>
                        <el-col style="margin-top:10px;">主驾:<span>{{aitem.master_driver.name}}</span><span style="margin-left:10px;">{{aitem.master_driver.mobile_phone}}</span></el-col>
                        <el-col style="margin-top:10px;">副驾/押运:
                          <span v-if="aitem.vice_driver"><span>{{aitem.vice_driver.name}}</span>
                            <span style="margin-left:10px;">{{aitem.vice_driver.mobile_phone}}</span>
                          </span>
                          <span v-if="!aitem.vice_driver&&aitem.escort_staff"><span>{{aitem.escort_staff.name}}</span>
                            <span style="margin-left:10px;">{{aitem.escort_staff.mobile_phone}}</span>
                          </span>
                        </el-col>
                      </el-row>
                    </div>
                    <span  style="color:#409EFF;cursor:pointer">车辆信息</span>
                  </el-tooltip>
                </el-col>

                
              </el-row>
              <el-row style="position:relative;margin-top:20px;" v-if="addCarList.length<50">
                <el-col :span="1" class="cancleCarBtn" style="font-size:22px;">
                  <i class="el-icon-circle-plus" style="color:#85ce61;" @click="addACar"></i>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="24" style="text-align:center" >
                <el-button type="success" @click="goOrderList">取消</el-button>
                <el-button type="primary" @click="upOrder" style="margin-left:20px;">提交</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="确认生成线下承运单" :visible.sync="sureAdd" center width="40%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;" v-loading="loadingArr.createdLoading">
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
              <div class="detail-form-item" v-if="capacitiesNum">{{capacitiesNum}}车</div>
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
    <el-dialog title="匹配卸货单" :visible.sync="unloadMatchDiago" center width="80%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;"  :close-on-click-modal="lockFalg"  :close-on-press-escape="lockFalg" :show-close="lockFalg">
      <div class="table-list">
        <el-table :data="renderUnloadArr" stripe style="width: 100%" size="mini" max-height="350">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" class="match-btn"  v-if="!(aCarMatchId.indexOf(scope.row.id)>-1)" @click="matchUnload(scope.row,'match')">匹配</el-button>
              <el-button type="text" size="mini" class="match-btn"  v-if="aCarMatchId.indexOf(scope.row.id)>-1" @click="matchUnload(scope.row,'cancle')">取消匹配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row style="margin-top:25px;">
        <el-col :span="4"><el-button type="success" @click="addUnloading">新增卸货单</el-button></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="closeUnloadMatch">取  消</el-button>
       <el-button type="primary" @click="sureUnloadMatch">确认匹配</el-button>
      </span>
    </el-dialog>
    <unloading-place-dialog :unloading-place-is-show="unloadingPlaceIsShow" v-on:closeDialogBtn="closeDialog"></unloading-place-dialog>
  </div>
</template>
<script>
import unloadingPlaceDialog from '@/components/logisticsManage/unloadingPlaceDialog';
export default {
  name: 'addUnderOrder',
   components: {
    unloadingPlaceDialog: unloadingPlaceDialog
  },
  data() {
    var needNumVa = (rule, value, callback) => {
      if (!value.match(/^[0-9]\d{0,1}$/) || value == '0' || value > 50) {
        callback(new Error("只能是1-50的正整数"));
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
      if (value == "") {
        callback();
      } else {
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
      unloadMatchDiago:false,
      unloadingPlaceIsShow:false,
      loadingArr: {
        supplierLoading: false,
        carloading: false,
        fluidLoading: false,
        customerLoading: false,
        createdLoading: false,
        unloadLoading:false
      },
      bindText: {
        fluidName: "",
        customerName: "",
      },
      addCarList: [{
        id: "",
        master_driver: {},
        vice_driver: {},
        semitrailer: {},
        unloadInfo:[],
        tractor:{carrier:{}}
      }],
      allUnloadArr:[],
      renderUnloadArr:[],
      aCarMatchId:[],
      thTableList: [
        {title: '卸货单编号',param: 'order_number',width: ''}, 
        {title: '卸货单状态',param: 'status_display',width: ''}, 
        {title: '站点',param: 'station',width: ''}, 
        {title: '站点地址',param: 'station_address',width: ''}, 
        {title: '计划到站时间',param: 'plan_arrive_time',width: '180'}, 
        {title: '计划吨位',param: 'plan_tonnage',width: ''}, 
        {title: '收货人',param: 'consignee', width: ''}, 
        {title: '收货电话',param: 'consignee_phone',width: ''},
      ],
      pickOrderParam: {
        customer_id: "",
        fluid: "",
        plan_time: '',
        require_car_number: '',
        plan_tonnage: '',
        type:'three',
        consignment_type:'external',
        carriers:'',
        mark:''
      },
      capacitiesNum: 0,
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
          { validator: needNumVa, trigger: 'blur' },
          { required: true, message: '请填需求车辆', trigger: 'blur' },

        ],
        plan_tonnage: [
          { validator: planTongVa, trigger: 'blur' },
          { required: true, message: '请填写计划吨位', trigger: 'blur' },
        ],
      },
      selectData: {
        carList: [],
        renderCarLIst: [],
        fluidList: [],
        customerList: []
      },
      opearId:"",
      saveInfo:[],
      saveInfoID:[]
    };
  },
  computed: {
    users: function() {
      return this.pbFunc.getLocalData('users', true);
    }
  },

  methods: {
    addUnloading:function(){
      this.unloadingPlaceIsShow = true;
    },
    matchUnload:function(unloadData,status){
      let thisCar={};
      for(let caritem in this.addCarList){
          if(this.addCarList[caritem].id==this.opearId){
          thisCar=this.addCarList[caritem];
        }
      }
      if(status==='match'){
        this.aCarMatchId.push(unloadData.id);
        thisCar.unloadInfo.push(unloadData);
      }else if(status==='cancle'){
        var middleArr=[];
        var middleIDarr=[];
          thisCar.unloadInfo.forEach((item,index)=>{
            if(!(item.id===unloadData.id)){
              middleArr.push(item);
            }
          });
          this.aCarMatchId.forEach((idItem,idIndex)=>{
            if(!(idItem==unloadData.id)){
              middleIDarr.push(idItem);
            }
          });
          thisCar.unloadInfo=middleArr;
          this.aCarMatchId=middleIDarr;
        }
    },
    sureUnloadMatch:function(){
      //this.aCarMatchId=[];
      this.unloadMatchDiago=false;
    },
    closeUnloadMatch:function(){
      //this.aCarMatchId=[];
      this.unloadMatchDiago=false;
      if(this.opearId){
        for(let caritem in this.addCarList){
          if(this.addCarList[caritem].id==this.opearId){
            this.addCarList[caritem].unloadInfo=this.saveInfo;
            this.aCarMatchId=this.saveInfoID
          }
        }
      }
    },
    changeUnload:function(bindId){
      if(bindId){
        this.renderUnloadArr=[];
        this.fifterRnderUnload(bindId);
        this.opearId=bindId;
        for(let i in this.addCarList){
          if(this.addCarList[i].id===bindId){
            this.saveInfo=this.pbFunc.deepcopy(this.addCarList[i].unloadInfo);
            this.saveInfoID=this.pbFunc.deepcopy(this.aCarMatchId);
          }
        }
        this.unloadMatchDiago=true;
      }else{
        this.$alert('请先选择车辆', {
            confirmButtonText: '确定',
            callback: action => {
              
            }
        });
      }
      
    },
    fifterRnderUnload:function(bindId){
      var middleArr=[];
        // this.addCarList.forEach((aloneCarUnload)=>{
        //   if(bindId!=aloneCarUnload.id){
        //     aloneCarUnload.unloadInfo.forEach((alone)=>{
        //       middleArr.push(alone.id);
        //     });
        //   }
        // });
        this.renderUnloadArr=[];
        this.allUnloadArr.forEach((unloadItem)=>{
          var addFalge=true;
          if(this.aCarMatchId.indexOf(unloadItem.id)>-1){
            addFalge=false;
          }
          if(addFalge){
            this.renderUnloadArr.push(unloadItem);
          }
        });
        this.addCarList.forEach((caritem)=>{
          if(caritem.id==bindId){
            this.renderUnloadArr=caritem.unloadInfo.concat(this.renderUnloadArr);
          }
        });
    },
    bindTextFunc: function(type) {
      if (type == 'fluid') {
        for (let i in this.selectData.fluidList) {
          if (this.selectData.fluidList[i].id == this.pickOrderParam.fluid) {
            this.bindText.fluidName = this.selectData.fluidList[i].fluid_name;
            break;
          }
        }

      } else if (type == 'customer') {
        for (let i in this.selectData.customerList) {
          if (this.selectData.customerList[i].id == this.pickOrderParam.customer_id) {
            this.bindText.customerName = this.selectData.customerList[i].name;
            break;
          }
        }
        // this.getFluid();
      }
    },
    sendRe: function() {
      var vm = this;
      var sendData = this.pbFunc.deepcopy(this.pickOrderParam);
      this.loadingArr.createdLoading = true;
      let capacities = {};
      for (let i in this.addCarList) {
        if (this.addCarList[i].id != "") {
          var unloadIdString="";
          if(this.addCarList[i].unloadInfo.length>0){
            this.addCarList[i].unloadInfo.forEach((item,index)=>{
              if(this.addCarList[i].unloadInfo.length>1&&index!=this.addCarList[i].unloadInfo.length-1){
                unloadIdString+=(item.id+",");
              }else{
                unloadIdString+=item.id
              }
              
            });
          }
          capacities[this.addCarList[i].id]=unloadIdString;
        }
      }
      sendData.capacities = capacities;
      this.$$http("cratePickUpOrder", sendData).then((results) => {
        this.loadingArr.createdLoading = false;
        if (results.data.code == 0) {
          this.sureAdd = false;
          this.$alert('线下承运单已经生成,请前往“线下承运调度”列表查看并跟进', '确认生成线下承运单', {
            confirmButtonText: '确定',
            callback: action => {
              vm.$router.push({ path: "/logisticsManage/UnderConsignmentOrders/underOrdersList" });
            }
          });
        } else {
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
    addACar: function() {
      this.addCarList.push({ id: "", master_driver: {}, vice_driver: {}, semitrailer: {},unloadInfo:[],tractor:{carrier:{}} });
    },
    carListChange: function(index) {
      var thisId = this.addCarList[index].id;
      for (let carIndex in this.selectData.carList) {
        if (this.addCarList[index].id == this.selectData.carList[carIndex].id) {
          let thisUnload=this.addCarList[index].unloadInfo;
          this.$set(this.addCarList, index, this.pbFunc.deepcopy(this.selectData.carList[carIndex]));
          this.$set(this.addCarList[index],'unloadInfo',thisUnload);
        }
      }
      for (let i in this.addCarList) {
        if (this.addCarList[i].id == thisId && i != index) {
          this.$set(this.addCarList, i, { id: "", master_driver: {}, vice_driver: {}, semitrailer: {},unloadInfo:[],tractor:{carrier:{}} });
          break;
        }
      }
      this.capacitiesNum = 0;
      for (let i in this.addCarList) {
        if (this.addCarList[i].id != "") {
          this.capacitiesNum++;
        }
      }
    },
    deleteCarByIndex: function(index) {
      this.addCarList.splice(index, 1);
      this.capacitiesNum = 0;
      for (let i in this.addCarList) {
        if (this.addCarList[i].id != "") {
          this.capacitiesNum++;
        }
      }
    },
    needcarNumChange: function() {
      var require = this.pickOrderParam.require_car_number > 50 ? 50 : this.pickOrderParam.require_car_number;
      if (!isNaN(parseInt(require))) {
        if (require > this.addCarList.length) {
          var middleArr = [];
          for (var i = 0; i < require - this.addCarList.length; i++) {
            middleArr.push({ id: "", master_driver: {}, vice_driver: {}, semitrailer: {},unloadInfo:[],tractor:{carrier:{}} });
          }
          this.addCarList = this.addCarList.concat(middleArr);
        } else if (require < this.addCarList.length) {
          var delNum = this.addCarList.length - require;
          var middleArr = this.pbFunc.deepcopy(this.addCarList);
          for (var j = this.addCarList.length - 1; j > 0; j--) {
            if (this.addCarList[j].id == "") {
              delNum--;
              this.addCarList.splice(j, 1);
              if (delNum == 0) {
                break;
              }
            }
          }
        }
      }
    },
    closeDialog: function(isSave, unloadId,unloadData) {
      this.unloadingPlaceIsShow = false;

      if (isSave) {
        this.getAllUnloadOrder(unloadId);
      }
      if (unloadId) {
        this.aCarMatchId.push(unloadId);
      }

    },
    goOrderList: function() {
      this.$router.push({ path: "/logisticsManage/UnderConsignmentOrders/underOrdersList" });
    },
    upOrder: function() {
      this.$refs['addPickOrderForm'].validate((valid) => {
        if (valid) {
          this.sureAdd = true;
        } else {
          this.$alert('请根据填写界面红字处提醒，对不合规数据进行修改后再次提交', '无法生成', {
            confirmButtonText: '确定',
            callback: action => {

            }
          });
        }
      });
    },
    getFluid: function() {
      this.loadingArr.fluidLoading = true;
      this.$$http("getFluidsFormAdd", {}).then((results) => {
        if (results.data.code == 0) {
          this.selectData.fluidList = results.data.data;
        }
        this.loadingArr.fluidLoading = false;
      }).catch(() => {
        this.loadingArr.fluidLoading = false;
      });
    },
    getCustomer: function() {
      this.loadingArr.customerLoading = true;
      this.$$http("getCustomerFormAdd", { pagination: false }).then((results) => {
        if (results.data.code == 0) {
          this.selectData.customerList = results.data.data;
        }
        this.loadingArr.customerLoading = false;
      }).catch(() => {
        this.loadingArr.customerLoading = false;
      });
    },
    getCarData: function() {
      this.$$http('searchCapacityList', { pagination: false, complete_status: true }).then((results) => {
        this.loadingArr.carloading = false;
        if (results.data.code == 0) {
          this.selectData.carList = results.data.data;
          this.selectData.renderCarLIst = results.data.data;
        }
      }).catch((err) => {
        this.loadingArr.carloading = false;
      });
    },
    getCarriesId: function() {
      this.$$http('updateCompany', { id: this.users.carrier.id }).then((results) => {
        if (results.data.code == 0) {
          this.$$http('getCarriesId', { credit_code: results.data.data.license_code }).then((reData) => {
            if (reData.data.code == 0) {
              this.pickOrderParam.carriers = [reData.data.data.data[0].id];
            }
          });
        }
      }).catch(() => {

      });
    },
    getAllUnloadOrder:function(id){
      let postData={
        status:'waiting_related',
        need_all:true,
      };
      this.loadingArr.unloadLoading = true;
      this.$$http('getUnloadBillList', postData).then((results) => {
        this.loadingArr.unloadLoading = false;
        if(results.data.code==0){
          this.allUnloadArr=results.data.data.data.data;
          if(id){
            this.allUnloadArr.forEach((uItem,uIndex)=>{
              if(uItem.id==id){
                for(let caritem in this.addCarList){
                  if(this.addCarList[caritem].id==this.opearId){
                    this.addCarList[caritem].unloadInfo.push(uItem);
                  }
                }
              }
            });
            this.fifterRnderUnload(this.opearId);
          }
        }else{
          this.$message.error('获取卸货单失败');
        }
      }).catch(()=>{
        this.loadingArr.unloadLoading = false;
        this.$message.error('获取卸货单失败');
      });
    }
  },
  created() {
    this.getCarData();
    this.getCustomer();
    this.getFluid();
    this.getCarriesId();
    this.getAllUnloadOrder();
  }
};

</script>
