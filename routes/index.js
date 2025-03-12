const express = require("express");
const router = express.Router();

const authenticateMiddleware = require("../middlewares/authenticate");
const pathController = require("../controllers/pathController");

router.get("/", authenticateMiddleware.authenticateToken, pathController.renderHome);
router.get("/login", authenticateMiddleware.noTokenCheck, pathController.renderLogin);
router.get("/tickets", authenticateMiddleware.authenticateToken, pathController.renderTickets);
router.get("/tickets/:id", authenticateMiddleware.authenticateToken, pathController.renderTicketPage);
router.get("/*", pathController.render404);

module.exports = router;