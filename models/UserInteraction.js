const { boolean } = require('mathjs');
const { Date, Number, ObjectId, Mixed } = require('mongoose');
const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        default: null
    },
    query: {
        type: String,
        default: null
    },
    params: {
        type: String,
        default: null
    },
    body: {
        type: String,
        default: null
    }
},{timestamps: true});

const UserInteraction = mongoose.model('userinteraction', userInteractionSchema); // must be singular of the collection name

module.exports = UserInteraction;

