<style scoped lang="less">


</style>
<template>
  <div>
    <dashborad dispatchPage="dispatchDashboard"></dashborad>
    <div>
      <qiniuImgUpload :fileList.sync="fileList" :uploadTitle="uploadTitle" :limit="limit"></qiniuImgUpload>
    </div>
  </div>
</template>
<script>
import dashborad from '@/components/dashboard/allDashboard';
import qiniuImgUpload from '@/components/qiniuImgUpload';
export default {
  name: 'dispatchDashboard',
  components: {
    dashborad: dashborad,
    qiniuImgUpload,
  },
  data() {
    return {
      fileList: [],
      uploadTitle: '上传榜单',
      limit: 1,
    };
  },
  computed: {

  },
  methods: {

  },
  created() {

  },
  watch: {
    fileList: function(val, oldval) {
      console.log('watch fileList', val, oldval)
    }
  }
};

</script>
