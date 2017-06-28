
const express = require('express');
const router = express.Router();
const secret = require('../../config').jwt;
const jwt = require('jsonwebtoken');
const db = require('../db');
const sha1 = require('sha1');
const result = require('./result');
const rand = require('csprng');

const createToken = (id, name) => {
	return jwt.sign(
		{ id: id, name: name },
		secret.cert,
		{ expiresIn: '7d' }
	);
};

//登录
router.post('/api/login', (req, res) => {
	if(!req.body.name || !req.body.password){
		res.status(200).send(result({}, 2, '用户名或密码不能为空'));
	}else {
		db.User.findOne({name: req.body.name}, (err, doc) => {
			if (err) {
				console.log(err);
			} else if (doc) {
				const salt = doc.salt;
				if (doc.password === sha1(req.body.password + salt)) {
					const token = createToken(doc._id, doc.name);
					res.status(200).send(result({
						id: doc._id,
						name: doc.name,
						token: token
					}, 0, '登陆成功'));
				} else {
					res.status(401).end();
				}
			} else {
				res.status(200).send(result({}, 1, '用户名或密码不正确'));
			}
		});
	}
});

//注册
router.post('/api/user/signin', (req, res) => {
	if(!req.body.name){
		res.status(200).send('姓名不能为空');
	}else if(req.body.name.length < 2 || !req.body.name.replace(/' '/g, '')){
		res.status(200).send('姓名不对吧');
	}
	if(!req.body.nickName){
		res.status(200).send('昵称不能为空');
	}else if(req.body.nickName.length < 2 || !req.body.nickName.replace(/' '/g, '')){
		res.status(200).send('昵称最少2个字符');
	}
	if(!req.body.nickName && req.body.nickName !== 0){
		res.status(200).send('电话号码不能为空');
	}else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(req.body.nickName))){
		res.status(200).send('请输入正确的号码')
	}
	if(req.body.password.length < 6){
		res.status(200).send('密码不合法');
	}
	if(!req.body.icon){
		res.status(200).send('请上传头像');
	}
	const salt = rand(160, 36);
	const user = {
		name: req.body.name,
		nickName: req.body.nickName,
		sex: req.body.sex || 1,						//默认   男
		age: req.body.age,
		mobilePhone: req.body.mobilePhone,
		password: sha1(req.body.password + salt),
		salt: salt,
		icon: req.body.icon,						//默认头像
		bgPicture: req.body.bgPicture,				//默认背景
		signature: req.body.signature,
		birthday: req.body.birthday,
		userLevelSid: 1,
		countFollowers: 0,
		countUsersBeFllo: 0,
		countMainPageBe: 0,
		totalContents: 0,
		lastLoginDatetime: null,
		countReciateNot: 0,
		countCommentNot: 0
	};
	new db.User(user).save();
	res.status(200).send('注册成功');
});

module.exports = router;
