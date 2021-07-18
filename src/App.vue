<template>
	<div v-cloak id="app">
		<Head />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<Footer />
	</div>
</template>

<script>
import Head from './components/head'
import Footer from './components/footer'

export default {
	name: 'App',
	components: {
		Head,
		Footer
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
