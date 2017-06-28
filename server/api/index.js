const article = require('./article');
const login = require('./login');
const user = require('./user');

module.exports = app => {
	app.use(article);
	app.use(login);
	app.use(user);
};
