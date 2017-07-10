<template>
	<div class="panel panel-primary center-block signin center-block">
		<!--<img src="../assets/images/游戏化绩效系统.png" alt="">-->
		<div class="panel-heading">注册</div>
		<div class="panel-body">
			<form class="form-horizontal" name="login">
				<div class="form-group">
					<label for="UserName" class="col-sm-2 control-label">账户名:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="userName" placeholder="请输入用户名..." v-model="account" />
					</div>
				</div>
				<div class="form-group">
					<label for="nickName" class="col-sm-2 control-label">昵称:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="nickName" v-model="nickName" />
					</div>
				</div>
				<div class="form-group">
					<label for="icon" class="col-sm-2 control-label">头像:</label>
					<div class="col-sm-10">
						<label for="icon" class="btn btn-default radius0 col-sm-3">上传</label>
						<input v-show="false" type="file" id="icon" name="icon" ref="icon" accept="image/*" @change="imgUpload" />
					</div>
				</div>
				<div v-if="icon" class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<div class="img-owner">
							<img :src="icon" alt="" />
						</div>
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
	import {toast} from '../assets/js/common';
    export default {
        data(){
            return {
                account: '',
				nickName: '',
				password: '',
				sex: 1,
				selectedSex: '男',
				selecting: false,
				age: '',
				mobilePhone: '',
				signature: '',
				file: '',
				icon: '',
				signinApi: '/api/signin',
				uploadApi: '/api/image/upload',
			}
		},
		methods: {
            imgUpload(){
				let inputDom = this.$refs.icon;
				if(!inputDom.value){	//重置输入为空,  不上传
					return;
				}
				let fileFormData = new FormData();
				this.file = inputDom.files[0];
				fileFormData.append('file', this.file, this.file.name);
				this.$http.post(this.uploadApi, fileFormData).then(res => {
				    if(res.body.code === 0){
				        this.icon = '../../static/img/' + res.body.result;
					}else {
				        toast('上传失败');
					}
				}, err => console.log(err));
				inputDom.value = '';
			},
            signin(){
                let data = {
					account: this.account,
					nickName: this.nickName,
					password: this.password,
					sex: this.sex,
					age: this.age,
					mobilePhone: this.mobilePhone,
					signature: this.signature,
					icon: this.icon
				};
				/*axios({method: 'post', url: this.signinApi, data: data}).then(res => {
				    console.log(res);
				}).catch(err => {
				    console.log(err);
				});*/
				this.$http.post(this.signinApi, data).then(res => console.log(res), err => console.log(err));
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
@import "../assets/css/common";
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
	.img-owner{
		width: 100px;
		height: 100px;
		position: relative;
		img{
			max-width: 100%;
			max-height: 100%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
