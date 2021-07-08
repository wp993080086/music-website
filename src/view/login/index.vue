<template>
	<div id="login" class="flex_c" @click.self="handleInitPanda">
		<div class="center">
			<div class="content pr">
				<img :src="panda[nowFocus]" class="panda pa">
				<div class="logo flex_c">
					<img src="../../assets/icon/pdd.png">
				</div>
				<template v-if="!nowType">
					<div class="form">
						<el-form ref="form" label-position="top" :rules="rules" :model="user">
							<el-form-item prop="phone">
								<el-input v-model="user.phone" placeholder="账号" @focus="getUesrFocus" />
							</el-form-item>
							<el-form-item prop="pwd">
								<el-input v-model="user.password" placeholder="密码" @focus="getPwdFocus" />
							</el-form-item>
							<el-form-item>
								<el-button type="primary" class="login_btn" @click="submitForm">登陆</el-button>
							</el-form-item>
						</el-form>
					</div>
				</template>
				<template v-else>
					<div class="qr_code flex_d_y flex flex_a_c flex_s_a">
						<div class="qr_code_box pr">
							<div ref="qr_codeode_url" class="qr_codeode_url" />
							<div
								v-if="countDown === 0"
								class="qr_shadow pa z9 flex_c flex_d_y"
								@click="handleRefreshQRcode"
							>
								<i class="el-icon-refresh" />
								<span>已过期点击刷新</span>
							</div>
						</div>
						<p>{{ codeHint }}</p>
					</div>
				</template>
				<div class="footer_btn">
					<span @click="handleChangeType">
						{{ !nowType ? '扫码登陆':'手机登陆' }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HTTP from '@/request/api/loginApi'
import QRCode from 'qrcodejs2'

export default {
	name: 'Login',
	components: {},
	props: [],
	data() {
		return {
			user: {
				phone: '',
				password: ''
			},
			rules: {
				phone: [
					{ required: true, message: '请输入账号', trigger: 'blur' },
					{ min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
				]
			},
			panda: [
				require('../../assets/image/panda_1.png'),
				require('../../assets/image/panda_2.png'),
				require('../../assets/image/panda_3.png')
			],
			nowFocus: 0, // 熊猫变化
			nowType: false, // true扫码登录 false密码登录
			codeKey: '', // 二维码key
			codeUrl: '', // 二维码路径
			codeTimer: null, // 轮询的定时器
			countDown: 60, // 倒计时
			status: 0, // 当前扫码状态 0 未扫码 1 已扫码没确认 2 确认
			nickName: '', // 用户昵称
			codeHint: '打开网易云APP扫一扫', // 二维码底部提示
			cookie: '' // 扫码成功后的cookie
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		// 熊猫归位
		handleInitPanda() {
			this.nowFocus = 0
		},
		// 获取账号焦点
		getUesrFocus() {
			this.nowFocus = 1
		},
		// 获取密码焦点
		getPwdFocus() {
			this.nowFocus = 2
		},
		// 改变登录方式
		handleChangeType() {
			this.nowType = !this.nowType
			this.$nextTick(() => {
				if (this.nowType) {
					this.getKey()
				} else if (this.codeTimer) {
					clearInterval(this.codeTimer)
				}
			})
		},
		// 登录校验
		submitForm() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					this.login()
				}
			})
		},
		// 登陆
		async login() {
			try {
				const res = await HTTP.phoneLogin(this.user)
				console.log(res)
			} catch (error) {
				console.error(error)
			}
		},
		// 获取二维码key
		async getKey() {
			if (this.codeTimer) {
				clearInterval(this.codeTimer)
			}
			document.getElementsByClassName('qr_codeode_url')[0].innerHTML = ''
			try {
				// const res = await HTTP.getKey()
				// this.codeKey = res.data.unikey
				this.getQRcode()
			} catch (error) {
				console.error(error)
			}
		},
		// 获取二维码
		async getQRcode() {
			try {
				// const res = await HTTP.getQRcode(this.codeKey)
				// this.codeUrl = res.data.qrurl
				this.handleCreateQRcode()
			} catch (error) {
				console.error(error)
			}
		},
		// 创造二维码
		handleCreateQRcode() {
			new QRCode(this.$refs.qr_codeode_url, {
				// text: this.codeUrl,
				text: 'https://music.163.com/login?codekey=0c900595-54be-4e1a-91d6-ebe3660248f9',
				width: 120,
				height: 120,
				colorDark: '#000000',
				colorLight: '#ffffff',
				correctLevel: QRCode.CorrectLevel.H
			})
			// 去掉title
			this.$nextTick(() => {
				document.getElementsByClassName('qr_codeode_url')[0].setAttribute('title', '')
			})
			this.codeTimer = setInterval(() => {
				this.countDown--
				if (this.countDown <= 0) {
					this.countDown = 0
					clearInterval(this.codeTimer)
				}
				console.log(this.countDown)
				// this.handleQueryQRcode()
			}, 1000)
		},
		// 查询二维码
		async handleQueryQRcode() {
			try {
				const res = await HTTP.queryQRcode(this.codeKey)
				console.log(res)
				switch (res.data.code) {
				case 200:
					// 扫码成功
					this.cookie = res.data.cookie
					break
				case 800:
					// 等待扫码
					this.codeHint = `用户 "${res.data.user}" 已扫码待确认`
					break
				case 801:
					// 超时
					if (this.codeTimer) {
						clearInterval(this.codeTimer)
					}
					this.codeHint = '打开网易云APP扫一扫'
					this.countDown = 0
					break
				}
			} catch (error) {
				console.error(error)
				clearInterval(this.codeTimer)
			}
		},
		// 刷新二维码
		handleRefreshQRcode() {
			if (this.codeTimer) {
				clearInterval(this.codeTimer)
			}
			this.countDown = 60
			this.getKey()
		}
	}
}
</script>

<style lang='less' scoped src="./style.less"></style>
