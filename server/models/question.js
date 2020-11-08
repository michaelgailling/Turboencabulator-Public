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