import fetch from '../fetch'

export default {
	apis: {
		highqualitySongList: '/top/playlist/highquality', // 获取精品歌单
		songListDetail: '/playlist/detail', // 获取歌单详情
		songListComment: '/comment/playlist', // 歌单评论
		songListSubscribers: '/playlist/subscribers', // 歌单收藏者
		songDatails: '/song/detail', // 获取歌曲详情
		all: '/playlist/catlist'
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
	},
	/**
	* 获取歌单评论
	* @param {String} id 歌单id
	* @param {Number} limit 数量
	* @param {Number} offset 第几页
	* @param {Number} before 分页参数 取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
	*/
	songListComment(id, limit = 20, offset = 0) {
		return fetch({
			url: UTILS.joinTime(this.apis.songListComment),
			method: 'post',
			data: {
				id,
				limit,
				offset
			},
			notLoad: true
		})
	},
	/**
	* 歌单收藏者
	* @param {String} id 歌单id
	* @param {String} limit 每页数量
	* @param {String} offset 分页
	*/
	songListSubscribers(id, limit = 28, offset = 0) {
		return fetch({
			url: UTILS.joinTime(this.apis.songListSubscribers),
			method: 'post',
			data: {
				id,
				limit,
				offset
			},
			notLoad: true
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
	},
	/**
	* 歌单分类
	*/
	getALLListType() {
		return fetch({
			url: UTILS.joinTime(this.apis.all),
			method: 'post',
			notLoad: true
		})
	}
}
