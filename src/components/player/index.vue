<template>
	<div id="player" :class="['pf','z9999', isShowPlay ? '':'hide_hook']">
		<div class="play_content flex ofh">
			<!-- 封面 -->
			<div class="song_img flex_c">
				<div class="song_img_box br50 ofh">
					<img :src="songInfo.img" :class="isPlay ? 'img_animate' : ''">
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
				<i class="last iconfont pdd-up h_hand" title="上一首" @click="handleLast" />
				<template v-if="!isPlay">
					<i class="pause el-icon-video-play h_hand" title="播放" @click="handlePlay" />
				</template>
				<template v-else>
					<i class="play el-icon-video-pause h_hand" title="暂停" @click="handlePause" />
				</template>
				<i class="iconfont pdd-down next h_hand" title="下一首" @click="handleNext" />
			</div>
			<!-- 进度 -->
			<div class="progress flex_c">
				<div class="progress_slider">
					<el-slider v-model="levelLength" :show-tooltip="false" @change="handleMovePlay" />
				</div>
				<div class="progress_time flex_c">
					<div class="start">{{ newLength }}</div>
					<div class="line" />
					<div class="end">{{ songLength }}</div>
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
				<i v-if="playType == 0" class="iconfont pdd-for_p next h_hand" @click="handlePlaySort(0)" />
				<i v-else-if="playType == 1" class="iconfont pdd-for next h_hand" @click="handlePlaySort(1)" />
				<i v-else-if="playType == 2" class="iconfont pdd-line next h_hand" @click="handlePlaySort(2)" />
				<i v-else class="iconfont pdd-sort next h_hand" @click="handlePlaySort(3)" />
			</div>
			<div class="lyric flex_c">
				<template v-if="songInfo.id">
					<el-popover
						placement="top-start"
						:offset="120"
						width="300"
						trigger="click"
					>
						<lyric :id="songInfo.id" :time="playTime" />
						<i slot="reference" class="iconfont pdd-gc h_hand" style="font-size:24px;" />
					</el-popover>
				</template>
			</div>
			<!-- 歌单 -->
			<div class="list flex_c">
				<el-popover
					placement="top-start"
					:offset="120"
					width="300"
					height="400"
					trigger="click"
				>
					<div class="song_list">
						<div class="song_list_title flex flex_a_c">
							<img src="../../assets/icon/pdd.png">
							<span>歌单</span>
						</div>
						<div class="song_list_box">
							<div
								v-for="(item, index) in songList"
								:key="index"
								:class="['song_list_item', 'flex_c', 'h_hand', songInfo.id === item.id ? 'active': '']"
							>
								<div class="song_list_name omit text_c">
									<span>{{ item.singer + ' - ' + item.name }}</span>
								</div>
								<div class="song_list_icon flex_c">
									<i class="list_play el-icon-video-play" @click="handleListClick(index)" />
								</div>
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
				@ended="handelPlayEnd"
			/>
		</div>
		<div :class="['hook', 'h_hand', 'flex_c', 'ofh']" @click="setPlayState">
			<i v-if="!isShowPlay" class="iconfont pdd-sq" />
			<i v-else class="iconfont pdd-zk" />
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import lyric from '../lyric'

export default {
	name: 'Player',
	components: {
		lyric
	},
	data() {
		return {
			isPlay: false, // 是否播放
			levelLength: 0, // 播放长度
			levelVoice: 100, // 音量
			newLength: '00:00', // 当前时长
			songLength: '00:00', // 总时长
			playType: 2, // 播放模式 0随机 1循环 2单曲循环 3列表循环
			playTime: 0
		}
	},
	computed: {
		...mapState([
			'songInfo',
			'songList',
			'isShowPlay'
		])
	},
	watch: {
		songInfo(newVal, oldVal) {
			if (!oldVal.path) {
				return
			} else {
				if (newVal.path) {
					this.handlePlay()
					const bool = this.songList.some((item) => {
						return item.id === newVal.id
					})
					if (!bool) {
						this.setSongList(newVal)
					}
				}
			}
		}
	},
	mounted() {
		// 如果有缓存就替换
		if (sessionStorage.getItem('songList')) {
			const param = sessionStorage.getItem('songList')
			this.handleReplaceSongList(JSON.parse(param))
		}
	},
	methods: {
		...mapMutations([
			'setSongList',
			'setPlayState',
			'setSongInfo',
			'handleReplaceSongList'
		]),
		// Audio标签准备好了
		HandleAudioReady() {
			try {
				const songLength = this.$refs.audio.duration
				this.songLength = UTILS.formatSecondTime(songLength)
			} catch (error) {
				console.warn(error)
			}
		},
		// 上一首
		handleLast() {
			const index = this.songList.findIndex(item => {
				return item.id === this.songInfo.id
			})
			let before = index - 1
			if (before === -1) {
				before = this.songList.length - 1
			}
			const param = UTILS.deepClone(this.songList[before])
			this.setSongInfo(param)
		},
		// 下一首
		handleNext() {
			// 当前的歌曲播放模式
			const type = this.playType
			// 当前的歌曲索引
			const index = this.songList.findIndex(item => {
				return item.id === this.songInfo.id
			})
			// 索引上限
			const Limit = this.songList.length - 1
			// 下一首的索引
			let after = 0
			// 判断逻辑
			switch (type) {
			case 0:
				// 随机
				after = UTILS.getRandom(this.songList.length - 1)
				if (after <= 0) after = 0
				break
			case 1:
				// 循环播放
				after = index + 1
				if (after > Limit) after = 0
				break
			case 2:
				// 单曲循环
				after = index
				break
			case 3:
				// 顺序播放
				after = index + 1
				if (after > Limit) after = 0
				break
			}
			const param = UTILS.deepClone(this.songList[after])
			this.setSongInfo(param)
		},
		// 播放
		handlePlay() {
			this.$nextTick(() => {
				this.$refs.audio.play()
				this.isPlay = true
			})
		},
		// 暂停
		handlePause() {
			try {
				this.$nextTick(() => {
					this.$refs.audio.pause()
					this.isPlay = false
				})
			} catch (error) {
				console.warn(error)
			}
		},
		/**
		* 改变播放模式
		* @param {Number} type 类型 playType 1=>列表循环 2=>单曲循环 3=>顺序播放 0=>随机播放
		*/
		handlePlaySort(type) {
			switch (type) {
			case 0:
				this.playType = 1
				TOAST.success('列表循环')
				break
			case 1:
				this.playType = 2
				TOAST.success('单曲循环')
				break
			case 2:
				this.playType = 3
				TOAST.success('顺序播放')
				break
			case 3:
				this.playType = 0
				TOAST.success('随机播放')
				break
			}
		},
		// 播放完毕
		handelPlayEnd() {
			this.isPlay = false
			this.handleNext()
		},
		// 同步播放进度
		handleUpdateTime() {
			try {
				// 播放条长度
				this.levelLength = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
				// 当前时长
				this.newLength = UTILS.formatSecondTime(this.$refs.audio.currentTime)
				this.playTime = this.$refs.audio.currentTime
			} catch (error) {
				console.warn(error)
			}
		},
		// 修改音量
		handleVolume(e) {
			try {
				this.$refs.audio.volume = e / 100
			} catch (error) {
				console.warn(error)
			}
		},
		// 修改播放进度
		handleMovePlay(e) {
			try {
				this.$refs.audio.currentTime = (this.levelLength / 100) * this.$refs.audio.duration
			} catch (error) {
				console.warn(error)
			}
		},
		// 播放列表播放
		handleListClick(index) {
			const param = UTILS.deepClone(this.songList[index])
			this.setSongInfo(param)
		}
	}
}
</script>

<style lang='less' scoped src="./style.less"></style>
