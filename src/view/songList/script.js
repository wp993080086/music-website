import HTTP from '@/request/api/songListApi'

export default {
	name: 'SongList',
	data() {
		return {
			skeleton: true,
			menuList: [
				'流行',
				'古风',
				'说唱',
				'演唱会',
				'动感'
			],
			songType: '流行',
			SongList: []
		}
	},
	computed: {
		// 播放数转成万为单位
		playCount() {
			return (num) => {
				const count = this.$fn.tranNumber(num, 0)
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
					this.SongList = res.playlists
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
