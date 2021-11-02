export default {
	// 设置用户信息
	setUserMsg(state, val) {
		state.userMsg = val
		if (!sessionStorage.getItem('userMsg')) {
			sessionStorage.setItem('userMsg', JSON.stringify(state.userMsg))
		}
	},
	// 清除用户信息
	clearUserMsg(state) {
		state.cookie = null
		state.token = null
		state.userMsg = {}
		document.cookie = ''
		sessionStorage.removeItem('userCookie')
		sessionStorage.removeItem('userToken')
		sessionStorage.removeItem('userMsg')
	},
	// 设置Cookie
	setCookie(state, val) {
		state.cookie = val
		if (!sessionStorage.getItem('userCookie')) {
			sessionStorage.setItem('userCookie', state.cookie)
		}
	},
	// 设置Token
	setToken(state, val) {
		state.token = val
		if (!sessionStorage.getItem('userToken')) {
			sessionStorage.setItem('userToken', state.token)
		}
	},
	// 隐藏显示播放器
	setPlayState(state) {
		state.isShowPlay = !state.isShowPlay
	},
	/**
	* 设置歌曲信息
	* @param {Number} id id
	* @param {Number} name 歌名
	* @param {Number} img 图片
	* @param {Number} singer 歌手
	* @param {Number} path 路径
	*/
	setSongInfo(state, param) {
		state.songInfo = param
	},
	// 添加歌曲列表
	setSongList(state, param) {
		const bool = state.songList.some((item) => {
			return item.id === param.id
		})
		if (!bool) state.songList.push(param)
		sessionStorage.setItem('songList', JSON.stringify(state.songList))
	},
	// 如果有缓存就用缓存
	handleReplaceSongList(state, param) {
		state.songList = param
		if (!state.songInfo || !state.songInfo.id) {
			state.songInfo = param[0]
			state.isShowPlay = true
		}
	}
}
