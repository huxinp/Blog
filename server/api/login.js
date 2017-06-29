
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

module.exports = router;
