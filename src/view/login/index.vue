<template>
	<div id="login" class="flex_c">
		<div class="center">
			<div class="content pr">
				<img :src="panda[now_focus]" class="panda pa">
				<div class="logo flex_c">
					<img src="../../assets/icon/pdd.png">
				</div>
				<el-form label-position="top" :rules="rules" :model="user">
					<el-form-item prop="account">
						<el-input v-model="user.account" placeholder="账号" @focus="getUesrFocus" />
					</el-form-item>
					<el-form-item prop="pwd">
						<el-input v-model="user.password" placeholder="密码" @focus="getPwdFocus" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="login_btn" @click="submitForm">登陆</el-button>
					</el-form-item>
				</el-form>
				<div class="footer_btn" @click="handleChangeType">扫码登录</div>
			</div>
		</div>
	</div>
</template>

<script>
import HTTP from '@/request/api/loginApi'

export default {
	name: 'Login',
	components: {},
	props: [],
	data() {
		return {
			user: {
				account: '',
				password: ''
			},
			rules: {
				account: [
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
			now_focus: 0, // 熊猫变化
			now_type: false // true扫码登录 false密码登录
		}
	},
	watch: {},
	created() {},
	mounted() {},
	updated() {},
	methods: {
		// 提交登录
		async submitForm() {
			console.log(this.user)
			const res = await HTTP.phoneLogin(this.user.account, this.user.password)
			console.log(res)
		},
		// 获取账号焦点
		getUesrFocus() {
			this.now_focus = 1
		},
		// 获取密码焦点
		getPwdFocus() {
			this.now_focus = 2
		},
		// 改变登录方式
		handleChangeType() {
			this.now_type = !this.now_type
		}
	}
}
</script>

<style lang='less' scoped src="./style.less"></style>
