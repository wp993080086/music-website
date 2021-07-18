<template>
	<div id="index">
		<Banner :banner-list="bannerList" />
		<!-- 标题 -->
		<div class="module_line">
			<div class="module_title pr flex flex_s_b">
				<span class="hint">推荐歌单</span>
				<div class="more">
					<span>更多</span>
					<i class="el-icon-right" />
				</div>
			</div>
		</div>
		<!-- 推荐歌单 -->
		<div class="song_list flex flex_s_b">
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
		</div>
		<!-- 标题 -->
		<div class="module_line">
			<div class="module_title pr flex flex_s_b">
				<span class="hint">推荐歌曲</span>
				<div class="more">
					<span>更多</span>
					<i class="el-icon-right" />
				</div>
			</div>
		</div>
		<!-- 推荐歌曲 -->
		<div class="recommend_list flex flex_s_b">
			<div
				v-for="(item, index) in recommendSongList"
				:key="index + item.id"
				class="singer_item flex flex_a_c br4"
			>
				<div class="item_index flex_c">{{ index + 1 }}</div>
				<div class="item_img ofh br2">
					<el-image
						style="width: 50px; height: 50px"
						:src="item.picUrl"
						lazy="recommend_list"
						fit="cover"
					>
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline" />
						</div>
						<div slot="placeholder" class="image_slot flex_c">
							<i class="el-icon-loading" />
						</div>
					</el-image>
				</div>
				<div class="song_name flex_c omit">
					<p class="omit">{{ item.name }}</p>
				</div>
				<div class="singer_name flex_c">
					<span>{{ item.song.album.artists[0].name }}</span>
				</div>
				<div class="item_play flex_c">
					<i class="el-icon-video-play" title="播放" />
				</div>
			</div>
		</div>
		<!-- 标题 -->
		<div class="module_line">
			<div class="module_title pr flex flex_s_b">
				<span class="hint">推荐歌手</span>
				<div class="more">
					<span>更多</span>
					<i class="el-icon-right" />
				</div>
			</div>
		</div>
		<!-- 推荐歌手 -->
		<div class="singer_list flex">
			<div
				v-for="(item, index) in singerList"
				:key="index + item.picId"
				class="singer_item flex flex_a_c flex_d_y"
			>
				<div class="singer_photograph br50 ofh">
					<el-image
						style="width: 100px; height: 100px"
						:src="item.picUrl"
						lazy="singer_list"
						fit="cover"
					>
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline" />
						</div>
						<div slot="placeholder" class="image_slot flex_c">
							<i class="el-icon-loading" />
						</div>
					</el-image>
				</div>
				<div class="singer_name flex_c">
					<p>{{ item.name }}</p>
				</div>
				<div class="singer_hint flex_c">
					<p>收录单曲：{{ item.musicSize }}首</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HTTP from '../../request/api/indexApi'
import Banner from '../../components/banner'

export default {
	name: 'Index',
	components: {
		Banner
	},
	data() {
		return {
			bannerList: [],
			SongList: [],
			recommendSongList: [],
			singerList: []
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
	created() {
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
				if (res.code === 200) this.bannerList = res.banners
			} catch (error) {
				console.warn(error)
			}
		},
		// 获取推荐歌单
		async getRecommendSongList() {
			try {
				const res = await HTTP.recommendSongList()
				if (res.code === 200) this.SongList = res.result
			} catch (error) {
				console.warn(error)
			}
		},
		// 获取推荐新音乐
		async getRecommendSong() {
			try {
				const res = await HTTP.recommendSong()
				if (res.code === 200) this.recommendSongList = res.result
			} catch (error) {
				console.warn(error)
			}
		},
		// 获取热门歌手
		async getTopSinger() {
			try {
				const res = await HTTP.topSinger()
				if (res.code === 200) this.singerList = res.artists
			} catch (error) {
				console.warn(error)
			}
		},
		// 去歌单详情
		toSongListDetails(id) {
			this.$info.info(id)
		}
	}
}
</script>

<style src="./style.less" lang="less" scoped></style>
