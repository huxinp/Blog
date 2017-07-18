/**
 * Created by huxinpeng on 2017/7/17.
 */
const express = require('express');
const router = express.Router();

const confirmToken = require('../middlewares/confirmToken');
const logReqArguments = require('../middlewares/logReqArguments');

const result = require('../tools/result');
const handle = require('../handle');

//发布评论
router.post('/api/comment/publish', (req, res) => {
	let comment = {
		content: req.body.article._id,
		user: req.body.user._id,
		comment: req.body.comment,
		pictrue: req.body.pictrue,
		countAppreciated: 0,					//被赞次数
		last: req.body.last.commentId,
		lastUser: req.body.last.userId,
		lastComment: req.body.last.comment,
		lastPicture: req.body.last.pictrue,
		createdTimestamp: new Date().getTime(),
		isPublish: 1
	};
	handle.save('Comment', comment, doc => {
		res.status(200).send(result(doc, 0, '操作成功'));
	});
});

//删除评论
router.post('/api/comment/remove/:commentSid', (req, res) => {
	handle.find('Comment', 'findOne', {sid: req.params.commentSid}, doc => {
		doc.isPublish = 3;
		handle.update('Comment', {sid: req.params.commentSid}, doc, doc => {
			res.status(200).send(result(doc, 0, '操作成功'));
		});
	});
});

//获取文章的评论
router.get('/api/comment/:articleSid', (req, res) => {
	let currentPage = req.body.currentPage,
		pageSize = req.body.pageSize;
	handle.find('Article', 'findOne', {sid: req.params.articleSid}, doc_art => {
		handle.queryList(currentPage, pageSize, {content: doc_art._id}, {createdTimestamp: -1}, [
			{path: 'user'}
		], 'Comment', doc => {
			res.status(200).send(result(doc, 0, '操作成功'));
		});
	});
});

//点赞 | 取消点赞
router.post('/api/comment/reciate/:articleSid', (req, res) => {
	let reciate = {
		userSid: req.body.userSid,
		contentSid: req.body.contentSid
	};
	if(req.body.status === 1){//点赞
		reciate.createdTimestamp = new Date().getTime();
		handle.save('Reciate', reciate, doc => {
			res.status(200).send(result(doc, 0, '操作成功'));
		});
	}else if(req.body.status === 0){//取消点赞
		handle.remove('Reciate', reciate, doc => {
			res.status(200).send(result(doc, 0, '操作成功'));
		});
	}else{
		res.status(200).send(result({}, 1, '操作失败'));
	}
});

module.exports = router;
