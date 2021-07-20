<template>
	<div id="banner">
		<div class="banner_content">
			<el-skeleton :rows="6" animated :loading="skeleton">
				<template slot="template">
					<el-skeleton-item
						variant="image"
						style="width: 100%; height: 285px;"
					/>
				</template>
				<template>
					<el-carousel :interval="3000" type="card" height="285px" indicator-position="none">
						<el-carousel-item v-for="item in bannerList" :key="item.imageUrl">
							<div class="banner_item pr">
								<img :src="item.imageUrl" alt="Banner">
								<div class="banner_type pa flex_c" :style="{backgroundColor: bgColor(item.typeTitle)}">
									{{ item.typeTitle }}
								</div>
							</div>
						</el-carousel-item>
					</el-carousel>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Banner',
	filters: {
		bgColor(type) {
			let color = '#7CBCE0'
			switch (type) {
			case '直播':
				color = '#AB895B'
				break
			case '新碟首发':
				color = '#77C9CD'
				break
			case '独家':
				color = '#C10D0C'
				break
			case '数字专辑':
				color = '#1E1E1E'
				break
			}
			return color
		}
	},
	props: {
		bannerList: {
			type: Array,
			default: () => {}
		},
		skeleton: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		bgColor() {
			return (val) => {
				let color = ''
				switch (val) {
				case '直播':
					color = '#ffffff'
					break
				case '新碟首发':
					color = '#77C9CD'
					break
				case '独家':
					color = '#C10D0C'
					break
				case '数字专辑':
					color = '#1E1E1E'
					break
				default:
					color = '#7CBCE0'
					break
				}
				return color
			}
		}
	}
}
</script>

<style lang='less' scoped>
#banner{
	width: 100%;
	height: 285px;
	margin-top: 10px;
	.el-carousel__item h3 {
		margin: 0;
	}
	.banner_item{
		img{
			width: 100%;
		}
		.banner_type{
			width: 80px;
			height: 30px;
			border-top-left-radius: 8px;
			line-height: 30px;
			color: #ffffff;
			right: 0;
			bottom: 0;
		}
		.red{
			background-color: #EB5651;
		}
		.blue{
			background-color: skyblue;
		}
	}
}
</style>
