/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./routes/index.js
\*/

var express = require('express');
var router = express.Router();

let indexController = require("../controllers/index");
let surveyController = require("../controllers/survey");


/* GET home page. */
router.get('/', surveyController.displayVisibleSuveys);

/* GET Route for displaying Login page */
router.get('/login', indexController.displayLoginPage);
/* POST Route for processing Login page*/
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying Register page */
router.get('/register', indexController.displayRegisterPage);
/* POST Route for processing Register page*/
router.post('/register', indexController.processRegisterPage);

/* GET Route to perform UserLogout */
router.get('/logout', indexController.performLogout);

/* GET Route to perform displaying forgot password page */
router.get('/forgot',indexController.displayForgotPassword);

/* POST Route to proc password page */
router.post('/forgot',indexController.procForgotPassword);


module.exports = router;
