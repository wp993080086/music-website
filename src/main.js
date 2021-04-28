import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FN from './utils/public'
import './plugins/elementUI'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/init.css'
import './assets/css/base.css'

Vue.config.productionTip = false

const baseUrl = process.env.VUE_APP_BASE_URL

Vue.prototype.$baseUrl = baseUrl

Vue.prototype.$FN = FN

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
