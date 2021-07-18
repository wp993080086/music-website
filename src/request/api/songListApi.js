import fetch from '../fetch'
import timeStamp from '../../utils/public'

export default {
	apis: {
		highqualitySongList: '/top/playlist/highquality' // 获取精品歌单
	},
	/**
	* 获取精品歌单
	* @param {String} cat 类型
	* @param {Number} limit 每页数量
	*/
	highqualitySongList(cat = '', limit = 18) {
		return fetch({
			url: timeStamp.joinTime(this.apis.highqualitySongList),
			method: 'post',
			data: {
				cat,
				limit
			}
		})
	}
}