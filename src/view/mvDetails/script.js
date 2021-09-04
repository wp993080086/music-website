import HTTP from '../../request/api/mvApi'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
	name: 'MvDatails',
	components: {
		videoPlayer
	},
	props: {},
	data() {
		return {
			id: '',
			info: {},
			detailList: {},
			similarList: [],
			commentList: [],
			playerOptions: {
				playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
				autoplay: false, // 浏览器准备好时开始回放。
				muted: false, // 默认将会消除任何音频
				loop: false, // 视频一结束就重新开始。
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 按比例缩放以适应其容器
				sources: [
					{
						src: '', // 播放路径
						type: 'video/mp4' // 类型
					}
				],
				poster: '', // 封面地址
				notSupportedMessage: '加载中',
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true  // 全屏按钮
				}
			}
		}
	},
	computed: {
		// 转时间戳
		timeToDate() {
			return (times) => {
				const time = UTILS.formatMsgTime(times)
				return time
			}
		},
		// 播放数转成万为单位
		playCount() {
			return (num) => {
				const count = UTILS.tranNumber(num, 0)
				return count
			}
		},
		time() {
			return (ms) => {
				return UTILS.formatTime(ms)
			}
		}
	},
	created() {
		this.id = this.$route.query.id
	},
	mounted() {
		this.getMvAllData()
		this.getMvComment()
	},
	methods: {
		// 获取MV URL+详情+相似
		async getMvAllData() {
			const allRes =  await Promise.allSettled([
				HTTP.mvURL(this.id),
				HTTP.mvDetail(this.id),
				HTTP.mvSimilar(this.id)
			])
			this.info = allRes[0].value.data
			this.detailList = allRes[1].value.data
			this.similarList = allRes[2].value.mvs
			this.playerOptions.sources[0].src = this.info.url
			this.playerOptions.poster =  this.detailList.cover
			console.log(this.similarList)
		},
		// 获取MV评论
		async getMvComment() {
			const param = {
				id: this.id,
				limit: 20,
				offset: 0
			}
			const res = await HTTP.mvComment(param)
			this.commentList = res.comments
		},
		// 点击相似MV
		handleChangeURL(id) {
			this.id = id
			this.getMvAllData()
			this.getMvComment()
		}
	}
}
