<style scoped lang="less">
.el-container {
  background: #fff;
}

.el-container,
div,
span,
a {
  font-family: PingFangSC-Light!important;
}

.el-header {
  background: #232F36;
  height: 64px!important;
  .bpm-head {
    width: 1200px;
    margin: 0 auto;
    line-height: 64px;
    color: #fff;
    font-size: 16px;
    img {
      margin-top: 14px;
    }
    a {
      color: #fff;
      font-size: 16px;
    }

    .link {
      width: 187px;
      height: 36px;
      border: 1px solid #fff;
      display: inline-block;
      border-radius: 4px;
      text-align: center;
      line-height: 34px;
      margin-left: 40px;
      position: relative;
      top: 13px; // margin-top: 12px;
      a {
        width: 90px;
        display: block;
        float: left;
        &:last-child {
          border-left: 1px solid #fff;
        }
      }
    }
    .user {
      display: inline-block;
      margin-left: 30px;
      .text-blue {
        color: #4a9bf8;
      }
      span {
        padding: 0 10px;
      }
    }
  }
}

.el-main {
  padding: 0;
  .banner {
    width: 100%;
    height: 705px;
    background: url('../assets/img/banner.png')no-repeat 50%;
    .banner-content {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .banner-op {
        position: absolute;
        top: 280px;
        width: 100%;
        text-align: center;
        .banner-font {
          font-size: 32px;
          font-family: PingFangSC-Light;
          color: #fff;
          line-height: 64px;
          width: 562px;
          height: 64px;
          background: url('../assets/img/Rectangle.png')no-repeat;
          text-align: center;
          margin: 0 auto;
        }
        .banner-btn {
          margin-top: 102px;
          button {
            width: 300px;
            height: 60px;
            font-size: 22px;
          }
        }
      }
    }
  }
  .advantage {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 90px;
    .advantage-list {
      height: 618px;
      width: 100%;
      .advantage-list-msg {
        height: 309px;
        background: #F7F8FA;
        text-align: center;
        padding: 0 40px;
        img {
          margin: 56px 0 22px;
        }
        span {
          display: block;
          font-size: 24px;
          color: #555555;
          margin-bottom: 20px;
        }
        div {
          font-size: 16px;
          color: #50565C;
          line-height: 22px;
          text-align: center;
        }
      }
      .advantage-list-img {
        img {
          width: 100%;
        }
      }
    }
  }
  .product {
    width: 100%;
    height: 670px;
    background: url('../assets/img/product.png')no-repeat 50%;
    display: inline-block;
    .list-title {
      color: #fff;
    }

    .product-content {
      width: 1120px; // height: 220px;
      margin: 0 auto;

      .is-animating {
        // width: 920px;
      }
      /deep/ .el-carousel__container {
        height: 220px;
        .el-carousel__arrow {
          background: none;
          i {
            font-size: 24px;
          }
        }
        .el-carousel__arrow--left {
          left: 35px;
        }
        .el-carousel__arrow--right {
          right: 35px;
        }
      }
      /deep/ .el-carousel__indicators {
        display: none;
      }
      .product-list {
        position: absolute;
        top: 0;
        left: 100px;
        width: 820px;
        margin: 0 auto;
        padding: 0 50px;
        color: #fff;
        height: 220px;
        &:after {
          content: " ";
          width: 100%;
          height: 220px;
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(255, 255, 255, .2); // filter: blur(2px);
          z-index: 2;
        }

        >span {
          font-size: 24px;

          margin: 48px 0 10px 0;
          display: inline-block;
        }
        >div {
          width: 512px;
          line-height: 28px;
          font-size: 14px;
        }
      }
      .app-one {
        background: url('../assets/img/app1.png')no-repeat 680px 30px;
      }
      .app-two {
        background: url('../assets/img/app2.png')no-repeat 680px 30px;
      }
      .app-code {
        ul {
          list-style-type: none;
          text-align: center;
          margin-top: 74px;
          li {
            width: 132px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #fff;


            text-align: center;
            display: inline-block;
            margin: 0 5px;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            >span {
              line-height: 50px;
              color: #fff;
            }
            &:hover {
              .code {
                display: block;
              }
            }
            .code {
              display: none;
              position: absolute;
              z-index: 9;
              left: -1px;
              bottom: -55px;
              width: 134px;
              height: 160px;
              background: #fff;
              >span {
                line-height: 22px;
                letter-spacing: 3px;
              }
            }
          }
        }
      }
    }
  }

  .list-title {
    font-size: 42px;
    color: #333;
    text-align: center;
    letter-spacing: 3px;
    margin: 90px auto 56px auto;
    position: relative;
    width: 280px;
    &:before {
      position: absolute;
      left: -15px;
      top: 14px;
      content: " ";
      display: block;
      height: 15px;
      width: 15px;
      background: #409EFF;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    &:after {
      position: absolute;
      right: -15px;
      top: 14px;
      content: " ";
      display: block;
      height: 15px;
      width: 15px;
      background: #409EFF;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}

.bpm-footer {
  width: 100%;
  height: 92px;
  background: #232F36;
  text-align: center;
  display: inline-block;
  >div {
    margin-top: 20px;
    font-size: 14px;
    color: #E8E8E8;
    line-height: 26px;
  }
}

.el-footer {
  padding: 0;
}

</style>
<template>
  <div>
    <el-container>
      <el-header>
        <div class="bpm-head">
          <el-row>
            <el-col :span="6"><img src="@/assets/img/logo.png" alt=""></el-col>
            <el-col :span="18" class="text-right">
              <a rel="nofollow" target="_blank" :href="driverAppUrl">司机端App下载</a>
              <span>｜</span>
              <a rel="nofollow" target="_blank" :href="businessAppUrl">业务端App下载</a>
              <div v-if="user&&user.nick_name" class="user">
                欢迎您：{{user.nick_name}}，<a class="cursor-pointer text-blue" v-on:click="isLogin">进入91LNG</a>
                <span>|</span>
                <a v-on:click="logout" class="cursor-pointer">退出</a>
              </div>
              <div class="link" v-else>
                <router-link :to="{path: '/register'}" class="text-blue">注册</router-link>
                <router-link :to="{path: '/login'}">登录</router-link>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div class="banner">
          <div class="banner-content">
            <div class="banner-op">
              <div class="banner-font">清洁 / 高效 / 协同 / 智能</div>
              <div class="banner-btn">
                <el-button type="primary" v-on:click="isLogin">开始使用</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="advantage">
          <div class="list-title">
            我们的优势
          </div>
          <div class="advantage-content">
            <el-row>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/ai.png">
                    <span>车辆智能调度</span>
                    <div>在确保时效性的前提下，依托 业界领先的算法技术计算装货 与卸货的最优调度方案</div>
                  </div>
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap1.png">
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap2.png">
                  </div>
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/data.png">
                    <span>数据精细管理</span>
                    <div>驾驶员/销售/统计/财务数据实 时同步、精确统计</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/search.png">
                    <span>行业全景洞察</span>
                    <div>为管理人员与销售人员提供实 时更新的全国LNG价格图表， 为制定销售策略提供辅助</div>
                  </div>
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap3.png">
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap4.png">
                  </div>
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/for.png">
                    <span>业务协同推进</span>
                    <div>从获取销售需求到物流运输、 财务管理实现全站多角色高效 协同与跟踪记录</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="product">
          <div class="list-title">
            我们的产品
          </div>
          <div class="product-content">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item>
                <div class="product-list app-one">
                  <span>业务端 APP</span>
                  <div>与91LNG-BPM业务管理系统无缝衔接，业务员可随时随地通过手机下单、跟进装卸车信息、 进行销售单结算，并可查看每日业务汇总数据，贸易业务全流程一手掌控。</div>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="product-list app-two">
                  <span>司机端 APP</span>
                  <div>与91LNG-TMS运输管理系统无缝衔接，装/卸车信息同步下发至司机、磅单/铅封 及时上传审核、合理规划装卸车路径，协助打造运输环节全透明，运输数据全纪录 的承运体系。</div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div class="app-code">
              <ul>
                <li>
                  <span>业务端APP</span>
                  <div class="code">
                    <img width="100%" :src="businessCodeImg" alt="">
                    <span>扫码下载</span>
                  </div>
                </li>
                <li>
                  <span>司机端APP</span>
                  <div class="code">
                    <img width="100%" :src="driverCodeImg" alt="">
                    <span>扫码下载</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="bpm-footer">
          <div>Copyright © 2017 成都浩海通达科技有限公司 - 蜀ICP备17041791号-1
            <br> QQ：963819358(联系客服) - 邮箱：fangyuan@hhtdlng.com(合作洽谈)</div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      businessCodeImg: '', //业务端下载二维码
      driverCodeImg: '', //司机端下载二维码
      businessAppUrl: '', //业务端下载链接
      driverAppUrl: '', //司机端下载链接
      user: this.pbFunc.getLocalData('users', true)
    };
  },
  computed: {

  },
  methods: {
    // goLink() {
    //   this.$router.push({ path: '/login' });
    // },
    isLogin() {
      if (this.user && this.user.nick_name) {
        //this.$router.push({ path: '/dashboard/dispatchDashboard' });
        this.$emit('login');
      } else {
        this.$router.push({ path: '/login' });
      }
    },
    logout: function() {
      this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.signOut();
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
          this.user = '';
          this.$router.push({ path: '/' });
        }

      }).catch((err) => {
        this.$message.error('退出失败');
      })
    }
  },
  created() {
    let currentUrl = document.location.href.toString();
    if (currentUrl.match('ptms.91lng.cn')) {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessPrepare';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverPrepare';
      this.businessAppUrl = 'https://www.pgyer.com/newBusinessPrepare';
      this.driverAppUrl = 'https://www.pgyer.com/newDriverPrepare';
    } else if (currentUrl.match('tms.hhtdlng.com')) {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessTest';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverTest';
      this.businessAppUrl = 'https://www.pgyer.com/newBusinessTest';
      this.driverAppUrl = 'https://www.pgyer.com/newDriverTest';
    } else if (currentUrl.match('tms.91lng.cn')) {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessPro';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverPro';
      this.businessAppUrl = 'https://www.pgyer.com/newBusinessPro';
      this.driverAppUrl = 'https://www.pgyer.com/newDriverPro';
    } else {
      this.businessCodeImg = 'http://www.pgyer.com/app/qrcode/newBusinessDev';
      this.driverCodeImg = 'http://www.pgyer.com/app/qrcode/newDriverDev';
      this.businessAppUrl = 'https://www.pgyer.com/newBusinessDev';
      this.driverAppUrl = 'https://www.pgyer.com/newDriverDev';
    }
  }
};

</script>
