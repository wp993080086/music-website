<template>
	<div id="song_list">
		<!-- 推荐歌单 -->
		<div class="song_content flex">
			<div class="song_menu">
				<div
					v-for="item in menuList"
					:key="item"
					class="menu_item"
				>
					<div
						:class="['menu_text', 'h_hand', 'flex_c', songType === item ? 'active':'']"
						@click="handleChangeType(item)"
					>
						{{ item }}
					</div>
				</div>
			</div>
			<el-skeleton animated :loading="skeleton" class="song_list_main flex flex_s_b">
				<template slot="template">
					<div class="w1200 flex flex_w_w flex_s_b">
						<div
							v-for="item of 20"
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
						<img :src="item.coverImgUrl" alt="歌单封面" class="br2" @click="toSongListDetails(item.id)">
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
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
