import fetch from '../fetch'

export default {
	apis: {
		getSongUrl: '/song/url', // 获取音乐url
		getCheckMusic: '/check/music' // 音乐是否可用
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
	}
}
