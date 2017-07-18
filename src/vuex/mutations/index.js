import {
	GETTOKEN, LOGIN, FRESH_ARTICLE, PUBLISH_ARTICLE, GET_TOPIC_LIST, USER_ARTICLE,
	GET_FAVORITE_LIST, FAVORITE, FAVORITE_CANCEL, FOLLOW, FOLLOW_CANCEL, RECIATE,
	GET_ARTICLE
} from './mutation-type';

import {cookie} from '../../assets/js/common';

export default {
	[GETTOKEN](state){
		state.token = cookie.getCookie('token');
		state.user = JSON.parse(cookie.getCookie('user'));
	},
	//登录
	[LOGIN](state, payload){
		state.token = payload.token;
		cookie.setCookie('token', payload.token);
		let user = {};
		user.icon = payload.user.icon;
		user.nickName = payload.user.nickName;
		user.account = payload.user.account;
		user.sid = payload.user.sid;
		user.sex = payload.user.sex;
		user.mobilePhone = payload.user.mobilePhone;
		user.signature = payload.user.signature;
		user._id = payload.user._id;
		state.user = user;
		// cookie.setCookie('user', JSON.stringify(user));
		cookie.setCookie('user', user);
	},
	//获取最新文章列表
	[FRESH_ARTICLE](state, payload){
		state.articleList = payload.data;
		state.pagination = payload.pagination;
	},
	//发布文章
	[PUBLISH_ARTICLE](state, payload){
		console.log(payload);
	},
	//获取话题标签列表
	[GET_TOPIC_LIST](state, payload){
		state.topicList = payload;
	},
	//获取用户文章列表
	[USER_ARTICLE](state, payload){
		state.articleList = payload.data;
		state.pagination = payload.pagination;
	},
	//获取收藏列表
	[GET_FAVORITE_LIST](state, payload){
		console.log(payload);
		state.briefList = payload.data;
		state.pagination = payload.pagination;
	},
	//收藏
	[FAVORITE](state, payload){
		console.log(payload);
	},
	//取消收藏
	[FAVORITE_CANCEL](state, payload){
		console.log(payload);
	},
	//关注
	[FOLLOW](state, payload){
		console.log(payload);
	},
	//取消关注
	[FOLLOW_CANCEL](state, payload){
		console.log(payload);
	},
	//点赞 | 取消点赞
	[RECIATE](state, payload){
		console.log(payload);
	},
	//获取指定文章
	[GET_ARTICLE](state, payload){
		state.article = payload
	},
}
