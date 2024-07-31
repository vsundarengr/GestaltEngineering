const { ObjectId, Date } = require('mongoose');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    stem: {
        type: String,
        required: [true, 'Question stem is needed'],
        lowercase: true
    },
    topics: {
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
        type: ObjectId,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    isAdaptive: {
        type: Boolean,
        default: false
    },
    qType: {
        type: String,
        required: [true, 'Question must have a type (choices: mcq, ma, num, fb']
    },
    location: {
        type: String,
        required: [true, 'Please enter where the question is stored']
    }
});