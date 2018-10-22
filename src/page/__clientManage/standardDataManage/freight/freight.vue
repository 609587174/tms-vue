
<template>
  <div>
    <keep-alive :include="['freightDataList','mileageDataList']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'freight',
  data() {
    return {

    }
  }
}

</script>
<style>


</style>
