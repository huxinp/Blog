/*
*	用户收藏的内容表结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('../handle/generateSerialNumber');

module.exports = UserFavoriteSchema = new Schema(
	{
		sid: Number,				//记录流水号
		article: {					//内容_id
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		user: {	 					//收藏人_id
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		createdTimestamp: Number	//收藏时间戳
	},
	{ versionKey: false }
);


UserFavoriteSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('UserFavorite', (err, result) => {
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
