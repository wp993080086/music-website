<template>
	<div id="search" class="pf z1">
		<div class="close pa flex_c">
			<i class="el-icon-close" @click="handleClose" />
		</div>
		<div class="search_box pa ofh">
			<el-autocomplete
				v-model="state"
				popper-class="autocomplete"
				:fetch-suggestions="handleSearch"
				placeholder="搜索歌名/歌手"
				@select="handleSelect"
			>
				<i slot="prefix" class="el-icon-search el-input__icon" />
				<template slot-scope="{ item }">
					<div class="title">{{ item.value }}</div>
					<div class="subhead omit">{{ item.address }}</div>
				</template>
			</el-autocomplete>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Search',
	props: [],
	data() {
		return {
			restaurants: [],
			state: ''
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {
		this.restaurants = this.loadAll()
	},
	updated() {},
	methods: {
		handleClose() {
			console.log('关闭')
			this.$emit('handleClose', false)
		},
		// 搜索
		handleSearch(e, cb) {
			const restaurants = this.restaurants
			const results = e ? restaurants.filter(this.createFilter(e)) : restaurants
			// 调用 callback 返回建议列表的数据
			cb(results)
		},
		// 选中
		handleSelect(e) {
			console.log(e)
		},
		loadAll() {
			return [
				{ 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
				{ 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
				{ 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' }
			]
		},
		createFilter(queryString) {
			return (restaurant) => {
				return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
			}
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
