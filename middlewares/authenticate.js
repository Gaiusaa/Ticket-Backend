// Dependencies
const jwt = require("jsonwebtoken");

// Internal Functions
const checkToken = (token) => { // Validates login token
    if (!token) return false;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return false;
    });
    return true;
};

// Route Functions
const authenticateToken = (req, res, next) => { // Ensures logged in users can access pages
    const verified = checkToken(req.cookies.authToken);
    if (verified === false) return res.redirect("/login");
    next();
};

const noTokenCheck = (req, res, next) => { // Ensures already logged in users cannot log in again
    const verified = checkToken(req.cookies.authToken);
    if (verified === true) return res.redirect("/");
    next();
}

const loginCheck = (req, res, next) => {
    const {email, password, remember} = req.body;
    if (!email || !password || !remember) return res.status(401).send("An error occurred while performing this action");
    next();
};

module.exports = {
    authenticateToken,
    noTokenCheck,
    loginCheck,
};