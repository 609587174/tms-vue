/* axios二次封装
 * desc:
 * 统一捕获接口报错
 * 统一报错弹窗提示
 * 接入api
 */

import axios from 'axios';
import { Message } from 'element-ui';
import api from './api';

/* 接口超时时长设置 */
let timeout = 15000;


/* 配置访问url */
let domainUrl = '';
let currentUrl = document.location.href.toString();

if (currentUrl.match('91lng.cn')) {
  domainUrl = 'http://91lng.cn';
} else if (currentUrl.match('test.hhtdlng.com')) {
  domainUrl = 'http://test.hhtdlng.com';
} else if (currentUrl.match('prepare.hhtdlng.com')) {
  domainUrl = 'http://prepare.hhtdlng.com';
} else {
  domainUrl = 'http://prepare.hhtdlng.com';
}


/* http请求拦截 */
axios.interceptors.request.use(config => {
  return config
}, error => {
  console.log('request error',err);
  return Promise.reject(error)
})


/* http请求拦截 */
axios.interceptors.response.use(response => {
  console.log('response', response);
  return response
}, error => {
  console.log('response error',error,error.response);
  return Promise.reject(error);
})


/* 统一处理网络问题或者代码问题造成的错误 */
const errorState = function(error) {
  if (error && error.response) {
      switch (error.response.status) {
          case 400: error.message = '参数错误' ; break;
          case 401: error.message = '未授权，请重新登录'; break;
          case 403: error.message = '拒绝访问'; break;
          case 404: error.message = '请求出错(404)'; break;
          case 405: error.message = '拒绝访问(405)'; break;
          case 408: error.message = '请求超时，请检查网络'; break;
          case 500: error.message = '服务器错误(500)'; break;
          case 501: error.message = '服务未实现(501)'; break;
          case 502: error.message = '网络错误(502)'; break;
          case 503: error.message = '服务不可用(503)'; break;
          case 504: error.message = '网络超时(504)'; break;
          case 505: error.message = 'HTTP版本不受支持(505)'; break;
          default: error.message = `连接出错(${error.response.status})!`;
      }
  }else{
    error.message = '连接服务器失败!'
  }
  Message.error(error.message);
}


/* 根据后端接口文档统一处理错误信息 */
const successState = function(response) {

  if(response.data && response.data.code){
    if(response.data.code == 401){
      Message.error('未登录，请重新登录');
    }else if(response.data.code == 403){
      Message.error('无操作权限');
    }else if(response.data.code == 0){

    }else{
      if(response.data.msg){
        Message.error(response.data.msg);
      }
    }
  }

}


/* 处理url */
const dealApiUrlParam = function(apiName, postData){
  let httpUrl = api[apiName].url;
  if(httpUrl){
    //设置最大循环数,以免死机
    let maxTimes = 0;
    while (httpUrl.match(/:([0-9a-z_]+)/i)) {
      let tempV = RegExp.$1;
      //console.log("tempV", tempV, postData)
      maxTimes++;
      //httpUrl最大支持10个变量替换
      if (maxTimes > 10) break;
      let reg = new RegExp(":" + tempV, "ig");
      //console.log("tempV2", tempV, postData.hasOwnProperty(tempV))
      if (postData.hasOwnProperty(tempV)) {
        httpUrl = httpUrl.replace(reg, postData[tempV])
      }
    }
  }
  return httpUrl;
}


/* 处理http请求config */
const dealConfig = function(apiName, postData) {

  const httpConfig = {
    method: '',
    baseURL: domainUrl,
    url: '',
    timeout: timeout,
    params: '',
    data: postData,
    headers:'',
  }

  if(api.hasOwnProperty(apiName)){
    let apiUrl = api[apiName].url ? api[apiName].url : '';
    let method = api[apiName].method ? api[apiName].method.toLowerCase() : '';

    console.log('apiUrl',apiUrl);

    httpConfig.method = method;

    if(method == 'get'){
      httpConfig.headers = {
          'X-Requested-With': 'XMLHttpRequest',
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        }
    }else{
     httpConfig.headers =  {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }

    if(apiUrl){
      apiUrl = dealApiUrlParam(apiName, postData);
    }else{
      return false
    }

    console.log('apiUrl',apiUrl);

    if (method == 'get' || method == 'delete') {
      delete httpConfig.data
    }

    if(method){
      if ((method == 'get' || method == 'delete') && (postData && typeof postData === 'object')) {
        //如果接口为 get 请求，但是参数需要用？跟随，这是需要的对应处理
        let params = '?';
        let existedVars = {};
        for (let t in postData) {
          if (!existedVars.hasOwnProperty(t)){
            params += t + "=" + encodeURIComponent(postData[t]) + '&';
          }
        }
        if (params.match(/^(.+)&$/i)){
          params = RegExp.$1;
          apiUrl += params;
        }
      }
      httpConfig.url = apiUrl;
      console.log('httpConfig',httpConfig);
      return httpConfig;
    }else{
      return false
    }

  }else{
    return false;
  }

}


/* http请求统一函数 */
const httpServer = (apiName, postData, defaultSuccessCallback, defaultErrorCallback) => {

  if (!apiName) return false;

  let httpConfig =  dealConfig(apiName, postData);

  let promise = new Promise(function(resolve, reject) {
    axios(httpConfig).then(
      (res) => {
        console.log('xxxx',res);
        //默认使用successState
        if (defaultSuccessCallback === undefined) {
          successState(res)
        }
        resolve(res)
      }
    ).catch(
      (response) => {
        console.log('xxxx111',response);
        //默认使用errorState
        if (defaultErrorCallback === undefined) {
          errorState(response)
        }
        reject(response)
      }
    )

  })
  return promise
}

export default httpServer
