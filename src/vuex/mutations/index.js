import {
	GETTOKEN, LOGIN, FRESH_ARTICLE, PUBLISH_ARTICLE
} from './mutation-type';

import {cookie} from '../../assets/js/common';

export default {
	[GETTOKEN](state){
		state.token = cookie.getCookie('token');
	},
	[LOGIN](state, payload){
		state.token = payload.token;
		cookie.setCookie('token', payload.token);
		state.user = payload.user;
	},
	[FRESH_ARTICLE](state, payload){
		state.articleList = payload.data;
		state.pagination = payload.pagination;
	},
	[PUBLISH_ARTICLE](state, payload){
		console.log(payload);
	}
}
