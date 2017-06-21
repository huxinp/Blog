/*
*	用户收到的评论结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = CommentReceivedSchema = new Schema(
	{
		sid: Number, 					//记录流水号
		userSid: Number,				//用户sid
		contentSid: Number,				//内容Sid
		commenterSid: Number,			//评论人
		comment: String,				//发表的评论
		picture: String,				//评论图片
		countReciated: Number,		//评论被点赞次数
		lastSid: Number,				//被回复评论sid
		lastCommenterSid: Number,		//被回复的评论人
		lastComment: String,			//被回复的评论的内容
		lastPicture: String,			//被回复的评论的图片
		createdTimestamp: Number		//评论时间戳
	},
	{ versionKey: false }
);

CommentReceivedSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('CommentReceived', (err, result) => {
			if(err){
				console.log(err);
			}else{
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});

