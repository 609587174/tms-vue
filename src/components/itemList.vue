<!-- itemList.vue -->
<template>
  <div class="label-list">
    <label><span class="text-red">* </span>姓名:</label>
    <div class="detail-form-item">{{userData.name}}</div>
    <div class="detail-form-item">{{userData.name}}</div>
  </div>
</template>
<script>
export default {
  name: 'itemList',
  props:['type']
  data: function() {
    return {
      user: { name: "aa" },
      type:this.type?this.type:'text'
    }
  }
}

</script>
<style scoped>


</style>
