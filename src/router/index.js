import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import Signin from '@/components/Signin';
import NewArticle from '@/components/NewArticle';
import HomePage from '@/components/HomePage';
import ArticleList from '@/components/ArticleList';
import Follow from '@/components/Follow';
import Favorite from '@/components/Favorite';

Vue.use(Router);

export default new Router({
    routes: [
/*	    {
	        path: '/',
	        name: 'Hello',
	        component: Hello
	    },*/
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/signin',
			name: 'Signin',
			component: Signin
		},
		{
			path: '/homepage',
			name: 'HomePage',
			component: HomePage,
			children: [
				{//列表
					path: '',
					name: 'List',
					component: ArticleList
				},
				{//文章列表
					path: ':sid',
					name: 'List',
					component: ArticleList
				},
				{//新建发布文章
					path: 'new',
					name: 'NewArticle',
					component: NewArticle
				},
				{//我的文章列表
					path: 'blog/:sid',
					name: 'MyBlog',
					component: ArticleList
				},
				{//收藏列表
					path: 'favorite',
					name: 'Favorite',
					component: Favorite
				},
				{//关注列表
					path: 'follow',
					name: 'Follow',
					component: Follow
				},
				{
					path: ''
				}
			]
		},
    ]
});
