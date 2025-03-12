const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    singnature: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    priority: {type: Number, required: true},
    onSite: {type: Boolean, required: true},
    id: {type: String, required: true, unique: true},
}, {collection: "tickets"});

const ticket = mongoose.model("ticket", ticketSchema);

module.exports = {
    ticket,
};