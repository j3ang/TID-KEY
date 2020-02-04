var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: {
		name: 'title'
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
});

Post.add({
	title: {
		type: String,
		required: true
	},
	author: {
		type: Types.Relationship,
		ref: 'User',
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'published'
		}
	},
	images: {
		cover: {
			type: Types.CloudinaryImage,
			autoCleanup: true
		},
		image: {
			type: Types.CloudinaryImages,
			folder: '/projects',
			autoCleanup: true,
			unique: true
		},
	},
	content: {
		brief: {
			type: Types.Html,
			wysiwyg: true,
			height: 100
		},
		extended: {
			type: Types.Html,
			wysiwyg: true,
			height: 400
		},
		project_img: {
			type: Types.Html,
			wysiwyg: true,
			width: 800,
			height: 400
		}

	},
	categories: {
		type: Types.Relationship,
		ref: 'PostCategory',
		many: true
	},
	feature: {
		type: Types.Boolean,
		default: false
	},
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'published',
		index: true
	},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.schema.virtual('images.full').get(function () {
	return this.images.cover || this.images.image;
});

Post.defaultColumns = 'title, state|20%, categories|20%, feature,publishedDate|20%';
Post.register();
