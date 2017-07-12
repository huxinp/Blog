/*
*	用户收到的评论结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = CommentReceivedSchema = new Schema(
	{
		sid: Number, 					//记录流水号
		userSid: {						//用户sid
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		contentSid: {					//内容Sid
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		commenterSid: {					//评论人
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		comment: String,				//发表的评论
		picture: String,				//评论图片
		countReciated: Number,			//评论被点赞次数
		lastSid: {						//被回复评论sid
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		},
		lastCommenterSid: {				//被回复的评论人
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		lastComment: String,			//被回复的评论的内容
		lastPicture: String,			//被回复的评论的图片
		createdTimestamp: Number		//评论时间戳
	},
	{ versionKey: false }
);

CommentReceivedSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('CommentReceived', (err, result) => {
			if(err){
				throw err;
			}else{
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});

