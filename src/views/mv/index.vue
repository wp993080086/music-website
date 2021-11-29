<template>
	<div id="mv">
		<!-- 地区 -->
		<div class="area flex">
			<div
				v-for="(item, index) in areaList"
				:key="index + item.area"
				:class="['area_item', 'flex_c', 'br8', 'h_hand', mvArea === item.value ? 'red' : '']"
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
				:class="['type_item', 'flex_c', 'h_hand', 'br8', mvType === item.value ? 'red' : '']"
				@click="handleChangeType(item.value)"
			>
				<span>{{ item.type }}</span>
			</div>
		</div>
		<!-- 热度 -->
		<div class="hot flex flex_w_w">
			<div
				v-for="(item, index) in hotList"
				:key="index + item"
				:class="['hot_item', 'flex_c', 'h_hand', 'br8', mvHot === item.value ? 'red' : '']"
				@click="handleChangeHot(item.value)"
			>
				<span>{{ item.hot }}</span>
			</div>
		</div>
		<!-- MV列表 -->
		<el-skeleton animated :loading="skeletonLoading" class="main flex flex_w_w flex_s_b">
			<template slot="template">
				<div class="w1200 flex flex_w_w flex_s_b">
					<div
						v-for="item of 8"
						:key="item"
						style="width: 280px; height: 250px; margin-bottom: 20px"
					>
						<el-skeleton-item
							variant="rect"
							style="width: 280px; height: 250px;"
						/>
					</div>
				</div>
			</template>
			<template>
				<div v-for="(item, index) in mvList" :key="index + item.artistId">
					<mv-box :mv-info="item" />
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

