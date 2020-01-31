var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'portfolio';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		category: [],
		categories: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;
			console.log('listing all the categories', locals.data.categories);
			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			});
		});

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({
				key: locals.filters.category
			}).exec(function (err, result) {
				locals.data.category = result;
				console.log('=======================================================');
				console.log('local - postcategory', locals.data.category);
				console.log('=======================================================');
				next(err);
			});
		}



	});

	// Load the posts
	view.on('init', function (next) {

		if (locals.data.category) {
			keystone.list('Post').model.find().where('categories').in([locals.data.category]).sort('-publishedDate').exec(function (err, results) {
				locals.data.posts = results;
				console.log('posts after filters with categories111111', locals.data.posts);
				next(err);
			});
		} else {
			keystone.list('Post').model.find().sort('-publishedDate').exec(function (err, results) {
				locals.data.posts = results;
				console.log(locals.data.posts);

				next(err);
			});
		}





	});

	// Render the view
	view.render('portfolio');
};
