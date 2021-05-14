<template>
	<div id="index">
		<Head />
		<div style="height:1000px;">1</div>
	</div>
</template>

<script>
import Head from '../../components/head'

export default {
	name: 'Index',
	components: {
		Head
	},
	data() {
		return {
			title: 'hello world',
			fullscreen: false
		}
	},
	created() {
		console.log(process.env.NODE_ENV)
	},
	mounted() {
		this.console()
	},
	methods: {
		console() {
			console.log(this.$baseUrl)
		},
		change_full_screen() {
			// 全屏切换函数
			const element = document.documentElement
			if (this.fullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen()
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen()
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen()
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen()
				}
			} else {
				if (element.requestFullscreen) {
					element.requestFullscreen()
				} else if (element.webkitRequestFullScreen) {
					element.webkitRequestFullScreen()
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen()
				} else if (element.msRequestFullscreen) {
					// IE11
					element.msRequestFullscreen()
				}
			}
			this.fullscreen = !this.fullscreen // 判断全屏状态
		}
	}
}
</script>

<style lang="less" scoped></style>
