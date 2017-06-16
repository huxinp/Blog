import mongoose from 'mongoose';

import ArticleSchema from './article.js';
import UserSchema from './user.js';

mongoose.connect('mongodb://127/0.0.1/releaser');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Datebase connection error.'));
db.once('open', )



export default {
	Article: mongoose.model('Article', ArticleSchema),
	User: mongoose.model('User', UserSchema),
};