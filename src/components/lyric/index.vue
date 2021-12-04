<template>
	<div id="lyric">
		<div class="lyric_box">
			<template v-for="item in lyricObj">
				<p :key="item.uid" :class="['lrc', flags === item.uid ? 'flag_active': '']">{{ item.lyric }}</p>
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
	computed: {
		flags() {
			const arr = []
			this.lyricObj.forEach(item => {
				if (this.time > item.time) {
					arr.push(item.uid)
				}
			})
			return arr[arr.length - 1]
		}
	},
	watch: {
		time(newVal, oldVal) {
			const box = document.getElementById('lyric')
			const flag = document.getElementsByClassName('flag_active')[0]
			if (box && flag) {
				box.scrollTo({
					left: 0,
					top: flag.offsetTop - 200,
					behavior: 'smooth'
				})
			}
		},
		id(newVal, oldVal) {
			this.handleInitLyric()
		}
	},
	mounted() {
		this.handleInitLyric()
	},
	methods: {
		// 获取歌词
		async handleInitLyric() {
			const res = await this.getLyric(this.id)
			if (res.code === 200) {
				this.lrc = res.lrc
				if (this.lrc) {
					this.formartLyric(this.lrc)
				}
			}
		},
		// 格式化歌词
		formartLyric(lrc) {
			this.lyricObj = []
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
		}
	}
}
</script>

<style lang="less" scoped>
#lyric{
	width: 300px;
	height: 400px;
	background-color: rgba(0, 0, 0, .75);
	overflow-y: auto;
	transition: ease .3s;
	.lyric_box{
		width: 100%;
		height: auto;
		padding: 200px 0;
		text-align: center;
		line-height: 30px;
		color: @white;
		.flag_active{
			color: @blue;
		}
	}
}
</style>
