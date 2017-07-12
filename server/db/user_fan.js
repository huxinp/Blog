/*
*	被关注结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserFanSchema = new Schema(
	{
		sid: {							//被关注的人sid
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		sid2: {							//关注人(粉丝)sid
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		createdTimestamp: Number		//关注时间戳
	},
	{ versionKey: false }
);

UserFanSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('UserFan', (err, result) => {
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
