/*
*	用户发表的内容结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserContentSchema = new Schema(
	{
		sid: Number,					//记录流水号
		userSid: {						//用户sid
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		contentSid: {					//内容流水号
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		createdTimestamp: Number		//创建时间戳
	},
	{ versonKey: false }
);

UserContentSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('UserContent', (err, result) => {
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
