<template>
	<div v-cloak id="app" class="app_box">
		<!-- 导航栏 -->
		<Head v-if="showNav" />
		<!-- 视图 -->
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<!-- 播放器 -->
		<Player v-if="showNav" />
		<!-- 页脚 -->
		<Footer v-if="showNav" :style="{opacity: opacityVal}" />
		<el-backtop target=".app_box" :bottom="100">
			<i class="iconfont pdd-hj h_hand" style="font-size:24px;" title="回到顶部" />
		</el-backtop>
	</div>
</template>

<script>
import Head from './components/head'
import Footer from './components/footer'
import Player from './components/player'
import { mapMutations } from 'vuex'

export default {
	name: 'App',
	components: {
		Head,
		Footer,
		Player
	},
	data() {
		return {
			showNav: true,
			special: [
				'Login',
				'Signin'
			],
			opacityVal: 0
		}
	},
	watch: {
		$route(to, from) {
			if (to.meta.title) {
				document.title = to.meta.title
			} else {
				document.title = '推荐音乐'
			}
			if (this.special.includes(to.name)) {
				this.showNav = false
			} else {
				this.showNav = true
			}
		}
	},
	async mounted() {
		const userCookie = sessionStorage.getItem('userCookie')
		const userToken = sessionStorage.getItem('userToken')
		const userMsg = sessionStorage.getItem('userMsg')
		userCookie && this.setCookie(userCookie)
		userToken && this.setToken(userToken)
		userMsg && this.setUserMsg(JSON.parse(userMsg))
		await UTILS.sleep(2000)
		this.opacityVal = 1
	},
	methods: {
		...mapMutations([
			'setUserMsg',
			'setCookie',
			'setToken'
		])
	}
}
</script>

<style>
[v-cloak] {
  display: none !important;
}
body,html,#app{
	font-family: '宋体';
	width: 100%;
	height: 100%;
	min-width: 1200px;
	background-color: #f9f9f9;
}
#app{
	overflow-y: scroll;
}
::-webkit-scrollbar {
	width: 4px;
	height: 4px;
}
::-webkit-scrollbar-thumb {
	background-color: #07c160;
	border-radius: 2px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
