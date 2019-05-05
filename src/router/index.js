import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// 组件
import Index from '@/components/Index'
import Login from '@/components/Login'


Vue.use(Router)

var querystring = require('querystring');

var router = new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: '首页',
			component: Index,
			// meta: {
			// 	requireAuth: true
			// }
		},
		{
			path: '/login',
			name: '登录',
			component: Login
		},

	]
})

// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
// 		axios.defaults.withCredentials = true
// 		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 		var data = {};
// 		axios.post(Vue.prototype.getBaseUrl()+"getLoginUesr", querystring.stringify(data), {
// 			withCredentials: true
// 		}).then(response => {
// 			if (response.data.code == "60000" || response.data.code == "50000" || response.data.code == "30000") {
// 				next({
// 					path: '/login'
// 				})
// 			} else {
// 				next();
// 			}
// 		})
// 	} else {
// 		next();
// 	}
// })
export default router;
