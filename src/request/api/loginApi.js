import fetch from '../fetch'
import timeStamp from '../../utils/public'

export default {
	apis: {
		phone_login: '/login/cellphone'
	},
	/**
	* 手机号码登录
	* @param {String} phone 账号
	* @param {String} password 密码
	*/
	phoneLogin(phone, password) {
		return fetch({
			url: timeStamp.joinTime(this.apis.phone_login),
			method: 'post',
			data: {
				phone,
				password
			}
		})
	}
}
