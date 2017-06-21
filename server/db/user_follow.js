/*
*	用户关注结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserFollowSchema = new Schema(
	{
		sid: Number,					//关注人sid
		sid2: Number,					//被关注的人
		createdTimestamp: Number		//关注时间戳
	},
	{ versionKey: false }
);


UserFollowSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('UserFollow', (err, result) => {
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