import HTTP from '../request/api/pathApi'

export default {
	methods: {
		/**
		* 获取歌曲url
		* @param {String} songId 类型
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
		}
	}
}
