// Dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Models
const {user} = require("../models/userModel");

// Function
const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const foundUser = await user.findOne({email: email});
        if (!foundUser) res.status(401).send("Your credentials are not correct");

        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (err) res.status(501).send("Could not verify your credentials");
            if (!result) res.status(401).send("Your credentials are not correct");

            const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: "1h"});
            res.cookie("authToken", token, {
                maxAge: 60 * 60 * 1000, // 1 Hour
                sameSite: "Strict",
                httpOnly: true,
                strict: true,
                secure: process.env.NODE_ENV === "production", // Sent over HTTP in production
            });

            res.status(202).send("Logged in successfully")
        });
    } catch(error) {
        console.log(`An error occurred while logging in user: ${error}`);
    };
};

module.exports = {
    login
};