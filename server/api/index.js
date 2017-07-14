const article = require('./article');
const login = require('./login');
const user = require('./user');
const upload = require('./upload');
const topic = require('./topic');
const favorite = require('./favorite');

module.exports = app => {
	app.use(article);
	app.use(login);
	app.use(user);
	app.use(upload);
	app.use(topic);
	app.use(favorite);
};
