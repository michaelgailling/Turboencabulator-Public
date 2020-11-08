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

/* GET home page. */
router.get('/', indexController.displayHomePage);

module.exports = router;
