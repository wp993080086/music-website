import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/elementUI'
import FN from './utils/public'
import MSG from './utils/info'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/init.css'
import './assets/css/base.css'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$baseUrl = process.env.VUE_APP_BASE_URL

Vue.prototype.$fn = FN

Vue.prototype.$info = MSG

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
