import fetch from '../fetch'

export default {
	apis: {
		getSongUrl: '/song/url', // 获取音乐url
		getCheckMusic: '/check/music', // 音乐是否可用
		getLogin: '/login/status', // 登录状态
		getUserDetails: '/user/detail', // 获取用户详情
		comment: '/comment', // 评论
		lyric: '/lyric' // 获取歌词
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
	},
	/**
	* 发送评论
	* @param {String} content 评论内容
	* @param {String} type 0: 歌曲 1: mv 2: 歌单
	* @param {String} id id
	* @param {String} t 1 发送, 2 回复
	*/
	sendComment(id, type, content, t = 1) {
		return fetch({
			url: UTILS.joinTime(this.apis.comment),
			method: 'post',
			data: {
				t,
				type,
				content,
				id
			}
		})
	},
	/**
	* 获取歌词
	* @param {String} id 歌曲id
	*/
	getLyric(id) {
		return fetch({
			url: UTILS.joinTime(this.apis.lyric),
			method: 'post',
			data: {
				id
			},
			notLoad: true
		})
	}
}
