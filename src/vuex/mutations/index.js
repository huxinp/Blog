import {
	GETTOKEN, LOGIN, FRESH_ARTICLE, PUBLISH_ARTICLE
} from './mutation-type';

import {cookie} from '../../assets/js/common';

export default {
	[GETTOKEN](state){
		state.token = cookie.getCookie('token');
		state.user = JSON.parse(cookie.getCookie('user'));
	},
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
	[FRESH_ARTICLE](state, payload){
		state.articleList = payload.data;
		state.pagination = payload.pagination;
	},
	[PUBLISH_ARTICLE](state, payload){
		console.log(payload);
	}
}
