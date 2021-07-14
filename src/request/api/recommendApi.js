import fetch from '../fetch'
import timeStamp from '../../utils/public'

export default {
	apis: {
		banner: '/banner',
    topList: '/toplist'
	},
	/**
	* 获取banner图
	* @param {Number} type 类型
	*/
	banner(type = 0) {
		return fetch({
			url: timeStamp.joinTime(this.apis.banner),
			method: 'post',
			data: {
				type
			}
		})
	},
  /**
	* 获取所有榜单
	*/
	topList() {
		return fetch({
			url: timeStamp.joinTime(this.apis.topList),
			method: 'post',
			data: {}
		})
	}
}
