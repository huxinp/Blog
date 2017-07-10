<template>
	<div class="panel panel-primary center-block login">
		<div class="panel-heading">登录</div>
		<div class="panel-body">
			<form class="form-horizontal" name="login">
				<div class="form-group">
					<label for="account" class="col-sm-2 control-label">账号:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="account" placeholder="请输入用户名..." v-model="account" />
					</div>
				</div>
				<div class="form-group">
					<label for="password" class="col-sm-2 control-label">密码:</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" id="password" v-model="password" />
					</div>
				</div>
				<div class="form-group">
					<span class="btn btn-info text-align" @click="login({account, password})">登录</span>
					<!--<span class="btn btn-info text-align" @click="loginFn">登录</span>-->
				</div>
			</form>
		</div>
		<div class="panel-footer"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import axios from 'axios';
//	axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
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
			]),
		    loginFn(){
			    this.login({account: this.account, password: this.password});
				axios.post(this.loginApi, {account: this.account, password: this.password}).then(res => {
				    console.log(res);
				}).catch(err => console.log(err));
//				this.$http.post(this.loginApi, {name: this.account, password: this.password}).then(res => console.log(res), err => console.log(err))
			}
		}
	}
</script>
<style lang='scss'>
@import "../assets/css/common";
.login{
	width: 500px;
}
</style>
