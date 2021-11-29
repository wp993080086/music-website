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
			<div class="search flex_c">
				<el-input v-model.trim="searchValue" placeholder="请搜索关键词" clearable @keyup.enter.native="handleSearchClick()">
					<el-button slot="append" icon="el-icon-search" @click="handleSearchClick" />
				</el-input>
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
							<el-dropdown-item command="3">查看信息</el-dropdown-item>
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
		<el-dialog title="用户信息" :visible.sync="isVisible" width="600px">
			<div class="info_box flex">
				<div class="portrait">
					<img :src="userMsg.avatarUrl">
				</div>
				<div class="right_box">
					<div class="nickname">昵称：{{ userMsg.nickname || '暂无名称' }}</div>
					<div class="desc">个性签名：{{ userMsg.signature || '这个人很懒，没有个人签名~' }}</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'Head',
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
			searchValue: '',
			isVisible: false
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
		...mapMutations([
			'clearUserMsg'
		]),
		// 切换tabs
		handleTabs(index, path) {
			this.nowIndex = index
			const nowPath = this.$route.path.split('/')[1].toLowerCase()
			if (path.toLowerCase() === nowPath) return
			this.$router.push({
				name: path
			})
		},
		// 开始搜索
		handleSearchClick() {
			const keyword = this.searchValue
			this.$router.push({
				name: 'SearchDetails',
				params: { keyword }
			})
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
						this.clearUserMsg()
						this.$router.push({
							name: 'Login'
						})
					})
					.catch(() => {})
				break
			case '2':
				this.clearUserMsg()
				TOAST.success('注销成功')
				break
			case '3':
				this.isVisible = true
				break
			}
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
