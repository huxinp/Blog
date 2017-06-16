const jwt = require('jsonwebtoken');
const secret = require('../../config').jwt;

//校验token是否正确
const confirmToken = (req, res, next) => {
	if(!req.headers.authorization){
		res.status(401).end('no token');
	}else {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, secret.cert, err => {
			if(err){
				res.status(401).end(err.message);
			}
		});
	}
	next();
};

module.exports = confirmToken;