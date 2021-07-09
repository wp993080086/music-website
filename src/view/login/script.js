import HTTP from '@/request/api/loginApi'
import QRCode from 'qrcodejs2'
import SnowFlake from '@/plugins/snowflake'

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
			codeTimer: null, // 扫码轮询的定时器
			countDown: 60, // 过期倒计时
			nickName: '', // 用户昵称
			codeHint: '打开网易云APP扫一扫', // 二维码底部提示
			cookie: '',
			token: '',
			userMsg: '', // 用户信息
			snowTimes: null // 雪花的定时器
		}
	},
	mounted() {
		this.startSnow(require('../../assets/image/snow1.png'), require('../../assets/image/snow2.png'), 30)
	},
	beforeDestroy() {
		this.snowTimes && clearInterval(this.snowTimes)
		this.codeTimer && clearInterval(this.codeTimer)
	},
	methods: {
		// 雪花
		startSnow(src1, src2, num) {
			const snowArr = []
			for (let j = 0; j < num; j++) {
				snowArr.push(new SnowFlake.CreateSnow('login', src1, src2))
			}
			this.snowTimes = setInterval(function() {
				// 找到数组中的最新的一个
				for (let i = snowArr.length - 1; i >= 0; i--) {
					if (snowArr[i]) {
						snowArr[i].move()
					}
				}
			}, 30)
		},
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
					this.codeHint = '打开网易云APP扫一扫'
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
				this.cookie = res.cookie
				this.token = res.token
				this.userMsg = res.profile
				this.$store.commit('setToken', this.token)
				this.$store.commit('setUserMsg', this.userMsg)
				this.handleLoginSucceed()
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
				this.handleCreateQRcode()
			} catch (error) {
				console.error(error)
			}
		},
		// 创造二维码
		handleCreateQRcode() {
			new QRCode(this.$refs.qr_codeode_url, {
				text: this.codeUrl,
				width: 120,
				height: 120,
				colorDark: '#000000',
				colorLight: '#ffffff',
				correctLevel: QRCode.CorrectLevel.H
			})
			this.countDown = 60
			// 去掉title
			this.$nextTick(() => {
				document.getElementsByClassName('qr_codeode_url')[0].setAttribute('title', '')
			})
			// 倒计时60S
			this.codeTimer = setInterval(() => {
				this.countDown--
				if (this.countDown <= 0) {
					this.countDown = 0
					clearInterval(this.codeTimer)
					this.codeHint = '打开网易云APP扫一扫'
				}
				console.log(this.countDown)
				this.handleQueryQRcode()
			}, 1000)
		},
		// 查询二维码
		async handleQueryQRcode() {
			try {
				const res = await HTTP.queryQRcode(this.codeKey)
				console.log(res)
				switch (res.code) {
				case 801:
					// 等待扫码
					break
				case 802:
					// 待确认
					this.codeHint = `用户<span style="color:red;">"${res.nickname}"</span>已扫码待确认`
					break
				case 803:
					// 扫码成功
					this.cookie = res.cookie
					clearInterval(this.codeTimer)
					this.handleLoginSucceed()
					break
				case 804:
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
			this.getKey()
		},
		// 登陆成功
		async handleLoginSucceed() {
			this.$info.info('登陆成功，即将跳转', 1)
			this.$store.commit('setCookie', this.cookie)
			await this.$fn.sleep(2000)
			this.$router.push({
				path: 'Index'
			})
		}
	}
}
