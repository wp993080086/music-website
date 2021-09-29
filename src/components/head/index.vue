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
				<el-dropdown @command="handleDownClick">
					<span class="el-dropdown-link omit">
						<span>{{ userMsg.nickname || '暂未登录' }}</span>
						<i class="el-icon-arrow-down el-icon--right" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<template v-if="userMsg.nickname">
							<el-dropdown-item command="2">注销</el-dropdown-item>
							<el-dropdown-item command="1">登出</el-dropdown-item>
						</template>
						<template v-else>
							<el-dropdown-item command="0">去登录</el-dropdown-item>
						</template>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import Search from '../search'
import { mapState } from 'vuex'

export default {
	name: 'Head',
	components: {
		Search
	},
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
			{ name: 'MvDetails', index: 4 },
			{ name: 'SearchDetails', index: 0 }
		]
		return {
			logo: require('../../assets/icon/pdd.png'),
			nowIndex: 0,
			state: '',
			isSearch: false
		}
	},
	computed: {
		...mapState([
			'userMsg'
		])
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
		},
		// 下拉菜单选项
		handleDownClick(e) {
			switch (e) {
			case '0':
				this.$router.push({
					name: 'Login'
				})
				break
			case '1':
				TOAST.confirm('确认登出吗？')
					.then(() => {
						this.$store.commit('clearUserMsg', {})
						document.cookie = ''
						this.$router.push({
							name: 'Login'
						})
					})
					.catch(() => {})
				break
			case '2':
				this.$store.commit('clearUserMsg', {})
				document.cookie = ''
				TOAST.success('注销成功')
			}
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
