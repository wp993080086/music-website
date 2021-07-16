<template>
	<div id="footer" class="flex_c pa">
		<div class="footer_box flex">
			<div
				v-for="(item, index) in infoQRcode"
				:key="index + item.title"
				class="item flex_c"
			>
				<el-popover
					placement="top"
					width="150"
					trigger="hover"
				>
					<img :src="item.QRcode" class="QRcode" alt="QQ群">
					<div slot="reference">
						<img :src="item.path" class="info" alt="QQ QRcode">
						<span>{{ item.title }}</span>
					</div>
				</el-popover>
			</div>
			<div
				v-for="(item, index) in info"
				:key="index + item.url"
				class="item flex_c"
			>
				<img :src="item.path" class="info" alt="QQ QRcode">
				<a :href="item.url">{{ item.title }}</a>
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
		this.infoQRcode = [
			{
				title: 'QQ群',
				path: require('../../assets/image/info/qq.png'),
				QRcode: require('../../assets/image/info/qqQRcode.png')
			},
			{
				title: '公众号',
				path: require('../../assets/image/info/weixin.png'),
				QRcode: require('../../assets/image/info/weixinQRcode.png')
			}
		]
		this.info = [
			{
				title: 'gitHub',
				path: require('../../assets/image/info/github.png'),
				url: ''
			},
			{
				title: '简书',
				path: require('../../assets/image/info/jianshu.png'),
				url: ''
			},
			{
				title: '掘金',
				path: require('../../assets/image/info/juejin.png'),
				url: ''
			},
			{
				title: 'CSDN',
				path: require('../../assets/image/info/csdn.png'),
				url: ''
			},
			{
				title: '博客园',
				path: require('../../assets/image/info/bookyuan.png'),
				url: ''
			},
			{
				title: '哔哩哔哩',
				path: require('../../assets/image/info/bilibili.png'),
				url: ''
			},
			{
				title: 'Gitee',
				path: require('../../assets/image/info/gitee.png'),
				url: ''
			}
		]
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
	left: 0;
	bottom: 0;
	.footer_box{
		width: 800px;
		height: 100%;
		.item{
			width: 100px;
			height: 100%;
			cursor: pointer;
			.QRcode{
				width: 150px;
				height: 150px;
			}
			.info{
				width: 20px;
				height: 20px;
				margin-right: 5px;
			}
		}
	}
}
</style>
