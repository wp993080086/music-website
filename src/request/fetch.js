import axios from 'axios'
import qs from 'qs'

const baseURL = process.env.VUE_APP_BASE_URL

axios.defaults.withCredentials = true

const RequestInfo = {
	count: 0,
	requestList: [],
	times: null,
	showLoading() {
		try {
			if (RequestInfo.count === 0) {
				RequestInfo.times = setTimeout(() => {
					console.log('等待时间超过500ms，开启Loading')
					LOADING.show()
					clearTimeout(RequestInfo.times)
					RequestInfo.times = null
				}, 500)
			}
			RequestInfo.count++
		} catch (error) {
			console.warn(error)
		}
	},
	hideLoading() {
		try {
			RequestInfo.count--
			if (RequestInfo.count <= 0) RequestInfo.count = 0
			if (RequestInfo.count === 0) {
				LOADING.hide()
				RequestInfo.times && clearTimeout(RequestInfo.times)
				RequestInfo.times = null
			}
		} catch (error) {
			console.warn(error)
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
		if (!config.notLoad) {
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
		// console.log(res.data)
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
				TOAST.error('服务器不堪重负跑路了')
				break
			case 404:
				TOAST.error('接口不存在')
				break
			default:
				TOAST.error(errorResponse.data.message, 3)
			}
			return Promise.reject(errorResponse)
		}	catch (e) {
			TOAST.error('哦豁，网络开小差啦 ~')
			const ORRER = new Error('哦豁，网络开小差啦 ~')
			return Promise.reject(ORRER)
		}
	}
)

export default instance
