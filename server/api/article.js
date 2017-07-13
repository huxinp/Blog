const Promise = require('bluebird');

const express = require('express');
const router = express.Router();
const db = require('../db');
const confirmToken = require('../middlewares/confirmToken');
const logReqArguments = require('../middlewares/logReqArguments');

const result = require('../tools/result');
const handle = require('../handle');
const queryList = handle.queryList;
const find = handle.find;
const update = handle.update;
const save = handle.save;


//获取某篇文章
router.get('/api/article/content/:sid', (req, res) => {
	db.Article.findOne({sid: req.params.sid}, (err, article) => {
		if(err){
			throw err;
		}else{
			if(article.isPublish === 1){
				article.countHitted++;//点击(阅读)次数
				res.status(200).send(article);
			}else if(article.isPublish === 2){
				res.status(200).send(article);
			}else{
				res.status(200).send('文章不存在.');
			}
		}
	});
});

//删除文章并删除文章的评论
router.post('/api/article/delete', logReqArguments, confirmToken, (req, res) => {
/*
	db.Article.remove({sid: req.body.sid}, (err, data) => {
		if(err){
			throw err;
		}else{
			db.Comment.remove({articleId: req.body.sid}, (err, data2) => {
				if(err){
					throw err;
				}else{
					res.status(200).send('删除成功');
				}
			});
		}
	});
*/
	let article;
	db.Article.findOne({sid: req.body.sid}, (err, articleF) => {
		if(err){
			throw err;
		}else{
			article = articleF;
			article.isPublish = 0;
			db.Article.update({sid: req.body.sid}, article, (err, data) => {
				if(err){
					throw err;
				}else{
					db.Comment.findOne({articleId: req.body.sid}, (err, commentF) => {
						let comment = commentF;
						comment.isPublish = 0;
						db.Comment.update({articleId: req.body.sid}, comment, (err, data) => {
							if(err){
								throw err;
							}else{
								res.status(200).send(result({}, 0, '删除成功.'));
							}
						});
					});
				}
			});
		}
	});
});

//更新文章
router.post('/api/article/update', logReqArguments, confirmToken, (req, res) => {
	db.Article.findOne({sid: req.body.sid}, (err, articleF) => {
		if(err){
			throw err;
		}else{
			let article = articleF;
			article.topic = req.body.topicSid;
			article.title = req.body.title;
			article.pictrue = req.body.pictrue;
			article.content = req.body.content;
			db.Article.update({sid: req.body.sid}, article, (err, data) => {
				if(err){
					throw err;
				}else{
					res.status(200).send(result({}, 0, '更新文章成功.'));
				}
			});
		}
	});
});

//搜索
router.get('/api/article/search', (req, res) => {//type | keyword | currentPage | pageSize
	let currentPage = req.query.currentPage,
		limit = req.query.pageSize - 0 || 10,
		skip = limit * (currentPage - 1);
	if(req.query.type === 'nickName'){
		db.Article.find({nickName: req.query.keyword, isPublish: 1}).sort({date: -1}).limit(limit).skip(skip).exec().then(articles => {
			res.send(articles);
		});
	}else if(req.query.type === 'title'){
		db.Article.find({title: req.query.keyword, isPublish: 1}).sort({date: -1}).limit(limit).skip(skip).exec().then(articles => {
			res.send(articles);
		});
	}
});

//发布文章
router.post('/api/article/publish',logReqArguments ,confirmToken, (req, res) => {
	if(req.body.title && req.body.title.replace(/' '/g, '')){
		find('User', 'find', {_id: req.body.authorId}, doc => {
			if(doc.length){
				let user = doc[0];
				user.totalContents++;

				let article = {
					topic: req.body.topicId,
					author: req.body.authorId,
					title: req.body.title,
					picture: req.body.picture,
					content: req.body.content,
					countCommented: 0,
					countReciated: 0,
					countHitted: 0,
					createdTimestamp: new Date().getTime(),
					isPublish: req.body.isPublish
				};
				save('Article', article, doc_article => {
					update('User', {_id: user._id}, user, doc_user => {
						let message;
						if(req.body.isPublish === 1){
							message = '发布文章成功.';
						}else if(req.body.isPublish === 2){
							message = '保存到草稿成功.';
						}
						res.status(200).send(result({}, 0, message));
					});
				});
			}else{
				res.status(200).send(result({}, 1, '用户不存在'));
			}
		});
	}else{
		res.status(200).send(result({}, 2, '标题不能为空'))
	}
});

//获取最新文章
router.get('/api/article/fresh',logReqArguments, (req, res) => {
	let limit = req.query.pageSize - 0 || 5,
		currentPage = req.query.currentPage - 0 || 1,
		skip = limit * (currentPage - 1);
	queryList(currentPage,limit,{isPublish: 1},{createdTimestamp: -1},[
			{path: 'author', select: 'sid nickName icon -_id'},
			{path: 'topic', select: 'sid name -_id'}
		], 'Article', doc => {
		res.status(200).send(result(doc, 0, '操作成功'));
	});
});

module.exports = router;

