<template>
	<div id="mv_details" class="flex flex_s_b">
		<div class="left">
			<div class="play p_box br4">
				<div id="play_main" />
				<div class="play_info">
					<div class="mv_title">
						<el-tag size="mini" type="danger">MV</el-tag>
						<span class="title">{{ detailList.artistName }} - 《{{ detailList.name }}》</span>
					</div>
					<div class="info_group">
						<span>发布时间：<span class="red">{{ detailList.publishTime }}</span></span>
						<span>播放次数：<span class="red">{{ detailList.playCount }}</span></span>
						<span>已有「<span class="red">{{ detailList.shareCount }}</span>」人转发</span>
					</div>
				</div>
			</div>
			<!-- 评论 -->
			<div v-loading="loadingComment" class="comment p_box br4">
				<div class="comment_box">
					<div class="textarea">
						<el-input
							v-model.trim="textarea"
							type="textarea"
							maxlength="100"
							show-word-limit
							resize="none"
							:placeholder="cookie === null ? '请先登录再评论' : '请输入评论内容'"
							:disabled="cookie === null"
						/>
					</div>
					<div class="comment_btn flex">
						<el-button type="primary" size="mini" :disabled="cookie === null" @click="saveComment">提交评论</el-button>
					</div>
				</div>
				<div class="title_line">
					<div class="module_line">
						<div class="module_title pr flex flex_s_b">
							<span class="hint">热门评论</span>
						</div>
					</div>
				</div>
				<div class="comment_main flex flex_w_w flex_s_b">
					<div
						v-for="(item, index) in commentList"
						:key="index = item.time"
						class="comment_item flex flex_s_b"
					>
						<div class="left_info">
							<img :src="item.user.avatarUrl + '?param=40y40'" alt="info" :title="item.user.nickname" class="br50">
						</div>
						<div class="right_info">
							<div class="flex flex_s_b">
								<span class="nickname">{{ item.user.nickname }}</span>
								<span>{{ timeToDate(item.time) }}</span>
							</div>
							<p class="text">{{ item.content }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right p_box br4">
			<div class="title">
				<span>相似视频</span>
			</div>
			<div
				v-for="(item, index) in similarList"
				:key="index + id"
				class="mv_box flex flex_d_y flex_s_b br4 ofh"
			>
				<div class="mv_main ofh pr h_hand" @click="handleChangeURL(item.id)">
					<el-image :src="item.cover + '?param=260y150'" :lazy="true">
						<div slot="placeholder" class="image-slot flex_c">
							<i class="el-icon-loading" />
						</div>
					</el-image>
					<div class="shadow pa flex_c">
						<i class="play_info el-icon-video-play" />
					</div>
				</div>
				<div class="mv_info flex flex_d_y">
					<div class="mv_info_item flex flex_a_c">
						{{ item.artistName }} - {{ item.name }}
					</div>
					<div class="mv_info_item flex flex_a_c">
						时长：{{ time(item.duration) }}
					</div>
					<div class="mv_info_item flex flex_a_c">
						播放量：{{ playCount(item.playCount) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
