/*
*	用户收藏的内容表结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserFavoriteSchema = new Schema(
	{
		sid: Number,				//记录流水号
		contentSid: {				//内容ID
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		userSid: {	 				//收藏人
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		createdTimestamp: Number,	//收藏时间戳
		countHit: Number			//点击次数
	},
	{ versionKey: false }
);


UserFavoriteSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('UserFavorite', (err, result) => {
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
