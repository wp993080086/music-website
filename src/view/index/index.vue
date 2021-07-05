<template>
	<div id="index">
		<Head />
	</div>
</template>

<script>
import Head from '../../components/head'
import HTTP from '../../request/api/loginApi'

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
	mounted() {
		this.getMusicList()
	},
	methods: {
		console() {
			console.log(this.$baseUrl)
		},
		async getMusicList() {
			const res = await HTTP.phoneLogin('18707194966', 993080086)
			console.log(res)
		}
	}
}
</script>

<style lang="less" scoped></style>
