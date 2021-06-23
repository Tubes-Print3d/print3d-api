const express = require("express");
const router = express.Router();
const controller = require("../../controllers/machine.controller");
const auth = require("../../middleware/auth");
const notImplemented = require("../../middleware/not-implemented");
// const validator = require("../../validators/machine.validator");

router.get("/", controller.listMachine);
router.post("/", auth.verify, controller.addMachine);
router.put("/:id", auth.verify, controller.editMachine);
router.delete("/", auth.verify, controller.deleteManyMachine);
router.delete("/:id", auth.verify, controller.deleteMachine);

module.exports = router;
