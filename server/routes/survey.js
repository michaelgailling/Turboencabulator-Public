/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./routes/survey.js
\*/

var express = require('express');
var router = express.Router();

let surveyController = require("../controllers/survey");

/* GET home page. */
router.get('/', surveyController.displayIndex);

module.exports = router;