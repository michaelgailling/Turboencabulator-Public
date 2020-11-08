var express = require('express');
var router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get('/', indexController.displayHomePage);

module.exports = router;
