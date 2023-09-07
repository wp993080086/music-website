import Request from '../request'

export default {
	apis: {
		getSearch: '/cloudsearch', // 搜索音乐
		songDatails: '/song/detail', // 获取歌曲详情
		similarSong: '/simi/song', // 获取相似音乐
		songComment: '/comment/music' // 歌曲评论
	},
	/**
	* 搜索音乐
	* @param {String} keywords 搜索条件
	* @param {String} limit 返回数量
	* @param {String} type 搜索类型 默认 1 定义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
	*/
	search(keywords, type, limit = 30) {
		return Request({
			url: UTILS.joinTime(this.apis.getSearch),
			method: 'post',
			data: {
				keywords,
				type,
				limit
			},
			notLoad: true
		})
	},
	/**
	* 获取歌曲详情
	* @param {String} ids 音乐id 多个用,隔开
	*/
	songDatails(ids) {
		return Request({
			url: UTILS.joinTime(this.apis.songDatails),
			method: 'post',
			data: {
				ids
			},
			notLoad: true
		})
	},
	/**
	* 获取相似音乐
	* @param {String} id 音乐id
	*/
	getSimilarSong(id) {
		return Request({
			url: UTILS.joinTime(this.apis.similarSong),
			method: 'post',
			data: {
				id
			},
			notLoad: true
		})
	},
	/**
	* 歌曲评论
	* @param {String} id 音乐id
	* @param {String} limit 每页数量
	* @param {String} offset 分页
	*/
	getSongComment(param) {
		return Request({
			url: UTILS.joinTime(this.apis.songComment),
			method: 'post',
			data: {
				...param
			},
			notLoad: true
		})
	}
}
