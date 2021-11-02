<template>
	<div id="Song_list_datails">
		<div class="main flex flex_s_b">
			<div v-loading="loadingLeft" class="left p_box br4">
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
					<el-table :data="songDetailsList" stripe style="width: 100%">
						<el-table-column type="index" width="50" />
						<el-table-column prop="name" label="歌名" show-overflow-tooltip />
						<el-table-column prop="singer" label="歌手" width="120" />
						<el-table-column prop="dvd" label="专辑" show-overflow-tooltip />
						<el-table-column prop="duration" label="时长" show-overflow-tooltip width="100" />
						<el-table-column prop="operation" label="操作" width="50">
							<template slot-scope="scope">
								<i class="play_icon h_hand el-icon-video-play" title="播放" @click="handlePlay(scope.row)" />
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="right">
				<div v-loading="loadingLike" class="right_like p_box br4">
					<div class="title flex flex_a_c">
						<i class="el-icon-medal" />
						<span>喜欢歌单的人</span>
					</div>
					<div class="like_box flex flex_w_w flex_s_b">
						<div
							v-for="(item, index) in subscribersList"
							:key="index = item.userId"
							class="like_item"
						>
							<img
								:src="item.avatarUrl + '?param=40y40'"
								:alt="item.nickname"
								class="br4 h_hand"
								:title="item.nickname"
							>
						</div>
					</div>
				</div>
				<div v-loading="loadingComment" class="right_comment p_box br4">
					<div class="title flex flex_a_c">
						<i class="el-icon-edit" />
						<span>热门评论</span>
					</div>
					<div class="comment_box flex flex_w_w flex_s_b">
						<div
							v-for="(item, index) in songListComment"
							:key="index = item.time"
							class="comment_item flex flex_s_b"
						>
							<div class="left_info">
								<img :src="item.user.avatarUrl + '?param=40y40'" alt="info" :title="item.user.nickname" class="br4">
							</div>
							<div class="right_info">
								<p class="nickname">{{ item.user.nickname }}</p>
								<p class="text">{{ item.content }}</p>
							</div>
						</div>
					</div>
					<div class="comment_box">
						<div class="textarea">
							<el-input
								v-model.trim="textarea"
								type="textarea"
								maxlength="100"
								show-word-limit
								resize="none"
								placeholder="请输入评论内容"
							/>
						</div>
						<div class="comment_btn flex">
							<el-button type="primary" size="mini" @click="saveComment">提交评论</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
