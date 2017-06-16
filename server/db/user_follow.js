/*
*	用户关注结构
**/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default const UserFollowSchema = new Schema(
		{
			sid: Number,					//关注人sid
			sid2: Number,					//被关注的人
			createdTimestamp: Number,		//关注时间戳
		},
		{ versionKey: false }
	);