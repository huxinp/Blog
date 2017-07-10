import {
	GETTOKEN, LOGIN
} from './mutation-type';
import {cookie} from '../../assets/js/common';
export default {
	[GETTOKEN](state){
		state.token = cookie.getCookie('token');
		console.log(state.token);
	},
	[LOGIN](state, payload){
		state.token = payload;
		cookie.setCookie('token', payload);
	}
}
