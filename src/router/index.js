import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DictIndex from '@/views/dict/DictIndex'
import LoantIndex from '@/views/loan/LoantIndex'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dict/DictIndex',
      name: 'DictIndex',
      component: DictIndex
    },
    {
      path: '/loan/LoantIndex',
      name: 'LoantIndex',
      component: LoantIndex
    }
  ]
})
