import HTTP from '../request/api/pathApi'

export default {
	methods: {
		/**
		* 获取歌曲url
		* @param {String} songId 类型
		*/
		async getSongUrl(songId) {
			this.$info.loading()
			try {
				await this.$fn.sleep(500)
				const res = await HTTP.getSongUrl(songId)
				this.$info.loading(false)
				if (res.code === 200) {
					return Promise.resolve(res.data)
				} else {
					return false
				}
			} catch (error) {
				this.$info.loading(false)
				console.warn(error)
			}
		}
	}
}
