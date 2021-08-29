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
			<el-skeleton animated :loading="skeleton" class="song_list_main flex">
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
					<song-list
						v-for="(item, index) in SongList"
						:key="index + item.id"
						:list="item"
					/>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
