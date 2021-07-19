<template>
	<div id="title_line">
		<div class="module_line">
			<div class="module_title pr flex flex_s_b">
				<span class="hint">{{ title }}</span>
				<div class="more" @click="handleToMore(type)">
					<span>更多</span>
					<i class="el-icon-right" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TitleLine',
	props: {
		title: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: '0'
		}
	},
	methods: {
		// 更多
		handleToMore(type) {
			this.$emit('handleToMore', type)
		}
	}
}
</script>

<style lang='less' scoped>
#title_line{
	width: 100%;
	.module_line{
		width: 100%;
		height: 40px;
		padding: 0 40px 0 40px;
		box-sizing: border-box;
		line-height: 40px;
		margin: 20px auto;
		.module_title{
			color: #303133;
			.hint{
				font-weight: bold;
				font-size: 20px;
			}
			.more{
				color: #F56C6C;
				font-size: 14px;
				cursor: pointer;
				&:hover{
					text-decoration: underline;
				}
			}
			&::before{
				content: "";
				display: inline-block;
				position: absolute;
				width: 100%;
				height: 3px;
				background-color: #409EFF;
				left: 0;
				bottom: -3px;
			}
		}
	}
}
</style>
