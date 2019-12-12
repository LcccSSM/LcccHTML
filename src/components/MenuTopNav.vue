<template>
  <el-row :gutter="20">
    <el-col :span="7"><div style="text-align: left;" class="grid-content bg-purple"><img style="padding-top: 1px;" src="../assets/logo.jpg" /></div></el-col>

    <el-col :span="9"><div style="text-align: center;" class="grid-content bg-purple"><h1>客户关系管理系统</h1></div></el-col>

    <el-col :span="6"><div style="text-align: right;" class="grid-content bg-purple">
    当前用户：<b style="color: black;">{{resturantName}}</b>
    <router-link to="/market/MarketIndex">快速登录</router-link>
    </div></el-col>
    <el-col :span="2"><div style="text-align: right;padding-top: 30px;" class="grid-content bg-purple"><router-link to="/Login">退出系统</router-link></div></el-col>
  </el-row>
</template>

<script>
  export default {
    data: function() {
      return {
        collapsed: false,
        imgshow: require('../assets/img/show.png'),
        imgsq: require('../assets/img/sq.png')
      }
    },
    methods: {

    },
    computed: {
      resturantName:function(){
          return this.$store.state.resturantName;//不建议
      }
    }


  }
</script>

<style scoped>
</style>
