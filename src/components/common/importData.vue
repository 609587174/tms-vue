<style scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

.go-return {
  width: 32px;
  height: 32px;
  margin-top: 30px;
}

.el-header p {
  height: 60px;
  margin: 16px 0;

  font-size: 26px;
  line-height: 60px;

  text-align: center;
}

.upload-btn {
  display: inline-block;
  margin: 0 5px;
}

</style>
<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="3">
          <router-link :to="{path: backLink}">
            <div class="go-return icon-back"></div>
          </router-link>
        </el-col>
        <el-col :span="18">
          <p>{{importTitle}}</p>
        </el-col>
      </el-row>
    </el-header>
    <div class="operation-btn">
      <el-row>
        <el-col :span="10" class="total-data">
          共计0条，无误0条，有误0条
        </el-col>
        <el-col :span="14" class="text-right">
          <el-button type="primary" :disabled="downTempBtn.isDisabled" :loading="downTempBtn.isLoading" @click="">{{downTempBtn.text}}</el-button>
          <el-upload class="upload-btn" :action="uploadFileData.uploadFileUrl" :on-change="uploadData" :onError="uploadError" :onSuccess="uploadSuccess" :beforeUpload="beforeAvatarUpload" :on-progress="uploadProgress" :show-file-list="false">
            <el-button type="primary" plain :disabled="uploadBtn.isDisabled" :loading="uploadBtn.isLoading" @click="">{{uploadBtn.text}}</el-button>
          </el-upload>
          <el-button type="success" :disabled="importBtn.isDisabled" :loading="importBtn.isLoading" @click="">{{importBtn.text}}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-list mt-25">
      <el-table :data="tableData.data?tableData.data.results:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :selectable="checkboxInit">
        </el-table-column>
        <el-table-column v-for="(item,key) in tableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
          <template slot-scope="scope">
            <div v-if="item.param === 'waybill'">
              <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
            </div>
            <div v-else>{{scope.row[item.param]}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <!-- <div>{{scope.row.remark}}</div> -->
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" width="240" fixed="right">
          <template slot-scope="scope">
            <div class="text-red">{{scope.row.remark}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'importData',
  props: {
    importTitle: String,
    backLink: String,
    tableList: Array,
    apiNameData: Object
    // pagination: Object,
    // tableData: Array,
    // logLoading: Boolean
  },
  computed: {
    // headers() {
    //   return {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'Content-Type': 'application/json',
    //     'Authorization': this.pbFunc.getLocalData('token', true) ? this.pbFunc.getLocalData('token', true) : ''
    //   }
    // },

  },
  data() {
    return {
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      downTempBtn: {
        text: '下载导入模板',
        isLoading: false,
        isDisabled: false,
      },
      importBtn: {
        text: '导入系统',
        isLoading: false,
        isDisabled: false,
      },
      uploadBtn: {
        text: '上传导入数据',
        isLoading: false,
        isDisabled: false,
      },
      tableData: [],
      pageLoading: false,
      multipleSelection: '', //全选
      uploadList: [],
      uploadFileData: {
        uploadFileUrl: '', //接口请求的链接
        uploadData: {
          file: ''
        }, //上传接口参数
      }
    }
  },
  created() {
    this.uploadApiUrl();
    this.getList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log('全选',this.multipleSelection)
    },
    uploadApiUrl() {
      let domainUrl = '';
      let currentUrl = document.location.href.toString();
      if (currentUrl.match('ptms.91lng.cn')) {
        domainUrl = 'http://ptms.91lng.cn';
      } else if (currentUrl.match('tms.hhtdlng.com') && !currentUrl.match('devtms.hhtdlng.com')) {
        domainUrl = 'http://tms.hhtdlng.com';
      } else if (currentUrl.match('tms.91lng.cn') && !currentUrl.match('ptms.91lng.cn')) {
        domainUrl = 'http://tms.91lng.cn';
      } else {
        domainUrl = 'http://devtms.hhtdlng.com';
      }
      this.uploadFileData.uploadFileUrl = domainUrl + this.apiNameData.uploadApi + '?ticket=' + (this.pbFunc.getLocalData('token', true) ? this.pbFunc.getLocalData('token', true) : '');
    },
    checkboxInit(row, index) {
      if (row)
        return 0; //不可勾选
      else
        return 1; //可勾选
    },
    uploadData() {

    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const formatXls = file.name.split('.')[1] === 'xls';
      const formatXlsx = file.name.split('.')[1] === 'xlsx';
      // const extension3 = file.name.split('.')[1] === 'doc'
      // const extension4 = file.name.split('.')[1] === 'docx'
      const fileSize = file.size / 1024 / 1024 < 10
      if (!formatXls && !formatXlsx) {
        this.$message({
          message: '只能上传xls、xlsx 格式!',
          type: 'warning'
        });
      }
      if (!fileSize) {
        this.$message({
          message: '上传数据大小不能超过 10MB!',
          type: 'warning'
        });
      }
      // this.uploadFileData.uploadFileUrl = this.httpUrl + this.apiNameData.uploadApi;
      this.uploadFileData.uploadData.file = file.name;
      console.log('上传前', this.uploadFileData);
      return (formatXls || formatXlsx) && fileSize;
    },
    // 上传时
    uploadProgress(response, file, fileList) {
      this.uploadBtn = {
        text: '上传数据中',
        isLoading: true,
        isDisabled: true
      };
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      console.log('上传成功', response, file, fileList);
      this.uploadBtn = {
        text: '上传导入数据',
        isLoading: false,
        isDisabled: false,
      };
      if (response.code == 0) {
        this.$message({
          message: '上传成功！',
          type: 'success'
        });
      } else {
        this.$message({
          message: '上传失败！',
          type: 'error'
        });
      }

    },
    // 上传失败
    uploadError(response, file, fileList) {
      this.uploadBtn = {
        text: '上传导入数据',
        isLoading: false,
        isDisabled: false,
      };
      this.$message({
        message: '上传失败！',
        type: 'error'
      });
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      };
      this.pageLoading = true;

      this.$$http(this.apiNameData.listApi, postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;

          this.pageData.totalCount = results.data.data.count;

          console.log('this.tableData', this.tableData, this.pageData.totalCount);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    pageChange: function() {
      setTimeout(() => {
        this.getList();
      });
    }
  },

  activated() {},

}

</script>
