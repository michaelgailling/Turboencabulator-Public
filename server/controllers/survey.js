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
const survey = require('../models/survey');

module.exports.displaySurveyList = (req,res,next) => 
{
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
    {
        //Find and list all the surveys
        Survey.find({ownerId : req.user.id}, (err, surveys) => {
            if (err) {
            return console.error(err);
            }
            else {
                
                res.render('survey/index', { 
                    title: 'Survey List', 
                    surveys: surveys,
                    displayName: req.user ? req.user.displayName : ''
                });
            }
        });
    }
    
}

module.exports.displayCreateSurvey = (req,res,next) =>
{
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
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

        let todaysDate = new Date();

        return res.render('survey/details', {
            title: 'Create Survey', 
            survey: newSurvey,
            todaysDate: todaysDate.toISOString().substr(0, 10), 
            currentExpiryDate:"",
            displayName: req.user ? req.user.displayName : ''
        });
    }
}

module.exports.createSurvey = (req,res,next) => {
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
    {
        let data = req.body;

        let newSurvey = new Survey({
            title: data.title,
            ownerId: req.user.id,
            ownerName: req.user.displayName,
            questionlist:[]
        });

        

        if(data.expiryDate != "")
        {
            newSurvey.expiryDate = Date.parse(data.expiryDate)
        }

        let questions = data.question;

        for(let i = 0; i < questions.length; i++){

            
            let question = new Question({
                        text: questions[i].Text,
                        type: questions[i].Type,
                        options:[]
                    });
            
            newSurvey.questionlist.push(question);
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
    }
};

module.exports.displayEditSurvey = (req,res,next) =>
{
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
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
                let todaysDate = new Date();
                let expiryDate = new Date();
                let expiryDatestr = "";

                if(currentsurvey.expiryDate && currentsurvey.expiryDate != "")
                {
                    expiryDate = new Date(currentsurvey.expiryDate);
                    expiryDatestr = expiryDate.toISOString().substr(0, 10);
                }

                //questons is sent as its own list
                res.render('survey/details', {
                    title : "Edit Survey", 
                    survey : currentsurvey,
                    todaysDate: todaysDate.toISOString().substr(0, 10),
                    currentExpiryDate: expiryDatestr, 
                    displayName: req.user ? req.user.displayName : '' 
                    });
            }
        });
    }
}


module.exports.editSurvey = (req,res,next) => {
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
    {
        let id = req.params.id;
        let data = req.body;
 
        let updatedSurvey = new Survey({
            "_id": id,
            title: data.title,
            ownerId: req.user.id,
            ownerName: req.user.displayName,
            questionlist:[],
            created:Date.parse(data.created),
            updated: Date.now(),
        });

        if(data.expiryDate != "")
        {
            updatedSurvey.expiryDate = Date.parse(data.expiryDate)
        }
        else
        {
            updatedSurvey.expiryDate = ""
        }

        let questions = data.question;

        for(let i = 0; i < questions.length; i++){

            
            let question = new Question({
                        text: questions[i].Text,
                        type: questions[i].Type,
                        options:[]
                    });
            
            updatedSurvey.questionlist.push(question);
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
}



module.exports.deleteSurvey = (req,res,next) => {
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
    {
        let id = req.params.id;

        Response.deleteMany({surveyid:id}, (err) =>{
            if(err)
            {
                console.error(err);
                res.end(err);
            }

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

        });
    }
}




module.exports.displaySurvey = (req,res,next) => {
    let id = req.params.id;
    let dateNow = new Date();
    //Find the survey based on record id
    Survey.findOne(
    {
        "_id":id,
        visible:true, 
        $or: 
        [ 
            {expiryDate: {$gte: dateNow.toISOString()}}, 
            {expiryDate: undefined} 
        ] 
    },
    (err, currentsurvey) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else if (currentsurvey == null)
        {
            let message1 = new Question({
                text:"Sorry the selected survey is not available.",
                type:"message"
            });
            let message2 = new Question({
                text:"Either it does not exist or the owner has restricted access to it.",
                type:"message"
            });
            let message3 = new Question({
                text:"Please contact the surveys creator if you still wish to participate.",
                type:"message"
            });
            let messageSurvey = new Survey({
                title: "Survey Unavailable",
                questionlist:[message1,message2,message3]
            });

            messageSurvey.expired = true;

            res.render('survey/respondsurvey', {
                title : "Respond to survey", 
                survey : messageSurvey,
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            res.render('survey/respondsurvey', {
                title : "Respond to survey", 
                survey : currentsurvey,
                displayName: req.user ? req.user.displayName : ''
            });
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

    let answers = data.response

    for(let i = 0; i < answers.length; i++){

        
        let answer = new Answer({
                    questiontext: answers[i].question,
                    answertext: answers[i].answer
        });

        newRespsonse.answers.push(answer);
    }

    Response.create(newRespsonse, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            if (!req.user) 
            {
                res.redirect('/');
            }
            else{
                res.redirect('/survey');
            }
            
        }
    });
}

module.exports.dispaySurveyResponses = (req,res,next) => {
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
    {
        let id = req.params.id;

        Response.find({surveyid:id},(err, responses)=> {
            if(err)
            {
                console.error(err);
                res.end(err);
            }
            Survey.findById({_id:id}, (err, survey) => {
                if(err)
                {
                    console.error(err);
                    res.end(err);
                }

                res.render('survey/responselist', {
                    title:"Response List", 
                    responses : responses, surveytitle : survey.title,
                    displayName: req.user ? req.user.displayName : ''
                });
            })
        });
    }
}

module.exports.dispaySurveyAnswers = (req,res,next) => {
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
    {
        let id = req.params.id;

        Response.findById(id, (err, currentresponse) => {
            if(err)
            {
                console.error(err);
                res.end(err);
            }
            res.render('survey/responsedetails', {
                title : "Survey Answers", 
                response : currentresponse,
                displayName: req.user ? req.user.displayName : ''});
        });
    }
}

module.exports.toggleVisibility = (req,res,next) => {
    if (!req.user) 
    {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
    }
    else
    {
        let id = req.params.id;

        Survey.findById(id, (err, currentsurvey) => {
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            if(currentsurvey.visible)
            {
                currentsurvey.visible = false;
            }
            else
            {
                currentsurvey.visible = true;
            }

            Survey.updateOne({_id:id}, currentsurvey, (err) => {
                if(err)
                {
                    console.error(err);
                    res.end(err);
                }

                res.redirect("/survey");
            });
        });
    }
}

module.exports.displayVisibleSuveys = (req,res,next) => {
    let dateNow = new Date();
    Survey.find(
    {
        visible:true, 
        $or: 
        [ 
            {expiryDate: {$gte: dateNow.toISOString()}}, 
            {expiryDate: undefined} 
        ] 
    }, (err, surveys) => {

        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.render('home/index', {
            title : "Available Surveys", 
            surveys : surveys,
            displayName: req.user ? req.user.displayName : ''
        });
    });
}