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
		}
	}
}
