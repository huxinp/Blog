/*
	{
		sid: Number,				//记录流水号
		topicSid: Number,			//话题sid
		authorSid: Number,			//作者
		title: String,				//标题
		pictrue: String,			//预览图把
		content: String,			//内容文本
		countCommented: Number,		//被评论次数
		countReciated: Number,		//被点赞次数
		countHitted: Number,		//被点击（阅读）
		createdTimestamp: Date,		//创建时间戳
		isPublish: Number			//1 发布		2 草稿		3 已删除
	}
*/
const Promise = require('bluebird');

const express = require('express');
const router = express.Router();
const db = require('../db');
const confirmToken = require('../middlewares/confirmToken.js');

const result = require('../tools/result');

//发布文章
router.post('/api/article/save', confirmToken, (req, res) => {
	console.log(req.body);
	const article = {
		topicSid: req.body.topicSid,
		authorSid: req.body.authorSid,
		title: req.body.title,
		picture: req.body.picture,
		content: req.body.content,
		countCommented: 0,
		countReciated: 0,
		countHitted: 0,
		createdTimestamp: Date(),
		isPublish: req.body.isPublish
	};
	new db.Article(article).save();
	let message;
	if(isPublish === 1){
		message = '发布文章成功.';
	}else if(isPublish === 2){
		message = '保存到草稿成功.';
	}
	console.log(message);
	res.status(200).send(result({}, 0, message));
});

//获取某篇文章
router.get('/api/article/content/:sid', (req, res) => {
	db.Article.findOne({sid: req.params.sid}, (err, article) => {
		if(err){
			console.log(err);
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
router.post('/api/article/delete', confirmToken, (req, res) => {
	console.log(req.body);
	/*db.Article.remove({sid: req.body.sid}, (err, data) => {
		if(err){
			console.log(err);
		}else{
			db.Comment.remove({articleId: req.body.sid}, (err, data2) => {
				if(err){
					console.log(err);
				}else{
					res.status(200).send('删除成功');
				}
			});
		}
	});*/
	let article;
	db.Article.findOne({sid: req.body.sid}, (err, articleF) => {
		if(err){
			throw err;
		}else{
			article = articleF;
			article.isPublish = 0;
			db.Article.update({sid: req.body.sid}, article, (err, data) => {
				if(err){
					console.log(err);
				}else{
					db.Comment.findOne({articleId: req.body.sid}, (err, commentF) => {
						let comment = commentF;
						comment.isPublish = 0;
						db.Comment.update({articleId: req.body.sid}, comment, (err, data) => {
							if(err){
								throw err;
							}else{
								console.log('删除成功.');
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
router.post('/api/article/update', confirmToken, (req, res) => {
	console.log(req.body);
	db.Article.findOne({sid: req.body.sid}, (err, articleF) => {
		if(err){
			throw err;
		}else{
			let article = articleF;
			article.topicSid = req.body.topicSid;
			article.title = req.body.title;
			article.pictrue = req.body.pictrue;
			article.content = req.body.content;
			db.Article.update({sid: req.body.sid}, article, (err, data) => {
				if(err){
					throw err;
				}else{
					console.log('更新文章成功');
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
router.post('/api/article/publish',confirmToken, (req, res) => {
	console.log(req.body);
	db.User.find({sid: req.body.authorSid}, (err, doc) => {
		if(err){
			throw err;
		}else {
			if(doc.length){
				let user = doc[0];
				user.totalContents++;

				let article = {
					topicSid: req.body.topicSid,
					authorSid: req.body.authorSid,
					title: req.body.title,
					picture: req.body.picture,
					content: req.body.content,
					countCommented: 0,
					countReciated: 0,
					countHitted: 0,
					createdTimestamp: new Date().getTime(),
					isPublish: req.body.isPublish
				};
				db.Article(article).save((err, doc) => {
					if(err){
						throw err;
					}else {
						db.User.update({_id: user._id}, user, err => {
							if(err){
								throw err;
							}
						});
						console.log('发布成功');
						res.status(200).send(result(doc, 1, '发布成功'));
					}
				});
			}else {
				console.log('用户不存在');
				res.status(200).send(result({}, 2, '用户不存在'));
			}
		}
	})
});

//获取最新文章
router.get('/api/article/fresh', (req, res) => {
	console.log(req.query);
	let limit = req.query.pageSize - 0 || 5,
		currentPage = req.query.currentPage - 0 || 1,
		skip = limit * (currentPage - 1);
	db.Article.find({isPublish: 1}).sort({createdTimestamp: -1}).limit(limit).skip(skip).populate([
		{path: 'authorSid', select: 'sid nickName icon -_id'},
		{path: 'topicSid', select: 'sid name -_id'}
	]).exec().then(doc => {
		let r = {
			data: doc,
			pagination: {
				pageSize: limit,
				currentPage: currentPage
			}
		};
		res.status(200).send(result(r, 0, '操作成功'));

	})
});

module.exports = router;
