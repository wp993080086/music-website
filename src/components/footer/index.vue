<template>
	<div id="footer">
		<div class="footer_box"></div>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	components: {},
	props: [],
	data() {
		return {
			gitHub: require('../../assets/icon/pdd.png')
		}
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
