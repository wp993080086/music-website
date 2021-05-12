<template>
	<div id="index">
		<Head />
		<div style="height:1000px;">1</div>
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
	created() {
		console.log(process.env.NODE_ENV)
	},
	mounted() {
		this.console()
	},
	methods: {
		console() {
			console.log(this.$baseUrl)
		}
	}
}
</script>

<style lang="less" scoped></style>
