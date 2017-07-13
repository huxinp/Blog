/*
*	用户收到的评论结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('../handle/generateSerialNumber');

module.exports = CommentReceivedSchema = new Schema(
	{
		sid: Number, 					//记录流水号
		user: {							//用户_id
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		content: {						//内容_id
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		commenter: {					//评论人_id
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		comment: String,				//发表的评论
		picture: String,				//评论图片
		countReciated: Number,			//评论被点赞次数
		last: {							//被回复评论_id
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		},
		lastCommenter: {				//被回复的评论人_id
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
				this.sid = result.seq;
				next();
			}
		});
	}else{
		next();
	}
});

