/**
 * Created by huxinpeng on 2017/7/14.
 */
const express = require('express');
const router = express.Router();

const confirmToken = require('../middlewares/confirmToken');
const logReqArguments = require('../middlewares/logReqArguments');

const result = require('../tools/result');
const handle = require('../handle');

//收藏文章
router.post('/api/favorite/add/:articleSid', logReqArguments, confirmToken, (req, res) => {
	handle.find('Article', 'findOne', {sid: req.params.articleSid, isPublish: 1}, doc_art => {
		if(doc_art){
			handle.find('UserFavorite', 'findOne', {article: doc_art._id, user: req.body.user._id}, doc_fav => {
				if(doc_fav){//已有收藏记录
					res.status(200).send(result({}, 0, '操作成功'));
				}else {
					let favorite = {
						article: doc_art._id,
						user: req.body.user._id,
						createdTimestamp: new Date().getTime()
					};
					handle.save('UserFavorite', favorite, fav => {
						res.status(200).send(result({}, 0, '操作成功'));
					})
				}
			})
		}else{
			res.status(200).send(result({}, 2, '文章不存在'));
		}
	})
});

//取消收藏
router.post('/api/favorite/cancel/:articleSid', logReqArguments, confirmToken, (req, res) => {
	handle.find('Article', 'findOne', {sid: req.params.articleSid}, doc_art => {
		handle.find('UserFavorite', 'findOne', {article: doc_art._id, user: req.body.user._id}, doc_fav => {
			if(doc_fav){
				handle.remove('UserFavorite', {article: doc_art._id, user: req.body.user._id}, doc => {
					console.log('remove user favorite  取消收藏');
					res.status(200).send(result(doc, 0, '操作成功'));
				})
			}else{
				res.status(200).send(result({}, 0, '操作成功'));
			}
		})
	});
});

//收藏列表
router.post('/api/favorite/list/:userSid', logReqArguments, confirmToken, (req, res) => {
	let pageSize = req.body.pageSize,
		currentPage = req.body.currentPage;
	handle.find('User', 'findOne', {sid: req.params.userSid}, doc_user => {
		if(doc_user){
			handle.queryList(currentPage, pageSize, {user: doc_user._id}, {createdTimestamp: -1},
				{path: 'article', select: '_id', populate: [
					{path: 'author', select: 'sid nickName icon -_id'},
					{path: 'topic', select: 'sid name -_id'}
				]}, 'UserFavorite', doc_list => {
					res.status(200).send(result(doc_list, 0, '操作成功'));
				});
		}else{
			res.status(200).send(result({}, 1, '用户不存在'));
		}
	})
});

module.exports = router;
