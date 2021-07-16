<template>
	<div id="search" class="pf z9">
		<div class="close pa flex_c" title="关闭" @click="handleClose">
			<i class="el-icon-close" />
		</div>
		<div class="search_box pa ofh">
			<el-autocomplete
				v-model.trim="keywords"
				popper-class="autocomplete"
				:fetch-suggestions="handleSearch"
				placeholder="搜索歌名/歌手"
				clearable
				:trigger-on-focus="false"
				@select="handleSelect"
			>
				<i slot="prefix" class="el-icon-search el-input__icon" />
				<template slot-scope="{ item }">
					<div class="title">{{ item.title }}</div>
					<div class="subhead omit">{{ item.details.join('、') }}</div>
				</template>
			</el-autocomplete>
		</div>
	</div>
</template>

<script>
import HTTP from '../../request/api/searchApi'

export default {
	name: 'Search',
	data() {
		return {
			keywords: '',
			searchResult: [],
			onKey: {}
		}
	},
	methods: {
		// 关闭
		handleClose() {
			this.$emit('handleClose', false)
		},
		// 选中
		handleSelect(e) {
			this.onKey = e
			console.log(this.onKey)
		},
		// 搜索
		async handleSearch(keywords, cb) {
			if (!this.keywords) return
			try {
				const res = await HTTP.search(this.keywords)
				console.log(res.result.songs)
				if (res.code === 200 && res.result && res.result.songs) {
					const arr = res.result.songs.map(item => {
						const obj = {}
						obj.title = item.name || ''
						obj.id = item.id || ''
						obj.copyrightId = item.copyrightId || ''
						const singerS = item.artists.map((singer) => {
							return singer.name
						})
						obj.details = singerS || []
						return obj
					})
					this.searchResult = arr
					cb(arr)
				} else {
					console.warn(res)
				}
			} catch (error) {
				console.warn(error)
			}
		}
	}
}
</script>

<style lang='less' src="./style.less" scoped></style>
