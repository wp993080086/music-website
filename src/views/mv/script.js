import HTTP from '@/request/api/mvApi'
import mvBox from '../../components/mv'

export default {
	name: 'Mv',
	data() {
		return {
			mvType: '', // MV类型
			mvArea: '', // MV地区
			mvHot: '', // MV热度
			pageSize: 32,
			pageIndex: 0,
			areaList: [
				{ area: '全部', value: '' },
				{ area: '内地', value: '内地' },
				{ area: '港台', value: '港台' },
				{ area: '欧美', value: '欧美' },
				{ area: '日本', value: '日本' },
				{ area: '韩国', value: '韩国' }
			],
			typeList: [
				{ type: '全部', value: '' },
				{ type: '官方版', value: '官方版' },
				{ type: '现场版', value: '现场版' },
				{ type: '原生', value: '原生' },
				{ type: '网易出品', value: '网易出品' }
			],
			hotList: [
				{ hot: '上升最快', value: '' },
				{ hot: '最热', value: '最热' },
				{ hot: '最新', value: '最新' }
			],
			mvList: [], // MV列表
			skeletonLoading: true,
			isMore: false, // 是否还有更多
			pagingLoading: false
		}
	},
	components: {
		mvBox
	},
	async mounted() {
		this.skeletonLoading = true
		await UTILS.sleep()
		this.getMvList()
	},
	methods: {
		// 获取mv列表
		async getMvList() {
			const param = {
				type: this.mvType,
				area: this.mvArea,
				order: this.mvHot,
				limit: this.pageSize,
				offset: this.pageIndex
			}
			const res = await HTTP.mvList(param)
			this.mvList = res.data
			this.isMore = res.hasMore
			this.skeletonLoading = false
			this.pagingLoading = false
		},
		// 修改类型
		handleChangeType(v) {
			if (this.mvType !== v) {
				this.mvType = v
				this.getMvList()
			}
		},
		// 修改地区
		handleChangeArea(v) {
			console.log(v)
			if (this.mvArea !== v) {
				this.mvArea = v
				this.getMvList()
			}
		},
		// 修改热度
		handleChangeHot(v) {
			if (this.mvHot !== v) {
				this.mvHot = v
				this.getMvList()
			}
		},
		// 上一页
		handleUpPage() {
			this.pagingLoading = true
			this.pageIndex -= this.pageSize
			if (this.pageIndex <= 0) {
				this.pageIndex = 0
			}
			this.getMvList()
		},
		// 下一页
		handleDownPage() {
			this.pagingLoading = true
			if (this.isMore) {
				this.pageIndex += this.pageSize
				this.getMvList()
			}
		}
	}
}
