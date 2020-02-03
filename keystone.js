// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
const keystone = require('keystone');
const mongoose = require('mongoose');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available optionsand documentation.
keystone.set('signin logo', '../images/logo.svg');

keystone.init({
	'name': 'Twin Image Design',
	'brand': 'Twin Image Design',
	'wysiwyg images': true,
	'wysiwyg cloudinary images': true,
	'wysiwyg additional options': {
		skin: 'mobile',
		menubar: 'file edit format view insert',
		relative_urls: false,
		content_css: '/assets/css/styles.min.css',
		visualblocks_default_state: true,

	},
	// 'signin logo': ['logo.svg', 200, 100],
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'port': process.env.PORT || 3000,
	'ssl port': process.env.SSL_PORT || 3001,
	'ssl public port': 443, // different from `ssl port` if using iptables/ port forwarding
	// 'ssl': 'force', // force redirects to https port 
	// 'ssl cert': letsencryptPath + 'cert.pem', // path to generated certificate (generated at `$HOME/letsencrypt/etc` by default)
	// 'ssl key': letsencryptPath + 'privkey.pem', // path to generated private key (same default as ssl cert)
});


// Mongoose options
mongoose.Promise = global.Promise;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/twin-image-design";
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};
  
const connectWithRetry = () => {
	console.log('MongoDB connection with retry')

	// Connect to MongoDB
	mongoose.connect(MONGO_URI, options).then( function() {
		console.log('MongoDB is connected');
	})
	.catch( function(err) {
		console.log(err);
		console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
		setTimeout(connectWithRetry, 5000)
	});
}

connectWithRetry();


// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	enquiries: 'enquiries',
	users: 'users',
});

keystone.start({
    onHttpServerCreated: function() {
      var server = keystone.httpServer;
      console.log("keystone is running!");
      console.log(server);
      
    }
  });

// Start Keystone to connect to your database and initialise the web server
module.exports = keystone;


