<template>
	<div id="index" class="index">
		<Banner :banner-list="bannerList" :skeleton="skeletonA" />
		<Title title="推荐歌单" type="0" @handleToMore="toMore" />
		<!-- 推荐歌单 -->
		<el-skeleton animated :loading="skeletonB" class="song_list flex flex_s_b">
			<template slot="template">
				<div class="w1200 flex flex_w_w flex_s_b">
					<div
						v-for="item of 18"
						:key="item"
						style="width: 200px; height: 220px; margin-bottom:20px;"
					>
						<el-skeleton-item
							variant="rect"
							style="width: 160px; height: 220px;"
						/>
					</div>
				</div>
			</template>
			<template>
				<song-list
					v-for="(item, index) in SongList"
					:key="index + item.id"
					:list="item"
				/>
			</template>
		</el-skeleton>
		<Title title="推荐歌曲" type="1" @handleToMore="toMore" />
		<!-- 推荐歌曲 -->
		<el-skeleton animated :loading="skeletonC" :rows="5" class="recommend_list flex flex_s_b flex_w_w">
			<template slot="template">
				<div class="w1200 flex flex_w_w flex_s_b">
					<div
						v-for="item of 10"
						:key="item"
						style="width: 580px; height: 70px; margin-bottom: 20px"
					>
						<el-skeleton-item
							variant="rect"
							style="width: 580px; height: 70px;"
						/>
					</div>
				</div>
			</template>
			<template>
				<div
					v-for="(item, index) in recommendSongList"
					:key="index + item.id"
				>
					<song :song-info="item" :index="index" />
				</div>
			</template>
		</el-skeleton>
		<Title title="推荐歌手" type="2" @handleToMore="toMore" />
		<!-- 推荐歌手 -->
		<el-skeleton animated :loading="skeletonD" class="singer_list flex flex_w_w">
			<template slot="template">
				<div class="w1200 flex flex_w_w flex_s_b">
					<div
						v-for="item of 28"
						:key="item"
						style="width: 160px; height: 220px; margin-bottom: 20px"
					>
						<el-skeleton-item
							variant="circle"
							style="width: 160px; height: 220px;"
						/>
					</div>
				</div>
			</template>
			<template>
				<div
					v-for="(item, index) in singerList"
					:key="index + item.picId"
				>
					<singer :singer-info="item" />
				</div>
			</template>
		</el-skeleton>
	</div>
</template>

<script>
import mixin from '../../mixins/path'
import HTTP from '../../request/api/indexApi'
import Banner from '../../components/banner'
import Title from './component/titleLine'
import songList from '../../components/songList'
import song from '../../components/song'
import singer from '../../components/singer'
import { mapMutations } from 'vuex'

export default {
	name: 'Index',
	components: {
		Banner,
		Title,
		songList,
		song,
		singer
	},
	mixins: [mixin],
	data() {
		return {
			bannerList: [],
			SongList: [],
			recommendSongList: [],
			singerList: [],
			skeletonA: true,
			skeletonB: true,
			skeletonC: true,
			skeletonD: true
		}
	},
	computed: {},
	async created() {
		await UTILS.sleep()
		this.getBanner()
		this.getRecommendSongList()
		this.getRecommendSong()
		this.getTopSinger()
	},
	mounted() {},
	methods: {
		...mapMutations([
			'setSongInfo',
			'setSongList'
		]),
		// 获取banner图
		async getBanner() {
			try {
				const res = await HTTP.banner()
				if (res.code === 200) {
					this.bannerList = res.banners
					this.skeletonA = false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		// 获取推荐歌单
		async getRecommendSongList() {
			try {
				const res = await HTTP.recommendSongList()
				if (res.code === 200) {
					this.SongList = res.result
					this.skeletonB = false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		// 获取推荐新音乐
		async getRecommendSong() {
			try {
				const res = await HTTP.recommendSong()
				if (res.code === 200) {
					this.recommendSongList = res.result
					this.skeletonC = false
					this.setOneSong()
				}
			} catch (error) {
				console.warn(error)
			}
		},
		// 获取热门歌手
		async getTopSinger() {
			try {
				const res = await HTTP.topSinger()
				if (res.code === 200) {
					this.singerList = res.artists
					this.skeletonD = false
				}
			} catch (error) {
				console.warn(error)
			}
		},
		// 去更多
		toMore(type) {
			switch (type) {
			case 	'0':
				console.log('0')
				break
			case 	'1':
				console.log('1')
				break
			case 	'2':
				console.log('2')
				break
			}
		},
		// 把第一首放入正在播放列表
		async setOneSong() {
			const list = this.recommendSongList[0]
			const res = await this.getSongUrl(list.id)
			const param = {
				id: list.id,
				name: list.name,
				img: list.picUrl,
				singer: list.song.album.artists[0].name,
				path: res[0].url
			}
			this.setSongInfo(param)
			this.setSongList(param)
		}
	}
}
</script>

<style src="./style.less" lang="less" scoped></style>
