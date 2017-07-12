/*
*	用户关注结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = UserFollowSchema = new Schema(
	{
		sid: {							//关注人sid
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		sid2: {							//被关注的人
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		createdTimestamp: Number		//关注时间戳
	},
	{ versionKey: false }
);


UserFollowSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('UserFollow', (err, result) => {
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
