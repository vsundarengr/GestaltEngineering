const { ObjectId, Date } = require('mongoose');
const mongoose = require('mongoose');

const standAloneQuizInstanceSchema = new mongoose.Schema({
    userid: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    courseId: {
        type: ObjectId,
        required:true
    },
    questionMap: {
        type: Map,
        required: true
    },
    quizData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    fname: {
        type: String
    },
    currentQuestionInstanceId: {
        type: ObjectId
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const StandAloneQuizInstance = mongoose.model('standAloneQuizInstance', standAloneQuizInstanceSchema);

module.exports = StandAloneQuizInstance;