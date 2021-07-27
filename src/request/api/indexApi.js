import fetch from '../fetch'
import timeStamp from '../../utils/public'

export default {
	apis: {
		banner: '/banner', // banner图
		recommendSongList: '/personalized', // 推荐歌单
		recommendSong: '/personalized/newsong', // 推荐新音乐
		topSinger: '/top/artists', // 热门歌手
		highqualitySongList: '/top/playlist/highquality' // 获取精品歌单
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
			},
			notLoad: true
		})
	},
	/**
	* 推荐歌单
	* @param {Number} limit 数量
	*/
	recommendSongList(limit = 18) {
		return fetch({
			url: timeStamp.joinTime(this.apis.recommendSongList),
			method: 'post',
			data: {
				limit
			},
			notLoad: true
		})
	},
	/**
	* 推荐新音乐
	* @param {Number} limit 数量
	*/
	recommendSong(limit = 10) {
		return fetch({
			url: timeStamp.joinTime(this.apis.recommendSong),
			method: 'post',
			data: {
				limit
			},
			notLoad: true
		})
	},
	/**
	* 热门歌手
	* @param {Number} limit 数量
	*/
	topSinger(limit = 28) {
		return fetch({
			url: timeStamp.joinTime(this.apis.topSinger),
			method: 'post',
			data: {
				limit
			},
			notLoad: true
		})
	}
}
