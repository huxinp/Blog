
const express = require('express');
const router = express.Router();
const secret = require('../../config').jwt;
const jwt = require('jsonwebtoken');
const db = require('../db');
const sha1 = require('sha1');
const result = require('../tools/result');
const rand = require('csprng');

const logReqArguments = require('../middlewares/logReqArguments');
const handle = require('../handle');
const find = handle.find;

const createToken = (id, account) => {
	return jwt.sign(
		{ id: id, account: account },
		secret.cert,
		{ expiresIn: '7d' }
	);
};

//登录
router.post('/api/login', logReqArguments, (req, res) => {
	if(!req.body.account || !req.body.password){
		res.status(200).send(result({}, 2, '用户名或密码不能为空'));
	}else {
		find('User', 'findOne', {account: req.body.account}, doc => {
			const salt = doc.salt;
			if (doc.password === sha1(req.body.password + salt)) {
				const token = createToken(doc._id, doc.account);
				res.status(200).send(result({
					user: doc,
					token: token
				}, 0, '登陆成功'));
			} else {
				res.status(200).send(result({}, 1, '用户名或密码不正确'));
			}
		});

/*		db.User.findOne({account: req.body.account}, (err, doc) => {
			if (err) {
				throw err;
			} else if (doc) {
				const salt = doc.salt;
				if (doc.password === sha1(req.body.password + salt)) {
					const token = createToken(doc._id, doc.account);
					res.status(200).send(result({
						user: doc,
						token: token
					}, 0, '登陆成功'));
				} else {
					res.status(200).send(result({}, 1, '用户名或密码不正确'));
				}
			}
		});*/
	}
});

module.exports = router;
