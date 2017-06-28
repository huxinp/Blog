/*
export const generateSerialNumber = baseNumber => {
	//增加的条件
	//插入数据的时候增加一
	let newSerialNumber = baseNumber
	// function serialNumber(){
	// 	newSerialNumber++;
	// 	return newSerialNumber;
	// }
	// return serialNumber;
	return () => {
		newSerialNumber++;
		return newSerialNumber;
	}
};
*/
// var serialNumber = generateSerialNumber(100000);

// var sid = serialNumber();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SerialNumSchema = new Schema({
	_id: {type: String, required: true},
	seq: {type: Number, default: 0}
});

var SerialNum = mongoose.model('SerialNum', SerialNumSchema);

module.exports = generateSerialNumber = (serialNumName, callback) => {
	console.log(serialNumName + '生成sid');
	SerialNum.findById(serialNumName, (err, doc) => {
		if(err){
			console.log(err);
		}else if(!err && !doc){//没有发生错误，没有查询到    第一次生成
			let obj = {};
			obj._id = serialNumName;
			let serialNum = new SerialNum(obj);
			serialNum.save((err, doc) => {
				if(err){
					callback(null);
					return;
				}
				callback(doc);
			})
		}else {
			SerialNum.findByIdAndUpdate(
				serialNumName, {$inc: {seq: 1}},
				(err, doc) => {
					if(err){
						callback(null);
						return;
					}
					callback(doc);
				}
			);
		}
	});
};
