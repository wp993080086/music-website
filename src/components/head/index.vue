<template>
	<div id="head" class="pr flex_c">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="用户管理" name="first"></el-tab-pane>
			<el-tab-pane label="配置管理" name="second"></el-tab-pane>
			<el-tab-pane label="角色管理" name="third"></el-tab-pane>
			<el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	name: 'Head',
	components: {},
	props: [],
	data() {
		return {
			logo: require('../../assets/icon/pdd.png'),
			activeName: 'first'
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		handleClick() {},
		changeTheme() {
			document.documentElement.style.setProperty('--themeColor', '#e33100')
		}
	}
}
</script>

<style lang='less' scoped>
@import '../../assets/css/globalColor.less';
	#head{
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #dcdfe6;
		box-sizing: border-box;
	}
</style>
