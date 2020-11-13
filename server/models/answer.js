/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./models/answer.js
\*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Model = mongoose.model;

let answerSchema = Schema
(
    {
        questiontext:
        {
            type: String,
            required: true
        },
        answertext:
        {
            type: String,
            required: true
        }
    }
)

module.exports = Model('Answer', answerSchema);

