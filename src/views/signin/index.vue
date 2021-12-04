<template>
	<div id="signin" class="flex_c">
		<div class="center">
			<div class="content pr">
				<div class="logo flex_c">
					<img src="../../assets/icon/pdd.png">
				</div>
				<div class="form">
					<el-form ref="form" label-position="top" :rules="rules" :model="user">
						<el-form-item prop="nickname">
							<el-input v-model="user.nickname" placeholder="昵称" clearable />
						</el-form-item>
						<el-form-item prop="phone">
							<el-input v-model="user.phone" placeholder="手机号码" clearable />
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								v-model="user.password"
								placeholder="密码"
								clearable
								show-password
								@keyup.enter="submitForm"
							/>
						</el-form-item>
						<el-form-item prop="captcha">
							<el-input v-model="user.captcha" placeholder="验证码" clearable>
								<template slot="append">
									<div
										v-if="count === 60"
										class="verification"
										:style="{opacity: sendLoading ? '0.7':'1'}"
										@click="handleVerifyPhone"
									>
										<i v-if="sendLoading" class="el-icon-loading" />
										<span>发送验证码</span>
									</div>
									<div v-else class="disabled_btn">
										<span>{{ count }}S</span>
									</div>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="signin_btn" @click="submitForm">注册</el-button>
						</el-form-item>
					</el-form>
				</div>
				<p class="hint" @click="toLogin">返回登陆</p>
			</div>
		</div>
	</div>
</template>

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
