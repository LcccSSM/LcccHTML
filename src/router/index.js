import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '@/App'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Phone from '@/views/Phone'
import BorrowingIndex from '@/views/borrowing/borrowingIndex'
import AppMain from '@/views/AppMain'
import Index from '@/views/index'
import UserInfo from '@/views/User/UserInfo'
import UserAccount from '@/views/User/UserAccount'
import AppMainToo from '@/views/AppMainToo'
import UserEmail from '@/views/User/UserEmail'
import UserSFZ from '@/views/User/UserSFZ'

Vue.use(Router)

export default new Router({
	routes: [{
			//主页
			path: '/',
			name: "AppMain",
			component: AppMain,
			children: [{
					path: "/",
					name: "首页",
					component: Index
				},
				{
					path: '/Index',
					name: 'Index',
					component: Index
				},
				{ //借贷主页
					path: '/BorrowingIndex',
					name: 'BorrowingIndex',
					component: BorrowingIndex
				},
				{ //注册
					path: '/Login',
					name: "Login",
					component: Login,
				},
				{
					path: '/Register',
					name: 'Register',
					component: Register
				},
				{
					path: '/Phone',
					name: 'Phone',
					component: Phone
				},
				{
					path: '/AppMainToo',
					name: 'AppMainToo',
					component: AppMainToo,
					children:[{
						path: '/',
						name: 'UserInfo',
						component: UserInfo
					},{
						path: '/UserAccount',
						name: 'UserAccount',
						component: UserAccount
					},{
						path: '/UserInfo',
						name: 'UserInfo',
						component: UserInfo
					},{
						path: '/UserEmail',
						name: 'UserEmail',
						component: UserEmail
					},{
						path: '/UserSFZ',
						name: 'UserSFZ',
						component: UserSFZ
					}]
				},
			]
		},
		{ //注册
			path: '/Login',
			name: "Login",
			component: Login,
		},
		{
			path: '/Register',
			name: 'Register',
			component: Register
		},
		{
			path: '/Phone',
			name: 'Phone',
			component: Phone
		},
		
	]
})
