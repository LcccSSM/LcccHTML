<template>
	<el-menu router default-active="2" id="ma" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#334157"
	 text-color="#fff" style="height: 770px;" active-text-color="#ffd04b" :collapse="collapsed" :collapse-transition="bb">
		<!-- <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"> -->
		<div style="text-align: right;" class="logobox">
			<img class="logoimg" :src="collapsed?imgshow:imgsq" @click="doToggle()" alt="">&nbsp;&nbsp;&nbsp;
		</div>
		<el-submenu v-for="n1 in result" :index="'index-'+n1.functionId" :key="'key-'+n1.method">
			  <template slot="title">
				<i class="el-icon-location"></i>
				<span>{{n1.functionName}}</span>
			  </template>
		 <el-menu-item v-for="n2 in n1.children" :index="n2.path" :key="'index2-'+n2.functionId">{{n2.functionName}}</el-menu-item>
    </el-submenu>
	</el-menu>
</template>
<script>
	export default {
		data:function(){
			return {
				collapsed: false, //折叠
				bb: false ,//过渡动画
				imgshow: require('../assets/img/show.png'),
				imgsq: require('../assets/img/sq.png'),
				result:''
			}
		},
    methods:{
      doToggle: function() {
        this.collapsed = !this.collapsed;
        this.$root.Bus.$emit("toggle", this.collapsed);
      }
    },
	created:function(){
		this.$root.Bus.$on("toggle",v =>{
			this.collapsed = v;
		});
		 var url = this.axios.urls.SYSTEM_MENU;
		 console.log(url);
		  this.axios.post(url).then(resp => {
			console.log(resp);
			this.result = resp.data.result
		  }).catch(resp => {
				console.log(resp);
		  });
	}
	}
</script>
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 300px;
		min-height: 770px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
		text-align: left;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}

	.el-menu-bg {
		background-color: #1f2d3d !important;
	}

	.el-menu {
		border: none;
	}

	.logobox {
		height: 40px;
		line-height: 40px;
		color: #9d9d9d;
		font-size: 20px;
		text-align: center;
		padding: 20px 0px;
	}

	.logoimg {
		height: 40px;
	}
</style>
