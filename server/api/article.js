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
const express = require('express');
const router = express.Router();
const db = require('../db');
const confirmToken = require('../middlewares/confirmToken.js');

//发布文章
router.post('/api/article/save', confirmToken, (req, res) => {
	const article = {
		topicSid: req.body.topicSid,
		authorSid: Number,
		title: req.body.title,
		pictrue: req.body.pictrue,
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
	res.status(200).send(message);
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
			console.log(err);
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
								console.log(err);
							}else{
								res.status(200).send('删除成功.');
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
	db.Article.findOne({sid: req.body.sid}, (err, articleF) => {
		if(err){
			console.log(err);
		}else{
			let article = articleF;
			article.topicSid = req.body.topicSid,
			article.title = req.body.title,
			article.pictrue = req.body.pictrue,
			article.content = req.body.content
			db.Article.update({sid: req.body.sid}, article, (err, data) => {
				if(err){
					console.log(err);
				}else{
					res.status(200).send('更新文章成功.');
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