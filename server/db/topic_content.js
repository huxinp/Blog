/*	
*	话题下的内容结构
***/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = TopicContentSchema = new Schema(
	{
		sid: Number,				//流水号
		topicSid: Number,			//话题sid
		contentSid: Number,			//内容sid
		createdTimestamp: Number	//内容创建时间戳
	},
	{ versionKey: false }
);

TopicContentSchema.pre('save', next => {
	if(this.isNew){
		generateSerialNumber('TopicContent', (err, result) => {
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