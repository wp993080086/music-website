<template>
	<div id="index">
		<Head />
		<div class="test" @click="console">993080086</div>
	</div>
</template>

<script>
import Head from '../../components/head'

export default {
	name: 'Index',
	components: {
		Head
	},
	data() {
		return {
			title: 'hello world'
		}
	},
	created() {},
	mounted() {},
	methods: {
		console() {}
	}
}
</script>

<style lang="less" scoped>
	.test{
		width: 100%;
		height: 30px;
		background-color: gray;
	}
</style>
