<template>
	<div v-cloak id="app">
		<!-- 导航栏 -->
		<Head v-if="showNav" />
		<!-- 视图 -->
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<!-- 播放器 -->
		<Player v-if="showNav" />
		<!-- 页脚 -->
		<Footer v-if="showNav" />
	</div>
</template>

<script>
import Head from './components/head'
import Footer from './components/footer'
import Player from './components/player'

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
			]
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
