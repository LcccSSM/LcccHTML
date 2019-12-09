import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/views/register'
import BorrowingIndex from '@/views/borrowing/borrowingIndex'
import AppMain from '@/views/AppMain'
import Index from '@/views/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      component: AppMain
    },
		{//主页
			path:'/AppMain',
			name:"AppMain",
			component:AppMain,
			children: [{
					path:"/",
					name:"首页",
					component:Index
				},
				{
          path: '/Index',
          name: 'Index',
          component: Index
        },
				{//借贷主页
					path:'/BorrowingIndex',
					name:'BorrowingIndex',
					component:BorrowingIndex
				}
				]
		},
		{//注册
			path:'/Register',
			name:"Register",
			component:Register
		}
  ]
})
