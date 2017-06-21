/*
*	内容引用项结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = ContentRefSchema = new Schema(
	{
		sid: Number,					//记录流水号
		contentSid: Number,				//内容sid
		type: String,					//类别
		targetSid: Number,				//目标对象sid
		targetUserSid: Number,			//todo  ===>
		title: String,					//标题
		picture: String,				//图片
		uri: String,					//目标uri
		width: Number,					//宽度
		height: Number,					//高度
		descr: String					//描述
	},
	{ versionKey: false }
);

ContentRefSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('ContentRef', (err, result) => {
			if(err){
				console.log(err);
			}else {
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});