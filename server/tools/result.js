/**
 * Created by huxin on 2017/6/28.
 */
/*
* 	返回结果格式化包装
* */

module.exports = (result, code, message) => {
	let data = {
		code: code,
		message: message,
		result: result
	};
	console.log('res: ' + JSON.stringify(data));
	return data;
};
