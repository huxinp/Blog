/*
*	话题结构
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('../handle/generateSerialNumber');

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

TopicSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('Topic', (err, doc) => {
			if(err){
				throw err;
			}else {
				this.sid = doc.seq;
				next();
			}
		});
	}else{
		next();
	}
});
