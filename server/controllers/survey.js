/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./controllers/survey.js
 * 
\*/

let express = require('express');
let router = express.Router;

//DB
let mongoose = require('mongoose');

let Survey = require('../models/survey');
let Question = require('../models/question');

module.exports.displaySurveyList = (req,res,next) => 
{
    Survey.find( (err, surveys) => {
        if (err) {
          return console.error(err);
        }
        else {
            console.log(surveys[0].title);
            console.log(surveys[0].questionlist);
            res.render('survey/index', { 
                title: 'Survey List', 
                surveys: surveys
            });
        }
      });
}

module.exports.displayCreateSurvey = (req,res,next) =>
{
    let newQuestion = new Question({
        text:"New Question",
        type:"text",
        options:[]
    });
    let newSurvey = new Survey({
        title:"New Survey"
    });
    return res.render('survey/details', {title: 'Create Survey', survey: newSurvey, questions:[newQuestion]});
}

module.exports.displayEditSurvey = (req,res,next) =>
{
    let id = req.params.id;
  //Find the book based on record id
  Survey.findById(id, (err, currentsurvey) => {
      if(err)
      {
          console.error(err);
          res.end(err);
      }
      else
      {
          let questions = currentsurvey.questionlist;
          res.render('survey/details', {title : "Edit Survey", survey : currentsurvey, questions : questions});
      }
  });
}