import Vue from 'vue';
import Vuex from 'vuex';

import getters from '../getters';
import actions from '../actions';
import mutations from '../mutations';

Vue.use(Vuex);

const state = {
	token: '123456789',
	user: {},
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});
