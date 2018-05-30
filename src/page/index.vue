<!-- index.vue -->
<style type="text/css" scoped lang="less">
.st-wraper {
  background-color: #fff;
}

.public-wraper {
  position: relative;

  padding-left: 200px;
}

.st-head-wraper {
  height: 565px;

  background: url("../assets/img/banner.jpg") no-repeat center center;
  .st-head-middle {
    width: 904px;
    height: 565px;
    margin: 0 auto;
    .head-nav-wraper {
      line-height: 80px;

      color: #fff;
      .st-company-name {
        font-size: 24px;
        img{
         position: relative;
         top: 12px;
        }
      }
      .head-nav {
        font-size: 16px;
        a {
          color: #fff;
        }
      }
    }
    .head-login-wraper {
      .company-slogan {
        padding-top: 95px;

        color: #fff;
        .company-slogan-size {
          font-size: 32px;
          font-weight: 500;
          line-height: 80px;
        }
      }
    }
  }
}

.business-description {
  width: 904px;
  padding-top: 30px;
  padding-bottom: 40px;
  margin: 0 auto;
  .description-item {
    width: 100%;
    height: 80px;
    padding: 0 60px;
    margin-bottom: 30px;
    img {
      width: 140px;
      height: 80px;
    }
    h4 {
      position: relative;

      height: 32px;
      padding: 0 10px;

      font-size: 20px;
      line-height: 32px;

      color: #333;

      span {
        position: absolute;
        top: 6px;

        display: inline-block;
        width: 2px;
        height: 20px;

        background-color: #30a5ff;
      }
    }
    p {
      padding: 0 10px;

      font-size: 14px;

      color: #555;
    }
    .margin-left-35 {
      margin-left: 35px;
    }
    .margin-right-35 {
      margin-right: 35px;
    }
    h4.border-left-blue span {
      left: 0;
    }
    h4.border-right-blue span {
      right: 0;
    }
  }
}

.footer {
  padding: 20px 20px;

  font-size: 13px;

  text-align: center;

  color: #fff;
  background: #666;
}

.head-user {
  margin-left: 50px;
  color: #606266;
}
.head-user-no{
  color: #fff;
  a{
    color: #fff;
  }
}

</style>
<template>
  <div class="main">
    <div class="st-wraper">
      <div class="st-head-wraper">
        <div class="st-head-middle">
          <div class="head-nav-wraper clearfix">
            <div class="st-company-name float-left"><a href="/"><img src="../assets/img/91LNG.jpg"></a> </div>
            <div class="float-right head-user">
              <div v-if="users.nick_name">
                欢迎您：<span>{{users.nick_name}}，</span><router-link :to="{path: '/orders/pickupOrders/ordersList'}" class="text-blue">进入91LNG</router-link>
                <a href="javascript:void(0);">｜</a>
                <a href="javascript:void(0);" v-on:click="logout">退出</a>
              </div>
              <div v-else class="head-user-no">
                <router-link :to="{path: '/register'}" class="text-blue">注册</router-link>
                <a href="javascript:void(0);">｜</a>
                <router-link :to="{path: '/login'}" class="text-blue">登录</router-link>
              </div>
            </div>
            <div class="float-right head-nav">
              <a rel="nofollow" target="_blank" href="https://www.pgyer.com/driver_pro">驾驶员App下载</a>
              <!-- <a href="#/login">登录</a> -->
              ｜
              <a rel="nofollow" target="_blank" href="https://www.pgyer.com/business_pro">业务员App下载</a>
            </div>
          </div>
          <div class="head-login-wraper">
            <div class="float-left company-slogan">
              <span class="company-slogan-size">LNG智慧运贸解决方案</span>
              <br>
              <span class="f-size-22">清洁/高效/协同/智能</span>
            </div>
          </div>
        </div>
      </div>
      <div class="business-description">
        <div class="description-item">
          <div class="float-left margin-right-35">
            <img src="../assets/img/banner_1.jpg">
          </div>
          <div class="float-left">
            <h4 class="text-left border-left-blue"><span></span>数据精细管理</h4>
            <p class="text-right">驾驶员/销售/统计/财务数据实时同步、精确统计</p>
          </div>
        </div>
        <div class="description-item clearfix">
          <div class="float-right margin-left-35">
            <img src="../assets/img/banner_2.jpg">
          </div>
          <div class="float-right">
            <h4 class="text-right border-right-blue">业务协同推进<span></span></h4>
            <p>从获取销售需求到物流运输、财务管理实现全站多角色高效协同与跟踪记录</p>
          </div>
        </div>
        <div class="description-item  clearfix">
          <div class="float-left margin-right-35">
            <img src="../assets/img/banner_3.jpg">
          </div>
          <div class="float-left">
            <h4 class="border-left-blue"><span></span>车辆智能调度</h4>
            <p>在确保时效性的前提下，依托业界领先的算法技术计算装货与卸货的最优调度方案</p>
          </div>
        </div>
        <div class="description-item">
          <div class="float-right margin-left-35">
            <img src="../assets/img/banner_4.jpg">
          </div>
          <div class="float-right">
            <h4 class="text-right border-right-blue">行业全景洞察<span></span></h4>
            <p>为管理人员与销售人员提供实时更新的全国LNG价格图表，为制定销售策略提供辅助</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span class="company">Copyright © 2018 成都浩海通达科技有限公司</span>
      <span class="company"> - 蜀ICP备17041791号-1 </span>
      <br>
      <span class="contact"> QQ：963819358(联系客服)</span>
      <span class="contact"> - 邮箱：fangyuan@hhtdlng.com(合作洽谈)</span>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
import publicHeader from '@/components/publicHeader'

export default {
  components: {
    publicHeader: publicHeader,
  },
  data: function() {

    return {

    }
  },
  computed: {
    users: function() {
      return this.$store.state.common.users;
    }
  },
  methods: {
     logout: function() {
      this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.signOut();
          this.$emit("logout");
        })
        .catch(() => {});
    },
    signOut: function() {
      this.$$http('signOut', {}).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          localStorage.clear();
          this.$store.state.common.users = {};
          this.$router.push({ path: '/login' });
        }

      }).catch((err) => {
        this.$message.error('退出失败');
      })
    }
  }
}

</script>
