/**
 * Created by huxinpeng on 2017/7/17.
 */
const express = require('express');
const router = express.Router();

const confirmToken = require('../middlewares/confirmToken');
const logReqArguments = require('../middlewares/logReqArguments');

const handle = require('../handle');
const result = require('../tools/result');

/**
 * sid: 被关注的人
 * sid2: 发起关注的人
 */


//关注
router.post('/api/follow', (req, res) => {
	handle.find('User', 'findOne', {sid: req.body.sid}, doc_user => {
		if(doc_user){
			handle.find('User', 'findOne', {sid: req.body.sid2}, doc_user2 => {
				if(doc_user2){
					handle.find('UserFan', 'findOne', {sid: doc_user._id, sid2: doc_user2._id}, doc_fan => {
						if(doc_fan){//已存在
							res.status(200).send(result({}, 0, '操作成功'));
						}else {
							handle.save('UserFan', {sid: doc_user._id, sid2: doc_user2._id, createdTimestamp: new Date().getTime()}, doc => {
								req.status(200).send(result(doc, 0, '操作成功'));
							});
						}
					});
				}else {
					res.status(200).send(result({}, 1, '用户信息错误'));
				}
			});
		}else {
			res.status(200).send(result({}, 2, '被关注人信息错误'));
		}
	});
});

//取消关注
router.post('/api/follow/cancel', (req, res) => {
	handle.find('User', 'findOne', {sid: req.body.sid}, doc_user => {
		if(doc_user){
			handle.find('User', 'findOne', {sid: req.body.sid2}, doc_user2 => {
				if(doc_user2){
					handle.find('UserFan', 'findOne', {sid: doc_user._id, sid2: doc_user2._id}, doc_fan => {
						if(doc_fan){
							handle.remove('UserFan', {sid: doc_user._id, sid2: doc_user2._id}, doc => {
								res.status(200).send(result({}, 0, '操作成功'));
							});
						}else{
							res.status(200).send(result({}, 0, '操作成功'));
						}
					});
				}else {
					res.status(200).send(result({}, 1, '用户信息错误'));
				}
			});
		}else {
			res.status(200).send(result({}, 2, '被关注人信息错误'));
		}
	});
});

//关注列表
router.post('/api/follow/list', (req, res) => {
	let pageSize = req.body.pageSize,
		currentPage = req.body.currentPage;
	handle.find('User', 'findOne', {sid: req.body.sid}, doc_user => {
		if(doc_user){
			handle.queryList(currentPage, pageSize, {sid2: doc_user._id}, {createdTimestamp: -1}, {path: 'sid'}, 'UserFan', doc => {
				res.status(200).send(result(doc, 0, '操作成功'));
			});
		}else {
			res.status(200).send(result({}, 1, '用户信息错误'));
		}
	});
});


module.exports = router;
