<template>
	<div id="head">
		<div class="box">
			<button @click="changeTheme('dark')">换黑色</button>
			<button @click="changeTheme('bright')">换金色</button>
			<button @click="changeTheme('red')">换红色</button>
		</div>
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
			title: '鹏多多的音乐盒',
			theme: 'theme_a'
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		changeTheme(key) {
			const colorList = {
				dark: '#000000',
				bright: '#ffb515',
				red: '#e33100'
			}
			document.documentElement.style.setProperty('--themeColor', colorList[key])
		}
	}
}
</script>

<style lang='less' scoped>
@import '../../assets/css/changeColor.less';
	#head{
		width: 100%;
		.box{
			width: 100%;
			height: 50px;
			background-color:@bg_theme;
			border-bottom: 1px solid @bg_theme;
			button{
				width: 50px;
				height: 50px;
				margin-right: 50px;
			}
		}
	}
</style>
