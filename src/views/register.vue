<template>
	<div>
		<h2 class="title">{{msg}}</h2>
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item prop="username" label-width="580px" style="width: 62%;">
				<el-input v-model="ruleForm.username" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item prop="loginpass" label-width="580px" style="width: 62%;">
				<el-input placeholder="请输入密码" type="password" v-model="ruleForm.loginpass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="loginpass2" label-width="580px" style="width: 62%;">
				<el-input placeholder="请确认密码" type="password" v-model="ruleForm.loginpass2" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="phone" label-width="580px" style="width: 62%;">
				<el-input placeholder="请输入手机号码" v-model="ruleForm.phone" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="yzm" label-width="580px" style="width: 62%;">
				<div style="width:1270px; margin-left: -465px;">
					<el-input style="width:17%" placeholder="请输入验证码" v-model="ruleForm.yzm"></el-input>
					<el-button type="primary" :disabled="disable" :class="{ codeGeting:isGeting }" @click="getVerifyCode">{{getCode}}</el-button>
				</div>
			</el-form-item>


			<el-form-item label-width="600px" style="width: 62%;">
				<el-button type="primary" @click="submitForm()">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	export default {
		name: 'Register',
		data() {
			var username = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					var url = this.axios.urls.LCCCSSM_SELECTNAMEJS;
					this.axios.post(url, this.ruleForm).then(resp => {
						if (0 == resp.data.code) {
							callback(new Error('用户名已存在'));
						} else {
							callback();
						}
						console.log(resp);
					}).catch(resp => {
						console.log(resp);
						this.$message.error('查询用户名操作失败！');
					});
				}
			};
			var phone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号码'));
				} else if (!(/^1[3456789]\d{9}$/.test(value))) {
					callback(new Error('手机号格式不正确！'));
				} else {
					var url = this.axios.urls.LCCCSSM_SELECTPHONEJS;
					this.axios.post(url, this.ruleForm).then(resp => {
						if (0 == resp.data.code) {
							callback(new Error('该手机号已存在'));
							this.$confirm('该手机号已注册。是否为您本人账号。', '提示', {
								confirmButtonText: '不是，继续注册',
								cancelButtonText: '是',
								type: 'warning'
							}).then(() => {
								
							}).catch(() => {
								this.$router.push({
									path: '/Phone'
								});
							});
						} else {
							callback();
						}
					}).catch(resp => {
						this.$message.error('查询手机号操作失败！');
					});
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.loginpass2 !== '') {
						this.$refs.ruleForm.validateField('loginpass2');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.loginpass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var yzm = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'));
				} else {
					callback();
				}
			};
			return {
				msg: '欢迎注册',
				yzm2: '',
				getCode: '获取验证码',
				isGeting: false,
				count: 60,
				disable: false,
				ruleForm: {
					username: '',
					loginpass: '',
					loginpass2: '',
					phone: '',
					yzm: '',
				},
				rules: {
					username: [{
						validator: username,
						trigger: 'blur'
					}, {
						min: 2,
						max: 10,
						message: '长度必须为2-10个字符',
						trigger: 'blur'
					}],
					loginpass: [{
							validator: validatePass,
							trigger: 'blur'
						},
						{
							min: 8,
							max: 16,
							message: '长度必须为8-16个字符',
						}
					],
					loginpass2: [{
							validator: validatePass2,
							trigger: 'blur'
						},
						{
							min: 8,
							max: 16,
							message: '长度必须为8-16个字符',
						}
					],
					phone: [{
						validator: phone,
						trigger: 'blur'
					}],
					yzm: [{
						validator: yzm,
						trigger: 'blur'
					}],
				},
			};
		},
		methods: {
			submitForm: function() {
				if (this.ruleForm.yzm == this.yzm2) {
					var url = this.axios.urls.LCCCSSM_ADDUSER;
					this.axios.post(url, this.ruleForm).then(resp => {
						if (1 == resp.data.code) {
							this.$message({
								message: resp.data.message,
								type: 'success'
							});
							this.$router.push({
								path: '/Login'
							});
						} else {
							this.$message.error(resp.data.message);
						}
					}).catch(resp => {
						this.$message.error('操作失败！');
					});
				} else {
					this.$message.error('验证码错误！');
				}
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getVerifyCode() {
				var url = this.axios.urls.LCCCSSM_YZM;
				this.axios.post(url, this.ruleForm).then(resp => {
					if (1 == resp.data.code) {
						this.yzm2 = resp.data.message;
					} else {
						this.$message.error('短信发送失败！');
					}
					console.log(resp);
				}).catch(resp => {
					this.$message.error('验证码操作失败！');
				});
				var countDown = setInterval(() => {
					if (this.count < 1) {
						this.isGeting = false;
						this.disable = false;
						this.getCode = '获取验证码';
						this.count = 60;
						clearInterval(countDown);
					} else {
						this.isGeting = true;
						this.disable = true;
						this.getCode = this.count-- + 's后重发';
					}
				}, 1000);
			}
		}

	}
</script>

<style>
	.codeGeting {
		background: #cdcdcd;
		border-color: #cdcdcd;
	}
</style>
