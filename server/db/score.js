/*
*	用户积分结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = ScoreSchema = new Schema(
	{
		sid: {							//用户流水号
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		score: Number,					//当前积分值
		lastSigninTimestamp: Number,	//上次签到时间
		lastLoginTimestamp: Number,		//最近一次登录获得积分时间
		lastTimestamp: Number,			//最近一次获取积分时间戳
		scoreInMonth: Number			//当前单月已获得积分
	},
	{ versionKey: false }
);

ScoreSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('Score', (err, result) => {
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
