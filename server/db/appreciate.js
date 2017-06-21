/*
*	点赞
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = ReciateSchema = new Schema(
	{
		sid: Number,
		contentSid: Number,
		userSid: Number,			//点赞人
		createdTimestamp: Number	//点赞时间戳
	},
	{ versionKey: false }
);

ReciateSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('Reciate', (err, result) => {
			if(err){
				console.log(err);
			}else{
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});
