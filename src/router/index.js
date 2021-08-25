import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '@/view/login'),
		meta: {
			title: '登录',
			auth: false
		}
	},
	{
		path: '/signin',
		name: 'Signin',
		component: () => import(/* webpackChunkName: "signin" */ '@/view/signin'),
		meta: {
			title: '注册',
			auth: false
		}
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import(/* webpackChunkName: "index" */ '@/view/index'),
		mate: {
			title: '首页',
			auth: false
		}
	},
	{
		path: '/songlist',
		name: 'SongList',
		component: () => import(/* webpackChunkName: "songList" */ '@/view/songList'),
		meta: {
			title: '排行榜',
			auth: false
		}
	},
	{
		path: '/topList',
		name: 'TopList',
		component: () => import(/* webpackChunkName: "topList" */ '@/view/topList'),
		meta: {
			title: '歌单',
			auth: false
		}
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
