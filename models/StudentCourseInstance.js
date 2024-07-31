const { boolean, trueDependencies } = require('mathjs');
const { Date, Number, ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const studentCourseInstanceSchema = new mongoose.Schema({
    courseId: {
        type: ObjectId,
        required: [true, 'Course must have a course number'],
    },
    userid: {
        type: ObjectId,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: [true, 'Need valid fname']
    },
    moduleList: {
        type: Array
    },
    quizList: {
        type: Array
    }
}, {timestamps:true});

const StudentCourseInstance = mongoose.model('studentcourseinstance', studentCourseInstanceSchema);

module.exports = StudentCourseInstance;