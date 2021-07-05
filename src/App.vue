<template>
	<div v-cloak id="app">
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>

export default {
	name: 'App'
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
