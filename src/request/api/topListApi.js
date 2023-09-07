import Request from '../request'

export default {
	apis: {
		topList: '/toplist', // 获取所有榜单
		songListDetail: '/playlist/detail' // 歌单详情
	},
	/**
	* 获取所有榜单
	*/
	topList() {
		return Request({
			url: UTILS.joinTime(this.apis.topList),
			method: 'post',
			data: {}
		})
	},
	/**
	* 歌单详情
	* @param {String} id 歌单id
	* @param {String} s 歌单最近的收藏者，默认为8
	*/
	getSongListDetail(id, s = 10) {
		return Request({
			url: UTILS.joinTime(this.apis.songListDetail),
			method: 'post',
			data: {
				id,
				s
			}
		})
	}
}
