/*
*	评论的结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('../handle/generateSerialNumber');

module.exports = CommentSchema = new Schema(
	{
		sid: Number,
		content: {						//内容_id
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		user: {							//评论人_id
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		comment: String,
		picture: String,
		countAppreciated: Number,		//评论被赞次数
		last: {							//被回复评论_id
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		},
		lastUser: {						//被回复评论人_id
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
				this.sid = result.seq;
				next();
			}
		});
	}else{
		next();
	}
});
