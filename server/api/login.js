
const express = require('express');
const router = express.Router();
const secret = require('../../config').jwt;
const jwt = require('jsonwebtoken');
const db = require('../db');
const sha1 = require('sha1');
const result = require('../tools/result');
const rand = require('csprng');

const createToken = (id, account) => {
	return jwt.sign(
		{ id: id, account: account },
		secret.cert,
		{ expiresIn: '7d' }
	);
};

//登录
router.post('/api/login', (req, res) => {
	console.log(req.body);
	if(!req.body.account || !req.body.password){
		console.log('用户名或密码不能为空');
		res.status(200).send(result({}, 2, '用户名或密码不能为空'));
	}else {
		db.User.findOne({account: req.body.account}, (err, doc) => {
			if (err) {
				throw err;
			} else if (doc) {
				console.log(doc);
				const salt = doc.salt;
				if (doc.password === sha1(req.body.password + salt)) {
					const token = createToken(doc._id, doc.account);
					console.log('登陆成功');
					res.status(200).send(result({
						user: doc,
						token: token
					}, 0, '登陆成功'));
				} else {
					console.log('用户名或密码不正确');
					res.status(200).send(result({}, 1, '用户名或密码不正确'));
				}
			}
		});
	}
});

module.exports = router;
