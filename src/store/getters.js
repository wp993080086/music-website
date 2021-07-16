export default {
	// 获取Cookie
	getCookie(state) {
		return state.cookie
	},
	// 获取Token
	getToken(state) {
		return (val) => {
			return val + state.cookie
		}
	}
}
