import fetch from '../fetch'

export default {
	apis: {
		getSongUrl: '/song/url', // 获取音乐url
		getCheckMusic: '/check/music', // 音乐是否可用
		getLogin: '/login/status', // 登录状态
		getUserDetails: '/user/detail' // 获取用户详情
	},
	/**
	* 获取音乐url
	* @param {String} id id
	*/
	getSongUrl(id) {
		return fetch({
			url: UTILS.joinTime(this.apis.getSongUrl),
			method: 'post',
			data: {
				id
			}
		})
	},
	/**
	* 音乐是否可用
	* @param {String} id id
	*/
	getCheckMusic(id) {
		return fetch({
			url: UTILS.joinTime(this.apis.getCheckMusic),
			method: 'post',
			data: {
				id
			}
		})
	},
	/**
	* 获取登录状态
	*/
	getLogin() {
		return fetch({
			url: UTILS.joinTime(this.apis.getLogin),
			method: 'post'
		})
	},
	/**
	* 获取用户详情
	* @param {String} uid id
	*/
	getUserDetails(uid) {
		return fetch({
			url: UTILS.joinTime(this.apis.getLogin),
			method: 'post',
			data: {
				uid
			}
		})
	}
}
