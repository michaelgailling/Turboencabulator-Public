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

let Response = require('../models/response');
let Answer = require('../models/answer');

module.exports.displaySurveyList = (req,res,next) => 
{
    //Find and list all the surveys
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
    //Create new base objects for survey creation
    let newQuestion = new Question({
        text:"New Question",
        type:"text",
        options:[]
    });
    let newQuestion2 = new Question({
        text:"New Question",
        type:"text",
        options:[]
    });
    let newSurvey = new Survey({
        title:"New Survey",
        questionlist:[newQuestion,newQuestion2]
    });

    return res.render('survey/details', {title: 'Create Survey', survey: newSurvey});
}

module.exports.createSurvey = (req,res,next) => {

    let data = req.body;

    let newSurvey = new Survey({
        title: data.title,
        questionlist:[]
    });

    let questionText = data.questionText;
    let questionType = data.questionType;

    if(typeof questionText === "string")
    {
        let question = new Question({
            text:questionText,
            type:questionType,
            options:[]
        });

        newSurvey.questionlist.push(question);
    }
    else
    {
        for(let i = 0; i < questionText.length; i++){
            let question = new Question({
                text:questionText[i],
                type:questionType[i],
                options:[]
            });
    
            newSurvey.questionlist.push(question);
        }
    }

    Survey.create(newSurvey, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey');
        }
    });
};

module.exports.displayEditSurvey = (req,res,next) =>
{
    let id = req.params.id;
  //Find the survey based on record id
  Survey.findById(id, (err, currentsurvey) => {
      if(err)
      {
          console.error(err);
          res.end(err);
      }
      else
      {
          //questons is sent as its own list
          res.render('survey/details', {title : "Edit Survey", survey : currentsurvey});
      }
  });
}


module.exports.editSurvey = (req,res,next) => {
    let id = req.params.id;
    let data = req.body;

    let updatedSurvey = new Survey({
        "_id": id,
        title: data.title,
        questionlist:[]
    });

    let questionText = data.questionText;
    let questionType = data.questionType;

    if(typeof questionText === "string")
    {
        let question = new Question({
            text:questionText,
            type:questionType,
            options:[]
        });

        updatedSurvey.questionlist.push(question);
    }
    else
    {
        for(let i = 0; i < questionText.length; i++){
            let question = new Question({
                text:questionText[i],
                type:questionType[i],
                options:[]
            });
    
            updatedSurvey.questionlist.push(question);
        }
    }

    Survey.updateOne({_id:id}, updatedSurvey, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey');
        }
    });
}



module.exports.deleteSurvey = (req,res,next) => {
    let id = req.params.id;

    Survey.remove({_id:id}, (err)=>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey');
        }
    });
}

module.exports.displaySurvey = (req,res,next) => {
    let id = req.params.id;
    //Find the survey based on record id
    Survey.findById(id, (err, currentsurvey) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            //questons is sent as its own list
            res.render('survey/respondsurvey', {title : "Respond to survey", survey : currentsurvey});
        }
    });
}

module.exports.createResponse = (req,res,next) => {
    let id = req.params.id;

    let data = req.body;

    let newRespsonse = new Response({
        surveyid : id,
        surveytitle : data.surveyTitle,
        answers:[]
    });

    let answerText = data.answerText;

    if(typeof answerText === "string")
    {
        newRespsonse.answers.push(answerText);
    }
    else
    {
        for(let i = 0; i < answerText.length; i++){
            newRespsonse.answers.push(answerText[i]);
        }
    }

    Response.create(newRespsonse, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey');
        }
    });
}

module.exports.dispaySurveyResponses = (req,res,next) => {
    let id = req.params.id;

    Response.find({surveyid:id},(err, responses)=> {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('survey/responselist', {responses : responses});
        }
    });
}

module.exports.dispaySurveyAnswers = (req,res,next) => {
    let id = req.params.id;

    Response.findById(id, (err, currentresponse) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.render('survey/responsedetails', {title : "Survey Answers", response : currentresponse});
        }
    });
}