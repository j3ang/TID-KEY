var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
	map: {
		name: 'firstname'
	},
});


var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
		publicPath: '/public/uploads/files', // path where files will be served
	}
});

Enquiry.add({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
	},
	email: {
		type: Types.Email,
		required: true
	},
	phone: {
		type: Number
	},
	subject: {
		type: String
	},
	file_upload: {
		type: Types.File,
		storage: storage
	},
	message: {
		type: Types.Markdown,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});



Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'firstname, lastname, email, phone, subject, file_upload, createdAt|30%';
Enquiry.register();
