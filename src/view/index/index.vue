<template>
	<div id="index">
		<Head />
		<div style="height:1000px;">1</div>
		<Footer />
	</div>
</template>

<script>
import Head from '../head'
import Footer from '../footer'

export default {
	name: 'Index',
	components: {
		Head,
		Footer
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

<style lang="less" scoped>
  #index{
    height: 100%;
		padding-top: 60px;
  }
</style>
