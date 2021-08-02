import fetch from '../fetch'

export default {
	apis: {
		// 搜索音乐
		get_search: `search`
	},
	/**
	* 搜索音乐
	* @param {String} keywords 搜索条件
	*/
	search(keywords) {
		return fetch({
			url: UTILS.joinTime(this.apis.get_search),
			method: 'post',
			data: {
				keywords
			}
		})
	}
}
