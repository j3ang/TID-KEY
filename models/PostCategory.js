var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
	name: { type: String, required: true },
	background: { type: Types.CloudinaryImage },
	brief: { type: Types.Html, wysiwyg: true, height: 200 },
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

PostCategory.register();
