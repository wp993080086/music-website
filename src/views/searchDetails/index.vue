<template>
	<div id="search_details">
		<div class="search flex_c">
			<div class="search_main flex_c">
				<el-input v-model="key" placeholder="请输入内容" clearable suffix-icon="el-icon-search" @change="getDetails" />
			</div>
		</div>
		<!-- tab -->
		<div class="tabs p_box br4">
			<el-tabs v-model="activeMenu">
				<el-tab-pane
					v-for="(menu, index) in menuList"
					:key="menu.name + index"
					:label="menu.label"
					:name="menu.name"
				>
					<template v-if="activeMenu === '1'">
						<el-table :data="song" stripe style="width: 100%">
							<el-table-column type="index" label="序号" width="50" />
							<el-table-column prop="name" label="歌名" show-overflow-tooltip />
							<el-table-column prop="singer" label="歌手" />
							<el-table-column prop="dvd" label="专辑" show-overflow-tooltip />
							<el-table-column prop="duration" label="时长" width="100">
								<template slot-scope="scope">
									<span>{{ time(scope.row.duration) }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="operation" label="操作" width="80">
								<template slot-scope="scope">
									<i class="play_icon h_hand el-icon-video-play" @click="handlePlay(scope.row)" />
								</template>
							</el-table-column>
						</el-table>
					</template>
					<template v-else-if="activeMenu === '100'">
						<div class="flex flex_s_a flex_w_w">
							<div v-for="(item, idx) in singerList" :key="idx + item">
								<singer :singer-info="item" />
							</div>
						</div>
					</template>
					<template v-else-if="activeMenu === '1000'">
						<div class="flex flex_s_a flex_w_w">
							<div v-for="(item, i) in songList" :key="i + item">
								<song-list :list="item" />
							</div>
						</div>
					</template>
					<template v-else>
						<div class="flex flex_s_a flex_w_w">
							<div v-for="(item, k) in mvList" :key="k + item">
								<mv-box :mv-info="item" />
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

