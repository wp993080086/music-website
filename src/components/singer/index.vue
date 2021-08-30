<template>
	<div
		class="singer_components flex flex_a_c flex_d_y"
	>
		<div class="singer_photograph h_hand br50 ofh">
			<el-image :src="singerInfo.picUrl + '?param=300y300'" @click="toSingerDetails(singerInfo.id)">
				<div slot="placeholder" class="image-slot flex_c">
					<i class="el-icon-loading" />
				</div>
			</el-image>
		</div>
		<div class="singer_name flex_c">
			<p>{{ singerInfo.name }}</p>
		</div>
		<div class="singer_hint flex_c">
			<p>收录单曲：{{ singerInfo.musicSize }}首</p>
		</div>
	</div>
</template>

<script>
import mixin from '../../mixins/path'

export default {
	name: 'SongComponents',
	mixins: [mixin],
	props: {
		singerInfo: {
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
		// 去歌手详情
		toSingerDetails(id) {
			TOAST.info(id)
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
