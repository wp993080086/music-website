import fetch from '../fetch'

export default {
	apis: {
		singerList: '/artist/list' // 歌手分类列表
	},
	/**
	* 歌手分类列表
	* @param {String} type 歌手类型 -1：全部 1：男歌手 2：女歌手 3：乐队
	* @param {Number} area 地区 -1：全部 7：华语 96：欧美 8：日本 16：韩国 0：其他
	* @param {String} initial 歌手首字母
	* @param {Number} limit 每页数量 默认30
	* @param {Number} offset 页码 默认0
	*/
	singerList(param) {
		return fetch({
			url: UTILS.joinTime(this.apis.singerList),
			method: 'post',
			data: {
				...param
			},
			notLoad: true
		})
	}
}
