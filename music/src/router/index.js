import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//配置路由 组件引入
import Recommend from 'pages/Recommend/Recommend'
import Rank from 'pages/Rank/Rank'
import Search from 'pages/Search/Search'
import Singer from 'pages/Singer/Singer'
import SingerDetail from 'pages/SingerDetail/SingerDetail'
import RecommendDetail from 'pages/RecommendDetail/RecommendDetail'
//创建路由信息
let router = new Router({
	routes: [{
			path: '/recommend',
			name: 'Recommend',
			component: Recommend,
			children: [{ /*子路由*/
				path:'RecommendDetail',
				name:'RecommendDetail',
				component:RecommendDetail
			}]
		},
		{
			path: '/rank',
			name: 'Rank',
			component: Rank,
		 beforeEnter: (to, from, next) => {
          console.log('独享守卫')
          console.log(to)
          console.log(from)
          next()
      }
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		},
		{
			path: '/singer',
			name: 'Singer',
			component: Singer,
			children: [{ /*子路由*/
				path: 'detail',
				name: 'detail',
				component: SingerDetail
			}]
		},
		{
			//重定向
			path: '/',
			redirect: '/recommend'
		}
	]
})
export default router;