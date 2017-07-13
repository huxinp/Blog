/*
*	内容引用项结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('../handle/generateSerialNumber');

module.exports = ContentRefSchema = new Schema(
	{
		sid: Number,					//记录流水号
		content: {					//内容sid
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		type: String,					//类别
		target: {					//目标对象sid
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
		targetUser: {				//todo  ===>
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		title: String,					//标题
		picture: String,				//图片
		uri: String,					//目标uri
		width: Number,					//宽度
		height: Number,					//高度
		descr: String					//描述
	},
	{ versionKey: false }
);

ContentRefSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('ContentRef', (err, result) => {
			if(err){
				throw err;
			}else {
				this.sid = result.seq;
				next();
			}
		});
	}else{
		next();
	}
});
