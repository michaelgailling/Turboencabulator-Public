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
router.get('/', surveyController.displaySurveyList);

/* GET create survey page */
router.get('/create', surveyController.displayCreateSurvey);

/* GET edit survey page */
router.get('/edit/:id', surveyController.displayEditSurvey);

module.exports = router;