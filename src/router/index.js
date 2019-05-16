import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// 组件
import Index from '@/components/Index'

// mobile
import LoginUser from '@/views/mobile/login_user'
import Answer from '@/views/mobile/answer'
import Finish from '@/views/mobile/finish'

// pc
import Login from '@/views/pc/login'
import ScroeList from '@/views/pc/scroeList'
import QuestionList from '@/views/pc/questionList'


Vue.use(Router)

var router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: '首页',
			component: LoginUser,
			// meta: {
			// 	requireAuth: true
			// }
		},
		{
			path: '/finish',
			name: '完成页面',
			component: Finish,
		},
		{
			path: '/answer',
			name: '答题页面',
			component: Answer,
			// meta: {
			// 	requireAuth: true
			// }
		},

		{
			path: '/login',
			name: '登录',
			component: Login
		},
		{
			path: '/scroeList',
			name: '成绩列表',
			component: ScroeList
		},
		{
			path: '/questionList',
			name: '题目设置',
			component: QuestionList
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
