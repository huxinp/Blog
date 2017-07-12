/**
 * Created by huxin on 2017/6/28.
 */
const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');
const route = require('./api');
const app = express();

app.set('port', (process.env.port || 3003));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

route(app);

app.listen(app.get('port'), () => {
	console.log('GetData http://127.0.0.1:' + app.get('port'));
});
