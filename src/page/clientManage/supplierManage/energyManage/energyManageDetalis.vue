<!-- 新增或者修改 -->
<style scoped lang="less">
.detail-main {
  min-height: 500px;
  border-top: 0 none;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="油气费详情" name="first">
          <div class="detail-main" v-loading="pageLoading">
            <el-container v-show="!pageLoading">
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: '/clientManage/supplierManage/energyManage/energyManageList'}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>油气费详情</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                  <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">
                      基础信息
                    </el-col>
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail">编辑信息</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8" v-for="(itemRender,Rindex) in renderInfo">
                    <div class="label-list">
                      <label><span class="text-red">{{itemRender.title}}</span>:</label>
                      <div class="detail-form-item" v-if="itemRender.second">{{detailData[itemRender.valueKey][itemRender.second]}}</div>
                      <div class="detail-form-item" v-else>{{detailData[itemRender.valueKey]}}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'energyManageDetalis',
  computed: {
    energyId:function(){
      return this.$route.params.id
    }
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      detailData: {},
      renderInfo:[
        {title:"加油气公司名称",valueKey:"name"},
        {title:"类型",valueKey:"type",second:"verbose"},
        {title:"联系人",valueKey:"contact_name"},
        {title:"联系人方式",valueKey:"contact_phone"},
        {title:"地址",valueKey:"detail_address"},
      ],
    }
  },
  methods: {
    clicktabs: function(targetName) {
     
    },
    goEditDetail: function() {
      this.$router.push({ path: `/clientManage/supplierManage/energyManage/energyManageChange?operate=edit&energyId=${this.detailData.id}` });
    },
    getDetail:function(){
      this.pageLoading = true;
      this.$$http('energyDetalis', { id: this.energyId }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    this.getDetail();
  }
}

</script>
