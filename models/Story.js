const mongo = require('mongoose');
const { type } = require('os');
const { collection } = require('./User');

const storySchema = new mongo.Schema({
    heading: {type: String, required: true},
    questions: {type: Array},
    content: {type : String},
    answers: {type: Array},
    allAnswers: {type: Array}
}, {collection: 'tbStories'});

const story = mongo.model("Story", storySchema);

module.exports = story;