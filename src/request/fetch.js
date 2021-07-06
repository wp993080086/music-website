import axios from 'axios'
import qs from 'qs'
import router from '../router'
import MSG from '../utils/info'

const baseURL = process.env.VUE_APP_BASE_URL

axios.defaults.withCredentials = true

// axios实例
const instance = axios.create({
	// 请求超时时间
	timeout: 30 * 1000,

	// 通用headers
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	withCredentials: true,
	// 项目baseURL
	baseURL
})

// 请求拦截器
instance.interceptors.request.use(config => {
	if (
		config.method === 'post' &&
		config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
	) {
		// 当请求的header为application/x-www-form-urlencoded，请求方式为post时，序列化data
		config.data = qs.stringify(config.data)
	}
	return config
}, err => {
	return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(
	res => {
		if (res.data.code === 200) {
			return res.data
		} else {
			MSG.alert(res.data.message)
			console.warn(res.data)
		}
	},
	error => {
		// 请求失败
		console.log(error)
		const errorResponse = error.response
		const status = errorResponse.status * 1
		switch (status) {
		case 500:
			MSG.info('服务端出错，请联系管理员', 2)
			break
		case 404:
			MSG.info('参数错误，或者api接口不存在', 2)
			break
		case 403:
			MSG.info('您尚未登录或者登录已失效', 2)
			router.push('/login')
			break
		}
		return Promise.reject(errorResponse)
	}
)

export default instance
