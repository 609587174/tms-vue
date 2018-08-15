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
                  <el-form-item label="托运客户:" prop="supplier">
                    <!-- <el-select v-model="pickOrderParam.supplier" filterable placeholder="请选择" @change="searchList()" v-loading="loadingArr.supplierLoading" >
                      <el-option v-for="(item,key) in selectData.supplierList" :key="item.id" :label="item.supplier_name" :value="item.id">
                      </el-option>
                    </el-select -->
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.supplier"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂名称:" prop="fluid">
                    <!-- <el-select v-model="pickOrderParam.fluid" filterable placeholder="请选择" v-loading="loadingArr.fluidLoading" @change="changeBindText('fluidName')">
                      <el-option v-for="(item,key) in selectData.fluidList" :key="item.id" :label="item.fluid_name" :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.fluid"></el-input>
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
              <el-row v-for="(aitem,aindex) in addCarList" style="position:relative">
                <el-col :span="2" style="position:absolute;left:-55px;top:0"></el-col>
                <el-col :span="5" :offset="2">
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
        carloading:false
      },
      addCarList:[{
        id:"",
        master_driver:{},
        vice_driver:{},
        semitrailer:{}
      }],
      pickOrderParam: {
        supplier: "",
        fluid: "",
        plan_time: '',
        require_car_number: '',
        trader: '',
        plan_tonnage: '',
      },
      rules: {
        supplier: [
          { required: true, message: '请选择供应商', trigger: 'change' },
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
        carList:[]
      }
    };
  },
  computed: {

  },
  methods: {
    carListChange:function(index){
      for(var carIndex in this.selectData.carList){
        if(this.addCarList[index].id==this.selectData.carList[carIndex].id){
          this.$set(this.addCarList,index,this.pbFunc.deepcopy(this.selectData.carList[carIndex]));
        }
      }
    },
    needcarNumChange:function(){

    },
    goOrderList: function() {
      this.$router.push({ path: "/purchaseCenter/pickupOrders/ordersList" });
    },
    upOrder: function() {
      this.$refs['addPickOrderForm'].validate((valid) => {
        if (valid) {
          this.sureAdd = true;
        }
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
  },
  created() {
    this.getCarData();
  }
};

</script>
