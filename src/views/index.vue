<template>
	<div>
		<div style="background-color: #333333; width: 100%;">
			<el-carousel>
				<el-carousel-item v-for="item in 4" :key="item">
					<!-- <h3>{{ item }}</h3> -->
				</el-carousel-item>
			</el-carousel>
		</div>

		<div style="margin-top: 30px;">
			<div style="width: 32%;float: left;">
				<span>
					<img src="../assets/icon_1.png" width="80px" style="float: left;margin-left: 150px;margin-right: -30px;" />
					<span>
						<h1 style="margin-top: 10px;">银行存管</h1>
					</span>
					<span style="font-size: 10px;">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交易资金通过银行流转<br><br />
						&nbsp;&nbsp;&nbsp;平台无法触碰资金
					</span>
				</span>
			</div>
			<div style="width: 32%;float: left;">
				<span>
					<img src="../assets/icon_2.png" width="80px" style="float: left;margin-left: 150px;margin-right: -30px;" />
					<span>
						<h1 style="margin-top: 10px;">多重优势</h1>
					</span>
					<span style="font-size: 10px;">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;借款人资质经三重审核<br><br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;逾期率保持行业低水平
					</span>
				</span>
			</div>
			<div style="width: 32%;float: left;">
				<span>
					<img src="../assets/icon_3.png" width="80px" style="float: left;margin-left: 150px;margin-right: -30px;" />
					<span>
						<h1 style="margin-top: 10px;">数据披露</h1>
					</span>
					<span style="font-size: 10px;">
						累计出借人数<br><br />
						&nbsp;&nbsp;&nbsp;累积出借人数赚取
					</span>
				</span>
			</div>
		</div>
		<div style="margin-top: 150px;">
			<el-divider></el-divider>
		</div>
		
		<div>
			<img src="../assets/icon_4.png" width="28px" style="float: left; margin-left: 30px;"/>
			<a href="#" style="color: #2C3E50; display: inherit;"><font style="float: left; margin-left: 10px; margin-top: 5px;">绑卡充值操作指南</font></a>
			
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
