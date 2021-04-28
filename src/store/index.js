import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		school: '清华大学',
		a: 'nice',
		zoom: true// 菜单是否折叠
	},
	getters: {
		returnVal(state) {
			return state.school + state.a
		}
	},
	mutations: {
		changeSchool(state, val) {
			state.school = val
			console.log('修改成功')
		}
	},
	actions: {},
	modules: {}
})
