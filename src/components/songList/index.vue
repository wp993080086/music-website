<template>
	<div class="song_item pr">
		<div class="img_box ofh">
			<img :src="list.picUrl + '?param=160y160'" alt="歌单封面" class="h_hand br2" @click="toSongListDetails(list.id)">
		</div>
		<div class="shadow pa flex flex_s_b flex_a_c br2">
			<div class="shadow_left omit">
				<i class="el-icon-service" />
				<span>{{ playCount(list.playCount) }}</span>
			</div>
			<div class="shadow_rignt">
				<i class="fr el-icon-video-play h_hand" title="播放" />
			</div>
		</div>
		<div class="introduce omit2 h_hand">
			{{ list.name }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'SongList',
	props: {
		list: {
			type: Object,
			default: () => {},
			required: true
		}
	},
	data() {
		return {}
	},
	computed: {
		// 播放数转成万为单位
		playCount() {
			return (num) => {
				const count = UTILS.tranNumber(num, 0)
				return count
			}
		}
	},
	methods: {
		// 去歌单详情
		toSongListDetails(id) {
			TOAST.info(id)
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
