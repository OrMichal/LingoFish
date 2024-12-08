const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {collection: 'tbUsers'});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    console.log("Hashing password:", this.password); // Debugging
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Hashed password:", this.password); // Debugging
    next();
});


userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("User", userSchema);

module.exports = user;
