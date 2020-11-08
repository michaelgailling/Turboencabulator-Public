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

module.exports.displayHomePage = (req,res,next) => {
    res.render('home/index', { title: 'Home'});
}