<template>
	<div id="Song_list_datails">
		<div class="main flex flex_s_b">
			<div class="left">
				<div class="left_head flex flex_s_b">
					<div class="song_list_img">
						<img :src="detailsList.coverImgUrl + '?param=150y150'" alt="封面" class="br8">
					</div>
					<div class="song_list_info">
						<div class="song_list_title">
							<h1>{{ detailsList.name }}</h1>
						</div>
						<div class="song_list_hint">
							<span style="margin-right:20px;">评论数量：{{ detailsList.commentCount }}</span>
							<span>播放数量：{{ detailsList.playCount }}</span>
						</div>
						<div class="song_list_label flex flex_a_c">
							<span class="big">标签：</span>
							<div
								v-for="(item, index) in detailsList.tags"
								:key="item + index"
								class="label_item flex_c br8"
							>
								<span>{{ item }}</span>
							</div>
						</div>
						<div class="song_list_message omit2">
							<span class="big">描述：</span>
							<span>{{ detailsList.description }}</span>
						</div>
					</div>
				</div>
				<div class="left_table">
					<el-table
						:data="songDetailsList"
						stripe
						style="width: 100%"
					>
						<el-table-column type="index" width="50" />
						<el-table-column prop="name" label="歌名" show-overflow-tooltip />
						<el-table-column prop="singer" label="歌手" width="120" />
						<el-table-column prop="dvd" label="专辑" show-overflow-tooltip />
						<el-table-column prop="duration" label="时长" show-overflow-tooltip width="100" />
					</el-table>
				</div>
			</div>
			<div class="right">2</div>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
