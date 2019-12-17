<template>
	<el-row class="tac">
		<el-col >
			<el-menu router default-active="UserInfo" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-menu-item index="UserInfo">
					<span slot="title">个人信息</span>
				</el-menu-item>
				<el-menu-item index="UserAccount">
					<span slot="title">安全设置</span>
				</el-menu-item>
				<el-menu-item index="2">
					<span slot="title">银行卡</span>
				</el-menu-item>
				<el-menu-item index="2">
					<span slot="title">啊啊啊</span>
				</el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		data: function() {
			return {
				tabPosition: 'left'
			}
		},
		 methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }	
	}
</script>
<style>

</style>
