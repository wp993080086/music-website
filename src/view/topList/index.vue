<template>
	<div id="top_list" class="flex_c">
		<div class="content flex flex_s_b">
			<div class="left">
				<h1 class="text_c">音乐排行榜</h1>
				<div class="ranking">
					<div
						v-for="(item, index) in topList"
						:key="index + item.id"
						:class="['ranking_item', 'flex_c', 'h_hand', nowIndex === index ? 'shadow': '']"
						@click="handleChangeSongList(item.id, index)"
					>
						<div class="item_logo ofh br4">
							<el-image :src="item.coverImgUrl + '?param=40y40'" :alt="item.name">
								<div slot="placeholder" class="image-slot flex_c">
									<i class="el-icon-loading" />
								</div>
							</el-image>
						</div>
						<div class="item_hint flex flex_a_c">{{ item.updateFrequency }}</div>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="head flex_c">
					<div class="head_logo">
						<el-image :src="listInfo.coverImgUrl + '?param=150y150'" :alt="listInfo.name">
							<div slot="placeholder" class="image-slot flex_c">
								<i class="el-icon-loading" />
							</div>
						</el-image>
					</div>
					<div class="head_info">
						<h2 class="info_title">{{ listInfo.name }}</h2>
						<div class="info_hint">{{ listInfo.description }}</div>
						<div class="info_data flex">
							<div class="info flex_c">评论：{{ listInfo.commentCount }}</div>
							<div class="info flex_c">分享：{{ listInfo.shareCount }}</div>
							<div class="info flex_c">订阅：{{ listInfo.subscribedCount }}</div>
						</div>
					</div>
				</div>
				<div class="song_list_hint flex flex_s_b">
					<p>歌曲列表</p>
					<span>累计播放：{{ listInfo.playCount }}次</span>
				</div>
				<div class="song_list">
					<el-table
						:data="songList"
						stripe
						style="width: 100%"
					>
						<el-table-column
							type="index"
							width="50"
						/>
						<el-table-column
							prop="name"
							label="歌名"
						/>
						<el-table-column
							prop="duration"
							label="时长"
							width="100"
						/>
						<el-table-column
							prop="singer"
							label="歌手"
						/>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HTTP from '../../request/api/topListApi'

export default {
	name: 'TopList',
	data() {
		return {
			topList: [],
			nowIndex: 0,
			listId: '',
			listInfo: {},
			songList: []
		}
	},
	watch: {
		listId: {
			handler(newVal, oldVal) {
				if (newVal && newVal !== oldVal) {
					this.getSongListDetail()
				}
			}
		}
	},
	created() {
		this.getTopList()
	},
	mounted() {},
	methods: {
		// 获取所有歌单
		async getTopList() {
			try {
				const res = await HTTP.topList()
				console.log(res)
				this.topList = res.list
				this.listId = res.list[0].id
			} catch (error) {
				console.warn(error)
			}
		},
		// 获取歌单详情
		async getSongListDetail() {
			try {
				const res = await HTTP.getSongListDetail(this.listId)
				this.listInfo = res.playlist
				const songList = res.playlist.tracks
				const list = []
				songList.forEach(item => {
					const obj = {
						name: item.al.name,
						id: item.al.id,
						picUrl: item.al.picUrl,
						singer: item.ar[0].name,
						singerId: item.ar[0].id,
						duration: UTILS.formatTime(item.dt)
					}
					list.push(obj)
				})
				this.songList = list
			} catch (error) {
				console.warn(error)
			}
		},
		// 切换歌单
		handleChangeSongList(id, index) {
			this.listId = id
			this.nowIndex = index
		}
	}
}
</script>

<style lang='less' scoped src="./style.less"></style>
