const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Schema defines the structure of the document
// create a new instance of the schema
const feedbackFromStudentSchema = new Schema({
    userid: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    studentFeedbackBody:{
        type: String,
        required:true
    },
    moduleInstanceId: {
        type: ObjectId
    },
    moduleId: {
        type: String
    },
    questionInstanceId: {
        type: ObjectId
    },
    contentId: {
        type: String
    },
    courseId: {
        type: ObjectId
    },
    feedbackType: {
        type: String
    }
}, {timestamps: true});


// first argument is the name of the model. It is important as mongoose adds an s to the end to make it plural
// and then looks in the database for the blogs collection
// The second argument is the schema we're going to store inside the collection.

const FeedbackFromStudent = mongoose.model('feedbackfromstudent', feedbackFromStudentSchema);

module.exports = FeedbackFromStudent;