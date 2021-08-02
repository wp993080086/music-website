import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/elementUI'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/init.css'
import './assets/css/base.css'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$baseUrl = process.env.VUE_APP_BASE_URL

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
