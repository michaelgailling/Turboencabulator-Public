let express = require('express');
let router = express.Router;

//DB
let mongoose = require('mongoose');

module.exports.displayIndex = (req,res,next) => {
    res.render('survey/index', { title: 'SurveyList'});
}