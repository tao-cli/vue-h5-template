/* eslint-disable no-console */
/*********************
 * @name axios
 * @author Sam
 * @date 2019/05/05
 * @modify 2019/11/04  添加取消重复请求功能
 ***********************/
import Vue from 'vue';
import axios from 'axios';
import { Toast } from 'vant';

Vue.use(Toast)

const axiosIns = axios.create({});

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

// req 拦截器
axiosIns.interceptors.request.use(req => {
	//发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[req.url]) {
    promiseArr[req.url]('操作取消')
    promiseArr[req.url] = cancel
  } else {
    promiseArr[req.url] = cancel
  }
	if(!req.url){
		console.info('请检查，url为空：'+req.url);
	}
	return req;
}, err => {
	return Promise.reject(err.request);
});

// res 拦截器
axiosIns.interceptors.response.use(res => {
	if (res && res.data) {
		return Promise.resolve(res.data);
	}
	return res.data;
}, err => {
	return Promise.resolve(err.response);
});

export const axios_get = (url, data = {}, msg = '接口异常', headers = {}) => {
	return axiosIns.get(url,{params:data,headers:headers,
		cancelToken: new CancelToken(c => {
			cancel = c
		})
	}).then(res => {
			let iRes = res && res.config ? res.data : res;
			if ((iRes && iRes.code === 10000) || iRes.code === '10000') {
				return Promise.resolve(iRes||{});
			} else if(iRes && iRes.code==30001 || iRes.code===20004){
        Toast.fail("登录失败，请重新登录！");
        return Promise.reject(iRes||{});
      } else {
        Toast.fail("接口异常，请联系管理员！");
				return Promise.resolve(iRes||{});
			}
		})
		.catch(err => {
			console.info(err.message || msg);
			return Promise.reject(err);
		});
};
export const axios_post = (url, data = {}, msg = '接口异常', headers) => {
	
	return axiosIns.post(url, data, headers,{
		cancelToken: new CancelToken(c => {
			cancel = c
		})
	}).then(res => {
		let iRes = res && res.config ? res.data : res;
		if(iRes&&iRes.code==60000){
      Toast.fail("接口异常，请联系管理员！");
      return Promise.reject(iRes);
    }else if(iRes&&iRes.code==30001 || iRes.code===20004){
      Toast.fail("登录失败，请重新登录！");
			return Promise.reject(iRes||{});
		} else if ((iRes && iRes.code === 10000) || iRes.code === '10000') {
			return Promise.resolve(iRes);
		} else {
      Toast.fail("登录失败，请重新登录！");
			return Promise.resolve(iRes);
		}
	}).catch(err => {
		console.info(err.message || msg);
		return Promise.reject(err);
	});
};
