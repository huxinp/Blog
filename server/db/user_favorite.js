/*
*	用户收藏的内容表结构
**/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default const UserFavoriteSchema = new Schema(
		{
			sid: Number,				//记录流水号
			contentSid: Number,			//内容ID
			userSid: Number, 			//收藏人
			createdTimestamp: Number,	//收藏时间戳
			countHit: Number,			//点击次数
		},
		{ versionKey: false }
	);