<style scoped lang="less">


</style>
<template>
  <div>
    <dashborad dispatchPage="dispatchDashboard"></dashborad>
    <div>
      <qiniuFileUpload></qiniuFileUpload>
    </div>
  </div>
</template>
<script>
import dashborad from '@/components/dashboard/allDashboard';
import qiniuFileUpload from '@/components/qiniuFileUpload';
export default {
  name: 'dispatchDashboard',
  components: {
    dashborad: dashborad,
    qiniuFileUpload,
  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
};

</script>
