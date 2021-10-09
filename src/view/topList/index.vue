<template>
	<div id="top_list" class="flex_c">
		<div class="content flex flex_s_b">
			<el-skeleton animated :loading="skeletonLoading" class="left">
				<template slot="template">
					<div class="w260">
						<el-skeleton-item
							v-for="item of 8"
							:key="item"
							variant="rect"
							style="width: 259px; height: 50px;margin-bottom:10px;"
						/>
					</div>
				</template>
				<template>
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
								<div class="item_hint flex flex_a_c">
									<span>{{ item.name }}</span>
								</div>
							</div>
						</div>
					</div>
				</template>
			</el-skeleton>
			<div class="right">
				<el-skeleton animated :loading="skeletonLoading" class="head flex flex_a_c">
					<template slot="template">
						<div class="w700 flex flex_s_a flex_a_c">
							<el-skeleton-item
								variant="image"
								style="width: 150px; height: 150px;"
							/>
							<div class="">
								<el-skeleton-item variant="rect" style="width: 500px;height:150px;" />
							</div>
						</div>
					</template>
					<template>
						<div class="head flex_c">
							<div class="head_logo">
								<el-image :src="listInfo.coverImgUrl + '?param=150y150'" :alt="listInfo.name">
									<div slot="placeholder" class="image-slot flex_c">
										<i class="el-icon-loading" />
									</div>
									<div slot="error" class="image-slot flex_c">
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
					</template>
				</el-skeleton>
				<el-skeleton animated :loading="skeletonLoading" class="song_list_hint">
					<template slot="template">
						<div class="w700_2">
							<el-skeleton-item
								v-for="item of 5"
								:key="item"
								variant="rect"
								style="width: 680px; height: 50px;margin-bottom: 10px;"
							/>
						</div>
					</template>
					<template>
						<div class="song_list_hint flex flex_s_b">
							<p>歌曲列表</p>
							<span>累计播放：{{ listInfo.playCount }}次</span>
						</div>
						<div class="song_list">
							<el-table :data="songList" stripe style="width: 100%" :header-cell-style="{ background:'#F2F2F2' }">
								<el-table-column type="index" width="50" />
								<el-table-column prop="name" label="歌名" />
								<el-table-column prop="duration" label="时长" width="100" />
								<el-table-column prop="singer" label="歌手" />
								<el-table-column prop="singer" label="播放" width="50">
									<template slot-scope="scope">
										<i class="play_icon h_hand el-icon-video-play" title="播放" @click="handlePlay(scope.row)" />
									</template>
								</el-table-column>
							</el-table>
						</div>
					</template>
				</el-skeleton>
			</div>
		</div>
	</div>
</template>

<script>
import mixin from '../../mixins/index'
import HTTP from '../../request/api/topListApi'
import { mapMutations } from 'vuex'

export default {
	name: 'TopList',
	mixins: [mixin],
	data() {
		return {
			topList: [],
			nowIndex: 0,
			listId: '',
			listInfo: {},
			songList: [],
			skeletonLoading: true
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
		...mapMutations([
			'setSongInfo',
			'setSongList'
		]),
		// 获取所有歌单
		async getTopList() {
			try {
				this.skeletonLoading = true
				const res = await HTTP.topList()
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
						id: item.id,
						picUrl: item.al.picUrl,
						singer: item.ar[0].name,
						singerId: item.ar[0].id,
						duration: UTILS.formatTime(item.dt)
					}
					list.push(obj)
				})
				this.songList = list
				this.skeletonLoading = false
			} catch (error) {
				console.warn(error)
			}
		},
		// 切换歌单
		handleChangeSongList(id, index) {
			this.listId = id
			this.nowIndex = index
			window.scrollTo({
				left: 0,
				top: 0,
				behavior: 'smooth'
			})
		},
		// 播放
		async handlePlay(data) {
			try {
				const res = await this.getSongUrl(data.id)
				if (!res[0].url || res[0].url === null) {
					TOAST.error('暂无版权')
					return
				}
				const param = {
					id: data.id,
					name: data.name,
					img: data.picUrl,
					singer: data.singer,
					path: res[0].url
				}
				this.setSongInfo(param)
				this.setSongList(param)
				const isShow = this.$store.state.isShowPlay
				if (!isShow) {
					this.$store.state.isShowPlay = true
				}
			} catch (error) {
				console.warn(error)
			}
		}
	}
}
</script>

<style lang='less' scoped src="./style.less"></style>
