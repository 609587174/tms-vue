<template>
  <div>
    <template v-if="$route.path=='/transportPowerManage/carManage'">
      <carHeadManage></carHeadManage>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>
</div>
</template>
<script>
export default {
  name: 'carManage',
  components: {
    carHeadManage: () =>
      import ("../../components/transportPowerManage/carHeadManage.vue")
  },
  data() {
    return {
      msg: '子组件',
      showMessage: this.$store.state.common.showAmessage,

    }
  },
  methods: {
    clicktabs: function() {
      console.log(this);
      this.showMessage = "改变后";
      this.$store.dispatch("ChangeinitParam", "newValues");
    }
  }

}

</script>
<style>


</style>
