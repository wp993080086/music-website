<template>
	<div id="index">
		<Head />
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

<style lang="less" scoped></style>
