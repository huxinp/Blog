/**
 * Created by huxinpeng on 2017/7/13.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SerialNumSchema = new Schema({
	_id: {type: String, required: true},
	seq: {type: Number, default: 100000}
});

const SerialNum = mongoose.model('SerialNum', SerialNumSchema);

module.exports = SerialNum;
