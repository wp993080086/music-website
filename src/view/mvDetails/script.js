import HTTP from '../../request/api/mvApi'
import DPlayer from 'dplayer'

export default {
	name: 'MvDatails',
	data() {
		return {
			id: '',
			info: {},
			detailList: {},
			similarList: [],
			commentList: [],
			player: null
		}
	},
	computed: {
		// 转时间戳为几个月前
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
		// 时间戳转换
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
			this.init(this.info.url, this.detailList.cover)
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
		},
		// 初始化播放器
		init(url, pic) {
			this.player = new DPlayer({
				container: document.getElementById('play_main'),
				video: {
					url,
					pic
				},
				lang: 'zh-cn',
				hotkey: true,
				playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
				volume: '0.5',
				logo: require('../../assets/icon/pdd.png')
			})
		}
	}
}
