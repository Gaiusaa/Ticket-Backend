const express = require("express");
const router = express.Router();

const authenticateMiddleware = require("../middlewares/authenticate");
const pathController = require("../controllers/pathController");
const apiController = require("../controllers/apiController");

router.post("/login", authenticateMiddleware.noTokenCheck, authenticateMiddleware.loginCheck, apiController.login);
router.get("/*", pathController.render404);

module.exports = router;