// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui' //新添加1，导入element-ui
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，要放在import App from './App';之前
 import store from './store' //导入store

import axios from '@/api/http'
import VueAxios from 'vue-axios'


import App from './App'
import router from './router'
Vue.use(ElementUI) //新添加3  vue使用element-ui
Vue.config.productionTip = false
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>',
  data: {
    //自定义的事件总线对象，用于父子组件的通信
    Bus: new Vue()
  }
})