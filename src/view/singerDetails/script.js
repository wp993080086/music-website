import HTTP from '../../request/api/singerApi'
import mvBox from '../../components/mv'

export default {
	name: 'SingerDetails',
	components: {
		mvBox
	},
	props: {
		id: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			info: {},
			songList: [],
			infoList: [],
			mvList: [],
			activeMenu: 'song',
			menuList: [
				{ name: 'song', label: '单曲' },
				{ name: 'mv', label: 'MV' },
				{ name: 'presentation', label: '介绍' }
			]
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
		this.getSingerAllData()
	},
	methods: {
		// 获取歌手 单曲+信息+MV
		async getSingerAllData() {
			const allRes =  await Promise.allSettled([
				HTTP.singerSong(this.id),
				HTTP.singerInfo(this.id),
				HTTP.singerMv(this.id)
			])
			this.info = allRes[0].value.artist
			const songList = allRes[0].value.hotSongs
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
			this.songList = list
			this.infoList = allRes[1].value
			this.mvList = allRes[2].value.mvs.map(item => {
				item.cover = item.imgurl
				return item
			})
		},
		// 切换菜单
		handleChengeMenu(e, event) {}
	}
}
