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
		component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
		meta: {
			title: '登录',
			auth: false
		}
	},
	{
		path: '/signin',
		name: 'Signin',
		component: () => import(/* webpackChunkName: "signin" */ '@/views/signin'),
		meta: {
			title: '注册',
			auth: false
		}
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import(/* webpackChunkName: "index" */ '@/views/index'),
		mate: {
			title: '首页',
			auth: false
		}
	},
	{
		path: '/topList',
		name: 'TopList',
		component: () => import(/* webpackChunkName: "topList" */ '@/views/topList'),
		meta: {
			title: '排行榜',
			auth: false
		}
	},
	{
		path: '/songlist',
		name: 'SongList',
		component: () => import(/* webpackChunkName: "songList" */ '@/views/songList'),
		meta: {
			title: '歌单',
			auth: false
		}
	},
	{
		path: '/songListDetails:id',
		name: 'SongListDetails',
		component: () => import(/* webpackChunkName: "songListDetails" */ '@/views/songListDetails'),
		props: true,
		meta: {
			title: '歌单详情',
			auth: false
		}
	},
	{
		path: '/singer',
		name: 'Singer',
		component: () => import(/* webpackChunkName: "singer" */ '@/views/singer'),
		meta: {
			title: '歌手',
			auth: false
		}
	},
	{
		path: '/singerDetails:id',
		name: 'SingerDetails',
		component: () => import(/* webpackChunkName: "singerDetails" */ '@/views/singerDetails'),
		props: true,
		meta: {
			title: '歌手详情',
			auth: false
		}
	},
	{
		path: '/mv',
		name: 'Mv',
		component: () => import(/* webpackChunkName: "mv" */ '@/views/mv'),
		meta: {
			title: 'MV',
			auth: false
		}
	},
	{
		path: '/mvDetails',
		name: 'MvDetails',
		component: () => import(/* webpackChunkName: "MvDetails" */ '@/views/mvDetails'),
		meta: {
			title: 'MV详情',
			auth: false
		}
	},
	{
		path: '/searchDetails:keyword',
		name: 'SearchDetails',
		component: () => import(/* webpackChunkName: "SearchDetails" */ '@/views/searchDetails'),
		props: true,
		meta: {
			title: '搜索详情',
			auth: false
		}
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes,
	// 按左上角返回时滚动位置还原
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			setTimeout(() => {
				window.scrollTo({
					left: savedPosition.x,
					top: savedPosition.y,
					behavior: 'smooth'
				})
			}, 500)
		} else {
			return { x: 0, y: 0 }
		}
	}
})

export default router
