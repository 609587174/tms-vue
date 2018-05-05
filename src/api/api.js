/**
 * @description 接口文档API,用于后端接口查询
 * @param
 *   url:后端接口url（必需）
 *   method:后端接口方法（必需）
 *   desc:后端接口描述 （可选）
 *   param:接口参数 （可选）
 *     desc:参数描述（可选）
 */

 const api = {
  get_trailer_list: {
    url: ' service/location/transfor',
    method: 'get',
    desc:'',
    param:{
      page: {
        desc: '',
      },
      page_size: {
        desc: '',
      },
      trailer_no__contains: {
        desc: '',
      }
    }
  }
}

export default api;
