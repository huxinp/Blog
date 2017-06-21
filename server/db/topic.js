/*
*	话题结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

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

TopicSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('Topic', (err, result) => {
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