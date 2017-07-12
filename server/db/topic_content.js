/*
*	话题下的内容结构
***/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('./generateSerialNumber.js');

module.exports = TopicContentSchema = new Schema(
	{
		sid: Number,				//流水号
		topicSid: {					//话题sid
			type: Schema.Types.ObjectId,
			ref: 'Topic'
		},
		contentSid: {
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},			//内容sid
		createdTimestamp: Number	//内容创建时间戳
	},
	{ versionKey: false }
);

TopicContentSchema.pre('save', function(next){
	if(this.isNew){
		generateSerialNumber('TopicContent', (err, result) => {
			if(err){
				throw err;
			}else {
				this.sid = result.value.seq;
				next();
			}
		});
	}else{
		next();
	}
});
