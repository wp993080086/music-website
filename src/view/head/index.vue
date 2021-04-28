<template>
	<div id="head">
		<nav class="flex flex_s_b">

			<div class="title flex_c">
				<div class="logo flex_c">
					<img :src="logo" :title="title">
				</div>
				<div class="blogs_title flex">{{ title }}</div>
			</div>

			<div class="tabbar">
				<div v-for="item in tabbarList" :key="item.url" class="item">
					<router-link :to="item.url" tag="div" class="item_box flex_c pr" @mouseover.native="hoverShowMenu" @mouseout.native="hoverHideMenu">
						<div v-if="item.childList.length > 0">
							<transition name="fade">
								<div v-if="showMenu" class="child_list pa" :style="{ bottom:-(item.childList.length * 40 + 20) + 'px' }">
									<div class="arrows pa" />
									<div v-for="child in item.childList" :key="child.url" class="child flex_c">
										<router-link :to="child.url" tag="p" v-html="child.title" />
									</div>
								</div>
							</transition>
						</div>
						<p>{{ item.title }}</p>
					</router-link>
				</div>
			</div>

			<div class="setting flex_c">
				<i class="el-icon-loading" />
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'Head',
	components: {},
	props: [],
	data() {
		return {
			logo: require('../../assets/icon/pdd.png'),
			title: '鹏多多的分享屋',
			tabbarList: [
				{
					icon: '',
					title: '个人中心',
					url: '1',
					childList: [
						{
							icon: '',
							title: '个人中心',
							url: '1-1'
						},
						{
							icon: '',
							title: '个人中心',
							url: '1-2'
						}
					]
				},
				{
					icon: '',
					title: '个人中心',
					url: '2',
					childList: []
				},
				{
					icon: '',
					title: '个人中心',
					url: '3',
					childList: []
				}
			],
			showMenu: false,
			timer: null
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		hoverShowMenu() {
			console.log('进入')
			clearTimeout(this.timer)
			this.showMenu = true
		},
		hoverHideMenu() {
			console.log('离开')
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.showMenu = false
			}, 200)
		}
	}
}
</script>

<style lang='less' scoped>
	#head{
		width: 100%;
		height: 60px;
		padding: 0 20px;
		box-sizing: border-box;
		border-bottom: 1px solid @borderC;
		background-color: @bgC;
		position: fixed;
		top: 0;
		left: 0;
		nav{
			width: 100%;
			height: 100%;
			.title{
				width: 180px;
				height: 100%;
				.logo{
					width: 50px;
					height: 100%;
					img{
						width: 50px;
						height: 50px;
					}
				}
				.blogs_title{
					width: 130px;
					height: 100%;
					font-size: 14px;
					align-items: center;
					padding-left: 10px;
					box-sizing: border-box;
				}
			}
			.tabbar{
				display: flex;
				.item{
					width: 100px;
					height: 100%;
					font-size: 16px;
					.item_box{
						width: 100%;
						height: 100%;
						.child_list{
							width: 120px;
							left: 0;
							border: 1px solid #EBEEF5;
							.arrows{
								width: 0;
								height: 0;
								border: 10px solid;
								border-top-color: transparent;
								border-left-color: transparent;
								border-right-color: transparent;
								border-bottom-color: #EBEEF5;
								top: -20px;
								left: calc(50% - 10px);
							}
							.child{
								width: 120px;
								height: 40px;
								border-bottom: 1px solid @borderC;
							}
						}
					}
				}
			}
			.setting{
				width: 50px;
				height: 100%;
				i{
					font-size: 30px;
				}
			}
		}
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
