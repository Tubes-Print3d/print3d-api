const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user.controller");
const auth = require("../../middleware/auth");
const notImplemented = require("../../middleware/not-implemented");
const validator = require("../../validators/user.validator");

router.post("/register", validator.register, controller.register);
router.post("/login", validator.login, controller.login);
router.get("/:id", notImplemented);
router.post("/roles", validator.addRole, auth.verify, controller.addRole);
router.put("/:id", notImplemented);
router.delete("/:id", notImplemented);

module.exports = router;
