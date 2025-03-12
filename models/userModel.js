const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    singnature: {type: String, required: true, unique: true},
    admin: {type: Boolean, required: true},
}, {collection: "users"});

const user = mongoose.model("user", userSchema);

module.exports = {
    user,
};