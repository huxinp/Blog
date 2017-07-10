/**
 * Created by huxin on 2017/7/7.
 */
const express = require('express');
const router = express.Router();

const db = require('../db');
const result = require('../tools/result');

//添加话题
router.post('/api/topic/publish', (req, res) => {
	if(req.body.name){
		next();
	}
	db.Topic.find({name: req.body.name}, (err, doc) => {
		if(err){
			throw err;
		}else if(doc){
			if(doc.length === 0){//无重复
				let topic = {
					name: req.body.name,
					icon: req.body.icon,
					picture: req.body.picture,
					descr: req.body.descr,
					countContents: 0
				};
				new db.Topic(topic).save((err, doc) => {
					if(err){
						throw err;
					}else if(doc){
						res.status(200).send(result(doc, 0, '添加成功'));
					}
				})
			}else {//有重复
				res.status(200).send(result({}, 1, '该话题已存在'));
			}
		}
	})
});

//获取话题列表
router.get('/api/topic/list', (req, res) => {
	db.Topic.find((err, doc) => {
		if(err){
			throw err;
		}else {
			res.status(200).send(result(doc, 0, '操作成功'));
		}
	});
});

module.exports = router;
