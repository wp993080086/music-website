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
		path: '/topList',
		name: 'TopList',
		component: () => import(/* webpackChunkName: "topList" */ '@/view/topList'),
		meta: {
			title: '排行榜',
			auth: false
		}
	},
	{
		path: '/songlist',
		name: 'SongList',
		component: () => import(/* webpackChunkName: "songList" */ '@/view/songList'),
		meta: {
			title: '歌单',
			auth: false
		}
	},
	{
		path: '/songListDetails:id',
		name: 'SongListDetails',
		component: () => import(/* webpackChunkName: "songListDetails" */ '@/view/songListDetails'),
		props: true,
		meta: {
			title: '歌单详情',
			auth: false
		}
	},
	{
		path: '/singer',
		name: 'Singer',
		component: () => import(/* webpackChunkName: "singer" */ '@/view/singer'),
		meta: {
			title: '歌手',
			auth: false
		}
	},
	{
		path: '/singerDetails:id',
		name: 'SingerDetails',
		component: () => import(/* webpackChunkName: "singerDetails" */ '@/view/singerDetails'),
		props: true,
		meta: {
			title: '歌手详情',
			auth: false
		}
	},
	{
		path: '/mv',
		name: 'Mv',
		component: () => import(/* webpackChunkName: "mv" */ '@/view/mv'),
		meta: {
			title: 'MV',
			auth: false
		}
	},
	{
		path: '/mvDetails',
		name: 'MvDetails',
		component: () => import(/* webpackChunkName: "MvDetails" */ '@/view/mvDetails'),
		meta: {
			title: 'MV详情',
			auth: false
		}
	},
	{
		path: '/searchDetails:id',
		name: 'SearchDetails',
		component: () => import(/* webpackChunkName: "SearchDetails" */ '@/view/searchDetails'),
		props: true,
		meta: {
			title: '搜索详情',
			auth: false
		}
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
