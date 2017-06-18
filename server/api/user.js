
const express = require('express');
const router = express.Router();
const db = require('../db');
const confirmToken = require('../middlewares/confirmToken.js');
const rand = require('cspring');
const sha1 = require('sha1');
/*
{
	sid: Number,				//记录流水号
	name: String,				//真实姓名
	nickName: String,			//昵称
	sex: Number,				//1 男     2 女     3 未知
	age: Number,				//年龄
	mobilePhone: String, 		//手机号
	password: String,			//密码
	salt: String,				//密码加密的盐
	icon: String,				//头像
	bgPicture: String,			//背景图片
	signature: String, 			//签名
	birthday: Date,				//生日
	userLevelSid: Number,		//用户等级sid
	userVFlagSid: Number,		//用户标识sid
	countFollowers: Number,		//关注我的人数
	countUsersBeFllo: Number, 	//我关注的人数
	countMainPageBe: Number, 	//主页被访问次数
	totalContents: Number,		//发布的内容总数
	lastLoginDatetime: Date, 	//上一次登录时间
	countReciateNot: Number,	//未读点赞数
	countCommentNot: Number		//未读评论数
}
*/

//修改账户
router.post('/api/user/update', confirmToken, (req, res) => {
	const salt = rand(160, 36);
	const user = {
		sid: sid,
		name: req.body.name,
		nickName: req.body.nickName,
		sex: req.body.sex,
		age: req.body.age,
		mobilePhone: req.body.mobilePhone,
		password: sha1(req.body.password + salt), 
		salt: salt,
		icon: req.body.icon,
		bgPicture: req.body.bgPicture,
		signature: req.body.signature,
		birthday: req.body.birthday
	};
	//搜索到当前user
	//更新数据
});

//注册账户
router.post('/api/user/signIn', (req, res) => {
	const salt = rand(160, 36);
	const user = {
		sid: Number,								//记录流水号
		name: req.body.name,						//真实姓名
		nickName: req.body.nickName,				//昵称
		sex: req.body.sex,							//1 男     2 女     3 未知
		age: req.body.age,							//年龄
		mobilePhone: req.body.mobilePhone, 			//手机号
		password: sha1(req.body.password + salt),	//密码
		salt: salt,									//密码加密的盐
		icon: req.body.icon,						//头像
		bgPicture: req.body.bgPicture,				//背景图片
		signature: req.body.signature, 				//签名
		birthday: req.body.birthday,				//生日
		userLevelSid: 0,							//用户等级sid
		userVFlagSid: 0,							//用户标识sid
		countFollowers: 0,							//关注我的人数
		countUsersBeFllo: 0, 						//我关注的人数
		countMainPageBe: 0, 						//主页被访问次数
		totalContents: 0,							//发布的内容总数
		lastLoginDatetime: Date(), 					//上一次登录时间
		countReciateNot: 0,							//未读点赞数
		countCommentNot: 0							//未读评论数
	};
	new db.User(user).save();
	res.status(200).send('succeed in sign in');
});