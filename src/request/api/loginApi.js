import Request from '../request'

export default {
	apis: {
		phone_login: '/login/cellphone',
		get_key: '/login/qr/key',
		get_qrcode: '/login/qr/create',
		check_qrcode: '/login/qr/check',
		signin: '/register/cellphone',
		sendCaptcha: '/captcha/sent',
		getInfo: '/user/account'
	},
	/**
	* 手机号码登录
	* @param {String} phone 账号
	* @param {String} password 密码
	*/
	phoneLogin(param) {
		return Request({
			url: UTILS.joinTime(this.apis.phone_login),
			method: 'post',
			data: {
				...param
			}
		})
	},
	/**
	* 生成二维码key
	*/
	getKey() {
		return Request({
			url: UTILS.joinTime(this.apis.get_key),
			method: 'post',
			data: {}
		})
	},
	/**
	* 生成二维码
	* @param {String} key key值
	*/
	getQRcode(key) {
		return Request({
			url: UTILS.joinTime(this.apis.get_qrcode),
			method: 'post',
			data: {
				key
			}
		})
	},
	/**
	* 查询二维码是否扫描
	* @param {String} key key值
	*/
	queryQRcode(key) {
		return Request({
			url: UTILS.joinTime(this.apis.check_qrcode),
			method: 'post',
			data: {
				key
			},
			notLoad: true
		})
	},
	/**
	* 发送验证码
	* @param {String} phone 手机号码
	*/
	sendCaptcha(phone) {
		return Request({
			url: UTILS.joinTime(this.apis.sendCaptcha),
			method: 'post',
			data: {
				phone
			}
		})
	},
	/**
	* 注册&修改密码
	* @param {String} nickname 昵称
	* @param {String} phone 手机号码
	* @param {String} password 密码
	* @param {String} captcha 验证码
	*/
	signin(param) {
		return Request({
			url: UTILS.joinTime(this.apis.signin),
			method: 'post',
			data: {
				...param
			}
		})
	},
	/**
	* 获取用户信息
	*/
	getInfo() {
		return Request({
			url: UTILS.joinTime(this.apis.getInfo),
			method: 'post'
		})
	}
}
