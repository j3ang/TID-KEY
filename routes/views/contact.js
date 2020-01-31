var async = require('async');
var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var exec = require('child_process').exec;



exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', {
		action: 'contact'
	}, function (next) {

		console.log('on post!!!', req.body);


		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'firstname, lastname, email, phone, file_upload, subject, message',
		}, (err) => {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
				console.log(req.body);
				req.flash('success', 'Enquiry submitted');
			}
			next()
		});


	});

	view.render('contact');
};
