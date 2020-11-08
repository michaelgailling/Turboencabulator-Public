/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./controllers/survey.js
\*/

let express = require('express');
let router = express.Router;

//DB
let mongoose = require('mongoose');

module.exports.displayIndex = (req,res,next) => {
    res.render('survey/index', { title: 'SurveyList'});
}