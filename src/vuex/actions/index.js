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
		});
	},
	//拉取用户文章列表
	getUserArticle({commit}, payload){
		axios.get(`/api/user/article/${payload.sid}?pageSize=${payload.pagination.pageSize}&currentPage=${payload.pagination.currentPage}`).then(res => {
			if(res.data.code === 0){
				commit('USER_ARTICLE', res.data.result);
			}else{
				console.log(res.data);
			}
		});
	},
	//发布新文章
	publishArticle({commit, state}, payload){
		axios.defaults.headers.common["Authorization"] =  'token ' + state.token;
		axios.post('/api/article/publish', payload).then(res => {
			if(res.data.code === 0){
				commit('PUBLISH_ARTICLE', res.data.result);
			}
		}).catch(err => console.log(err));
	},
	getArticle({commit}, payload){
		axios.get(`/api/article/${payload}`).then(res => {
			if(res.data.code === 0){
				commit('GET_ARTICLE', res.data.result);
			}
		}).catch(err => console.log(err));
	},
	//获取话题标签列表
	getTopicList({commit}){
		axios.get('/api/topic/list').then(res => {
			if(res.data.code === 0){
				commit('GET_TOPIC_LIST', res.data.result);
			}else{
				console.log(res.data);
			}
		}).catch(err => {
			console.log(err);
		});
	},
	//获取收藏列表
	getFavoriteList({commit}, payload){
		axios.post(`/api/favorite/list/${payload.userId}`, payload.data).then(res => {
			if(res.data.code === 0){
				commit('GET_FAVORITE_LIST', res.data.result);
			}else {
				console.log(res.data);
			}
		}).catch(err => {
			console.log(err);
		});
	},
	//收藏
	favorite({commit}, payload){
		axios.post(`/api/favorite/add/${payload.articleSid}`, payload.data).then(res => {
			if(res.data.code === 0){
				commit('FAVORITE', res.data.result);
			}else{
				console.log(res.data);
			}
		}).catch(err => {
			console.log(err);
		});
	},
	//取消收藏
	favoriteCancel({commit}, payload){
		axios.post(`/api/favorite/cancel/${payload.articleSid}`, payload.data).then(res => {
			if(res.data.code === 0){
				commit('FAVORITE_CANCEL', res.data.result);
			}else{
				console.log(res.data);
			}
		}).catch(err => {
			console.log(err);
		});
	},
	//关注
	follow({commit}, payload){
		axios.post('/api/follow', payload).then(res => {
			if(res.data.code === 0){
				commit('FOLLOW', res.data.result);
			}else{
				console.log(res.data);
			}
		}).catch(err => {
			console.log(err);
		});
	},
	//取消关注
	followCancel({commit}, payload){
		axios.post('/api/follow/cancel', payload).then(res => {
			if(res.data.code === 0){
				commit('FOLLOW_CANCEL', res.data.result);
			}else {
				console.log(res.data);
			}
		}).catch(err => {
			console.log(err);
		});
	},
	//点赞 | 取消点赞
	reciate({commit}, payload){
		axios.post('/api/comment/reciate', payload).then(res => {
			if(res.data.code === 0){
				commit('RECIATE', res.data.result);
			}else{
				console.log(res.data);
			}
		}).catch(err => {
			console.log(err);
		});
	}
}
