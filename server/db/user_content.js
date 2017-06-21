/*
*	用户发表的内容结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserContentSchema = new Schema(
	{
		sid: Number,					//记录流水号
		userSid: Number,				//用户sid
		contentSid: Number,				//内容流水号
		createdTimestamp: Number		//创建时间戳
	},
	{ versonKey: false }
);

UserContentSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('UserContent', (err, result) => {
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