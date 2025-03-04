const mongoose = require("mongoose");

const userSchema = mongoose.model({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {collection: "users"});

const user = mongoose.Schema(userSchema);

module.exports = {
    user,
};