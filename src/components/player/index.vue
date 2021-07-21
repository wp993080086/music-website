<template>
	<div id="player" class="pf flex">
		<!-- 封面 -->
		<div class="song_img flex_c">
			<div class="song_img_box br50 ofh">
				<img src="../../assets/image/head.jpg">
			</div>
		</div>
		<!-- 歌名 -->
		<div class="song_name flex flex_d_y">
			<div class="song_name_txt flex_c omit">
				<p class="omit">给我一首歌的时间</p>
			</div>
			<div class="song_singer flex_c">周杰伦</div>
		</div>
		<!-- 操作 -->
		<div class="operation flex flex_a_c flex_s_a">
			<i class="last el-icon-d-arrow-left h_hand" title="上一首" @click="handleLast" />
			<template v-if="isPlay">
				<i class="play el-icon-video-pause h_hand" title="暂停" @click="handlePause" />
			</template>
			<template v-else>
				<i class="pause el-icon-video-play h_hand" title="播放" @click="handlePlay" />
			</template>
			<i class="next el-icon-d-arrow-right h_hand" title="下一首" @click="handleNext" />
		</div>
		<!-- 进度 -->
		<div class="progress flex_c">
			<div class="progress_slider">
				<el-slider v-model="levelLength" />
			</div>
			<div class="progress_time flex_c">
				<div class="start">02:02:32</div>
				<div class="line" />
				<div class="end">03:08:35</div>
			</div>
		</div>
		<!-- 音量 -->
		<div class="progress_voice flex_c">
			<div class="voice_icon flex_c">
				<i class="el-icon-bell" />
			</div>
			<div class="voice">
				<el-slider v-model="levelVoice" :step="10" />
			</div>
		</div>
		<!-- 顺序 -->
		<div class="sort flex_c">
			<i class="next el-icon-sort h_hand" @click="handlePlaySort" />
		</div>
		<!-- 歌单 -->
		<div class="list flex_c">
			<el-popover
				placement="top-start"
				:offset="120"
				width="240"
				trigger="click"
			>
				<div class="song_list">
					<div class="song_list_title flex flex_a_c">
						<img src="../../assets/icon/pdd.png">
						<span>歌单</span>
					</div>
					<div class="song_list_box">
						<div
							class="song_list_item flex_c h_hand"
						>
							<span>任贤齐 - 伤心太平洋</span>
							<i class="list_play el-icon-video-play" />
						</div>
					</div>
				</div>
				<i slot="reference" class="el-icon-s-operation h_hand" />
			</el-popover>
		</div>
		<!-- 播放器 -->
		<audio
			v-if="false"
			ref="audio"
			autoplay
			:src="songInfo.url"
			@timeupdate="handleUpdateTime"
			@ended="handelPlayEnd()"
		/>
	</div>
</template>

<script>
export default {
	name: 'Player',
	props: [],
	data() {
		return {
			songInfo: {}, // 歌曲信息
			isPlay: false, // 是否播放
			levelLength: 10, // 播放时长
			levelVoice: 20 // 音量
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		// 上一首
		handleLast() {},
		// 下一首
		handleNext() {},
		// 播放
		handlePlay() {},
		// 暂停
		handlePause() {},
		// 改变播放顺序
		handlePlaySort() {},
		// 播放完毕
		handelPlayEnd() {},
		// 修改播放时间
		handleUpdateTime() {}
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
	.song_img{
		width: 50px;
		height: 100%;
		flex-basis: 50px;
		.song_img_box{
			width: 40px;
			height: 40px;
		}
		img{
			width: 100%;
			height: 100%;
			animation: rotate 5s linear infinite;
		}
	}
	.song_name{
		width: 230px;
		height: 100%;
		flex-basis: 230px;
		.song_name_txt{
			width: 100%;
			height: 50%;
			font-size: 14px;
			box-sizing: border-box;
			padding: 0 10px;
		}
		.song_singer{
			width: 100%;
			height: 50%;
			color: #cccccc;
		}
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
		width: calc(100% - 700px);
		height: 100%;
		.progress_slider{
			width: calc(100% - 150px);
			height: 100%;
			box-sizing: border-box;
			padding: 11px 20px;
		}
		.progress_time{
			width: 150px;
			.start, .end{
				font-size: 14px;
				font-weight: bold;
			}
			.line{
				width: 2px;
				height: 20px;
				background-color: #cccccc;
				margin: 0 6px;
			}
		}
	}
	.progress_voice{
		width: 120px;
		height: 100%;
		flex-basis: 120px;
		.voice_icon{
			width: 40px;
			height: 100%;
			flex-basis: 40px;
			font-size: 18px;
		}
		.voice{
			width: 80px;
			height: 100%;
			box-sizing: border-box;
			padding: 11px 10px;
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
	}
}
.song_list{
	box-sizing: border-box;
	max-height: 300px;
	padding-bottom: 20px;
	.song_list_title{
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #000000;
		box-sizing: border-box;
		font-size: 16px;
		margin-bottom: 10px;
		img{
			width: 36px;
			height: 36px;
			margin-right: 10px;
		}
	}
	.song_list_box{
		max-height: 240px;
		overflow-y: auto;
		.song_list_item{
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #f1f1f1;
			&:hover{
				color: #409eff;
			}
			.list_play{
				margin-left: 5px;
				font-size: 20px;
			}
		}
	}
}
@keyframes rotate
{
	100% { transform: rotate(360deg) }
}
</style>
