
const express = require('express');
const router = express.Router();
const db = require('../db');
const confirmToken = require('../middlewares/confirmToken.js');
const logReqArguments = require('../middlewares/logReqArguments');
const rand = require('csprng');
const sha1 = require('sha1');

const result = require('../tools/result');
const handle = require('../handle');
const find = handle.find;
const save = handle.save;

//修改账户
router.post('/api/user/update', logReqArguments, confirmToken, (req, res) => {
	const salt = rand(160, 36);
	const user = {
		sid: sid,
		account: req.body.account,
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
router.post('/api/signin', logReqArguments, (req, res) => {
	if(!req.body.account){
		res.status(200).send(result({}, 2, '姓名不能为空'));
	}else if(req.body.account.length < 2 || !req.body.account.replace(/' '/g, '')){
		res.status(200).send(result({}, 3, '姓名不对吧'));
	}else if(!req.body.nickName){
		res.status(200).send(result({}, 4, '昵称不能为空'));
	}else if(req.body.nickName.length < 2 || !req.body.nickName.replace(/' '/g, '')){
		res.status(200).send(result({}, 5, '昵称最少2个字符'));
	}else if(!req.body.nickName && req.body.nickName !== 0){
		res.status(200).send(result({}, 6, '电话号码不能为空'));
	}else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(req.body.mobilePhone))){
		res.status(200).send(result({}, 7, '请输入正确的号码'));
	}else if(req.body.password.length < 6){
		res.status(200).send(result({}, 8, '密码不合法'));
	}else if(!req.body.icon){
		res.status(200).send(result({}, 9, '请上传头像'));
	}else{
		//查询账号和昵称是否有重复
		find('User', 'find', {$or: [{account: req.body.account},{nickName: req.body.nickName}]}, doc => {
			if(doc.length === 0){//没有查询到
				let salt = rand(160, 36),
					user = {
						account: req.body.account,					//账号
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
						userLevel: 0,								//用户等级sid
						userVFlag: 0,								//用户标识sid
						countFollowers: 0,							//关注我的人数
						countUsersBeFllo: 0, 						//我关注的人数
						countMainPageBe: 0, 						//主页被访问次数
						totalContents: 0,							//发布的内容总数
						lastLoginDatetime: new Date().getTime(), 	//上一次登录时间
						countReciateNot: 0,							//未读点赞数
						countCommentNot: 0							//未读评论数
					};
				save('User', user, doc => {
					res.status(200).send(result(doc, 0, '注册成功'));
				});
			}else {
				res.status(200).send(result({}, 1, '账号或昵称已存在'));
			}
		});
/*		db.User.find({
				$or: [//多条件查询
					{account: req.body.account},
					{nickName: req.body.nickName}
				]
			}, (err, doc) => {
			if(err){
				throw err;
			}else if(doc){
				if(doc.length === 0){//没有查询到
					let salt = rand(160, 36),
						user = {
						account: req.body.account,					//账号
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
						userLevel: 0,							//用户等级sid
						userVFlag: 0,							//用户标识sid
						countFollowers: 0,							//关注我的人数
						countUsersBeFllo: 0, 						//我关注的人数
						countMainPageBe: 0, 						//主页被访问次数
						totalContents: 0,							//发布的内容总数
						lastLoginDatetime: Date(), 					//上一次登录时间
						countReciateNot: 0,							//未读点赞数
						countCommentNot: 0							//未读评论数
					};
					new db.User(user).save((err, doc) => {
						if (err) {
							throw err;
						} else {
							res.status(200).send(result(doc, 0, '注册成功'));
						}
					});
				}else {
					res.status(200).send(result({}, 1, '账号或昵称已存在'));
				}
			}
		});*/
	}
});

module.exports = router;
