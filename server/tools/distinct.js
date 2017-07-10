/**
 * Created by huxin on 2017/6/30.
 */
/*
* 	查询, 唯一不重复,
* */

module.exports = {
	findByKey(){
		db.User.find({account: this.account}, (err, doc) => {
			if(err){
				throw err;
			}else if(doc){

			}
		});
	},

};
