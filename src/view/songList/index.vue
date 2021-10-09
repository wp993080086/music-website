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
				<div class="menu_item pr">
					<div
						:class="['menu_text', 'h_hand', 'flex_c', songType === '更多' ? 'active':'']"
					>
						<span style="margin-right: 10px;">更多</span>
						<i v-show="!visible" class="el-icon-caret-right" @click="handleShowAll" />
						<i v-show="visible" class="el-icon-caret-left" @click="handleShowAll" />
					</div>
					<transition name="fade" mode="out-in" appear>
						<div v-show="visible" class="hide_box pa z1 br4">
							<div class="box">
								<div v-for="item in typeList" :key="item.name" class="label_item h_hand br50">
									<span @click="handleChangeType(item.name)">{{ item.name }}</span>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
			<el-skeleton animated :loading="skeleton" class="song_list_main flex flex_w_w">
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
					<template v-if="SongList.length > 0">
						<song-list
							v-for="(item, index) in SongList"
							:key="index + item.id"
							:list="item"
						/>
					</template>
					<template v-else>
						<el-empty description="暂无数据" />
					</template>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
