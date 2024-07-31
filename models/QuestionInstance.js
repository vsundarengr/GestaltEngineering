const { ObjectId, Date, boolean } = require('mongoose');
const mongoose = require('mongoose');

const questionInstanceSchema = new mongoose.Schema({
    questionid: {
        type: ObjectId,
        required: [true, 'Question must have a id to create instance'],
        lowercase:true,
    },
    fname: {
        type: String,
        required: [true, 'Question instance must have name']
    },
    userid: {
        type: ObjectId,
        required: true,
    },
    data: {
        type: String,
    },
    solutionStrings: {
        type: Array,
        default: []
    },
    graded:{
        type: String,
        default: 'dummy',
    },
    attempts:{
        type: Array,
        default: []
    },
    stepAttempts: {
        type: Array,
        default: []
    },
    quizInstanceId: {
        type: ObjectId,
    },
    htmlString: {
        type: String
    },
    isCompletedCorrectly: {
        type: Boolean,
        default: false
    },
    maxScore: {
        type: Number,
        default: 1
    },
    score: {
        type: Number,
        default: 0
    },
    stepType: {
        type: String,
        default: "single"
    },
    currentStep: {
        type: Number,
        default: 0
    },
    minStep: {
        type: Number,
        default: 0
    },
    maxStep: {
        type: Number,
        default: 9
    }
}, {timestamps:true});

const QuestionInstance = mongoose.model('questioninstance', questionInstanceSchema); // must be singular of the collection name

module.exports = QuestionInstance;