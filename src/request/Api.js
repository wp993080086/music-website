import fetch from './fetch'
import baseServ from './baseServ'

export default {
	...baseServ,
	apis: {
		getNewsParticulars:'/app/parent/news/getDetail.app'// 获取新闻详情
	},
	/**
	* 获取新闻详情
	* @param {String} newsId 新闻ID
	* @param {String} userId 用户ID
	*/
	getNewsParticulars(newsId, userId){
		return fetch({
			url: this.apis.getNewsParticulars,
			method: 'post',
			data: {
				newsId,
				userId
			}
		})
	}
}