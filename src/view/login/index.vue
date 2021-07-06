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
					<div class="qr_code flex_d_y flex flex_a_c flex_s_a" title="点击刷新">
						<div ref="qr_codeode_url" class="qr_codeode_url" />
						<p>打开网易云APP扫一扫</p>
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
			codeKey: '',
			codeUrl: '',
			codeTimer: null
		}
	},
	watch: {},
	created() {},
	mounted() {
		this.getKey()
	},
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
			this.$nextTick(function() {
				if (this.nowType) {
					this.handleCreateQRcode()
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
			try {
				const res = await HTTP.getKey()
				this.codeKey = res.data.unikey
				this.getQRcode()
			} catch (error) {
				console.error(error)
			}
		},
		// 获取二维码
		async getQRcode() {
			try {
				const res = await HTTP.getQRcode(this.codeKey)
				this.codeUrl = res.data.qrurl
			} catch (error) {
				console.error(error)
			}
		},
		// 创造二维码
		handleCreateQRcode() {
			new QRCode(this.$refs.qr_codeode_url, {
				text: this.codeUrl, // 需要转换为二维码的内容
				width: 120,
				height: 120,
				colorDark: '#000000',
				colorLight: '#ffffff',
				correctLevel: QRCode.CorrectLevel.H
			})
			this.codeTimer = setInterval(() => {
				this.handleQueryQRcode()
			}, 1000)
		},
		// 查询二维码
		async handleQueryQRcode() {
			try {
				const res = await HTTP.queryQRcode(this.codeKey)
				console.log(res)
			} catch (error) {
				console.error(error)
				clearInterval(this.codeTimer)
			}
		}
	}
}
</script>

<style lang='less' scoped src="./style.less"></style>
