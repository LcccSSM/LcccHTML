<template>
	<div>
		<div style="background-color: #333333; width: 100%;">
			<el-carousel height="100%">
				<el-carousel-item v-for="item in 4" :key="item">
					<!-- <h3>{{ item }}</h3> -->
				</el-carousel-item>
			</el-carousel>
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
				form: {
					usrName: '',
					usrPassword: ''
				}
			}
		}
	}
</script>

