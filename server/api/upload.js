/**
 * Created by huxin on 2017/6/29.
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multiparty = require('multiparty');

const result = require('../tools/result');

const winPath = 'H:/myGithub/Blog/src/assets/files/';
const macPath = '/Users/huxinpeng/Documents/myGithub/Blog/static/img/';

router.post('/api/file/upload', (req, res) => {
	let form = new multiparty.Form(),
		path = macPath;
	form.uploadDir = path;
	form.parse(req, (err, fields, files) => {
		fs.renameSync(files.file[0].path, path + files.file[0].originalFilename);
		res.status(200).send(result(files.file[0].originalFilename, 0, '上传成功'));
	});
});

router.post('/api/image/upload', (req, res) => {
	let form = new multiparty.Form(),
		path = macPath;
	form.uploadDir = path;
	form.parse(req, (err, fields, files) => {
		if(err){
			throw err;
		}
		fs.renameSync(files.file[0].path, path + files.file[0].originalFilename);
		res.status(200).send(result(files.file[0].originalFilename, 0, '上传成功'));
	});
});

module.exports = router;
