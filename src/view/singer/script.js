import HTTP from '@/request/api/singerApi'
import singer from '../../components/singer'

export default {
	name: 'Singer',
	data() {
		return {
			singerType: -1, // 歌手类型
			singerArea: -1, // 歌手地区
			singerInitial: -1, // 歌手首字母
			pageSize: 35,
			pageIndex: 0,
			areaList: [
				{ area: '全部', value: -1 },
				{ area: '华语', value: 7 },
				{ area: '欧美', value: 96 },
				{ area: '日本', value: 8 },
				{ area: '韩国', value: 16 },
				{ area: '其他', value: 0 }
			],
			typeList: [
				{ type: '全部', value: -1 },
				{ type: '男歌手', value: 1 },
				{ type: '女歌手', value: 2 },
				{ type: '乐队', value: 3 }
			],
			initialList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'l', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
			singerList: [] // 歌手列表
		}
	},
	components: {
		singer
	},
	mounted() {
		this.getSingerList()
	},
	computed: {
		big() {
			return (val) => {
				return val.toUpperCase()
			}
		}
	},
	methods: {
		// 获取歌手列表
		async getSingerList() {
			const param = {
				type: this.singerType,
				area: this.singerArea,
				initial: this.singerInitial,
				limit: this.pageSize,
				offset: this.pageIndex
			}
			const res = await HTTP.singerList(param)
			this.singerList = res.artists
		},
		// 修改类型
		handleChangeType(v) {
			if (this.singerType !== v) {
				this.singerType = v
				this.getSingerList()
			}
		},
		// 修改地区
		handleChangeArea(v) {
			if (this.singerArea !== v) {
				this.singerArea = v
				this.getSingerList()
			}
		},
		// 修改首字母
		handleChangeInitial(v) {
			if (this.singerInitial !== v) {
				this.singerInitial = v
				this.getSingerList()
			}
		}
	}
}
