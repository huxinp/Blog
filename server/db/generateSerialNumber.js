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

const SerialNumSchema = new Schema({
	_id: {type: String, required: true},
	seq: {type: Number, default: 100000}
});

const SerialNum = mongoose.model('SerialNum', SerialNumSchema);

module.exports = generateSerialNumber = (serialNumName, next) => {
	SerialNum.findById(serialNumName, (err, doc) => {
		if(err){
			throw err;
		}else if(!err && !doc){//没有发生错误，没有查询到    第一次生成
			let obj = {};
			obj._id = serialNumName;
			new SerialNum(obj).save(next)
		}else {//没有发生错误   且 查询到了  不是第一次生成,   根据原有的值 +1  生成sid
			SerialNum.findByIdAndUpdate(serialNumName, {$inc: {seq: 1}}, next);
		}
	});
};
