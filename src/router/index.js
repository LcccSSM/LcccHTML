import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '@/App'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Phone from '@/views/Phone'
import BorrowingIndex from '@/views/borrowing/borrowingIndex'
import LoantIndex from '@/views/loan/LoantIndex'
import DictIndex from '@/views/dict/DictIndex'
import AppMain from '@/views/AppMain'
import Index from '@/views/index'
import UserInfo from '@/views/User/UserInfo'
import UserAccount from '@/views/User/UserAccount'
import AppMainToo from '@/views/AppMainToo'
import UserEmail from '@/views/User/UserEmail'
import UserSFZ from '@/views/User/UserSFZ'
import UserPhone from '@/views/User/UserPhone'
import UserPassword from '@/views/User/UserPassword'
import UserBank from '@/views/User/UserBank'
import UserBankIndex from '@/views/User/UserBankIndex'
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
				// { //注册
				// 	path: '/Login',
				// 	name: "Login",
				// 	component: Login,
				// },
				// {
				// 	path: '/Register',
				// 	name: 'Register',
				// 	component: Register
				// },
				{
					path: '/Phone',
					name: 'Phone',
					component: Phone
				},
				{
					path: '/AppMainToo',
					name: 'AppMainToo',
					component: AppMainToo,
					children: [{
							path: '/',
							name: 'UserInfo',
							component: UserInfo
						}, {
							path: '/UserAccount',
							name: 'UserAccount',
							component: UserAccount
						}, {
							path: '/UserInfo',
							name: 'UserInfo',
							component: UserInfo
						}, {
							path: '/UserEmail',
							name: 'UserEmail',
							component: UserEmail
						}, {
							path: '/UserSFZ',
							name: 'UserSFZ',
							component: UserSFZ,

						},
						{
							path: '/UserPhone',
							name: 'UserPhone',
							component: UserPhone
						}, 
						{
							path: '/UserPassword',
							name: 'UserPassword',
							component: UserPassword
						}, 
						{
							path: '/UserBank',
							name: 'UserBank',
							component: UserBank
						}, 
						{
							path: '/UserBankIndex',
							name: 'UserBankIndex',
							component: UserBankIndex
						}
					]
				},
				{
					path: '/HelloWorld',
					name: 'HelloWorld',
					component: HelloWorld
				},
				{
					path: '/loan/LoantIndex',
					name: 'LoantIndex',
					component: LoantIndex
				},
				{
					path: '/dict/DictIndex',
					name: 'DictIndex',
					component: DictIndex
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
