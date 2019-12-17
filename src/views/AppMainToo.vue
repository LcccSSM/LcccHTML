<template>
  <el-row>

    <el-container>
      <el-left>
        <MenuLeftNavTo></MenuLeftNavTo>
      </el-left>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
		
  </el-row>


</template>

<script>
  // 1.导入组件
  import MenuLeftNavTo from '@/components/MenuLeftNavTo.vue'

  // 导出模块
  export default {
    data: function() {
      return {
        // collapsed: false
      }

    },
    components: { //2.注册组件
      MenuLeftNavTo

    },
    computed: {
      asideClass: function() {
        return this.collapsed ? 'main-aside-collapsed' : 'main-aside'
      }
    },
    created: function() {
      this.$root.Bus.$on("toggle", v => {
        if (v) {
         var a= document.getElementById("aside").style;
         a.height="770px";
         a.width = "64px";
        } else {
          // alert("false");
          var a= document.getElementById("aside").style;
          a.height="770px";
          a.width = "300px";
        }
      });
    },
		methods:{
			
		}
  };
</script>
<style scoped>
  .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    /* margin-top: -50px; */
    padding-bottom: 30px;
    line-height: 70px;

  }

  .el-footer {
    text-align: center;
    margin-top: -50px;
    padding-bottom: 100px;
    line-height: 60px;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

</style>
