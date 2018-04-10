<style scoped>
.g-body {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 110px 20px 0 270px;
}

.g-statues-bar {
  position: fixed;
  z-index: 90;
  top: 55px;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-left: 270px;
  background: #fff;
}

.g-statues-bar .bread {
  line-height: 40px;
}

.g-side {
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 230px;
  height: 100%;
  padding-top: 55px;
  border-right: 1px solid #dedede;
  overflow-y: auto;
}

.g-head {
  position: fixed;
  z-index: 91;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  line-height: 55px;
  background: #409EFF;
}

.logo {
  float: left;
  text-align: center;
  width: 270px;
  font-size: 1.4em;
  text-decoration: none;
  color:#fff;
}

.nav {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.usermenu {
  float: right;
  padding: 0 2em;
  color:#fff;
}
.usermenu a {
  text-decoration: none;
  margin: 0 0.2em 0 1em;
  color:inherit;
}

</style>
<template>
  <div>
    <el-row type="flex" class="g-head">
      <a href="" title="胜通tms" class="logo" >胜通tms</a>
      <div class="nav">
        <div class="usermenu" v-if="user.name">
          欢迎您：{{user.name}}
          <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
          <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
        </div>
      </div>
    </el-row>
    <el-menu :default-active="activeMenu" class="g-side" router >
      <template v-for="(route, index) in menus">
        <template v-if="route.children">
          <el-submenu :key="index" :index="route.name">
            <template slot="title">
              {{route.name||"无名字"}}</template>
            <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute">{{cRoute.name||"无名字"}}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :route="route" :index="route.name">{{route.name||"无名字"}}</el-menu-item>
        </template>
      </template>
    </el-menu>
     <template v-if="$route.path=='/'">
      <div style="margin:60px 270px;">
        <defaultView />
    </div>
    </template>
     <template v-else>
      <div style="margin:60px 270px;">
        <router-view ></router-view>
      </div>
    </template>
  </div>
</template>
<script>


export default {
  components: {
    defaultView:() => import("../components/powerManagement/carBaseInfo.vue")
  },
  data() {
    return {
      user: {name:"aa"},
      menus: []
    };
  },
  computed: {
    activeMenu: function(){
      return this.$route.name
    },
    breadcrumbs: function(){
      return (this.$route && this.$route.matched) || []
    }
  },
  methods:{
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$emit("logout");
        })
        .catch(() => {});
    }
  },
  created: function() {
    let user = this.$store.state.common.userData;
    if (user) {
      this.user = user;
    } else {
      console.log(user);
    }
    let menus = this.$store.state.common.menuData;
    if (menus) {
      this.menus = menus;
    }
  }
};
</script>
