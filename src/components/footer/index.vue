<template>
	<div id="footer" :class="['flex_c', isShowPlay ? 'pd61':'']">
		<div class="footer_box flex">
			<div
				v-for="(item, index) in infoQRcode"
				:key="index + item.title"
				class="item flex_c h_hand"
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
				class="item flex_c h_hand"
			>
				<a :href="item.url" target="_blank">
					<img :src="item.path" class="info" alt="QQ QRcode">
					<span>{{ item.title }}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Footer',
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
				url: 'https://github.com/pdd11997110103'
			},
			{
				title: '简书',
				path: require('../../assets/image/info/jianshu.png'),
				url: 'https://www.jianshu.com/u/b7a8536bff06'
			},
			{
				title: '掘金',
				path: require('../../assets/image/info/juejin.png'),
				url: 'https://juejin.cn/user/747323639737191'
			},
			{
				title: 'CSDN',
				path: require('../../assets/image/info/csdn.png'),
				url: 'https://blog.csdn.net/pdd11997110103?spm=1010.2135.3001.5421'
			},
			{
				title: '博客园',
				path: require('../../assets/image/info/bookyuan.png'),
				url: 'https://www.cnblogs.com/-pdd/'
			},
			{
				title: '哔哩哔哩',
				path: require('../../assets/image/info/bilibili.png'),
				url: 'https://space.bilibili.com/11649554'
			},
			{
				title: 'Gitee',
				path: require('../../assets/image/info/gitee.png'),
				url: 'https://gitee.com/pdd11997110103'
			}
		]
		return {}
	},
	computed: {
		...mapState([
			'isShowPlay'
		])
	}
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
.pd61{
	padding-bottom: 61px;
}
</style>
