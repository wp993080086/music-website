<template>
	<div id="index">
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
				<div
					v-for="(item, index) in SongList"
					:key="index + item.id"
					class="song_item pr"
				>
					<img :src="item.picUrl" alt="歌单封面" class="br2" @click="toSongListDetails(item.id)">
					<div class="shadow pa flex flex_s_b flex_a_c br2">
						<div class="shadow_left omit">
							<i class="el-icon-service" />
							<span>{{ playCount(item.playCount) }}</span>
						</div>
						<div class="shadow_rignt">
							<i class="fr el-icon-video-play" title="播放" />
						</div>
					</div>
					<div class="introduce omit2">
						{{ item.name }}
					</div>
				</div>
			</template>
		</el-skeleton>
		<Title title="推荐歌曲" type="1" @handleToMore="toMore" />
		<!-- 推荐歌曲 -->
		<el-skeleton animated :loading="skeletonC" :rows="5" class="recommend_list flex flex_s_b">
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
					class="singer_item flex flex_a_c br4"
				>
					<div class="item_index flex_c">{{ index + 1 }}</div>
					<div class="item_img ofh br2">
						<img :src="item.picUrl">
					</div>
					<div class="song_name flex_c omit">
						<p class="omit">{{ item.name }}</p>
					</div>
					<div class="singer_name flex_c">
						<span>{{ item.song.album.artists[0].name }}</span>
					</div>
					<div class="item_play flex_c">
						<i
							class="el-icon-video-play"
							title="播放"
							@click="handlePlay(item.id, item.name, item.picUrl, item.song.album.artists[0].name)"
						/>
					</div>
				</div>
			</template>
		</el-skeleton>
		<Title title="推荐歌手" type="2" @handleToMore="toMore" />
		<!-- 推荐歌手 -->
		<el-skeleton animated :loading="skeletonD" class="singer_list flex">
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
					class="singer_item flex flex_a_c flex_d_y"
				>
					<div class="singer_photograph br50 ofh">
						<img :src="item.picUrl" @click="toSingerDetails(item.id)">
					</div>
					<div class="singer_name flex_c">
						<p>{{ item.name }}</p>
					</div>
					<div class="singer_hint flex_c">
						<p>收录单曲：{{ item.musicSize }}首</p>
					</div>
				</div>
			</template>
		</el-skeleton>
		<my-player />
	</div>
</template>

<script>
import mixin from '../../mixins/path'
import HTTP from '../../request/api/indexApi'
import Banner from '../../components/banner'
import Title from './component/titleLine'
import myPlayer from '../../components/player'

export default {
	name: 'Index',
	components: {
		Banner,
		Title,
		myPlayer
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
	computed: {
		// 播放数转成万为单位
		playCount() {
			return (num) => {
				const count = this.$fn.tranNumber(num, 0)
				return count
			}
		}
	},
	async created() {
		await this.$fn.sleep()
		this.getBanner()
		this.getRecommendSongList()
		this.getRecommendSong()
		this.getTopSinger()
	},
	mounted() {},
	methods: {
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
		// 去歌单详情
		toSongListDetails(id) {
			this.$info.info(id)
		},
		// 去歌手详情
		toSingerDetails(id) {
			this.$info.info(id)
		},
		// 播放
		async handlePlay(id, name, img, singer) {
			const res = await this.getSongUrl(id)
			const param = {
				id,
				name,
				img,
				singer,
				path: res[0].url
			}
			this.$store.commit('setSongInfo', param)
		}
	}
}
</script>

<style src="./style.less" lang="less" scoped></style>
