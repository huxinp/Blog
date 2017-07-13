/**
 * Created by huxinpeng on 2017/7/13.
 */


const logReqArguments = function (req, res, next) {
	console.log('api: ' + req.path + ' type: ' + req.method);
	if(Object.keys(req.params).length){
		logArguments(req.params);
	}
	if(Object.keys(req.query).length){
		logArguments(req.query);
	}
	if(Object.keys(req.body).length){
		logArguments(req.body);
	}
	next();
};

//log入参
function logArguments(value) {
	if(typeof value === "object"){
		value = JSON.stringify(value);
	}
	console.log('req：' + value);
}

module.exports = logReqArguments;
