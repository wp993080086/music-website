<template>
	<div id="head" class="pr flex">
		<!-- logo -->
		<div class="logo pr">
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
		<div class="right flex">
			<!-- 搜索 -->
			<div class="search" @click.self="toggleSearch(true)">
				<span v-if="!isSearch" class="hint" @click.self="toggleSearch(true)">搜索歌名/歌手</span>
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
			state: '',
			isSearch: false
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		// 切换tabs
		handleTabs(index) {
			console.log(index)
			this.nowIndex = index
		},
		// 开关搜索框
		toggleSearch(e) {
			this.isSearch = e
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
