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
			songListInfo: {} // 歌单详情
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
	},
	methods: {
		// 获取歌单详情
		async getSongListDetail() {
			const res = await HTTP.songListDetail(this.id)
			this.songListInfo = res
		}
	}
}
