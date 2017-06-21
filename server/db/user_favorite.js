/*
*	用户收藏的内容表结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserFavoriteSchema = new Schema(
	{
		sid: Number,				//记录流水号
		contentSid: Number,			//内容ID
		userSid: Number, 			//收藏人
		createdTimestamp: Number,	//收藏时间戳
		countHit: Number			//点击次数
	},
	{ versionKey: false }
);


UserFavoriteSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('UserFavorite', (err, result) => {
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