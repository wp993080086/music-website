<template>
	<div id="index">
		<Head />
		<Banner :banner-list="bannerList" />
		<Footer />
	</div>
</template>

<script>
import HTTP from '../../request/api/indexApi'
import Head from '../../components/head'
import Footer from '../../components/footer'
import Banner from '../../components/banner'

export default {
	name: 'Index',
	components: {
		Head,
		Footer,
		Banner
	},
	data() {
		return {
			bannerList: []
		}
	},
	created() {
		this.getBanner()
	},
	mounted() {},
	methods: {
		// 获取banner图
		async getBanner() {
			try {
				const res = await HTTP.banner()
				if (res.code === 200) this.bannerList = res.banners
			} catch (error) {
				console.warn(error)
			}
		}
	}
}
</script>

<style lang="less" scoped></style>
