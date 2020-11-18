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

let Answer = require("./answer");

let responseSchema = Schema
(
    {
        surveyid:
        {
            type: String,
            required: true
        },
        surveytitle:
        {
            type: String,
            required: true
        },
        answers:
        {
            type: Array,
            answer:Answer
        }
    },
    {
        collection : 'responses'
    }
)

module.exports = Model('Response', responseSchema);

