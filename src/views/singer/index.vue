<template>
	<div id="singer">
		<!-- 地区 -->
		<div class="area flex">
			<div
				v-for="(item, index) in areaList"
				:key="index + item.area"
				:class="['area_item', 'flex_c', 'br8', 'h_hand', singerArea === item.value ? 'red' : '']"
				@click="handleChangeArea(item.value)"
			>
				<span>{{ item.area }}</span>
			</div>
		</div>
		<!-- 类型 -->
		<div class="type flex">
			<div
				v-for="(item, index) in typeList"
				:key="index + item.type"
				:class="['type_item', 'flex_c', 'br8', 'h_hand', singerType === item.value ? 'red' : '']"
				@click="handleChangeType(item.value)"
			>
				<span>{{ item.type }}</span>
			</div>
		</div>
		<!-- 首字母 -->
		<div class="initial flex flex_w_w">
			<div
				:class="['initial_item2', 'flex_c', 'br8', 'h_hand', singerInitial === -1 ? 'red' : '']"
				@click="handleChangeInitial(-1)"
			>
				热门
			</div>
			<div
				v-for="(item, index) in initialList"
				:key="index + item"
				:class="['initial_item', 'flex_c', 'br50', 'h_hand', singerInitial === item ? 'red' : '']"
				@click="handleChangeInitial(item)"
			>
				<span>{{ big(item) }}</span>
			</div>
			<div
				:class="['initial_item2', 'flex_c', 'br8', 'h_hand', singerInitial === 0 ? 'red' : '']"
				@click="handleChangeInitial(0)"
			>
				其他
			</div>
		</div>
		<!-- 歌手 -->
		<el-skeleton animated :loading="skeletonLoading" class="main flex flex_w_w flex_s_b">
			<template slot="template">
				<div class="w1200 flex flex_w_w flex_s_b">
					<div
						v-for="item of 28"
						:key="item"
						style="width: 160px; height: 220px; margin-bottom: 20px"
					>
						<el-skeleton-item variant="circle" style="width: 160px; height: 220px;" />
					</div>
				</div>
			</template>
			<template>
				<div
					v-for="(item, index) in singerList"
					:key="index + item.picId"
				>
					<singer :singer-info="item" />
				</div>
			</template>
		</el-skeleton>
		<!-- 翻页 -->
		<div class="paging flex_c">
			<el-button :disabled="pageIndex === 0" :loading="pagingLoading" type="primary" class="up" size="small" @click="handleUpPage">上一页</el-button>
			<el-button :disabled="!isMore" :loading="pagingLoading" type="primary" class="down" size="small" @click="handleDownPage">下一页</el-button>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
