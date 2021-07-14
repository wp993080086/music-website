<template>
	<div id="footer">
		<div class="footer_box">1</div>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	components: {},
	props: [],
	data() {
		this.QQ = require('../../assets/icon/pdd.png')
		this.weixin = require('../../assets/icon/pdd.png')
		this.gitHub = require('../../assets/icon/pdd.png')
		this.jianshu = require('../../assets/icon/pdd.png')
		this.juejin = require('../../assets/icon/pdd.png')
		this.csdn = require('../../assets/icon/pdd.png')
		this.bookyuan = require('../../assets/icon/pdd.png')
		return {}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {}
}
</script>

<style lang='less' scoped>
#footer{
	width: 100%;
	height: 60px;
}
</style>
