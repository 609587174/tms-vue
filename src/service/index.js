import axios from 'axios';
import * as util from '../assets/utils.js';
const instance = axios.create({
  baseURL: '',
  timeout: 10000
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.interceptors.response.use(function(response) {
  return response;
}, util.catchError);