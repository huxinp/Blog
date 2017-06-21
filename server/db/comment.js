/*
*	评论的结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = CommentSchema = new Schema(
	{
		sid: Number,
		contentSid: Number,
		userSid: Number,				//评论人
		comment: String,
		picture: String,
		countAppreciated: Number,		//评论被赞次数
		lastSid: Number,				//被回复评论sid
		lastUserSid: Number,			//被回复评论人
		lastComment: String,			//被回复的评论的内容
		lastPicture: String,
		createdTimestamp: Number,
		isPublish: Number
	},
	{ versionKey: false }
);

CommentSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('Comment', (err, result) => {
			if(err){
				console.log(err);
			}else {
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});