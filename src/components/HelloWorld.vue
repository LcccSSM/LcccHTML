<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <h2>Essential Links</h2>
    <ul>
      <li>
        <router-link to="/dict/DictIndex">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small">字典信息</el-button>
        </router-link>
      </li>
      <li>
        <router-link to="/loan/LoantIndex">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small">还款信息</el-button>
        </router-link>
      </li>
      <li>
        <router-link to="/loan/LoantIndex">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small">还款信息</el-button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
