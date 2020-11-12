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

/* GET Survey List - READ */
router.get('/', surveyController.displaySurveyList);

/* GET create survey page - CREATE */
router.get('/create', surveyController.displayCreateSurvey);

/*POST Route for creating and adding new survey to DB - CREATE */
router.post('/create', surveyController.createSurvey);

/* GET edit survey page - UPDATE */
router.get('/edit/:id', surveyController.displayEditSurvey);

/* POST Route for editing a Survey in db - UPDATE */
router.post('/edit/:id', surveyController.editSurvey);

/* GET Route for performing a Survey delete - DELETE */
router.get('/delete/:id', surveyController.deleteSurvey);

/* GET create survey respond page - CREATE */
router.get('/respond/:id', surveyController.displaySurvey);

/* POST Route for submitting a Survey response in db - UPDATE */
router.post('/respond/:id', surveyController.createResponse);

module.exports = router;