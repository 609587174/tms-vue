<!-- personDetail.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="capacityDetail" class="capacity-detail">
    运力详情
  </div>
</template>
<script>
export default {
  name: 'capacityDetail',
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    id: function() {
      return this.$route.query.capacityId;
    }
  },
  methods: {

  }
}

</script>
