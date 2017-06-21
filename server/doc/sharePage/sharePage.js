import Vue from 'vue';
import VueResource from 'vue-resource';
import sharePage from './sharePage.vue';
Vue.use(VueResource);
new Vue({
	el: '#app',
	render: h => h(sharePage)
});
