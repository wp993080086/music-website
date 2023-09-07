import Request from '../request'

export default {
	apis: {
		mvList: '/mv/all', // 全部mv
		mvURL: '/mv/url', // mv地址
		mvDetail: '/mv/detail', // 获取mv数据
		mvComment: '/comment/mv', // mv评论
		mvSimilar: '/simi/mv' // 相似mv
	},
	/**
	* 全部mv
	* @param {String} type 类型 全部 || 官方版 || 原生 || 现场版 || 网易出品 默认全部
	* @param {Number} area 地区 全部 || 内地 || 港台 || 欧美 || 日本 || 韩国 默认全部
	* @param {String} order 排序 上升最快 || 最热 || 最新 || 默认上升最快
	* @param {Number} limit 每页数量 默认30
	* @param {Number} offset 页码 默认0
	*/
	mvList(param) {
		return Request({
			url: UTILS.joinTime(this.apis.mvList),
			method: 'post',
			data: {
				...param
			},
			notLoad: true
		})
	},
	/**
	* mv地址
	* @param {Number} id id
	* @param {Number} r 分辨率
	*/
	mvURL(id) {
		return Request({
			url: UTILS.joinTime(this.apis.mvURL),
			method: 'post',
			data: {
				id
			},
			notLoad: true
		})
	},
	/**
	* 获取mv数据
	* @param {Number} mvid id
	*/
	mvDetail(mvid) {
		return Request({
			url: UTILS.joinTime(this.apis.mvDetail),
			method: 'post',
			data: {
				mvid
			},
			notLoad: true
		})
	},
	/**
	* 相似mv
	* @param {Number} mvid id
	*/
	mvSimilar(mvid) {
		return Request({
			url: UTILS.joinTime(this.apis.mvSimilar),
			method: 'post',
			data: {
				mvid
			},
			notLoad: true
		})
	},
	/**
	* mv评论
	* @param {Number} id id
	* @param {Number} limit 每页数量
	* @param {Number} offset 页数
	* @param {Number} before 分页参数：取上一页最后一项的time获取下一页数据（获取超过5000条评论的时候需要用到）
	*/
	mvComment(param) {
		return Request({
			url: UTILS.joinTime(this.apis.mvComment),
			method: 'post',
			data: {
				...param
			},
			notLoad: true
		})
	}
}
