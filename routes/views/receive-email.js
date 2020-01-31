// // test-email.js
// var Email = require('keystone-email');
// const email = './templates/views/email.pug';

// new Email(email, {
//    transport: 'mailgun',
// }).send({}, {
//    apiKey: 'a5aa6a16fec78647bae8d58198bc30bb-a3d67641-d0646c83',
//    domain: 'sandboxc44fa50400844dee91c7dbba845c6fa8.mailgun.org',
//    to: 'j3ang.info@gmail.com',
//    from: {
//       name: 'Twin Image Design',
//       email: 'm.potempa@twinimageinc.com',
//    },
//    subject: 'Your first KeystoneJS email',
// }, function (err, result) {
//    if (err) {
//       console.error('🤕 Mailgun test failed with error:\n', err);
//    } else {
//       console.log('📬 Successfully sent Mailgun test with result:\n', result);
//    }
// });