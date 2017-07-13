/*
*	话题下的内容结构
***/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateSerialNumber = require('../handle/generateSerialNumber');

module.exports = TopicContentSchema = new Schema(
	{
		sid: Number,				//流水号
		topic: {					//话题_id
			type: Schema.Types.ObjectId,
			ref: 'Topic'
		},
		content: {					//内容_id
			type: Schema.Types.ObjectId,
			ref: 'Article'
		},
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
				this.sid = result.seq;
				next();
			}
		});
	}else{
		next();
	}
});
