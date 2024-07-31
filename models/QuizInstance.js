const { boolean } = require('mathjs');
const { Date, Number, ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const quizInstanceSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    courseInstanceId: {
        type: ObjectId,
        required:true
    },
    moduleInstanceId: {
        type: ObjectId
    },
    order: {
        type: String,
        default: "fixed"
    },
    minQuestions: {
        type: Number,
        default: 0,
    },
    maxQuestions: {
        type: Number,
        default: 0
    },
    graded: {
        type: boolean,
        default: true
    },
    contents: {
        type: Array
    },
    contentId: {
        type: String,
    },
    progress: {
        type: Array
    },
    completedFraction: {
        type: Number,
        default: 0
    },
    numQuestionsCompleted:{
        type: Number,
        default: 0
    },
    quizName: {
        type: String
    }


}, {timestamps: true});

const QuizInstance = mongoose.model('quizInstance', quizInstanceSchema);

module.exports = QuizInstance;