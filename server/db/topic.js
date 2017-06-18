/*
*	话题结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = TopicSchema = new Schema(
		{
			sid: Number,
			name: String,
			icon: String,
			picture: String,			//大图
			countContents: Number,		//内容数量
			descr: String				
		},
		{ versionKey: false }
	);