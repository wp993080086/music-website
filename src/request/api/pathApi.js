import fetch from '../fetch'
import timeStamp from '../../utils/public'

export default {
	apis: {
		getSongUrl: '/song/url' // 获取音乐url
	},
	/**
	* 获取音乐url
	* @param {String} id 类型
	*/
	getSongUrl(id) {
		return fetch({
			url: timeStamp.joinTime(this.apis.getSongUrl),
			method: 'post',
			data: {
				id
			}
		})
	}
}
