import HTTP from '@/request/api/songListApi'
import songList from '../../components/songList'

export default {
	name: 'SongList',
	components: {
		songList
	},
	data() {
		return {
			skeleton: true,
			menuList: [
				'华语',
				'欧美',
				'民谣',
				'爵士',
				'电子'
			],
			songType: '华语',
			SongList: []
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
		this.getSongList()
	},
	methods: {
		// 获取歌单
		async getSongList() {
			try {
				const res = await HTTP.highqualitySongList(25, this.songType)
				if (res.code === 200) {
					this.skeleton = false
					this.SongList = res.playlists.map(item => {
						item.picUrl = item.coverImgUrl
						return item
					})
					console.log(this.SongList)
				}
			} catch (error) {
				console.warn(error)
			}
		},
		// 切换类别
		handleChangeType(type) {
			if (!this.skeleton) {
				this.songType = type
				this.getSongList()
			}
		}
	}
}
