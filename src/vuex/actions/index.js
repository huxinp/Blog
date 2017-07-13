import axios from 'axios';
import router from '../../router';
export default {
	//读取cookie中的token
	getToken({commit}){
		commit('GETTOKEN');
	},
	//登录
	login({commit}, payload){
		axios.post("/api/login", payload).then(res => {
			if(res.data.code === 0){
				router.push('homepage');
				commit('LOGIN', res.data.result);
			}else{
				console.log(res.data);
			}
		}).catch(err => console.log(err));
	},
	//拉取新文章
	getFreshArticle({commit}, payload){
		axios.get(`/api/article/fresh?pageSize=${payload.pageSize}&currentPage=${payload.currentPage}`).then(res => {
			if(res.data.code === 0){
				commit('FRESH_ARTICLE', res.data.result);
			}else{
				console.log(res.data);
			}
		})
	},
	//发布新文章
	publishArticle({commit, state}, payload){
		axios.defaults.headers.common["Authorization"] =  'token ' + state.token;
		axios.post('/api/article/publish', payload).then(res => {
			if(res.data.code === 0){
				commit('PUBLISH_ARTICLE', res.data.result);
			}
		}).catch(err => console.log(err));
	}
}
