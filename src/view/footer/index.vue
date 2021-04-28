<template>
	<div id="footer">
		<footer class="flex_c">
			<p>备案号：xxxxxxxxx</p>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	components: {},
	props: [],
	data() {
		return {
			title: ''
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
		padding: 0 20px;
		box-sizing: border-box;
		border-top: 1px solid @borderC;
		background-color: @bgC;
		position: fixed;
		left: 0;
		bottom: 0;
		footer{
			width: 100%;
			height: 100%;
			p{
				color: @fontC_2;
			}
		}
	}
</style>
