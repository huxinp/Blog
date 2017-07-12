<template>
	<div id="login">
		<div>
			<h1>Login</h1>
			<input type="text" class="account" v-model="account" placeholder="用户名">
			<input type="password" class="password" v-model="password" placeholder="密码" @keydown.enter="login({account, password})">
			<span class="login" @click="login({account, password})">登录</span>
			<p class="footer">注册</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {mapActions} from 'vuex';
	export default {
		data(){
			return {
				account: '',
				password: '',
				loginApi: '/api/login',
			}
		},
		prop: {

		},
		created(){

		},
		methods: {
			...mapActions([
			    'login'
			])
		}
	}
</script>
<style lang='scss'>
@import "../assets/css/common";
html, body{
	position: relative;
	background-image: url('../assets/img/bg1.png');
	min-width: 800px;
	min-height: 600px;
	width: 100%;
	height: 100%;
}
#login{
	position: absolute;
	left: 50%;
	top: 50%;
	width: 800px;
	height: 600px;
	background: url('../assets/img/君子不器.jpg') no-repeat 0 0;
	-webkit-background-size: 100% 100%;
	background-size: 100% 100%;
	transform: translate(-50%, -50%);
	>div{
		width: 320px;
		height: 500px;
		float: right;
		margin: 50px 40px;
		padding: 0 60px;
		text-align: center;
		/*background-color: rgba(240, 230, 140, 0.2);*/
		border: 1px solid #eee;
		h1{
			font-size: 40px;
			text-align: center;
			margin-top: 50px;
			color: #FFFAF0;
		}
		input, span{
			width: 100%;
			height: 40px;
			margin: 20px 0;
		}
		span{
			display: inline-block;
			border: 1px solid #ddd;
			line-height: 40px;
			background-color: rgba(238, 238, 238, 0.1);
			color: #eee;
			font-weight: bold;
			font-size: 20px;
			cursor: pointer;
		}
		p{
			margin-top: 100px;
			cursor: pointer;
			text-decoration: underline;
		}
	}
}
</style>
