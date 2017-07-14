/**
 * Created by huxinpeng on 2017/7/13.
 */


const logReqArguments = function (req, res, next) {
	console.log('api: ' + req.path + ' type: ' + req.method);
	if(Object.keys(req.params).length){
		if(typeof req.params === "object"){
			console.log('req.params: ' + JSON.stringify(req.params));
		}
	}
	if(Object.keys(req.query).length){
		if(typeof req.query === "object"){
			console.log('req.query: ' + JSON.stringify(req.query));
		}
	}
	if(Object.keys(req.body).length){
		if(typeof req.body === "object"){
			console.log('req.body: ' + JSON.stringify(req.body));
		}
	}
	next();
};

module.exports = logReqArguments;
