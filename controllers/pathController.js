const jwt = require("jsonwebtoken");
require("dotenv").config();

const apiController = require("./apiController");

const verifyToken = (err, decoded) => {
    try {
        return decoded;
    } catch(error) {
        console.log(`Error occurred verifying token in controller: ${error}`);
        return null;
    };
};

const renderHome = (req, res) => {
    const payload = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET, verifyToken);
    if (!payload) return res.render("404");

    const package = {
        user: {
            name: payload.email.split(".", 1),
        },
        tickets: {},
    };

    res.render("home", {data: package});
};

const renderLogin = (req, res) => {
    res.render("login");
};

const renderTickets = async (req, res) => {
    const tickets = await apiController.getTickets(req, res);
    if (!tickets) return res.render("404");
    
    res.render("ticket", {tickets: tickets});
};

const renderTicketPage = async (req, res) => {
    const ticket = await apiController.findTicket(req, res);
    if (!ticket) return res.render("404");

    res.render("ticketPage", {ticket: ticket});
};

const render404 = (req, res) => {
    res.render("404");
};

module.exports = {
    renderHome,
    renderLogin,
    renderTickets,
    renderTicketPage,
    render404,
};