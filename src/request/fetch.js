import axios from 'axios'
import qs from 'qs'
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
		return res.data
	},
	error => {
		// 请求失败
		const errorResponse = error.response
		const status = errorResponse.status * 1
		switch (status) {
		case 500:
			MSG.info('服务器不堪重负跑路了', 2)
			break
		case 404:
			MSG.info('接口不存在', 2)
			break
		default:
			MSG.info(errorResponse.data.message, 3)
		}
		return Promise.reject(errorResponse)
	}
)

export default instance
