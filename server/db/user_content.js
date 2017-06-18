/*
*	用户发表的内容结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = UserContentSchema = new Schema(
		{
			sid: Number,					//记录流水号
			userSid: Number,				//用户sid
			contentSid: Number,				//内容流水号
			createdTimestamp: Number		//创建时间戳
		},
		{ versonKey: false }
	);