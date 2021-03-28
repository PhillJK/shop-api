const mongoose = require("mongoose");
const regexEmail = require("../utils/regexEmail");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: regexEmail
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
