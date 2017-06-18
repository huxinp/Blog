/*
*	用户积分获取规则结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ScoreRuleSchema = new Schema(
		{
			sid: Number,					//记录流水号
			name: String, 					//规则名称
			action: String,					//用户行为
			score: Number,					//积分值
			descr: String					//描述
		},
		{ versionKey: false }
	);