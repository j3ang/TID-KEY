var keystone = require('keystone');

var Email = keystone.list('Email');

/**
 * List Email
 */
exports.list = function (req, res) {
	Email.model.find(function (err, items) {

		if (err) return res.json({
			err: err
		});

		res.json({
			email: items
		});

	});
}

/**
 * Get Email by ID
 */
exports.get = function (req, res) {
	Email.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({
			err: err
		});
		if (!item) return res.json('not found');

		res.json({
			email: item
		});

	});
}


/**
 * Create a Email
 */
exports.create = function (req, res) {

	var item = new Email.model(),
		data = (req.method == 'POST') ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function (err) {

		if (err) return res.json({
			error: err
		});

		res.json({
			email: item
		});

	});
}

/**
 * Patch Email by ID
 */
exports.update = function (req, res) {

	Email.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({
			err: err
		});
		if (!item) return res.json({
			err: 'not found'
		});

		var data = (req.method == 'PUT') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) return res.json({
				err: err
			});

			res.json({
				email: item
			});

		});

	});
}

/**
 * Delete Email by ID
 */
exports.remove = function (req, res) {
	Email.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({
			dberror: err
		});
		if (!item) return res.json('not found');

		item.remove(function (err) {
			if (err) return res.json({
				dberror: err
			});

			return res.json({
				success: true
			});
		});

	});
}
