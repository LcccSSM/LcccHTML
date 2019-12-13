<template>
  <el-row>
    <el-container>
      <el-footer>
        <MenuTopNav></MenuTopNav>
      </el-footer>
    </el-container>

    <el-container>
      <el-aside id="aside">
        <MenuLeftNav></MenuLeftNav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-container>
      <el-header>
        <MenuBottomNav></MenuBottomNav>
      </el-header>
    </el-container>

  </el-row>


</template>

<script>
  // 1.导入组件
  import MenuTopNav from '@/components/MenuTopNav.vue'
  import MenuLeftNav from '@/components/MenuLeftNav.vue'
  import MenuBottomNav from '@/components/MenuBottomNav.vue'


  // 导出模块
  export default {
    data: function() {
      return {
        // collapsed: false
      }

    },
    components: { //2.注册组件
      MenuTopNav,
      MenuLeftNav,
      MenuBottomNav

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
    background-color: #B3C0D1;
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

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
