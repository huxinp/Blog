/*
*	用户等级结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = UserLevelSchema = new Schema(
		{
			sid: Number,				//记录流水号
			name: String,				//等级名称
			icon: String,				//图标
			score: Number,				//等级数值
			userPointMin: Number,
			userPointMax: Number,
			descr: String				//描述
		},
		{ versonKey: false }
	);