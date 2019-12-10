import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '@/App'
import Login from '@/views/Login'
import Register from '@/views/Register'
import a from '@/views/a'
import Phone from '@/views/Phone'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login,
// 			children:[{
// 					path:'/Phone',
// 					name:'Phone',
// 					component:Phone
// 			},]
		},
		{
			path: '/Login',
			name: "Login",
			component: Login,
		},
		{
			path:'/Register',
			name:'Register',
			component:Register
		},
		{
			path:'/a',
			name:'a',
			component:a
		},
		{
			path:'/Phone',
			name:'Phone',
			component:Phone
		},
		
	]
})
