<template>
	<div id="top_list" class="flex_c">
		<div class="content">
			<div class="left fl">
				<h1 class="text_c">音乐排行榜</h1>
				<div class="ranking">
					<div
						v-for="(item, index) in topList"
						:key="index + item.id"
						:class="['ranking_item', 'flex_c', 'h_hand', nowIndex === index ? 'shadow': '']"
						@click="handleChangeSongList(item.id, index)"
					>
						<div class="item_logo ofh br4">
							<img :src="item.coverImgUrl + '?param=40y40'" :alt="item.name">
						</div>
						<div class="item_hint flex flex_a_c">{{ item.updateFrequency }}</div>
					</div>
				</div>
			</div>
			<div class="right fr">
				<div class="head">
					<div class="head_logo">
						<!-- <img :src="item.coverImgUrl + '?param=240y240'" :alt="item.name"> -->
					</div>
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
			listId: ''
		}
	},
	watch: {
		listId: {
			handler(newVal, oldVal) {
				console.log(newVal, oldVal)
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
				console.log(res)
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
