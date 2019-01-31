var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'signup';
	locals.section = 'home';
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;


	locals.filters = {
		post: req.params.post,
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		addPosts: [],
		featurePosts: [],
		categories: [],
		contact: [],
	};


	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({
				key: locals.filters.category
			}).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the featured posts
	view.on('init', (next) => {
		var query = keystone.list('Post').model.find({
			feature: true
		});

		query.exec((err, res) => {
			locals.data.featurePosts = res;
			next(err);
		});

	});


	// Load the contact info
	view.on('init', (next) => {
		var query = keystone.list('Post').model.find({
			feature: true
		});

		query.exec((err, res) => {
			locals.data.featurePosts = res;
			next(err);
		});

	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 6,
				maxPages: 20,
				filters: {
					state: 'published',
				},
			})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.posts = results;
			console.log(locals.data.posts);

			next(err);
		});
	});



	view.render('home');

};
