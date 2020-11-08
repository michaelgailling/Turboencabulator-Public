var express = require('express');
var router = express.Router();

let surveyController = require("../controllers/survey");

/* GET home page. */
router.get('/', surveyController.displayIndex);

module.exports = router;