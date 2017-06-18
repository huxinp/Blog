/*
*	被关注结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = UserFanSchema = new Schema(
		{
			sid: Number,					//被关注的人sid
			sid2: Number,					//关注人(粉丝)sid
			createdTimestamp: Number		//关注时间戳
		},
		{ versionKey: false }
	);