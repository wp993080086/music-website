import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/player'
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import('@/view/index'),
		mate: {
			title: '首页',
			auth: false
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/view/login'),
		meta: {
			title: '登录',
			auth: false
		}
	},
	{
		path: '/signin',
		name: 'Signin',
		component: () => import('@/view/signin'),
		meta: {
			title: '注册',
			auth: false
		}
	},
	{
		path: '/player',
		name: 'Player',
		component: () => import('@/components/player'),
		meta: {
			title: '播放',
			auth: false
		}
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
