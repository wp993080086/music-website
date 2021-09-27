<template>
	<div id="singer_details">
		<div class="singer_info">
			<div class="singer_img flex_c">
				<img :src="info.img1v1Url + '?param=200y200'" alt="歌手写真" class="br50">
			</div>
			<div class="singer_name flex_c">
				<p>{{ info.name }}</p>
			</div>
			<div class="singer_laber flex flex_d_y flex_a_c">
				<div class="laber_emoji flex flex_s_b">
					<div class="flex_c"><i class="iconfont pdd-music" /></div>
					<div class="flex_c"><i class="iconfont pdd-p_mv" /></div>
					<div class="flex_c"><i class="iconfont pdd-gp" /></div>
				</div>
				<div class="laber_txt flex flex_s_b">
					<div class="flex_c"><span>{{ info.musicSize }}</span></div>
					<div class="flex_c"><span>{{ info.mvSize }}</span></div>
					<div class="flex_c"><span>{{ info.albumSize }}</span></div>
				</div>
			</div>
		</div>
		<div class="singer_song p_box br4">
			<el-tabs v-model="activeMenu" @tab-click="handleChengeMenu">
				<el-tab-pane
					v-for="(menu, index) in menuList"
					:key="menu.name + index"
					:label="menu.label"
					:name="menu.name"
				>
					<template v-if="activeMenu === 'song'">
						<el-table :data="songList" stripe style="width: 100%">
							<el-table-column type="index" label="序号" width="50" />
							<el-table-column prop="name" label="歌名" show-overflow-tooltip />
							<el-table-column prop="singer" label="歌手" />
							<el-table-column prop="dvd" label="专辑" show-overflow-tooltip />
							<el-table-column prop="duration" label="时长" width="100" />
						</el-table>
					</template>
					<template v-else-if="activeMenu === 'mv'">
						<div class="mv_box">
							<div v-for="item in mvList" :key="item.artistId">
								<mv-box :mv-info="item" :w="260" />
							</div>
						</div>
					</template>
					<template v-else>
						<div class="presentation_box">
							<div class="base">
								<p class="base_title">歌手介绍</p>
							</div>
							<div class="base">
								<p class="text">{{ infoList.briefDesc }}</p>
							</div>
							<div v-for="(item, idx) in infoList.introduction" :key="idx + item.ti">
								<div class="base">
									<p class="base_title">{{ item.ti }}</p>
								</div>
								<div class="base">
									<p class="text">{{ item.txt }}</p>
								</div>
							</div>
						</div>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
