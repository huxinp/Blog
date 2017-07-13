/**
 * Created by huxinpeng on 2017/7/13.
 */
const SerialNum = require('../db/serialnum');

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
