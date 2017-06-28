const mongoose = require('mongoose');

const ArticleSchema = require('./article.js');
const UserSchema = require('./user.js');
const UserContentSchema = require('./user_content.js');
const UserFavoriteSchema = require('./user_favorite.js');
const UserFollowSchema = require('./user_follow.js');
const UserLevelSchema = require('./user_level.js');
const ScoreSchema = require('./score.js');
const AppreciateSchema = require('./appreciate.js');
const CommentSchema = require('./comment.js');
const CommentReceivedSchema = require('./comment_received.js');
const ContentRefSchema = require('./content_ref.js');
const ScoreRuleSchema = require('./score_rule.js');
const TopicSchema = require('./topic.js');
const TopicContentSchema = require('./topic_content.js');
const UserFanSchema = require('./user_fan.js');

mongoose.connect('mongodb://127.0.0.1:27017/Blog');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Datebase connection error.'));
db.once('open', () => {
	console.log('The datebase has connected.');
});



module.exports = {
	//文章
	Article: mongoose.model('Article', ArticleSchema),
	//用户
	User: mongoose.model('User', UserSchema),
	//用户发表的内容
	UserContent: mongoose.model('UserContent', UserContentSchema),
	//用户收藏
	UserFavorite: mongoose.model('UserFavorite', UserFavoriteSchema),
	//用户关注
	UserFollow: mongoose.model('UserFollow', UserFollowSchema),
	//用户等级
	UserLevel: mongoose.model('UserLevel', UserLevelSchema),
	//积分
	Score: mongoose.model('Score', ScoreSchema),
	//点赞
	Appreciate: mongoose.model('Appreciate', AppreciateSchema),
	//评论
	Comment: mongoose.model('Comment', CommentSchema),
	//接收到的评论
	CommentReceived: mongoose.model('CommentReceived', CommentReceivedSchema),
	//内容引用
	ContentRef: mongoose.model('ContentRef', ContentRefSchema),
	//积分规则
	ScoreRule: mongoose.model('ScoreRule', ScoreRuleSchema),
	//话题
	Topic: mongoose.model('Topic', TopicSchema),
	//话题的内容
	TopicContent: mongoose.model('TopicContent', TopicContentSchema),
	//被关注
	UserFan: mongoose.model('UserFan', UserFanSchema)
};
