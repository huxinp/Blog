/*
*	用户发表的内容结构
**/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default const UserContentSchema = new Schema(
		{
			sid: Number,					//记录流水号
			userSid: Number,				//用户sid
			contentSid: Number,				//内容流水号
			createdTimestamp: Number,		//创建时间戳
		},
		{ versonKey: false }
	);