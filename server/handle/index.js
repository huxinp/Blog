/**
 * Created by huxinpeng on 2017/7/13.
 */
const db = require('../db');

/**
 * modelName: 数据库Model名字
 * method: 数据库的方法
 * query: 查询条件
 * next: 回调函数
 */
const find = (modelName, method, query, next) => {
	db[modelName][method](query, (err, doc) => {
		if(err){
			throw err;
		}else{
			next(doc);
		}
	});
};

/**
 * Model: document Model名
 * page: 请求数据的页数 number
 * size: 每页的条数 number
 * query: 查询条件 object
 * sort: 排序条件 object
 * populate: 关联查询插入内容
 */
const queryList = (page=1, size=5, query, sort, populate, modelName, next) => {
	db[modelName].find(query).sort(sort).limit(size).skip(size * (page - 1)).populate(populate).exec().then(doc => {
		db[modelName].count(query, (err, count) => {
			if(err){
				throw err;
			}else{
				next({
					data: doc,
					pagination: {
						pageSize: size,
						currentPage: page,
						totalPage: Math.ceil(count / size)
					}
				});
			}
		});
	});
};

const save = (modelName, data, next) => {
	new db[modelName](data).save((err, doc) => {
		if(err){
			throw err;
		}else {
			next(doc);
		}
	});
};

const update = (modelName, query, data, next) => {
	db[modelName].update(query, data, (err, doc) => {
		if(err){
			throw err;
		}else {
			next(doc);
		}
	});
};

//findByIdAndRemove
//findOneAndRemove
const remove = (modelName, query, next) => {
	db[modelName].findOneAndRemove(query, (err, doc) => {
		if(err){
			throw err;
		}else{
			next(doc);
		}
	});
};

module.exports = {
	find,
	queryList,
	save,
	update,
	remove
};
