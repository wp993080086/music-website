import fetch from '../fetch'

export default {
	apis: {
		get_search: `search`, // 搜索音乐
		songDatails: '/song/detail' // 获取歌曲详情
	},
	/**
	* 搜索音乐
	* @param {String} keywords 搜索条件
	*/
	search(keywords) {
		return fetch({
			url: UTILS.joinTime(this.apis.get_search),
			method: 'post',
			data: {
				keywords
			}
		})
	},
	/**
	* 获取歌曲详情
	* @param {String} ids 音乐id 多个用,隔开
	*/
	songDatails(ids) {
		return fetch({
			url: UTILS.joinTime(this.apis.songDatails),
			method: 'post',
			data: {
				ids
			},
			notLoad: true
		})
	}
}
