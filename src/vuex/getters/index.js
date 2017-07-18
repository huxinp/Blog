/**
 * Created by huxin on 2017/7/10.
 */
export default {
	token: state => state.token,//token
	user: state => state.user,//用户信息
	articleList: state => state.articleList,//文章列表
	pagination: state => state.pagination,//分页信息
	topicList: state => state.topicList,//话题列表
	briefList: state => state.briefList,//缩略列表
	article: state => state.article,//一篇文章的内容
}
