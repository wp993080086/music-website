import fetch from '../fetch'

export default {
	apis: {
		highqualitySongList: '/top/playlist/highquality', // 获取精品歌单
		songListDetail: '/playlist/detail', // 获取歌单详情
		songListComment: '/comment/playlist', // 歌单评论
		songListRelated: '/related/playlist', // 相关歌单推荐
		songListSubscribers: '/playlist/subscribers', // 歌单收藏者
		songDatails: '/song/detail' // 获取歌曲详情
	},
	/**
	* 获取精品歌单
	* @param {String} cat 类型
	* @param {Number} limit 每页数量
	*/
	highqualitySongList(limit = 18, cat = '') {
		return fetch({
			url: UTILS.joinTime(this.apis.highqualitySongList),
			method: 'post',
			data: {
				limit,
				cat
			},
			notLoad: true
		})
	},
	/**
	* 获取歌单详情
	* @param {String} id 歌单id
	* @param {Number} s 该歌单的收藏者个数
	*/
	songListDetail(id, s = 8) {
		return fetch({
			url: UTILS.joinTime(this.apis.songListDetail),
			method: 'post',
			data: {
				id,
				s
			},
			notLoad: true
		})
	}
}
