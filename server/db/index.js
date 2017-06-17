import mongoose from 'mongoose';

import ArticleSchema from './article.js';
import UserSchema from './user.js';
import UserContentSchema from './user_content.js';
import UserFavoriteSchema from './user_favorite.js';
import UserFollowSchema from './user_follow.js';
import UserLevelSchema from './user_level.js';
import UserPointSchema from './user_point.js';

mongoose.connect('mongodb://127/0.0.1/releaser');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Datebase connection error.'));
db.once('open', )



export default {
	Article: mongoose.model('Article', ArticleSchema),
	User: mongoose.model('User', UserSchema),
	UserContent: mongoose.model('UserContent', UserContentSchema),
	UserFavorite: mongoose.model('UserFavorite', UserFavoriteSchema),
	UserFollow: mongoose.model('UserFollow', UserFollowSchema),
	UserLevel: mongoose.model('UserLevel', UserLevelSchema),
	UserPoint: mongoose.model('UserPoint', UserPointSchema),	
};