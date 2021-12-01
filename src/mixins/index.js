import HTTP from '../request/api/mixinsApi'

export default {
	methods: {
		/**
		* 获取歌曲url
		* @param {String} songId id
		*/
		async getSongUrl(songId) {
			try {
				const res = await HTTP.getSongUrl(songId)
				if (res.code === 200) {
					return Promise.resolve(res.data)
				} else {
					return false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		/**
		* 获取歌曲是否可用
		* @param {String} songId id
		*/
		async getCheckMusic(songId) {
			try {
				const res = await HTTP.getCheckMusic(songId)
				if (res.code === 200) {
					return Promise.resolve(res.data)
				} else {
					return false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		/**
		* 登录状态
		*/
		async getLoginType() {
			try {
				const res = await HTTP.getLogin()
				if (res.data.code === 200) {
					return Promise.resolve(res.data)
				} else {
					return false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		/**
		* 获取用户详情
		* @param {String} uid id
		*/
		async getUserDetails(uid) {
			try {
				const res = await HTTP.getUserDetails(uid)
				if (res.data.code === 200) {
					return Promise.resolve(res.data)
				} else {
					return false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		/**
		* 发送评论
		* @param {String} content 评论内容
		* @param {String} type 0: 歌曲 1: mv 2: 歌单
		* @param {String} id id
		* @param {String} t 1 发送, 2 回复
		*/
		async sendComment(id, type, content) {
			try {
				const res = await HTTP.sendComment(id, type, content)
				if (res.code === 200) {
					return Promise.resolve(res.comment)
				} else {
					return false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		/**
		* 获取歌词
		* @param {String} id 音乐id
		*/
		async getLyric(id) {
			try {
				const res = await HTTP.getLyric(id)
				if (res.code === 200) {
					return Promise.resolve(res)
				} else {
					return false
				}
			} catch (error) {
				console.warn(error)
			}
		}
	}
}
