<template>
	<div>
		<div class="borrw_title">
			<div style="width: 100%;border-bottom: none;">
					<el-tag effect="dark" type="success" style="width: 100%; "><font size="4" color="#2C3E50">信用贷</font></el-tag>
				</el-container>
			</div>
			<div style="background-color: #EAEAEA; width: 100%; height: 50px;" >
				
				<!-- <el-tag type="success" style="width: 100%; border-top: none;" >信用贷</el-tag> -->
			</div>
		</div>
		
		<div class="borrw_title">
			<div>
				<el-container>
					<el-tag effect="dark" type="warning" style="width: 100%; border-bottom: none;"><font size="4" color="#2C3E50">车易贷</font></el-tag>
				</el-container>
			</div>
			<div  style="background-color: #EAEAEA; width: 100%; height: 50px;" >
				
				<!-- <el-tag type="success" style="width: 100%; border-top: none;" >信用贷</el-tag> -->
			</div>
		</div>
		
		<div class="borrw_title" style="margin-right: 15px;">
			<div>
				<el-container>
					<el-tag effect="dark" style="width: 100%; border-bottom: none;"><font size="4" color="#2C3E50">房易贷</font></el-tag>
				</el-container>
			</div>
			<div style="background-color: #EAEAEA; width: 100%; height: 50px;" >
				
				<!-- <el-tag type="success" style="width: 100%; border-top: none;" >信用贷</el-tag> -->
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
		}
	}
</script>

<style scoped>
	.borrw_title{
		width: 32%; 
		float: left; 
		margin-left: 15px;
	}
</style>
