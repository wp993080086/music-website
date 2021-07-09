<template>
	<div id="login" class="flex_c pr" @click.self="handleInitPanda">
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
								<el-input v-model="user.phone" placeholder="账号" clearable @focus="getUesrFocus" />
							</el-form-item>
							<el-form-item prop="pwd">
								<el-input
									v-model="user.password"
									placeholder="密码"
									clearable
									show-password
									@keyup.enter="submitForm"
									@focus="getPwdFocus"
								/>
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
						<p v-html="codeHint" />
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

<script src="./script"></script>
<style lang='less' scoped src="./style.less"></style>
