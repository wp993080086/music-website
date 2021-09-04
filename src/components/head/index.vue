<template>
	<div id="head" class="pr flex">
		<!-- logo -->
		<div class="logo pr h_hand">
			<img class="pa z1" :src="logo" alt="logo">
			<span>鹏多多</span>
		</div>
		<!-- 选项卡 -->
		<div class="tabs flex_c pr">
			<div
				v-for="(item, index) in tabs"
				:key="index"
				class="item flex_c h_hand"
				@click="handleTabs(index, item.path)"
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
			<div class="setting flex_c h_hand">
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
				path: 'Index',
				index: 0
			},
			{
				title: '排行榜',
				path: 'TopList',
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
		this.menuIndex = [
			{ name: 'Index', index: 0 },
			{ name: 'TopList', index: 1 },
			{ name: 'SongList', index: 2 },
			{ name: 'SongListDetails', index: 2 },
			{ name: 'Singer', index: 3 },
			{ name: 'SingerDetails', index: 3 },
			{ name: 'Mv', index: 4 },
			{ name: 'MvDetails', index: 4 }
		]
		return {
			logo: require('../../assets/icon/pdd.png'),
			nowIndex: 0,
			state: '',
			isSearch: false
		}
	},
	watch: {
		'$route'(to, from) {
			const name = to.name
			const path = this.menuIndex.find(item => {
				return name === item.name
			})
			this.nowIndex = path.index
		}
	},
	methods: {
		// 切换tabs
		handleTabs(index, path) {
			this.nowIndex = index
			const nowPath = this.$route.path.split('/')[1].toLowerCase()
			if (path.toLowerCase() === nowPath) return
			this.$router.push({
				name: path
			})
		},
		// 开关搜索框
		toggleSearch(e) {
			this.isSearch = e
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
