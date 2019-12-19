<template>
	<div>
		<!-- 登录前 -->
		<div v-if="resturantName == '' ">
			<div class="borrw_title" style="margin-left: 25px;">
				<div class="el-borrow-item-title" style="background-color: #40d47e;height: 35px;">
					<font style="line-height: 35px;" size="4">信用贷</font>
				</div>
				<div class="el-borrow-item-content">
					<p style="margin-left: 32px;">
						认证后可借金额 <i>¥ 2,000.00</i>
					</p>
					<a href="#" class="text-primary">申请条件</a>
					<p class="help-block" style="">仅限广州地区</p>
					<ul style="list-style: none;margin-left: -35px;">
						<li style="margin-top: 10px;">填写基本资料</li>
						<li style="margin-top: 10px;">身份认证</li>
						<li style="margin-top: 10px;">材料认证分数达到30分</li>
						<li style="margin-top: 10px;">视频认证</li>
					</ul>
					<el-button size="small" type="primary" style="margin-top: 35px;" round>
						<router-link to="/Login" type="text-decoraction: none;">登录后申请</router-link>
					</el-button>
				</div>
			</div>

			<div class="borrw_title" style="margin-left: 35px;">
				<div>
					<div class="el-borrow-item-title" style="background-color: #EC7E1F; height: 35px;">
						<font style="line-height: 35px;" size="4">车易贷</font>
					</div>
				</div>
				<div class="el-borrow-item-content">
					<p style="margin-left: 28px;">
						认证后可借金额 <i>¥ 10,000.00</i>
					</p>
					<a href="#" class="text-primary">申请条件</a>
					<p class="help-block">仅限广州地区</p>
					<ul style="list-style: none;margin-left: -35px;">
						<li style="margin-top: 10px;">填写基本资料</li>
						<li style="margin-top: 10px;">身份认证</li>
						<li style="margin-top: 10px;">材料认证分数达到30分</li>
						<li style="margin-top: 10px;">提交车辆抵押相关资料</li>
						<li style="margin-top: 10px;">视频认证</li>
					</ul>
					<el-button size="small" type="primary" style="margin-top: 10px;" round>
						<router-link to="/Login" type="text-decoraction: none;">登录后申请</router-link>
					</el-button>
				</div>
			</div>

			<div class="borrw_title" style="margin-left: 35px;">
				<div>
					<el-container>
						<el-tag effect="dark" style="width: 100%; border-bottom: none;">
							<font size="4" color="#2C3E50">房易贷</font>
						</el-tag>
					</el-container>
				</div>
				<div class="el-borrow-item-content">
					<p style="margin-left: 25px;">
						认证后可借金额 <i>¥ 10,0000.00</i>
					</p>
					<a href="#" class="text-primary">申请条件</a>
					<p class="help-block">仅限广州地区</p>
					<ul style="list-style: none;margin-left: -35px;">
						<li style="margin-top: 10px;">填写基本资料</li>
						<li style="margin-top: 10px;">身份认证</li>
						<li style="margin-top: 10px;">材料认证分数达到50分</li>
						<li style="margin-top: 10px;">提交房屋抵押相关资料</li>
						<li style="margin-top: 10px;">视频认证</li>
					</ul>
					<el-button size="small" type="primary" style="margin-top: 20px;" round>
						<router-link to="/Login" type="text-decoraction: none;">登录后申请</router-link>
					</el-button>
				</div>
			</div>
		</div>

		<!-- 登录后 -->
		<div v-if="resturantName != '' ">
			<div class="borrw_title" style="margin-left: 25px;">
				<div class="el-borrow-item-title" style="background-color: #40d47e;height: 35px;">
					<font style="line-height: 35px;" size="4">信用贷</font>
				</div>
				<div class="el-borrow-item-content">
					<p style="margin-left: 32px;">
						可借金额 <i>¥ 2,000.00</i>
					</p>
					<a href="#" class="text-primary">申请条件</a>
					<p class="help-block" style="">仅限广州地区</p>
					<ul style="list-style: none;margin-left: -35px;">
						<li style="margin-top: 10px;"><router-link to="/UserAccount">填写基本资料</router-link></li>
						<li style="margin-top: 10px;">身份认证</li>
						<li style="margin-top: 10px;">材料认证分数达到30分</li>
						<li style="margin-top: 10px;">视频认证</li>
					</ul>
					<el-button size="small" type="primary" style="margin-top: 35px;" round>
						<router-link to="/Login" type="text-decoraction: none;">点击申请</router-link>
					</el-button>
				</div>
			</div>

			<div class="borrw_title" style="margin-left: 35px;">
				<div>
					<div class="el-borrow-item-title" style="background-color: #EC7E1F; height: 35px;">
						<font style="line-height: 35px;" size="4">车易贷</font>
					</div>
				</div>
				<div class="el-borrow-item-content">
					<p style="margin-left: 28px;">
						可借金额 <i>¥ 10,000.00</i>
					</p>
					<a href="#" class="text-primary">申请条件</a>
					<p class="help-block">仅限广州地区</p>
					<ul style="list-style: none;margin-left: -35px;">
						<li style="margin-top: 10px;">填写基本资料</li>
						<li style="margin-top: 10px;">身份认证</li>
						<li style="margin-top: 10px;">材料认证分数达到30分</li>
						<li style="margin-top: 10px;">提交车辆抵押相关资料</li>
						<li style="margin-top: 10px;">视频认证</li>
					</ul>
					<el-button size="small" type="primary" style="margin-top: 10px;" round>
						<router-link to="/Login" type="text-decoraction: none;">点击申请</router-link>
					</el-button>
				</div>
			</div>

			<div class="borrw_title" style="margin-left: 35px;">
				<div>
					<el-container>
						<el-tag effect="dark" style="width: 100%; border-bottom: none;">
							<font size="4" color="#2C3E50">房易贷</font>
						</el-tag>
					</el-container>
				</div>
				<div class="el-borrow-item-content">
					<p style="margin-left: 25px;">
						可借金额 <i>¥ 10,0000.00</i>
					</p>
					<a href="#" class="text-primary">申请条件</a>
					<p class="help-block">仅限广州地区</p>
					<ul style="list-style: none;margin-left: -35px;">
						<li style="margin-top: 10px;">填写基本资料</li>
						<li style="margin-top: 10px;">身份认证</li>
						<li style="margin-top: 10px;">材料认证分数达到50分</li>
						<li style="margin-top: 10px;">提交房屋抵押相关资料</li>
						<li style="margin-top: 10px;">视频认证</li>
					</ul>
					<el-button size="small" type="primary" style="margin-top: 20px;" round>
						<router-link to="/Login" type="text-decoraction: none;">点击申请</router-link>
					</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	export default {
		name: 'Login',
		data: function() {
			return {
				msg: '我要借贷',
				form: {
					usrName: '',
					usrPassword: ''
				}
			}
		},
		computed: {
			resturantName: function() {
				return this.$store.state.resturantName; //不建议
			}
		}
	}
</script>

<style scoped>
	.borrw_title {
		width: 30%;
		float: left;

	}

	a {
		text-decoration: none;
	}

	.router-link-active {
		text-decoration: none;
	}
</style>
