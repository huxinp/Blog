<template>
	<div class="panel panel-primary center-block signin center-block">
		<div class="panel-heading">注册</div>
		<div class="panel-body">
			<form class="form-horizontal" name="login">
				<div class="form-group">
					<label for="UserName" class="col-sm-2 control-label">用户名:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="userName" placeholder="请输入用户名..." v-model="userName" />
					</div>
				</div>
				<div class="form-group">
					<label for="nickName" class="col-sm-2 control-label">昵称:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="nickName" v-model="nickName" />
					</div>
				</div>
				<div class="form-group">
					<label for="password" class="col-sm-2 control-label">密码:</label>
					<div class="col-sm-10">
						<input type="password" v-model="password" class="form-control" id="password">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">性别:</label>
					<div class="col-sm-10 sex">
						<span class="select form-control radius0 text-center" @click="selecting = !selecting">
								{{selectedSex}}
							</span>
						<div class="select-list" v-show="selecting">
							<ul>
								<li class="select-option text-center" @click="selectSex(1)">男</li>
								<li class="select-option text-center" @click="selectSex(2)">女</li>
								<li class="select-option text-center" @click="selectSex(3)">保密</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="age" class="col-sm-2 control-label">年龄:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="age" v-model="age" />
					</div>
				</div>
				<div class="form-group">
					<label for="mobilePhone" class="col-sm-2 control-label">手机号:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="mobilePhone" v-model="mobilePhone" />
					</div>
				</div>
				<div class="form-group">
					<label for="signature" class="col-sm-2 control-label">签名:</label>
					<div class="col-sm-10">
						<textarea class="form-control" name="signature" id="signature" v-model="signature"></textarea>
					</div>
				</div>
				<div class="form-group">
					<button class="btn btn-success text-align" @click="signin">注册</button>
				</div>
			</form>
		</div>
		<div class="panel-footer"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import axios from 'axios';
    export default {
        data(){
            return {
                userName: '',
				nickName: '',
				password: '',
				sex: 1,
				selectedSex: '男',
				selecting: false,
				age: '',
				mobilePhone: '',
				signature: '',

				signinApi: '/api/signin',
			}
		},
		methods: {

            signin(){
                let	_this = this,
					data = {
					name: _this.userName,
					nickName: _this.nickName,
					password: _this.password,
					sex: _this.sex,
					age: _this.age,
					mobilePhone: _this.mobilePhone,
					signature: _this.signature
				};
				axios({method: 'post', url: this.signinApi, data: data}).then(res => {
				    console.log(res);
				}).catch(err => {
				    console.log(err);
				})
			},
			selectSex(index){
                this.sex = index;
                if(index == 1){
                    this.selectedSex = '男';
				}else if(index == 2){
                    this.selectedSex = '女';
				}else if(index == 3){
				    this.selectedSex = '保密'
				}
				this.selecting = !this.selecting;
			}
		}
	}
</script>
<style lang="scss">

	.font18{
		font-size: 18px;
	}
	.p20{
		padding: 20px;
	}
	.pv20{
		padding: 20px 0;
	}
	.ph20{
		padding: 0 20px;
	}
	.pt20{
		padding-top: 20px;
	}
	.pr20{
		padding-right: 20px;
	}
	.pb20{
		padding-bottom: 20px;
	}
	.pl0{
		padding-left: 0!important;
	}
	.pr0{
		padding-right: 0!important;
	}
	.mb20{
		margin-bottom: 20px;
	}
	.mt0{
		margin-top:0;
	}
	.mt20{
		margin-top: 20px;
	}
	.mt30{
		margin-top: 30px;
	}
	.radius0{
		border-radius: 0!important;
	}
	.fontweight0{
		font-weight: normal;
	}
	.bb{
		border-bottom: 1px solid #e4e4e4;
	}
	.bt{
		border-top: 1px solid #e4e4e4;
	}

	.signin{
		width: 600px;
	}

	.select{
		position: relative;
	}
	.select:after{
		content: '';
		display: block;
		position: absolute;
		right: 10px;
		top: 12px;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid #ff9900;
	}
	.select-list{
		position: absolute;
		left: 0;
		top: 34px;
		padding: 0 15px;
		z-index: 10;
		width: 100%;
		ul{
			margin: 0;
			padding: 0;
			background-color: #fff;
			border: 1px solid #e4e4e4;
			overflow-y: auto;
			li{
				height: 40px;
				line-height: 40px;
				margin: 0 30px;
				border-bottom: 1px solid #e4e4e4;
				list-style: none;
				cursor: pointer;
			}
		}
	}
	.toast {
		position: fixed;
		max-width: 80%;
		left: 50%;
		top: 60%;
		transform: translate(-50%, -50%);
		padding: 6px 12px;
		border-radius: 4px;

		color: #fff;
		background-color: rgba(0, 0, 0, 0.7);
		cursor: pointer;
		z-index: 10000;
	}
</style>
