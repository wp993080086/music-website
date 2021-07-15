<template>
	<div id="head" class="pr flex_c">
		<!-- logo -->
		<div class="logo pa">
			<img class="pa z1" :src="logo" alt="logo">
			<span>鹏多多</span>
		</div>
		<!-- 选项卡 -->
		<div class="tabs flex_c pr">
			<div
				v-for="(item, index) in tabs"
				:key="index"
				class="item flex_c"
				@click="handleTabs(index)"
			>
				<span>{{ item.title }}</span>
			</div>
			<div class="line pa">
				<div class="active_line pa" :style="{left: (nowIndex * 20) + '%'}" />
			</div>
		</div>
		<!-- 右侧 -->
		<div class="right pa flex">
			<!-- 搜索 -->
			<div class="search" @click.self="toggleSearch(true)">
				<span v-if="!isSearch" class="hint">搜索歌名/歌手</span>
				<!-- <el-autocomplete
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
				</el-autocomplete> -->
				<transition name="scale" mode="out-in">
					<Search v-if="isSearch" @handleClose="toggleSearch" />
				</transition>
			</div>
			<!-- 设置 -->
			<div class="setting flex_c">
				<el-dropdown>
					<span class="el-dropdown-link">
						<span>鹏多多iii</span>
						<i class="el-icon-arrow-down el-icon--right" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>注销</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import Search from '../search'

export default {
	name: 'Head',
	components: {
		Search
	},
	props: [],
	data() {
		this.tabs = [
			{
				title: '推荐',
				path: 'Recommend',
				index: 0
			},
			{
				title: '排行榜',
				path: 'RankingList',
				index: 1
			},
			{
				title: '歌单',
				path: 'SongList',
				index: 2
			},
			{
				title: '歌手',
				path: 'Singer',
				index: 3
			},
			{
				title: 'MV',
				path: 'Mv',
				index: 4
			}
		]
		return {
			logo: require('../../assets/icon/pdd.png'),
			nowIndex: 0,
			restaurants: [],
			state: '',
			isSearch: false
		}
	},
	watch: {},
	created() {},
	mounted() {
		this.restaurants = this.loadAll()
	},
	updated() {},
	methods: {
		handleTabs(index) {
			console.log(index)
			this.nowIndex = index
		},
		changeTheme() {
			document.documentElement.style.setProperty('--themeColor', '#e33100')
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
		},
		// 切换搜索框
		toggleSearch(e) {
			console.log(e)
			this.isSearch = e
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
