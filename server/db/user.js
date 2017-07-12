/*
*	用户结构
**/
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.Promise = Promise;
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db');
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserSchema = new Schema(
	{
		sid: Number,				//记录流水号
		account: {type: String, unique: true, required: true},			//账号
		nickName: {type: String, unique: true, required: true},			//昵称
		sex: Number,				//1 男     2 女     3 未知
		age: Number,				//年龄
		mobilePhone: {type: String, unique: true, required: true}, 		//手机号
		password: {type: String, required: true},			//密码
		salt: String,				//密码加密的盐
		icon: String,				//头像
		bgPicture: String,			//背景图片
		signature: String, 			//签名
		birthday: Date,				//生日
		userLevelSid: {
			type: Schema.Types.ObjectId,
			ref: 'UserLevel'
		},		//用户等级sid
		// userVFlagSid: Number,		//用户标识sid
		countFollowers: Number,		//关注我的人数
		countUsersBeFllo: Number, 	//我关注的人数
		countMainPageBe: Number, 	//主页被访问次数
		totalContents: Number,		//发布的内容总数
		lastLoginDatetime: Date, 	//上一次登录时间
		countReciateNot: Number,	//未读点赞数
		countCommentNot: Number		//未读评论数
	},
	{ versionKey: false },
	{ strict: true}
);


UserSchema.pre('save', function(next){//这里不能用箭头函数,   箭头函数 this 指向 undefined
	if(this.isNew){
		generateSerialNumber('User', (err, doc) => {
			if(err){
				throw err;
			}else {
				this.sid = doc.seq;
				next();
			}
		});
	}else{
		next();
	}
});
