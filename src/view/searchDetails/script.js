import HTTP from '@/request/api/searchApi'

export default {
	name: 'SearchDetails',
	props: {
		id: {
			type: String,
			default: ''
		}
	},
	data() {
		return {}
	},
	mounted() {
		console.log(this.id)
		this.getSongDetails()
	},
	methods: {
		// 获取详情
		async getSongDetails() {
			const res = await HTTP.songDatails(this.id)
			console.log(res)
		}
	}
}
