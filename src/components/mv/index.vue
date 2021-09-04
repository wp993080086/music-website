<template>
	<div class="mv_components flex flex_d_y flex_s_b br8 ofh" :style="{ width: w + 'px' }">
		<div class="mv_main ofh pr h_hand" @click="toMvDetails(mvInfo.id)">
			<el-image :src="mvInfo.cover + '?param='+ w +'y150'" :lazy="true">
				<div slot="placeholder" class="image-slot flex_c">
					<i class="el-icon-loading" />
				</div>
			</el-image>
			<div class="shadow pa flex_c">
				<i class="play_info el-icon-video-play" />
			</div>
		</div>
		<div class="mv_info flex flex_d_y">
			<div class="mv_info_item flex flex_a_c">
				{{ mvInfo.artistName }} - {{ mvInfo.name }}
			</div>
			<div class="mv_info_item flex flex_a_c">
				时长：{{ time(mvInfo.duration) }}
			</div>
			<div class="mv_info_item flex flex_a_c">
				播放量：{{ mvInfo.playCount }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MvComponents',
	props: {
		mvInfo: {
			type: Object,
			default: () => {}
		},
		w: {
			type: Number,
			default: 280
		}
	},
	data() {
		return {}
	},
	computed: {
		// 转换时间
		time() {
			return (ms) => {
				return UTILS.formatTime(ms)
			}
		}
	},
	methods: {
		toMvDetails(v) {
			const id = v + ''
			this.$router.push({
				name: 'MvDetails',
				query: { id }
			})
		}
	}
}
</script>

<style lang="less" scoped src="./style.less"></style>
