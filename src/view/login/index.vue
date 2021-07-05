<template>
	<div id="login">
		<div class="main pr">
			<div class="content pa">
				<el-tabs v-model="active" @tab-click="handleClick">
					<el-tab-pane label="账号登录" name="user">
						<div>111</div>
					</el-tab-pane>
					<el-tab-pane label="二维码登录" name="qrcode">
						<div>222</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			active: 'user'
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
		}
	}
}
</script>

<style lang='less' scoped>
#login{
	width: 100%;
	height: 100%;
	.main{
		width: 800px;
		height: 600px;
		top: 100px;
		left: 50%;
		margin-left: -400px;
		.content{
			width: 400px;
			height: 300px;
			top: 200px;
			left: 200px;
		}
	}
}
</style>
