<template>
	<div id="player" class="pf flex">
		<!-- 歌名 -->
		<div class="song_name flex_c omit">
			<span>七里香</span>
		</div>
		<!-- 操作 -->
		<div class="operation flex flex_a_c flex_s_a">
			<i class="last el-icon-d-arrow-left h_hand" />
			<template v-if="isPlay">
				<i class="play el-icon-video-pause h_hand" />
			</template>
			<template v-else>
				<i class="pause el-icon-video-play h_hand" />
			</template>
			<i class="next el-icon-d-arrow-right h_hand" />
		</div>
		<!-- 进度 -->
		<div class="progress">
			<el-progress :percentage="50" text-inside :stroke-width="15" :format="format" />
		</div>
		<!-- 顺序 -->
		<div class="sort flex_c">
			<i class="next el-icon-sort h_hand" />
		</div>
		<!-- 歌单 -->
		<div class="list flex_c">
			<el-popover
				placement="top-start"
				:offset="120"
				width="300"
				trigger="hover"
			>
				<div class="song_list">
					<div class="song_list_item flex_c h_hand">
						<span>任贤齐 - 伤心太平洋</span>
						<i class="list_play el-icon-video-play" />
					</div>
				</div>
				<i slot="reference" class="el-icon-s-operation h_hand" />
			</el-popover>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Player',
	components: {},
	props: [],
	data() {
		return {
			isPlay: false
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		format(percentage) {
			return '00:02:23 / 00:02:39'
		}
	}
}
</script>

<style lang='less' scoped>
#player{
	width: 100%;
	min-width: 1200px;
	padding: 0 20px;
	box-sizing: border-box;
	height: 61px;
	left: 0;
	bottom: 0;
	border-top: 1px solid #cccccc;
	.song_name{
		width: 150px;
		height: 100%;
		flex-basis: 150px;
	}
	.operation{
		width: 100px;
		height: 100%;
		flex-basis: 100px;
		font-size: 18px;
		.item{
			cursor: pointer;
		}
		.play, .pause{
			font-size: 30px;
		}
	}
	.progress{
		width: calc(100% - 450px);
		height: 100%;
		box-sizing: border-box;
		padding: 22.5px 20px;
		& /deep/ .el-progress{
			cursor: pointer;
		}
	}
	.sort{
		width: 100px;
		height: 100%;
		flex-basis: 100px;
		font-size: 24px;
	}
	.list{
		width: 100px;
		height: 100%;
		flex-basis: 100px;
		font-size: 24px;
		& /deep/ .song_list{
			padding: 20px;
			min-height: 300px;
			.song_list_item{
				width: 100%;
				height: 40px;
				.list_play{
					margin-left: 5px;
					font-size: 16px;
				}
			}
		}
	}
}
</style>
