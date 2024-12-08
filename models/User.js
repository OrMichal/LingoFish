const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {collection: 'tbUsers'});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("User", userSchema);

module.exports = user;
