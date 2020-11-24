/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./config/transport.js
\*/


let mailer = require('nodemailer');
let mailConfig = {
  service: 'gmail',
  auth: {
    user: 'turboencabulatorsurvey@gmail.com',
    pass: 'Admin2343'
  }
};

var transporter = mailer.createTransport(mailConfig);

module.exports = transporter;