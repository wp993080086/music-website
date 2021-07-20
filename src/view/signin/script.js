import HTTP from '@/request/api/loginApi'

export default {
	name: 'Signin',
	data() {
		this.rules = {
			nickname: [
				{ required: true, message: '请输入昵称', trigger: 'blur' }
			],
			phone: [
				{ required: true, message: '请输入手机号码', trigger: 'blur' },
				{ min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
			],
			password: [
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
			],
			captcha: [
				{ required: true, message: '请输入验证码', trigger: 'blur' }
			]
		}
		return {
			user: {
				nickname: '',
				phone: '',
				password: '',
				captcha: ''
			},
			sendLoading: false,
			count: 60,
			times: null
		}
	},
	methods: {
		// 校验手机号
		handleVerifyPhone() {
			this.$refs['form'].validateField('phone', err => {
				if (this.sendLoading) return
				!err && this.handleSendVcode()
			})
		},
		// 发送验证码
		async handleSendVcode() {
			try {
				this.sendLoading = true
				this.countDown()
				const res = await HTTP.sendCaptcha(this.user.phone)
				console.log(res)
				if (res.code === 200) {
					this.sendLoading = false
					this.$info.info('发送成功', 1)
					this.countDown()
				}
			} catch (error) {
				this.sendLoading = false
				console.warn(error)
			}
		},
		// 倒计时
		countDown() {
			this.times = setInterval(() => {
				this.count--
				if (this.count <= 0) {
					clearInterval(this.times)
					this.times = null
					this.sendLoading = false
					this.count = 60
				}
			}, 1000)
			// 销毁时清除
			this.$once('hook:beforeDestroy', () => {
				if (this.times) {
					clearInterval(this.times)
					this.times = null
				}
			})
		},
		// 注册校验
		submitForm() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					this.signin()
				}
			})
		},
		// 注册
		async signin() {
			try {
				const res = await HTTP.phoneLogin(this.user)
				console.log(res)
				if (res.code === 200) {
					this.handleSigninSucceed()
				} else {
					this.$info.info('注册失败', 2)
				}
			} catch (error) {
				console.error(error)
			}
		},
		// 注册成功
		async handleSigninSucceed() {
			this.$info.info('注册成功，2秒后跳转至登录页', 1)
			await this.$fn.sleep(2000)
			this.$router.push({
				path: 'Login'
			})
		}
	}
}
