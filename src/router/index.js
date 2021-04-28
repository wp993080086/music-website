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
		component: () => import('@/view/index')
	},
	{
		path: '/head',
		name: 'Head',
		component: () => import('@/view/head')
	},
	{
		path: '/footer',
		name: 'Footer',
		component: () => import('@/view/footer')
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
