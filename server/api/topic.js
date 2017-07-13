/**
 * Created by huxin on 2017/7/7.
 */
const express = require('express');
const router = express.Router();

const db = require('../db');
const result = require('../tools/result');
const handle = require('../handle');
const find = handle.find;
const save = handle.save;

const logReqArguments = require('../middlewares/logReqArguments');

//添加话题
router.post('/api/topic/publish', logReqArguments, (req, res) => {
	if(req.body.name) {
		find('Topic', 'find', {name: req.body.name}, doc => {
			if(doc.length){
				res.status(200).send(result({}, 1, '该话题已存在'));
			}else{
				let topic = {
					name: req.body.name,
					icon: req.body.icon,
					picture: req.body.picture,
					descr: req.body.descr,
					countContents: 0
				};
				save('Topic', topic, doc => {
					res.status(200).send(result(doc, 0, '添加成功'));
				});
			}
		});
/*		db.Topic.find({name: req.body.name}, (err, doc) => {
			if (err) {
				throw err;
			} else if (doc) {
				if (doc.length === 0) {//无重复
					let topic = {
						name: req.body.name,
						icon: req.body.icon,
						picture: req.body.picture,
						descr: req.body.descr,
						countContents: 0
					};
					new db.Topic(topic).save((err, doc) => {
						if (err) {
							throw err;
						} else if (doc) {
							res.status(200).send(result(doc, 0, '添加成功'));
						}
					})
				} else {//有重复
					res.status(200).send(result({}, 1, '该话题已存在'));
				}
			}
		});*/
	}else{
		res.status(200).send(result({}, 2, '话题名不能为空'))
	}
});

//获取话题列表
router.get('/api/topic/list', logReqArguments, (req, res) => {
	find('Topic', 'find', '', doc => {
		res.status(200).send(result(doc, 0, '操作成功'));
	});
	/*db.Topic.find((err, doc) => {
		if(err){
			throw err;
		}else {
			res.status(200).send(result(doc, 0, '操作成功'));
		}
	});*/
});

module.exports = router;
