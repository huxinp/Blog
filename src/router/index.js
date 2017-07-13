import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import Signin from '@/components/Signin';
import NewArticle from '@/components/NewArticle';
import HomePage from '@/components/HomePage';

Vue.use(Router);

export default new Router({
    routes: [
/*	    {
	        path: '/',
	        name: 'Hello',
	        component: Hello
	    },*/
		{
			path: '/',
			name: 'Login',
			component: Login
		},
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
			path: '/newArticle',
			name: 'NewArticle',
			component: NewArticle
		},
		{
			path: '/main',
			name: 'HomePage',
			component: HomePage
		},
    ]
});
