import HTTP from '../request/api/pathApi'

export default {
	methods: {
		/**
		* 获取歌曲url
		* @param {String} songId id
		*/
		async getSongUrl(songId) {
			try {
				await UTILS.sleep(500)
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
				await UTILS.sleep(500)
				const res = await HTTP.getCheckMusic(songId)
				if (res.code === 200) {
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
