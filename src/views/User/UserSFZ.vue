<template>
	<div class="login-container" style="width: 45%;">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width: 350px;" class="demo-dynamic">
			<el-form-item prop="name" label="姓名">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item prop="idCard" label="身份证号码">
				<el-input v-model="ruleForm.idCard"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>

		<el-dialog title="" :visible.sync="dialogFormVisible">
			<!--canvas截取流-->
			<canvas ref="canvas" hidden="hidden" width="640" height="480"></canvas>
			<!--图片展示-->
			<video ref="video" width="640" height="480" autoplay></video>
			<!--确认-->
			<el-button size="mini" type="primary" @click="photograph">验证</el-button>
		</el-dialog>
	</div>

</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	export default {
		name: 'UserSFZ',
		data: function() {
			var idCard = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("身份证号码不能为空"));
				} else {
					if (this.IdentityCodeValid(value)) {
						callback();
					} else {
						callback(new Error("请输入正确的身份证号码"));
					}
				}
			};

			var name = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("姓名不能为空"));
				} else {
					if ((isNaN(value))) {
						callback();
					} else {
						callback(new Error("姓名不能为数字"));
					}

				}
			};
			return {
				dialogFormVisible: false,
				ruleForm: {
					username: this.$store.state.resturantName,
					name: '',
					idCard: ''
				},
				rules: {
					idCard: [{
						validator: idCard,
						trigger: 'blur'
					}],
					name: [{
						validator: name,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			IdentityCodeValid(code) { //验证身份证合法性
				var city = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江 ",
					31: "上海",
					32: "江苏",
					33: "浙江",
					34: "安徽",
					35: "福建",
					36: "江西",
					37: "山东",
					41: "河南",
					42: "湖北 ",
					43: "湖南",
					44: "广东",
					45: "广西",
					46: "海南",
					50: "重庆",
					51: "四川",
					52: "贵州",
					53: "云南",
					54: "西藏 ",
					61: "陕西",
					62: "甘肃",
					63: "青海",
					64: "宁夏",
					65: "新疆",
					71: "台湾",
					81: "香港",
					82: "澳门",
					91: "国外 "
				};
				var tip = "";
				var pass = true;

				var patt1 = new RegExp(
					"(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)"
				);
				if (!code || !patt1.test(code)) {
					tip = "身份证号格式错误";
					pass = false;
				} else if (!city[code.substr(0, 2)]) {
					tip = "地址编码错误";
					pass = false;
				} else {
					//18位身份证需要验证最后一位校验位
					if (code.length == 18) {
						code = code.split('');
						//∑(ai×Wi)(mod 11)
						//加权因子
						var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
						//校验位
						var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
						var sum = 0;
						var ai = 0;
						var wi = 0;
						for (var i = 0; i < 17; i++) {
							ai = code[i];
							wi = factor[i];
							sum += ai * wi;
						}
						var last = parity[sum % 11];
						if (parity[sum % 11] != code[17]) {
							tip = "校验位错误";
							pass = false;
						}
					}
				}
				if (!pass)
					this.$message({
						message: tip,
						type: "error",
						duration: 2000
					});;
				return pass;
			},
			resetForm(formName) {

				this.$refs[formName].resetFields();
			},
			submitForm: function() {
				var url = this.axios.urls.LCCCSSM_GETSFZ;
				this.axios.post(url, this.ruleForm).then(resp => {
					if (resp.data.result.description === '一致') {
						this.dialogFormVisible = true;
						this.callCamera();
					} else {
						this.$message.error('身份证号码或姓名错误');
					}
				}).catch(resp => {
					this.$message.error('绑定身份证失败，请稍后重试！');
				});

			}, // 调用摄像头
			callCamera: function() {
				// H5调用电脑摄像头API
				navigator.mediaDevices.getUserMedia({
					video: true
				}).then(success => {
					// 摄像头开启成功
					this.$refs['video'].srcObject = success
					// 实时拍照效果
					this.$refs['video'].play()
				}).catch(error => {
					console.error('摄像头开启失败，请检查摄像头是否可用！')
				})
			},
			// 拍照
			photograph: function() {
				let ctx = this.$refs['canvas'].getContext('2d')
				// 把当前视频帧内容渲染到canvas上
				ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
				// 转base64格式、图片格式转换、图片质量压缩
				let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
				console.log(imgBase64)

				// 上传拍照信息  调用接口上传图片 .........
				var url = this.axios.urls.LCCCSSM_GETFACE;
				var from = {
					idCard: this.ruleForm.idCard,
					name: this.ruleForm.name,
					image: imgBase64
				}
				this.axios.post(url, from).then(resp => {
					if (resp.data.code === 200) {

						var url = this.axios.urls.LCCCSSM_SELECTNAME;
						// 调用查询用户
						this.axios.post(url, this.ruleForm).then(resp => {
							var url = this.axios.urls.LCCCSSM_INSERTSFZ;
							var from2 = {
								auserid: resp.data.userid,
								arealname: this.ruleForm.name,
								asidcardno: this.ruleForm.idCard
							}


							// 调用增加接口
							this.axios.post(url, from2).then(resp => {
								if (resp.data === 1) {
									var url = this.axios.urls.LCCCSSM_SELECTNAME;
									// 调用查询用户
									this.axios.post(url, this.ruleForm).then(resp => {
										var from3 = {
											userid: resp.data.userid,
											realnamecheck: 1
										}
										var url = this.axios.urls.LCCCSSM_UPDATEPHONE;
										this.axios.post(url, from3).then(resp => {
											if (resp.data === 1) {
												alert('认证成功')
												this.$router.push({
													path: '/UserAccount'
												});
											}
										}).catch(resp => {
											this.$message.error('系统错误，请稍后重试！');
										});
									}).catch(resp => {
										this.$message.error('系统错误，请稍后重试！');
									});
								} else {
									console.log("增加失败");
								}
							}).catch(resp => {
								this.$message.error('系统错误，请稍后重试！');
							});
						}).catch(resp => {
							this.$message.error('系统错误，请稍后重试！');
						});
						this.closeCamera();
						this.dialogFormVisible = false;
					} else {
						alert("和上传的身份证不符")
					}
				}).catch(resp => {
					this.$message.error('认证失败，请稍后重试！');
				});
			},
			// 关闭摄像头
			closeCamera: function() {
				if (!this.$refs['video'].srcObject) return
				let stream = this.$refs['video'].srcObject
				let tracks = stream.getTracks()
				tracks.forEach(track => {
					track.stop()
				})
				this.$refs['video'].srcObject = null
			},


		},
		computed: {
			resturantName: function() {
				return this.$store.state.resturantName; //不建议
			}
		}
	}
</script>

<style>
	.login-wrap {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-top: 10%;
		background-image: url(data:image/svg+xml;
 base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEzNjFweCIgaGVpZ2h0PSI2MDlweCIgdmlld0JveD0iMCAwIDEzNjEgNjA5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ni4yICg0NDQ5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iQW50LURlc2lnbi1Qcm8tMy4wIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i6LSm5oi35a+G56CB55m75b2VLeagoemqjCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc5LjAwMDAwMCwgLTgyLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc3LjAwMDAwMCwgNzMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTgiIG9wYWNpdHk9IjAuOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzQuOTAxNDE2LCA1NjkuNjk5MTU4KSByb3RhdGUoLTcuMDAwMDAwKSB0cmFuc2xhdGUoLTc0LjkwMTQxNiwgLTU2OS42OTkxNTgpIHRyYW5zbGF0ZSg0LjkwMTQxNiwgNTI1LjE5OTE1OCkiPgogICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGlkPSJPdmFsLTExIiBmaWxsPSIjQ0ZEQUU2IiBvcGFjaXR5PSIwLjI1IiBjeD0iNjMuNTc0ODc5MiIgY3k9IjMyLjQ2ODM2NyIgcng9IjIxLjc4MzA0NzkiIHJ5PSIyMS43NjYwMDgiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0zIiBmaWxsPSIjQ0ZEQUU2IiBvcGFjaXR5PSIwLjU5OTk5OTk2NCIgY3g9IjUuOTg3NDY0NzkiIGN5PSIxMy44NjY4NjAxIiByeD0iNS4yMTczOTEzIiByeT0iNS4yMTMzMDk5NyI+PC9lbGxpcHNlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zOC4xMzU0NTE0LDg4LjM1MjAyMTUgQzQzLjg5ODQyMjcsODguMzUyMDIxNSA0OC41NzAyMzQsODMuNjgzODY0NyA0OC41NzAyMzQsNzcuOTI1NDAxNSBDNDguNTcwMjM0LDcyLjE2NjkzODMgNDMuODk4NDIyNyw2Ny40OTg3ODE2IDM4LjEzNTQ1MTQsNjcuNDk4NzgxNiBDMzIuMzcyNDgwMSw2Ny40OTg3ODE2IDI3LjcwMDY2ODgsNzIuMTY2OTM4MyAyNy43MDA2Njg4LDc3LjkyNTQwMTUgQzI3LjcwMDY2ODgsODMuNjgzODY0NyAzMi4zNzI0ODAxLDg4LjM1MjAyMTUgMzguMTM1NDUxNCw4OC4zNTIwMjE1IFoiIGlkPSJPdmFsLTMtQ29weSIgZmlsbD0iI0NGREFFNiIgb3BhY2l0eT0iMC40NSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02NC4yNzc1NTgyLDMzLjE3MDQ5NjMgTDExOS4xODU4MzYsMTYuNTY1NDkxNSIgaWQ9IlBhdGgtMTIiIHN0cm9rZT0iI0NGREFFNiIgc3Ryb2tlLXdpZHRoPSIxLjczOTEzMDQzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDIuMTQzMTcwOCwyNi41MDAyNjgxIEw3LjcxMTkwMTYyLDE0LjU2NDA3MDIiIGlkPSJQYXRoLTE2IiBzdHJva2U9IiNFMEI0QjciIHN0cm9rZS13aWR0aD0iMC43MDI2Nzg5NjQiIG9wYWNpdHk9IjAuNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxLjQwNTM1Nzg5OTg3MzE1MywyLjEwODAzNjk1MzQ2OTk4MSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02My45MjYyMTg3LDMzLjUyMTU2MSBMNDMuNjcyMTMyNiw2OS4zMjUwOTUxIiBpZD0iUGF0aC0xNSIgc3Ryb2tlPSIjQkFDQUQ5IiBzdHJva2Utd2lkdGg9IjAuNzAyNjc4OTY0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjEuNDA1MzU3ODk5ODczMTUzLDIuMTA4MDM2OTUzNDY5OTgxIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjYuODUwOTIyLCAxMy41NDM2NTQpIHJvdGF0ZSgzMC4wMDAwMDApIHRyYW5zbGF0ZSgtMTI2Ljg1MDkyMiwgLTEzLjU0MzY1NCkgdHJhbnNsYXRlKDExNy4yODU3MDUsIDQuMzgxODg5KSIgZmlsbD0iI0NGREFFNiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGlkPSJPdmFsLTQiIG9wYWNpdHk9IjAuNDUiIGN4PSI5LjEzNDgyNjUzIiBjeT0iOS4xMjc2ODA3NiIgcng9IjkuMTM0ODI2NTMiIHJ5PSI5LjEyNzY4MDc2Ij48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOC4yNjk2NTMxLDE4LjI1NTM2MTUgQzE4LjI2OTY1MzEsMTMuMjE0MjgyNiAxNC4xNzk4NTE5LDkuMTI3NjgwNzYgOS4xMzQ4MjY1Myw5LjEyNzY4MDc2IEM0LjA4OTgwMTE0LDkuMTI3NjgwNzYgMCwxMy4yMTQyODI2IDAsMTguMjU1MzYxNSBMMTguMjY5NjUzMSwxOC4yNTUzNjE1IFoiIGlkPSJPdmFsLTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuMTM0ODI3LCAxMy42OTE1MjEpIHNjYWxlKC0xLCAtMSkgdHJhbnNsYXRlKC05LjEzNDgyNywgLTEzLjY5MTUyMSkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTYuMjk0NzAwLCAxMjMuNzI1NjAwKSByb3RhdGUoLTUuMDAwMDAwKSB0cmFuc2xhdGUoLTIxNi4yOTQ3MDAsIC0xMjMuNzI1NjAwKSB0cmFuc2xhdGUoMTA2LjI5NDcwMCwgMzUuMjI1NjAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9Ik92YWwtMiIgZmlsbD0iI0NGREFFNiIgb3BhY2l0eT0iMC4yNSIgY3g9IjI5LjExNzY0NzEiIGN5PSIyOS4xNDAyNDM5IiByeD0iMjkuMTE3NjQ3MSIgcnk9IjI5LjE0MDI0MzkiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0yIiBmaWxsPSIjQ0ZEQUU2IiBvcGFjaXR5PSIwLjMiIGN4PSIyOS4xMTc2NDcxIiBjeT0iMjkuMTQwMjQzOSIgcng9IjIxLjU2ODYyNzUiIHJ5PSIyMS41ODUzNjU5Ij48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9Ik92YWwtMi1Db3B5IiBzdHJva2U9IiNDRkRBRTYiIG9wYWNpdHk9IjAuNCIgY3g9IjE3OS4wMTk2MDgiIGN5PSIxMzguMTQ2MzQxIiByeD0iMjMuNzI1NDkwMiIgcnk9IjIzLjc0MzkwMjQiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0yIiBmaWxsPSIjQkFDQUQ5IiBvcGFjaXR5PSIwLjUiIGN4PSIyOS4xMTc2NDcxIiBjeT0iMjkuMTQwMjQzOSIgcng9IjEwLjc4NDMxMzciIHJ5PSIxMC43OTI2ODI5Ij48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI5LjExNzY0NzEsMzkuOTMyOTI2OCBMMjkuMTE3NjQ3MSwxOC4zNDc1NjEgQzIzLjE2MTYzNTEsMTguMzQ3NTYxIDE4LjMzMzMzMzMsMjMuMTc5NjA5NyAxOC4zMzMzMzMzLDI5LjE0MDI0MzkgQzE4LjMzMzMzMzMsMzUuMTAwODc4MSAyMy4xNjE2MzUxLDM5LjkzMjkyNjggMjkuMTE3NjQ3MSwzOS45MzI5MjY4IFoiIGlkPSJPdmFsLTIiIGZpbGw9IiNCQUNBRDkiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtOSIgb3BhY2l0eT0iMC40NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcyLjAwMDAwMCwgMTMxLjAwMDAwMCkiIGZpbGw9IiNFNkExQTYiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0yLUNvcHktMiIgY3g9IjcuMDE5NjA3ODQiIGN5PSI3LjE0NjM0MTQ2IiByeD0iNi40NzA1ODgyNCIgcnk9IjYuNDc1NjA5NzYiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuNTQ5MDE5NjA4LDEzLjYyMTk1MTIgQzQuMTIyNjI2ODEsMTMuNjIxOTUxMiA3LjAxOTYwNzg0LDEwLjcyMjcyMiA3LjAxOTYwNzg0LDcuMTQ2MzQxNDYgQzcuMDE5NjA3ODQsMy41Njk5NjA5NSA0LjEyMjYyNjgxLDAuNjcwNzMxNzA3IDAuNTQ5MDE5NjA4LDAuNjcwNzMxNzA3IEwwLjU0OTAxOTYwOCwxMy42MjE5NTEyIFoiIGlkPSJPdmFsLTItQ29weS0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjc4NDMxNCwgNy4xNDYzNDEpIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTMuNzg0MzE0LCAtNy4xNDYzNDEpICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0xMCIgZmlsbD0iI0NGREFFNiIgY3g9IjIxOC4zODIzNTMiIGN5PSIxMzguNjg1OTc2IiByeD0iMS42MTc2NDcwNiIgcnk9IjEuNjE4OTAyNDQiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0xMC1Db3B5LTIiIGZpbGw9IiNFMEI0QjciIG9wYWNpdHk9IjAuMzUiIGN4PSIxNzkuNTU4ODI0IiBjeT0iMTc1LjM4MTA5OCIgcng9IjEuNjE3NjQ3MDYiIHJ5PSIxLjYxODkwMjQ0Ij48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9Ik92YWwtMTAtQ29weSIgZmlsbD0iI0UwQjRCNyIgb3BhY2l0eT0iMC4zNSIgY3g9IjE4MC4wOTgwMzkiIGN5PSIxMDIuNTMwNDg4IiByeD0iMi4xNTY4NjI3NSIgcnk9IjIuMTU4NTM2NTkiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjguOTk4NTM4MSwyOS45NjcxNTk4IEwxNzEuMTUxMDE4LDEzMi44NzYwMjQiIGlkPSJQYXRoLTExIiBzdHJva2U9IiNDRkRBRTYiIG9wYWNpdHk9IjAuOCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTEwIiBvcGFjaXR5PSIwLjc5OTk5OTk1MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA1NC4xMDA2MzUsIDM2LjY1OTMxNykgcm90YXRlKC0xMS4wMDAwMDApIHRyYW5zbGF0ZSgtMTA1NC4xMDA2MzUsIC0zNi42NTkzMTcpIHRyYW5zbGF0ZSgxMDI2LjYwMDYzNSwgNC42NTkzMTcpIj4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC03IiBzdHJva2U9IiNDRkRBRTYiIHN0cm9rZS13aWR0aD0iMC45NDExNzY0NzEiIGN4PSI0My44MTM1NTkzIiBjeT0iMzIiIHJ4PSIxMS4xODY0NDA3IiByeT0iMTEuMjk0MTE3NiI+PC9lbGxpcHNlPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQuNTk2Nzc0LCAyMy4xMTExMTEpIiBmaWxsPSIjQkFDQUQ5Ij4KICAgICAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9Ik92YWwtNyIgb3BhY2l0eT0iMC40NSIgY3g9IjkuMTg1MzQ3MTgiIGN5PSI4Ljg4ODg4ODg5IiByeD0iOC40NzQ1NzYyNyIgcnk9IjguNTU2MTQ5NzMiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTkuMTg1MzQ3MTgsMTcuNDQ1MDM4NiBDMTMuODY1NzI2NCwxNy40NDUwMzg2IDE3LjY1OTkyMzUsMTMuNjE0MzE5OSAxNy42NTk5MjM1LDguODg4ODg4ODkgQzE3LjY1OTkyMzUsNC4xNjM0NTc4NyAxMy44NjU3MjY0LDAuMzMyNzM5MTU2IDkuMTg1MzQ3MTgsMC4zMzI3MzkxNTYgTDkuMTg1MzQ3MTgsMTcuNDQ1MDM4NiBaIiBpZD0iT3ZhbC03Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNC42NTk3Mzg1LDI0LjgwOTY5NCBMNS43MTY2NjA4NCw0Ljc2ODc4OTQ1IiBpZD0iUGF0aC0yIiBzdHJva2U9IiNDRkRBRTYiIHN0cm9rZS13aWR0aD0iMC45NDExNzY0NzEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbCIgc3Ryb2tlPSIjQ0ZEQUU2IiBzdHJva2Utd2lkdGg9IjAuOTQxMTc2NDcxIiBjeD0iMy4yNjI3MTE4NiIgY3k9IjMuMjk0MTE3NjUiIHJ4PSIzLjI2MjcxMTg2IiByeT0iMy4yOTQxMTc2NSI+PC9lbGxpcHNlPgogICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGlkPSJPdmFsLUNvcHkiIGZpbGw9IiNGN0UxQUQiIGN4PSIyLjc5NjYxMDE3IiBjeT0iNjEuMTc2NDcwNiIgcng9IjIuNzk2NjEwMTciIHJ5PSIyLjgyMzUyOTQxIj48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTM0LjYzMTI0NDMsMzkuMjkyMjcxMiBMNS4wNjM2NjY2Myw1OS43ODUwODIiIGlkPSJQYXRoLTEwIiBzdHJva2U9IiNDRkRBRTYiIHN0cm9rZS13aWR0aD0iMC45NDExNzY0NzEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xOSIgb3BhY2l0eT0iMC4zMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI4Mi41MzcyMTksIDQ0Ni41MDI4NjcpIHJvdGF0ZSgtMTAuMDAwMDAwKSB0cmFuc2xhdGUoLTEyODIuNTM3MjE5LCAtNDQ2LjUwMjg2NykgdHJhbnNsYXRlKDExNDIuNTM3MjE5LCAzMjcuNTAyODY3KSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDEuMzMzNTM5LCAxMDQuNTAyNzQyKSByb3RhdGUoMjc1LjAwMDAwMCkgdHJhbnNsYXRlKC0xNDEuMzMzNTM5LCAtMTA0LjUwMjc0MikgdHJhbnNsYXRlKDEyOS4zMzM1MzksIDkyLjUwMjc0MikiIGZpbGw9IiNCQUNBRDkiPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTQiIG9wYWNpdHk9IjAuNDUiIGN4PSIxMS42NjY2NjY3IiBjeT0iMTEuNjY2NjY2NyIgcj0iMTEuNjY2NjY2NyI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMy4zMzMzMzMzLDIzLjMzMzMzMzMgQzIzLjMzMzMzMzMsMTYuODkwMDExMyAxOC4xMDk5ODg3LDExLjY2NjY2NjcgMTEuNjY2NjY2NywxMS42NjY2NjY3IEM1LjIyMzM0NDU5LDExLjY2NjY2NjcgMCwxNi44OTAwMTEzIDAsMjMuMzMzMzMzMyBMMjMuMzMzMzMzMywyMy4zMzMzMzMzIFoiIGlkPSJPdmFsLTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExLjY2NjY2NywgMTcuNTAwMDAwKSBzY2FsZSgtMSwgLTEpIHRyYW5zbGF0ZSgtMTEuNjY2NjY3LCAtMTcuNTAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC01LUNvcHktNiIgZmlsbD0iI0NGREFFNiIgY3g9IjIwMS44MzMzMzMiIGN5PSI4Ny41IiByPSI1LjgzMzMzMzMzIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQzLjUsODguODEyNjY4NSBMMTU1LjA3MDUwMSwxNy42MDM4NTQ0IiBpZD0iUGF0aC0xNyIgc3Ryb2tlPSIjQkFDQUQ5IiBzdHJva2Utd2lkdGg9IjEuMTY2NjY2NjciPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTcuNSwzNy4zMzMzMzMzIEwxMjcuNDY2MjUyLDk3LjY0NDk3MzUiIGlkPSJQYXRoLTE4IiBzdHJva2U9IiNCQUNBRDkiIHN0cm9rZS13aWR0aD0iMS4xNjY2NjY2NyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0xOSIgc3Ryb2tlPSIjQ0ZEQUU2IiBzdHJva2Utd2lkdGg9IjEuMTY2NjY2NjciIHBvaW50cz0iMTQzLjkwMjU5NyAxMjAuMzAyMjgxIDE3NC45MzU0NTUgMjMxLjU3MTM0MiAzOC41IDE0Ny41MTA4NDcgMTI2LjM2Njk0MSAxMTAuODMzMzMzIj48L3BvbHlsaW5lPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTkuODMzMzMzLDk5Ljc0NTM4NDIgTDE5NS40MTY2NjcsODkuMjUiIGlkPSJQYXRoLTIwIiBzdHJva2U9IiNFMEI0QjciIHN0cm9rZS13aWR0aD0iMS4xNjY2NjY2NyIgb3BhY2l0eT0iMC42Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIwNS4zMzMzMzMsODIuMTM3MjEwNSBMMjM4LjcxOTQwNiwzNi4xNjY2NjY3IiBpZD0iUGF0aC0yNCIgc3Ryb2tlPSIjQkFDQUQ5IiBzdHJva2Utd2lkdGg9IjEuMTY2NjY2NjciPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjY2LjcyMzQyNCwxMzIuMjMxOTg4IEwyMDcuMDgzMzMzLDkwLjQxNjY2NjciIGlkPSJQYXRoLTI1IiBzdHJva2U9IiNDRkRBRTYiIHN0cm9rZS13aWR0aD0iMS4xNjY2NjY2NyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNSIgZmlsbD0iI0MxRDFFMCIgY3g9IjE1Ni45MTY2NjciIGN5PSI4Ljc1IiByPSI4Ljc1Ij48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTUtQ29weS0zIiBmaWxsPSIjQzFEMUUwIiBjeD0iMzkuMDgzMzMzMyIgY3k9IjE0OC43NSIgcj0iNS4yNSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC01LUNvcHktMiIgZmlsbC1vcGFjaXR5PSIwLjYiIGZpbGw9IiNEMURFRUQiIGN4PSI4Ljc1IiBjeT0iMzMuMjUiIHI9IjguNzUiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNS1Db3B5LTQiIGZpbGwtb3BhY2l0eT0iMC42IiBmaWxsPSIjRDFERUVEIiBjeD0iMjQzLjgzMzMzMyIgY3k9IjMwLjMzMzMzMzMiIHI9IjUuODMzMzMzMzMiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNS1Db3B5LTUiIGZpbGw9IiNFMEI0QjciIGN4PSIxNzUuNTgzMzMzIiBjeT0iMjMyLjc1IiByPSI1LjI1Ij48L2NpcmNsZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
		/* background-color: #112346; */
		background-repeat: no-repeat;
		background-position: center right;
		background-size: 100%;
	}

	.login-container {
		border-radius: 10px;
		margin: 0px auto;
		width: 550px;
		padding: 30px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		text-align: left;
		box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
	}

	.title {
		margin: 0px auto 40px auto;
		text-align: center;
		color: #505458;
	}

	.btn {
		width: 100%;
	}
</style>
