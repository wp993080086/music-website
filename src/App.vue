<template>
	<div v-cloak id="app">
		<router-view />
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
</style>
