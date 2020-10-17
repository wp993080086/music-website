import axios from "axios";
import qs from "qs";
import baseURL from "./baseURL";
import {Message} from 'element-ui'
import router from "../router";

axios.defaults.withCredentials=true;

// axios实例
const instance = axios.create({
	// 请求超时时间
	timeout: 30 * 1000,

	// 通用headers
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
	},
	withCredentials: true,
	// 项目baseURL
	baseURL
});

// 请求拦截器
instance.interceptors.request.use(config => {
		console.log(config)
		if (
			config.method === "post" &&
			config.headers["Content-Type"] === "application/x-www-form-urlencoded"
		) {
			// 当请求的header为application/x-www-form-urlencoded，请求方式为post时，需要序列化data
			config.data = qs.stringify(config.data);
		}
		return config;
	}, err => {
		return Promise.reject(err);
	});

// 响应拦截器
instance.interceptors.response.use(
	res => {
		// 请求成功，status为2xx
		return res.data;
	},

	error => {
		// 请求失败
		console.log(error)
		const errorResponse = error.response;
		const status = errorResponse.status;
		switch (status) {
			case 500:
				Message({
					type: 'error',
					message: '服务端出错，请联系管理员'
				})
				break;
			case 404:
				Message({
					type: 'error',
					message: '服务端出错，api请求接口不存在'
				})
				break;
			case 403:
				Message({
					type: 'error',
					message: '尚未登录或者登录已失效'
				})
				router.push('/login')
				break;
		}
		return Promise.reject(errorResponse);
	}
);

export default instance;