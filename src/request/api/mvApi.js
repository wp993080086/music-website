import fetch from '../fetch'

export default {
	apis: {
		mvList: '/mv/all' // 全部mv
	},
	/**
	* 歌手分类列表
	* @param {String} type 类型 全部 || 官方版 || 原生 || 现场版 || 网易出品 默认全部
	* @param {Number} area 地区 全部 || 内地 || 港台 || 欧美 || 日本 || 韩国 默认全部
	* @param {String} order 排序 上升最快 || 最热 || 最新 || 默认上升最快
	* @param {Number} limit 每页数量 默认30
	* @param {Number} offset 页码 默认0
	*/
	mvList(param) {
		return fetch({
			url: UTILS.joinTime(this.apis.mvList),
			method: 'post',
			data: {
				...param
			},
			notLoad: true
		})
	}
}
