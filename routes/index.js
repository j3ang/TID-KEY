/**
 * NOTE This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var Enquiry = keystone.list('Enquiry');


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);


// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') // ADD THIS LINE TOO!
};

// Setup Route Bindings
exports = module.exports = function (app) {
	var locals = app.locals;

	// Set locals
	locals.section = 'contact';
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// Views
	app.get('/', routes.views.home);
	app.get('/portfolio/:category?', routes.views.portfolio);
	app.get('/portfolio/post/:post', routes.views.post);
	app.get('/about', routes.views.about);
	app.get('/mission', routes.views.about);
	app.get('/team', routes.views.about);

	app.all('/contact', routes.views.contact);

	//File Upload Route
	app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
	app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
	app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
	app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
	app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
