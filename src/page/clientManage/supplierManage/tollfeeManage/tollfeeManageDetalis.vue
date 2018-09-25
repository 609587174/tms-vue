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
                    <router-link :to="{path: ''}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>油气费详情</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main>

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
    
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      detailData: {},

    }
  },
  methods: {
    clicktabs: function(targetName) {
     
    },
    getDetail: function() {
    
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
