const mongo = require("mongoose");
const { type } = require("os");
const { collection } = require("./User");

const gramSchema = new mongo.Schema({
    level: {type: String},
    point: {type: String},
    description: {type: Array}
}, {collection: "tbGrammar"});

const grammar = mongo.model("grammar",gramSchema);

module.exports = grammar;