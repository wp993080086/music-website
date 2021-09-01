import HTTP from '../../request/api/songListApi'

export default {
	name: 'SongListDatails',
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
			commentList: {}, // 歌单评论
			relatedList: {}, // 相关歌单推荐
			subscribersList: {}, // 歌单收藏者
			songId: '', // 歌曲ID 多个用,分开
			songDetailsList: [] // 歌曲详情
		}
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
	mounted() {
		this.getSongListDetail()
		// this.getSongListComment()
		// this.getSongListRelated()
		// this.getSongListSubscribers()
	},
	methods: {
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
		// 获取歌单评论
		async getSongListComment() {
			const res = await HTTP.songListComment(this.id)
			this.songListComment = res
		},
		// 相关歌单推荐
		async getSongListRelated() {
			const res = await HTTP.songListRelated(this.id)
			this.songListRelated = res
		},
		// 歌单收藏者
		async getSongListSubscribers() {
			const res = await HTTP.songListSubscribers(this.id)
			this.subscribersList = res
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
					dvd: item.al.name
				}
				list.push(obj)
			})
			this.songDetailsList = list
		}
	}
}
