/*
*	点赞
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('../handle/generateSerialNumber');

module.exports = ReciateSchema = new Schema(
	{
		sid: Number,
		content: {					//被点赞的_id
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		user: {						//点赞人的_id
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		createdTimestamp: Number	//点赞时间戳
	},
	{ versionKey: false }
);

ReciateSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('Reciate', (err, result) => {
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
