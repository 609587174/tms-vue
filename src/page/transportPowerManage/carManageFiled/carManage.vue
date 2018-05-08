<template>
  <div>
    <template v-if="$route.path=='/transportPowerManage/carManage'">
      <div>
        <carHeadManage></carHeadManage>
      </div>
    </template>
    <template v-else>
      <div>
        <router-view></router-view>
      </div>
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
      import ("../../../components/transportPowerManage/carManage/carHeadManage.vue")
  },
  data() {
    return {
      msg: '子组件',
      showMessage: this.$store.state.common.showAmessage,
    }
  },
  methods: {
    clicktabs: function() {

    }
  }

}

</script>
<style>


</style>
