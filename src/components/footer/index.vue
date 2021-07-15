<template>
	<div id="footer" class="flex_c">
		<div class="footer_box">
			<div class="item flex_c">
				<img :src="qq" alt="QQ">
				<span>QQ</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	components: {},
	props: [],
	data() {
		this.qq = require('../../assets/image/logo/qq.png')
		this.weixin = require('../../assets/image/logo/weixin.png')
		this.gitHub = require('../../assets/image/logo/github.png')
		this.jianShu = require('../../assets/image/logo/jianshu.png')
		this.jueJin = require('../../assets/image/logo/juejin.png')
		this.csdn = require('../../assets/image/logo/csdn.png')
		this.bookYuan = require('../../assets/image/logo/bookyuan.png')
		this.bilibili = require('../../assets/image/logo/bilibili.png')
		this.gitee = require('../../assets/image/logo/gitee.png')
		return {}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {}
}
</script>

<style lang='less' scoped>
#footer{
	width: 100%;
	height: 40px;
	border-top: 1px solid #f1f1f1;
	margin-top: 30px;
	border-bottom: 1px solid #f1f1f1;
	.footer_box{
		width: 800px;
		height: 100%;
		.item{
			width: 50px;
			height: 100%;
			img{
				width: 20px;
				height: 20px;
				margin-right: 5px;
			}
		}
	}
}
</style>
