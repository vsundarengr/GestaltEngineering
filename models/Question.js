const { ObjectId, Date } = require('mongoose');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: [true, 'Question must have a unique identifier'],
        lowercase: true,
    },
    title: {
        type: String,
        required: [true, 'Question must have a name'],
        lowercase: true,
    },
    stem: {
        type: String,
        required: [true, 'Question stem is needed'],
    },
    hintString: {
        type: String,
        default: null
    },
    topic: {
        type: [String],
        required: [true, 'Please enter one or more topics for this question'],
    },
    tags:{
        type: [String],
        required: false,
    },
    prereqs: {
        type: [String],
        required: false
    },
    createdBy: {
        type: String,
        default: null
    },
    isAdaptive: {
        type: Boolean,
        default: false
    },
    qType: {
        type: String,
        required: [true, 'Question must have a type (choices: mcq, ma, num, fb, multi)']
    },
    nSteps: {
        type: Number,
        default: 1
    },
    location: {
        type: String,
        required: [true, 'Please enter where the question is stored'],
        unique:true
    }, 
    difficulty: {
        type: Number,
        default: 1
    },
    codelang: {
        type: String,
        default: "none"
    },
    resources: {
        type: Array,
        default: []
    },
    stepType: {
        type: String,
        default: "single"
    }
    
}, { timestamps: true });

const Question = mongoose.model('question', questionSchema); // must be singular of the collection name

module.exports = Question;