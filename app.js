// Dependencies
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// App
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cookieParser());

// Routes
app.use(require("./routes/index"));

// Function
const onConnect = () => {
    console.log(`App connected on port: ${process.env.PORT}`);
};

dbConnect();
async function dbConnect() {
    try {
        const connection = await mongoose.connect(process.env.DB_URI)
        if (!connection) console.log("Something went wrong with the DB connection");

        app.listen(process.env.PORT, onConnect);
    } catch(error) {
        console.log(`An error occurred while connecting to DB: ${error}`);
    };
};