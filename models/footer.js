// var keystone = require('keystone');
// var Types = keystone.Field.Types;

// /**
//  * Footer Model
//  * =============
//  */

// var Footer = new keystone.List('Enquiry', {
//    nocreate: true,
//    noedit: true,
// });

// Enquiry.add({
//    name: { type: Types.Name, required: true },
//    email: { type: Types.Email, required: true },
//    phone: { type: Number },
//    subject: { type: String },
//    message: { type: Types.Markdown, required: true },
//    createdAt: { type: Date, default: Date.now },
// });

// Enquiry.defaultSort = '-createdAt';
// Enquiry.defaultColumns = 'name, email, subject, createdAt';
// Enquiry.register();
