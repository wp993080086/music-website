import HTTP from '../../request/api/songListApi'
import mixin from '../../mixins/index'
import { mapMutations, mapState } from 'vuex'

export default {
	name: 'SongListDatails',
	mixins: [mixin],
	components: {},
	props: {
		id: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			detailsList: {}, // 歌单详情
			songListComment: {}, // 歌单评论
			subscribersList: {}, // 歌单收藏者
			songId: '', // 歌曲ID 多个用,分开
			songDetailsList: [], // 歌曲详情
			loadingLeft: true,
			loadingLike: true,
			loadingComment: true,
			textarea: ''
		}
	},
	computed: {
		...mapState([
			'cookie'
		]),
		// 播放数转成万为单位
		playCount() {
			return (num) => {
				const count = UTILS.tranNumber(num, 0)
				return count
			}
		}
	},
	mounted() {
		this.getSongListDetail()
		this.getSongListSubscribers()
		this.getSongListComment()
	},
	methods: {
		...mapMutations([
			'setSongInfo',
			'setSongList'
		]),
		// 获取歌单详情
		async getSongListDetail() {
			const res = await HTTP.songListDetail(this.id)
			this.detailsList = res.playlist
			const id = []
			for (const index in this.detailsList.trackIds) {
				id.push(this.detailsList.trackIds[index].id)
				if (index >= 99) {
					break
				}
			}
			this.songId = id.join(',')
			this.getSongDatails()
		},
		// 获取歌曲详情
		async getSongDatails() {
			const res = await HTTP.songDatails(this.songId)
			const songList = res.songs
			const list = []
			songList.forEach(item => {
				const obj = {
					name: item.name,
					id: item.id,
					singer: item.ar[0].name,
					singerId: item.ar[0].id,
					duration: UTILS.formatTime(item.dt),
					dvd: item.al.name,
					picUrl: item.al.picUrl
				}
				list.push(obj)
			})
			this.songDetailsList = list
			this.loadingLeft = false
		},
		// 歌单收藏者
		async getSongListSubscribers() {
			const res = await HTTP.songListSubscribers(this.id)
			this.subscribersList = res.subscribers
			this.loadingLike = false
		},
		// 获取歌单评论
		async getSongListComment() {
			const res = await HTTP.songListComment(this.id)
			this.songListComment = res.comments
			this.loadingComment = false
		},
		// 播放
		async handlePlay(data) {
			try {
				const res = await this.getSongUrl(data.id)
				if (!res[0].url || res[0].url === null) {
					TOAST.error('暂无版权')
					return
				}
				const param = {
					id: data.id,
					name: data.name,
					img: data.picUrl,
					singer: data.singer,
					path: res[0].url
				}
				this.setSongInfo(param)
				this.setSongList(param)
				const isShow = this.$store.state.isShowPlay
				if (!isShow) {
					this.$store.state.isShowPlay = true
				}
			} catch (error) {
				console.warn(error)
			}
		},
		// 提交评论
		async saveComment() {
			if (this.textarea) {
				const id = this.id
				const type = 2
				const content = this.textarea
				const res = await this.sendComment(id, type, content)
				if (res) {
					TOAST.success('评论发送成功')
					this.loadingComment = true
					this.textarea = ''
					await UTILS.sleep(2000)
					this.getSongListComment()
				}
			} else {
				TOAST.info('请先输入评论内容')
			}
		}
	}
}
