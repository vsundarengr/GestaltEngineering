const { boolean, trueDependencies } = require('mathjs');
const { Date, Number, ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const courseInstanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course must have a name'],
    },
    courseNumber: {
        type: String,
        required: [true, 'Course must have a course number'],
    },
    section: {
        type: String,
    },
    instructor: {
        type: String,
    },
    institution: {
        type: String,
        required: [true, 'Course must have a valid institution'],
    },
    session: {
        type: String,
        required: [true, 'Course must have a session'],
    },
    startDate: {
        type: Date
    },
    endDate:{
        type: Date
    },
    addedBy:{
        type:ObjectId
    },
    isActive: {
        type: boolean,
        default: true
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

const CourseInstance = mongoose.model('courseInstance', courseInstanceSchema);

module.exports = CourseInstance;