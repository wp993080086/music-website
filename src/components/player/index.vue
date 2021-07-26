<template>
	<div id="player" class="pf flex z99">
		<!-- 封面 -->
		<div class="song_img flex_c">
			<div class="song_img_box br50 ofh">
				<img :src="songInfo.img">
			</div>
		</div>
		<!-- 歌名 -->
		<div class="song_name flex flex_d_y">
			<div class="song_name_txt flex_c omit">
				<p class="omit">{{ songInfo.name }}</p>
			</div>
			<div class="song_singer flex_c">{{ songInfo.singer }}</div>
		</div>
		<!-- 操作 -->
		<div class="operation flex flex_a_c flex_s_a">
			<i class="last el-icon-d-arrow-left h_hand" title="上一首" @click="handleLast" />
			<template v-if="!isPlay">
				<i class="pause el-icon-video-play h_hand" title="播放" @click="handlePlay" />
			</template>
			<template v-else>
				<i class="play el-icon-video-pause h_hand" title="暂停" @click="handlePause" />
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
				<el-slider v-model="levelVoice" :step="10" @change="handleVolume" />
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
							<span>{{ songInfo.singer + ' - ' + songInfo.name }}</span>
							<i class="list_play el-icon-video-play" />
						</div>
					</div>
				</div>
				<i slot="reference" class="el-icon-s-operation h_hand" />
			</el-popover>
		</div>
		<!-- 播放器 -->
		<audio
			v-if="songInfo.path"
			ref="audio"
			:src="songInfo.path"
			@canplay="HandleAudioReady"
			@timeupdate="handleUpdateTime"
			@ended="handelPlayEnd()"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Player',
	data() {
		return {
			isPlay: false, // 是否播放
			levelLength: 10, // 播放时长
			levelVoice: 20 // 音量
		}
	},
	computed: {
		...mapState([
			'songInfo'
		])
	},
	watch: {
		songInfo(a, b) {
			if (a.path) {
				this.handlePlay()
			}
		}
	},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		// 准备好
		HandleAudioReady() {
			console.log('准备好了')
		},
		// 上一首
		handleLast() {},
		// 下一首
		handleNext() {},
		// 播放
		handlePlay() {
			this.$nextTick(() => {
				this.$refs.audio.play()
				this.isPlay = true
			})
		},
		// 暂停
		handlePause() {},
		// 改变播放顺序
		handlePlaySort() {},
		// 播放完毕
		handelPlayEnd() {},
		// 修改播放时间
		handleUpdateTime() {},
		// 音量
		handleVolume(e) {
			this.$refs.audio.volume = e / 100
		}
	}
}
</script>

<style lang='less' scoped src="./style.less"></style>
