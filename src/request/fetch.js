import axios from 'axios'
import qs from 'qs'
import MSG from '../utils/info'

const baseURL = process.env.VUE_APP_BASE_URL

axios.defaults.withCredentials = true

const RequestInfo = {
	count: 0,
	requestList: [],
	times: null,
	showLoading() {
		if (RequestInfo.count === 0) {
			console.log('开启计时器')
			RequestInfo.times = setTimeout(() => {
				MSG.loading()
				clearTimeout(RequestInfo.times)
				RequestInfo.times = null
			}, 200)
		}
		RequestInfo.count++
	},
	hideLoading() {
		RequestInfo.count--
		if (RequestInfo.count <= 0) RequestInfo.count = 0
		if (RequestInfo.count === 0) {
			MSG.loading(false)
			RequestInfo.times && clearTimeout(RequestInfo.times)
			RequestInfo.times = null
		}
	}
}

// axios实例
const instance = axios.create({
	timeout: 10 * 1000,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	baseURL
})

// 请求拦截器
instance.interceptors.request.use(
	config => {
		if (config.method === 'post') {
			config.data = qs.stringify(config.data)
		}
		console.log(config.notLoad)
		if (config.notLoad) {
			console.log('不显示loading')
		} else {
			RequestInfo.showLoading()
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 响应拦截器
instance.interceptors.response.use(
	res => {
		console.log(res.data)
		RequestInfo.hideLoading()
		return res.data
	},
	error => {
		// 请求失败
		RequestInfo.hideLoading()
		try {
			const errorResponse = error.response
			const status = (errorResponse.status || 0) * 1
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
		}	catch (e) {
			MSG.info('哦豁，网络开小差啦 ~', 3)
			const ORRER = new Error('哦豁，网络开小差啦 ~')
			return Promise.reject(ORRER)
		}
	}
)

export default instance
