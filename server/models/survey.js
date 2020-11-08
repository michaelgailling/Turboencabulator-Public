let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Model = mongoose.model;

let Question = require("Question");

let surveySchema = Schema
(
    {
        surveytitle:
        {
            type: String,
            default:"",
            trim: true,
            required: "Title is required..."
        },
        questionList:
        {
            type: [Question]
        }
    }
    {
        collection : 'surveys'
    }
)

module.exports = Model('Survey', surveySchema);