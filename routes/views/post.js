var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = ['portfolio', 'post'];

	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
		category: [],
	};

	// Load the current post
	view.on('init', function (next) {
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.post = result;
			console.log(locals.data.post);
			next(err);
		});
	});

	// Load the current category filter
	view.on('init', function (next) {
		let catKey = locals.data.post.categories[0].key;
		if (catKey) {
			keystone.list('PostCategory').model.findOne({ key: catKey }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the current category posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 4,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories');


		// if catagory exist
		// if (locals.data.category.name) {
		// 	console.log('printing current category:', locals.data.category.name);

		// 	// if post is more than one, then load other post in the same category
		// 	keystone.list('Post').model.count().where('categories').in([locals.data.category]).exec(function (err, count) {
		// 		console.log('cat count', count);
		// 		if (count > 2) {
		// 			q.where('categories').in([locals.data.category]);
		// 		}
		// 		if (err) {
		// 			console.log(err);
		// 		}

		// 		if (count === 0) {
		// 			console.log("there's only 2 posts");
		// 		}

		// 	});

		// }

		// load other posts
		q.exec(function (err, results) {
			locals.data.posts = results;
			console.log('post js printing posts:', results);

			next(err);
		});
	});

	// Render the view
	view.render('post', { doctype: 'html' });
};
