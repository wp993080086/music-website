<template>
	<div id="lyric">
		<div class="lyric_box">
			<template v-for="item in lyricObj">
				<p :key="item.uid" :class="['lrc']">{{ item.lyric }}</p>
			</template>
		</div>
	</div>
</template>

<script>
import mixin from '../../mixins/index'

export default {
	name: 'Lyric',
	mixins: [mixin],
	props: {
		id: {
			type: Number,
			required: true
		},
		time: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			lrc: '',
			lyricObj: []
		}
	},
	computed: {},
	watch: {
		time(newVal, oldVal) {
			console.log(newVal)
		}
	},
	mounted() {
		this.handleInitLyric()
	},
	methods: {
		// 获取歌词
		async handleInitLyric() {
			console.log(this.id)
			const res = await this.getLyric(this.id)
			if (res.code === 200) {
				this.lrc = res.lrc
				console.log(this.lrc)
				if (this.lrc) {
					this.formartLyric(this.lrc)
				}
			}
		},
		// 格式化歌词
		formartLyric(lrc) {
			const lrcReg = /^\[(\d{2}):(\d{2}.\d{2,})\]\s*(.+)$/
			const lyricLis = lrc.lyric.split('\n')
			lyricLis.forEach((item, index) => {
				const arr = lrcReg.exec(item)
				if (!arr) return
				this.lyricObj.push({ time: arr[1] * 60 * 1 + arr[2] * 1, lyric: arr[3], uid: UTILS.UUid() + index })
			})
			// 根据时间轴重排顺序
			this.lyricObj.sort((a, b) => {
				return a.t - b.t
			})
			console.log(this.lyricObj)
		}
	}
}
</script>

<style lang="less" scoped>
#lyric{
	width: 300px;
	height: 400px;
	background-color: rgba(0, 0, 0, .6);
	overflow-y: auto;
	.lyric_box{
		width: 100%;
		height: auto;
		padding: 20px 0;
		text-align: center;
		line-height: 30px;
		color: #ffffff;
		transition: ease .3s;
		.active{
			color: #409eff;
		}
	}
}
</style>
