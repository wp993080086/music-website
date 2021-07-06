import fetch from '../fetch'
import timeStamp from '../../utils/public'

export default {
	apis: {
		phone_login: '/login/cellphone',
		get_key: '/login/qr/key',
		get_qrcode: '/login/qr/create',
		check_qrcode: '/login/qr/check'
	},
	/**
	* 手机号码登录
	* @param {String} phone 账号
	* @param {String} password 密码
	*/
	phoneLogin(param) {
		return fetch({
			url: timeStamp.joinTime(this.apis.phone_login),
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
		return fetch({
			url: timeStamp.joinTime(this.apis.get_key),
			method: 'post',
			data: {}
		})
	},
	/**
	* 生成二维码
	* @param {String} key key值
	*/
	getQRcode(key) {
		return fetch({
			url: timeStamp.joinTime(this.apis.get_qrcode),
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
		return fetch({
			url: timeStamp.joinTime(this.apis.check_qrcode),
			method: 'post',
			data: {
				key
			}
		})
	}
}
