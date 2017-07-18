import Vue from 'vue';
import Vuex from 'vuex';

import getters from '../getters';
import actions from '../actions';
import mutations from '../mutations';

Vue.use(Vuex);

const state = {
	token: '',
	user: {},
	articleList: [],//文章列表详细
	pagination: {},//分页信息
	topicList: [],//话题标签列表
	briefList: [],//文章列表缩略
	article: {},//一篇文章的内容
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});
