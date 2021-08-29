<template>
	<div id="singer">
		<!-- 地区 -->
		<div class="area flex">
			<div
				v-for="(item, index) in areaList"
				:key="index + item.area"
				:class="['area_item', 'flex_c', 'br8', singerArea === item.value ? 'red' : '']"
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
				:class="['type_item', 'flex_c', 'br8', singerType === item.value ? 'red' : '']"
				@click="handleChangeType(item.value)"
			>
				<span>{{ item.type }}</span>
			</div>
		</div>
		<!-- 首字母 -->
		<div class="initial flex flex_w_w">
			<div
				:class="['initial_item2', 'flex_c', 'br8', singerInitial === -1 ? 'red' : '']"
				@click="handleChangeInitial(-1)"
			>
				热门
			</div>
			<div
				v-for="(item, index) in initialList"
				:key="index + item"
				:class="['initial_item', 'flex_c', 'br50', singerInitial === item ? 'red' : '']"
				@click="handleChangeInitial(item)"
			>
				<span>{{ big(item) }}</span>
			</div>
			<div
				:class="['initial_item2', 'flex_c', 'br8', singerInitial === 0 ? 'red' : '']"
				@click="handleChangeInitial(0)"
			>
				其他
			</div>
		</div>
		<div class="main flex flex_w_w flex_s_b">
			<div
				v-for="(item, index) in singerList"
				:key="index + item.picId"
			>
				<singer :singer-info="item" />
			</div>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
