import HTTP from '@/request/api/searchApi'
import mixin from '../../mixins/index'
import mvBox from '../../components/mv'
import singer from '../../components/singer'
import songList from '../../components/songList'
import { mapMutations } from 'vuex'

export default {
	name: 'SearchDetails',
	mixins: [mixin],
	props: {
		keyword: {
			type: String,
			default: ''
		}
	},
	components: {
		mvBox,
		singer,
		songList
	},
	data() {
		return {
			key: '',
			activeMenu: '1',
			isChange: true,
			menuList: [
				{ name: '1', label: '单曲' },
				{ name: '100', label: '歌手' },
				{ name: '1000', label: '歌单' },
				{ name: '1004', label: 'MV' }
			],
			song: [],
			singerList: [],
			songList: [],
			mvList: []
		}
	},
	computed: {
		// 转换时间
		time() {
			return (ms) => {
				return UTILS.formatTime(ms)
			}
		}
	},
	watch: {
		'$route'(to, from) {
			if (from.name === 'SearchDetails' && to.name === 'SearchDetails') {
				this.getDetails()
			}
		},
		key(newVal, oldVal) {
			this.key = newVal
			if (newVal && newVal !== oldVal) {
				this.isChange = true
			}
		},
		activeMenu(newVal, oldVal) {
			console.log(this.isChange)
			if (this.isChange) {
				if (newVal && newVal !== oldVal) {
					this.getDetails()
				}
			} else {
				switch (newVal) {
				case '1':
					if (this.song.length === 0) {
						this.getDetails()
					}
					break
				case '100':
					if (this.singerList.length === 0) {
						this.getDetails()
					}
					break
				case '1000':
					if (this.songList.length === 0) {
						this.getDetails()
					}
					break
				case '1004':
					if (this.mvList.length === 0) {
						this.getDetails()
					}
					break
				}
			}
		}
	},
	mounted() {
		this.key = this.keyword
		this.getDetails()
	},
	methods: {
		...mapMutations([
			'setSongInfo',
			'setSongList'
		]),
		// 搜索
		async getDetails() {
			if (this.isChange) {
				this.song = []
				this.singerList = []
				this.songList = []
				this.mvList = []
			}
			try {
				LOADING.show()
				const res = await HTTP.search(this.key, this.activeMenu)
				this.isChange = false
				if (res.code === 200) {
					switch (this.activeMenu) {
					case '1':
						this.handleSong(res)
						break
					case '100':
						this.handleSinger(res)
						break
					case '1000':
						this.handleSongList(res)
						break
					case '1004':
						this.handleMv(res)
						break
					}
				}
				await UTILS.sleep()
				LOADING.hide()
			} catch (error) {
				LOADING.hide()
				console.warn(error)
			}
		},
		// 单曲数据处理
		handleSong(res) {
			this.song = res.result.songs.map(item => {
				console.log(item)
				return {
					name: item.name,
					id: item.id,
					dvd: item.al.name,
					duration: item.dt,
					singer: item.ar[0].name,
					picUrl: item.al.picUrl
				}
			})
		},
		// 歌手数据处理
		handleSinger(res) {
			console.log(res)
			this.singerList = res.result.artists.map(item => {
				return {
					name: item.name,
					id: item.id,
					picUrl: item.img1v1Url,
					musicSize: item.albumSize
				}
			})
			console.log(this.singerList)
		},
		// 歌单数据处理
		handleSongList(res) {
			console.log(res)
			this.songList = res.result.playlists.map(item => {
				return {
					name: item.name,
					id: item.id,
					playCount: item.playCount,
					picUrl: item.coverImgUrl
				}
			})
		},
		// MV数据处理
		handleMv(res) {
			console.log(res)
			this.mvList = res.result.mvs.map(item => {
				return {
					artistName: item.artistName,
					id: item.id,
					cover: item.cover,
					name: item.name,
					duration: item.duration,
					playCount: item.playCount
				}
			})
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
			} catch (error) {
				console.warn(error)
			}
		}
	}
}
