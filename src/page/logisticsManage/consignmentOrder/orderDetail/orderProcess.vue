<style scoped lang="less">
.detail-main {

  border: none;
}

.label-list {
  margin-bottom: 0px;
}

.el-collapse-item {
  /deep/ .el-collapse-item__header {
    padding-left: 20px;

    background-color: #fafafa;
  }
  /deep/ .el-collapse-item__content {
    padding-top: 25px;
  }
}

.orderPossing {
  border: 1px solid #ebeef5;
  border-top: none;
  overflow-y: auto;
  max-height: 600px;
  overflow-x: hidden;
}

.el-button {
  margin-left: 0;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second" style="background-color:white">
          <el-container v-show="!pageLoading">
            <el-main>
              <el-row style="">
                <el-col :span="20" class="orderPossing">
                  <el-collapse v-model="detailData.length-1">
                    <el-collapse-item :title="item.operation" :name="key" v-for="(item,key) in detailData" :key="key">
                      <div v-if="item.type === 'driver_pending_confirmation'">
                        <el-row>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>生成运单号</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.waybill)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>生成运单时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.waybill_create_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'reach_fluid'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>车号:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'to_fluid'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>司机:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.master_driver)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>副驾:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.copilot_name)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>押运:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.supercargo_name)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>车号:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>确认运单时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.operation === '上传装车铅封'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车铅封审核:</label>
                              <div class="detail-form-item">
                                <el-button type="text" style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showSeal',item.car_seal)">点击查看铅封</el-button>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="(item.type === 'waiting_seal'||item.type=='loading_waiting_audit'||item.type=='unloading_waiting_audit')&&item.operation!='上传装车铅封'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>液厂:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.fluid)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>液厂地址:</label>
                              <div class="detail-form-item" style="height:24px">
                                <el-tooltip class="item" effect="dark" :content="item.fluid_address" placement="top-start" style="width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                  <el-button type="text" style="height:24px;line-height:24px;padding-left:0">{{item.fluid_address}}</el-button>
                                </el-tooltip>
                              </div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>审核时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>计划到厂时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车毛重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.gross_weight)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>审核人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>实际到厂时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.active_time)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车皮重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.tare_weight)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车净重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.net_weight)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装液开始时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_start_time)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装液完成时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_end_time)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车磅单审核:</label>
                              <div class="detail-form-item">
                                <el-button type="text " style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showPound',item.weight_id)">点击查看磅单</el-button>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'already_match'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>站点:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.station)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>收货人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.consignee)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>计划卸车吨位:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plan_tonnage)">吨</div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>站点地址:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.station_address)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>收货人电话:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.consignee_phone)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>计划到站时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'to_site'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'reach_site'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>车号:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>

                       <div v-if="item.type === 'in_settlement'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </el-col>
                <el-col :span="2" :offset="1">
                  <div v-if="detailData.length>1">
                    <div v-for="(item,key) in allButton[detailData[detailData.length-1].type]">
                      <el-button style="margin-top:20px;width:100%" :type="item.type" @click="orderOperation(item.methods)">{{item.text}}</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="装车磅单通过" center :visible.sync="dialog.sureLoadEx" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;">
      <el-row>
        <el-col :span="20" :offset="2">
          <img :src="exPound.image_url" style='width:100%;max-height:500px'></img>
        </el-col>
      </el-row>
      <el-row style="margin-top:15px;">
        <el-col :span="10" :offset="2">
          <div class="label-list">
            <label>实际到场时间:</label>
            <div class="detail-form-item" v-html="pbFunc.dealNullData(surePound.active_time)"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="label-list">
            <label>装车毛重:</label>
            <div class="detail-form-item" v-html="pbFunc.dealNullData(surePound.gross_weight)"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:15px;">
        <el-col :span="10" :offset="2">
          <div class="label-list">
            <label>装液开始时间:</label>
            <div class="detail-form-item" v-html="pbFunc.dealNullData(surePound.work_start_time)"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="label-list">
            <label>装车皮重:</label>
            <div class="detail-form-item" v-html="pbFunc.dealNullData(surePound.tare_weight)"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:15px;">
        <el-col :span="10" :offset="2">
          <div class="label-list">
            <label>装液完成时间:</label>
            <div class="detail-form-item" v-html="pbFunc.dealNullData(surePound.work_end_time)"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="label-list">
            <label>装车净重:</label>
            <div class="detail-form-item" v-html="pbFunc.dealNullData(surePound.net_weight)"></div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="dialog.sureLoadEx = false">取 消</el-button>
       <el-button type="primary" @click="sendRe('sureLoadExUp')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="装车磅单拒绝" :visible.sync="dialog.cancleLoadEx" center width="30%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;">
      <el-form label-width="125px" status-icon>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-form-item label="拒绝原因:">
              <el-select v-model="loadPoundReason" placeholder="请选择车辆归属">
                <el-option v-for="(item,key) in selectData.loadPoundReasonList" :key="key" :label="item.text" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="loadPoundReason=='other'">
          <el-col :span="18" :offset="3">
            <el-form-item label="其他原因:">
              <el-input type="textarea" v-model="otherInput" style="width:80%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="dialog.cancleLoadEx = false">返 回</el-button>
       <el-button type="primary" @click="sendRe('cancleLoadExUp')">确认拒绝</el-button>
      </span>
    </el-dialog>
    <img-review :imgObject.sync='imgObject'></img-review>
  </div>
</template>
<script>
import imgReview from '@/components/common/imgReview';
export default {
  name: 'orderProcess',
  activeName: "second",
  computed: {
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    }
  },
  components: {
    imgReview: imgReview,
  },
  data() {
    return {
      lockFalg: false,
      activeName: 'second',
      pageLoading: false,
      detailData: [],
      dialog: {
        sureLoadEx: false,
        cancleLoadEx: false,
      },
      imgObject: {
        imgList: [],
        showPreview: false,
        previewIndex: 0,
      },
      loadPoundReason: "榜单照片不清晰",
      otherInput: "",
      surePound: {},
      exPound: {},
      sealImgList: [],
      poundImg: {},
      allButton: {
        'loading_waiting_audit': [{
          text: "审核拒绝",
          type: "danger",
          methods: "cancleLoadEx"
        }, {
          text: "审核通过",
          type: "success",
          methods: "sureLoadEx"
        }],
        'already_match': [{
          text: "确认卸货地",
          type: "success",
          methods: "sureMatch"
        }],
        'unloading_waiting_audit': [{
          text: "审核拒绝",
          type: "danger",
          methods: "cancleUnLoadEx"
        }, {
          text: "审核通过",
          type: "success",
          methods: "sureLoadEx"
        }],
        'waiting_settlement':[{
          text: "提交结算",
          type: "success",
          methods: "upInSettlement"
        }],
        'in_settlement':[{
          text: "提交结算",
          type: "success",
          methods: "upInSettlement"
        }]
      },
      selectData: {
        loadPoundReasonList: [{
            key: "榜单照片不清晰",
            text: "榜单照片不清晰"
          },
          {
            key: "虚假榜单照片",
            text: "虚假榜单照片"
          }, {
            key: "吨位信息错误",
            text: "吨位信息错误"
          }, {
            key: "other",
            text: "其他原因"
          }
        ]
      }
    }
  },
  methods: {
    showImg: function(type, id) {
      var vm = this;
      if (type == 'showPound') {
        if (vm.poundImg[id]) {
          var imgList = vm.poundImg[id];
          this.imgObject.imgList = imgList;
          this.imgObject.showPreview = true;
        } else {
          if (id) {
            var sendData = {};
            sendData.section_trip = this.setpId;
            sendData.id = id;
            if (vm.poundImg[id]) {
              var imgList = vm.poundImg[id];
              this.imgObject.imgList = imgList;
              this.imgObject.showPreview = true;
            } else {
              this.$$http("getPundList", sendData).then(results => {
                if (results.data.code == 0) {
                  vm.poundImg[results.data.data.data[0].id] = results.data.data.data[0].image_url;
                  var imgList = [results.data.data.data[0].image_url];
                  vm.imgObject.imgList = imgList;
                  vm.imgObject.showPreview = true;
                }
              });
            }
          }
        }
      } else if (type == 'showSeal') {
        if(this.sealImgList.length>0){
          vm.imgObject.imgList = this.sealImgList;
          vm.imgObject.showPreview = true;
        }else{
          var sendData={};
          sendData.section_trip=this.setpId;
          sendData.id=id;
          this.$$http("getSeal",sendData).then(results=>{
            if(results.data.code==0){
              vm.imgObject.imgList = results.data.data.data[0].image_url_list;
              this.sealImgList=results.data.data.data[0].image_url_list;
              vm.imgObject.showPreview = true;
            }else{
              vm.$message.error("获取铅封照片出错");
            }
          }).catch(()=>{
              vm.$message.error("获取铅封照片出错");
          });
        }
      }
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/orderDetailTab/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/logisticsManage/consignmentOrders/orderDetail/routePlayback/${this.setpId}/${this.willId}` });
      }
    },
    orderOperation: function(type) {
      var vm = this;
      var sendData = {};
      if (type == 'sureLoadEx') {
        sendData.section_trip = this.setpId;
        if (this.detailData.length > 0 && this.detailData[this.detailData.length - 1].type == "loading_waiting_audit") {
          if (this.detailData[this.detailData.length - 1].operation == "上传装车铅封") {
            this.surePound = this.detailData[this.detailData.length - 2];
            sendData.id = this.detailData[this.detailData.length - 2].weight_id;
          } else {
            this.surePound = this.detailData[this.detailData.length - 1];
            sendData.id = this.detailData[this.detailData.length - 1].weight_id;
          }
        }

        this.$$http("getPundList", sendData).then(results => {
          if (results.data.code == 0) {
            vm.exPound = results.data.data.data[0];
            vm.poundImg[results.data.data.data[0].id] = results.data.data.data[0].image_url;
            vm.dialog.sureLoadEx = true;
          }
        }).catch(() => {
          vm.$message.error("磅单图片获取失败")
        });
      } else if (type == 'cancleUnLoadEx') {
        vm.dialog.cancleLoadEx = true;
      } else if (type == 'sureUnLoadEx') {
        sendData.section_trip = this.setpId;
        if (this.detailData.length > 0 && this.detailData[this.detailData.length - 1].type == "loading_waiting_audit") {
          this.surePound = this.detailData[this.detailData.length - 1];
          sendData.id = this.detailData[this.detailData.length - 1].weight_id;
        }
        this.$$http("getPundList", sendData).then(results => {
          if (results.data.code == 0) {
            vm.exPound = results.data.data.data[0];
            vm.poundImg[results.data.data.data[0].id] = results.data.data.data[0].image_url;
            vm.dialog.sureLoadEx = true;
          }
        }).catch(() => {
          vm.$message.error("磅单图片获取失败")
        });
      } else if (type == 'cancleLoadEx') {
        vm.dialog.cancleLoadEx = true;
      } else if (type == 'sureMatch') {
        var cancel_trip_list = [],
          match_trip_list = [],
          sendData;
        this.detailData.forEach(item => {
          if (item.type == "already_match") {
            if (item.status == 'new') {
              match_trip_list.push(item.trip_id);
            } else {
              cancel_trip_list.push(item.trip_id);
            }
          }
        });
        sendData.cancel_trip_list = cancel_trip_list;
        sendData.match_trip_list = match_trip_list;
        this.$$http("sureMatch", sendData).then(results => {
          if (results.data.code == 0) {
            vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList" });
            vm.$message({
              type: "success",
              message: "确认卸货单成功"
            })
          } else {
            vm.$message.error("确认卸货单失败")
          }
        }).catch(() => {
          vm.$message.error("确认卸货单失败")
        });
      }else if(type=='upInSettlement'){
        var sendData={};
        sendData.id=this.setpId;
        sendData.status='in_settlement';
        this.$$http('changeOrderStatus',sendData).then(results=>{
          if(results.data.code==0){
             vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList" });
            vm.$message({
              type: "success",
              message: "提交结算成功"
            })
          }else{
            vm.$message.error("提交结算失败")
          }
        }).catch(()=>{
           vm.$message.error("提交结算失败")
        });
      }
    },
    sendRe: function(type, row) {
      var vm = this;
      var weight_id = "";
      if (this.detailData.length > 0 && this.detailData[this.detailData.length - 1].type == "loading_waiting_audit" || this.detailData[this.detailData.length - 1].type == "unloading_waiting_audit") {
        if (this.detailData[this.detailData.length - 1].operation == "上传装车铅封") {
          weight_id = this.detailData[this.detailData.length - 2].weight_id;
        } else {
          this.surePound = this.detailData[this.detailData.length - 1];
          weight_id = this.detailData[this.detailData.length - 1].weight_id;
        }
      }
      if (type == 'sureLoadExUp') {
        var sendData = {};
        if (this.detailData[this.detailData.length - 1].type == "unloading_waiting_audit") {
          sendData.status = 'waiting_settlement';
        } else {
          sendData.status = 'waiting_match';
        }

        sendData.id = this.setpId;
        sendData.weight_id = weight_id;
        this.$$http("examineLoad", sendData).then(results => {
          if (results.data.code == 0) {
            vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList" });
            vm.$message({
              type: "success",
              message: "审核通过成功"
            })
          }
        });
      } else if (type == 'cancleLoadExUp') {
        var sendData = {};
        if (this.detailData[this.detailData.length - 1].type == "unloading_waiting_audit") {
          sendData.status = 'unloading_audit_failed';
        } else {
          sendData.status = 'loading_audit_failed';
        }

        sendData.id = this.setpId;
        sendData.weight_id = "";
        if (this.loadPoundReason != 'other') {
          sendData.reason = this.loadPoundReason;
        } else {
          sendData.reason = this.otherInput;
        }

        this.$$http("examineLoad", sendData).then(results => {
          if (results.data.code == 0) {
            console.log('results', results);
            vm.$router.push({ path: "/logisticsManage/consignmentOrders/ordersList" });
            vm.$message({
              type: "success",
              message: "审核拒绝成功"
            })
          }
        });
      }
    },
    getData: function() {
      var sendData = {};
      sendData.id = this.setpId;
      var vm = this;
      vm.pageLoading = true,
        this.$$http("orderProcess", sendData).then((results) => {
          vm.pageLoading = false;
          if (results.data.code == 0) {
            console.log('运单分段记录', results);
            vm.detailData = results.data.data;
          }
        }).catch(() => {
          vm.pageLoading = false;
        });
    }
  },
  created: function() {
    this.getData();
  },
  activated: function() {
    this.activeName = 'second';
  }
}

</script>
