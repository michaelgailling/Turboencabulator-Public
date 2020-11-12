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
        text:
        {
            type: String,
            default:"Answer goes here.",
            trim:true,
            required: "Answer text is required..."
        },
        type:
        {
            type: String,
            default:"text",
            trim: true,
            required: "Type is required..."
        },
        options:
        {
            type: [String]
        }
    }
)

module.exports = Model('Answer', answerSchema);