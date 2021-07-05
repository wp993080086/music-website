import fetch from './fetch'
import timeStamp from '../utils/public'

export default {
	apis: {
		// 搜索音乐
		get_courseList: `search?`
	},
	/**
	* 搜索音乐
	* @param {String} keywords 搜索条件
	*/
	getMusicList(keywords) {
		return fetch({
			url: timeStamp.joinTime(this.apis.get_courseList),
			method: 'post',
			data: {
				keywords
			}
		})
	}
}
