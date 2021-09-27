<template>
	<div class="singer_components flex flex_a_c br4 h_hand">
		<div class="item_index flex_c">{{ index + 1 }}</div>
		<div class="item_img ofh br2">
			<img :src="songInfo.picUrl + '?param=50y50'">
		</div>
		<div class="song_name flex_c omit">
			<p class="omit">{{ songInfo.name }}</p>
		</div>
		<div class="singer_name flex_c">
			<span>{{ songInfo.song.album.artists[0].name }}</span>
		</div>
		<div class="item_play flex_c h_hand">
			<i
				class="el-icon-video-play"
				title="播放"
				@click="handlePlay(songInfo)"
			/>
		</div>
	</div>
</template>

<script>
import mixin from '../../mixins/path'
import { mapMutations } from 'vuex'

export default {
	name: 'SongComponents',
	mixins: [mixin],
	props: {
		songInfo: {
			type: Object,
			default: () => {},
			required: true
		},
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {}
	},
	computed: {},
	methods: {
		...mapMutations([
			'setSongInfo',
			'setSongList'
		]),
		// 播放
		async handlePlay(songInfo) {
			try {
				const res = await this.getSongUrl(songInfo.id)
				const param = {
					id: songInfo.id,
					name: songInfo.name,
					img: songInfo.picUrl,
					singer: songInfo.song.album.artists[0].name,
					path: res[0].url
				}
				this.setSongInfo(param)
				this.setSongList(param)
			} catch (error) {
				console.warn(error)
			}
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
