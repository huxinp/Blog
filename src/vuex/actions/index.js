import axios from 'axios';

export default {
	getToken({commit}){
		commit('GETTOKEN');
	},
	login({commit}, payload){
		axios.post("/api/login", payload).then(res => {
			commit('LOGIN', res.data.result.token);
		}).catch(err => console.log(err));
	},
}
