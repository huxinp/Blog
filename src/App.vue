<template>
    <div id="app">
		<!--<img src="./assets/logo.png">-->
		<router-view></router-view>
    </div>
</template>

<script>
import {cookie} from './assets/js/common';
import {mapActions} from 'vuex';
export default {
    name: 'app',
	created(){
	    this.getToken();
	},
	methods: {
		...mapActions([
		    'getToken'
		]),
	}
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
