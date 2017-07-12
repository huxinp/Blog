/*
*	评论的结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = CommentSchema = new Schema(
	{
		sid: Number,
		contentSid: {
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		userSid: {						//评论人
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		comment: String,
		picture: String,
		countAppreciated: Number,		//评论被赞次数
		lastSid: {						//被回复评论sid
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		},
		lastUserSid: {					//被回复评论人
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		lastComment: String,			//被回复的评论的内容
		lastPicture: String,
		createdTimestamp: Number,
		isPublish: Number
	},
	{ versionKey: false }
);

CommentSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('Comment', (err, result) => {
			if(err){
				throw err;
			}else {
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});
