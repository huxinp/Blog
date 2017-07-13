import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import Signin from '@/components/Signin';
import NewArticle from '@/components/NewArticle';
import HomePage from '@/components/HomePage';
import ArticleList from '@/components/ArticleList';

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
				{
					path: '',
					name: 'List',
					component: ArticleList
				},
				{
					path: 'new',
					name: 'NewArticle',
					component: NewArticle
				}
			]
		},
    ]
});
