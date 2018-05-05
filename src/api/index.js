/* axios二次封装
 * desc:
 * 统一捕获接口报错
 * 统一报错弹窗提示
 * 接入api
 */

import axios from 'axios';
import { Message } from 'element-ui';
import api from './api';

let domainUrl = '';
let timeout = 15000;

if (document.location.href.toString().match('91lng.cn')) {
  domainUrl = '91lng.cn';
} else if (document.location.href.toString().match('test.hhtdlng.com')) {
  domainUrl = 'test.hhtdlng.com';
} else if (document.location.href.toString().match('prepare.hhtdlng.com')) {
  domainUrl = 'prepare.hhtdlng.com';
} else {
  domainUrl = 'prepare.hhtdlng.com';
}

axios.interceptors.request.use(config => {
  //store.commit('UPDATE_LOADING',true) //显示loading
  console.log('requestConfig', config)
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  console.log('response', response);
  return response
}, error => {
  if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
      err.message = '连接服务器失败!'
    }
    //message.error(err.message);
    return Promise.reject(err);
    //return Promise.resolve(error.response)
})

const errorState = function(response) {

}

const successState = function(res) {

}

const dealApiUrlParam = function(apiName, postData){
  let httpUrl = '';
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

const dealConfig = function(apiName, postData) {

  const httpConfig = {
    method: '',
    baseURL: domainUrl,
    url: '',
    timeout: timeout,
    params: '',
    data: '',
    headers:'',
  }

  if(api.hasOwnProperty(apiName)){
    let apiUrl = api[apiName].url ? api[apiName].url : '';
    let method = api[apiName].method ? api[apiName].method.toLowerCase() : '';

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
    }else{
      return false
    }

  }else{
    return false;
  }

}

const httpServer = (apiName, postData, defaultSuccessCallback, defaultErrorCallback) => {

  if (!apiName) return false;

  let httpConfig =  dealConfig(apiName, postData);

  let promise = new Promise(function(resolve, reject) {
    axios(httpConfig).then(
      (res) => {
        //默认使用successState
        if (defaultSuccessCallback === undefined) {
          successState(res)
        }
        resolve(res)
      }
    ).catch(
      (response) => {
        //默认使用errorState
        if (defaultErrorCallback) {
          errorState(response)
        }
        reject(response)
      }
    )

  })
  return promise
}

export default httpServer
