const mongoose = require("mongoose");
const { type } = require("os");
const { collection } = require("./User");

const wordSchema = new mongoose.Schema({
    word: {type: String},
    meaning: {type: Array}
}, {collection: "tbWords"});

const word = mongoose.model("word", wordSchema);
module.exports = word;