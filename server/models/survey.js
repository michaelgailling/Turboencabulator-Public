/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./models/survey.js
\*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Model = mongoose.model;

let Question = require("./question");

let surveySchema = Schema
(
    {
        title:
        {
            type: String,
            default:"",
            trim: true,
            required: "Title is required..."
        },
        ownerId:
        {
            type: String,
            default:"",
            trim: true,
            required: "OwnerId is required..."
        },
        ownerName:
        {
            type: String,
            default:"",
            trim: true,
            required: "OwnerId is required..."
        },
        questionlist:
        {
            type: Array,
            question:Question
        },
        visible:
        {
            type: Boolean,
            default: false
        }
    },
    {
        collection : 'surveys'
    }
)

module.exports = Model('Survey', surveySchema);