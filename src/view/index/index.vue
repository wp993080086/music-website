<template>
	<div id="index">
		<Head />
		<Footer />
	</div>
</template>

<script>
import Head from '../../components/head'
import Footer from '../../components/footer'

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
	created() {},
	mounted() {},
	methods: {
		console() {}
	}
}
</script>

<style lang="less" scoped></style>
