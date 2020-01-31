var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * setup Model
 * ==================
 */

var Contact = new keystone.List('SetUp', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Contact.add({
	name: {
		first: {
			type: String
		},
		last: {
			type: String
		}
	},
	link: {
		type: String
	},
});



function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}



Contact.register();
