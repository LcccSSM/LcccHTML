<template>
	<div>
		<div>
			<el-menu router default-active="/Index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="/Index" style="margin-left: 950px;font-size: 15px;">首页</el-menu-item>
				<el-menu-item index="2" style="font-size: 15px;">我要出借</el-menu-item>
				<el-menu-item index="/BorrowingIndex" style="font-size: 15px;">我要借款/还款</el-menu-item>
				<el-menu-item index="4" style="font-size: 15px;">注册/登录</el-menu-item>
			</el-menu>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	export default {
		name: 'Index',
		data: function() {
			return {
				msg: '首页',
			}
		}
	}
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
