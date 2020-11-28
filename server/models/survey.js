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
            required: "OwnerName is required..."
        },
        questionlist:
        {
            type: Array,
            question:Question
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        updated:{
            type: Date,
            default: Date.now
        },
        expiryDate:
        {
            type: Date
        },
        enabled:
        {
            type: Boolean,
            default :true
        },
        visible:
        {
            type: Boolean,
            default: true
        }
    },
    {
        collection : 'surveys'
    }
)

module.exports = Model('Survey', surveySchema);