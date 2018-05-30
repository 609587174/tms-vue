<template>
  <div>
    操作日志
  </div>
</template>
<script>
export default {
  name: 'opLog',
  computed: {

  },
  data() {
    return {
    }
  },
  methods: {

  },
  created() {
  },
  activated() {
    console.log(this.requestApi);
  },
  props: {
    requestApi: String
  },
}

</script>