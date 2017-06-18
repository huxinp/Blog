/*
*	点赞
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ReciateSchema = new Schema(
		{
			sid: Number,
			contentSid: Number,
			userSid: Number,			//点赞人
			createdTimestamp: Number	//点赞时间戳
		},
		{ versionKey: false }
	);