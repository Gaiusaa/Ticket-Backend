// Dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Variable

// Models
const {user} = require("../models/userModel");
const {ticket} = require("../models/ticketModel");

// Function
const login = async (req, res) => {
    const {email, password, remember} = req.body;

    try {
        const foundUser = await user.findOne({email: email});
        if (!foundUser) res.status(401).send("Your credentials are not correct");
        console.log("Found user")

        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (err) res.status(501).send("Could not verify your credentials");
            if (!result) res.status(401).send("Your credentials are not correct");
            console.log("Correct password")
            if (remember === "on") {
                console.log("Making token")
                const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: "1h"});
                res.cookie("authToken", token, {
                    maxAge: 60 * 60 * 1000, // 1 Hour
                    sameSite: "Strict",
                    httpOnly: true,
                    strict: true,
                    secure: process.env.NODE_ENV === "production", // Sent over HTTP in production
                });
            }
            console.log("Returning now...");
            res.status(202).json({success: true});
        });
    } catch(error) {
        console.log(`An error occurred while logging in user: ${error}`);
    };
};

const getTickets = async (req, res) => {
    try {
        const tickets = await ticket.find()
        if (!tickets || tickets.lenth === 0) return null;
        return tickets

    } catch(error) {
        console.log(`An error occurred retriving tickets: ${error}`);
        return null;
    };
};

const findTicket = async (req, res) => {
    const id = req.params.id;
    if (!id) return null;
    try {
        const foundTicket = await ticket.findOne({id: id});
        if (!foundTicket) return null
        return foundTicket;

    } catch (error) {
        console.log(`An error occurred fetching single ticket data: ${error}`);
    };
};

const createTicket = async (req, res) => {
    const {email, signature, description, location, priority, onSite} = req.body;
    const emailContents = email.split(".");
    try {
        const id = `${emailContents[0].split("", 1)}${emailContents[0].length}${emailContents[1].split("", 1)}_${signature.toString().split("", 1)}${description.split("", 1)}${location.split("", 1)}${priority.toString()}${onSite.toString().split("", 1)}${Math.floor(Math.random() * 1000)}`
        const newTicket = await ticket.create({
            email: email,
            signature: signature,
            description: description,
            location: location,
            priority: priority,
            onSid: onSite,
            id: id,
        });
        if (!newTicket) return res.json({success: false});
        return res.json({success: true});

    } catch (error) {
        console.log(`An error occurred creating ticket: ${error}`);
        return res.json({success: false});
    };
};

module.exports = {
    login,
    getTickets,
    findTicket,
    createTicket,
};