/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./models/question.js
\*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Model = mongoose.model;

let questionSchema = Schema
(
    {
        text:
        {
            type: String,
            default:"",
            trim:true,
            required: "Question text is required..."
        },
        type:
        {
            type: String,
            default:"",
            trim: true,
            required: "Type is required..."
        },
        options:
        {
            type: [String]
        }
    }
)

module.exports = Model('Question', questionSchema);