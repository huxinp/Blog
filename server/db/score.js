/*
*	用户积分结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ScoreSchema = new Schema(
		{
			sid: Number,					//用户流水号
			score: Number,					//当前积分值
			lastSigninTimestamp: Number,	//上次签到时间
			lastLoginTimestamp: Number,		//最近一次登录获得积分时间
			lastTimestamp: Number,			//最近一次获取积分时间戳
			scoreInMonth: Number			//当前单月已获得积分
		},
		{ versionKey: false }
	);