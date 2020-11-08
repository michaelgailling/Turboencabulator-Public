let express = require('express');
let router = express.Router;

//DB
let mongoose = require('mongoose');

module.exports.displayHomePage = (req,res,next) => {
    res.render('home/index', { title: 'Home'});
}