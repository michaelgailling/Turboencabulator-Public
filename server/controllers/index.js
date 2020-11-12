/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./controllers/index.js
\*/

let express = require('express');
let router = express.Router;

//DB
let mongoose = require('mongoose');
let Survey = require('../models/survey');

module.exports.displayHomePage = (req,res,next) => {
    //Find and list all the surveys
    Survey.find( (err, surveys) => {
        if (err) {
          return console.error(err);
        }
        else {
            console.log(surveys[0].title);
            console.log(surveys[0].questionlist);
            res.render('home/index', { 
                title: 'Home', 
                surveys: surveys
            });
        }
      });
}