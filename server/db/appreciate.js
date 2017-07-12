/*
*	点赞
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = ReciateSchema = new Schema(
	{
		sid: Number,
		contentSid: {
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		userSid: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},			//点赞人
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
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});
