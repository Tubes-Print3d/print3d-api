const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user.controller");
const validator = require("../../middleware/validators/user.validator");

router.get("/register", validator.register, controller.register);

module.exports = router;
