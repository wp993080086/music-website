import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import('@/view/index'),
		mate: {
			title: '首页'
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/view/login'),
		mate: {
			title: '登录'
		}
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
