/*
*	文章结构
**/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default const ArticleSchema = new Schema(
	{
		sid: Number,				//记录流水号
		topicSid: Number,			//话题sid
		authorSid: Number,			//作者
		title: String,				//标题
		pictrue: String,			//预览图把
		content: String,			//内容文本
		countCommented: Number,		//被评论次数
		countAppreciated: Number,	//被点赞次数
		countHitted: Number,		//被点击（阅读）
		createdTimestamp: Date,		//创建时间戳
		isPublish: Number,			//1 发布		2 草稿		3 已删除
	},
	{ versionKey: false }
);

//生成自增长的sid

