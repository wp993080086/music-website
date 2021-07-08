import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cookie: null,
		token: null,
		userMsg: null
	},
	getters: {
		getCookie(state) {
			return state.cookie
		}
	},
	mutations: {
		setUserMsg(state, val) {
			state.userMsg = val
		},
		setCookie(state, val) {
			state.cookie = val
		},
		setToken(state, val) {
			state.token = val
		}
	},
	actions: {},
	modules: {}
})
