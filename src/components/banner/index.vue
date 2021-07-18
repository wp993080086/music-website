<template>
	<div id="banner">
		<div class="banner_content">
			<el-carousel :interval="3000" type="card" height="240px" indicator-position="none">
				<el-carousel-item v-for="item in bannerList" :key="item.imageUrl">
					<div class="banner_item pr">
						<img :src="item.imageUrl" alt="Banner">
						<span :class="['banner_type', 'pa']">{{ item.typeTitle }}</span>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Banner',
	props: {
		bannerList: {
			type: Array,
			default: () => {}
		}
	},
	data() {
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
#banner{
	width: 100%;
	height: 240px;
	margin-top: 10px;
	.el-carousel__item h3 {
    margin: 0;
  }
	.banner_item{
		img{
			width: 100%;
		}
		.banner_type{
			width: 100px;
			height: 40px;
			border-top-left-radius: 8px;
			border-bottom-right-radius: 8px;
			line-height: 40px;
			color: #ffffff;
			right: 0;
			bottom: 0;
		}
	}
}
</style>
