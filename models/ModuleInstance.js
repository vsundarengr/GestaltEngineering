const { boolean } = require('mathjs');
const { Date, Number, ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const moduleInstanceSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    moduleId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    contents: {
        type: Array
    },
    currentIndex: {
        type: Number,
        default: 0
    },
    completedFraction: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const ModuleInstance = mongoose.model('moduleInstance', moduleInstanceSchema);

module.exports = ModuleInstance;