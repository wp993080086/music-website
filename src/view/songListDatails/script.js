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
			skeleton: true
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
	mounted() {},
	methods: {}
}
