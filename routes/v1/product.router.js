const express = require("express");
const router = express.Router();
const controller = require("../../controllers/product.controller");
const validator = require("../../middleware/validators/product.validator");
const auth = require("../../middleware/auth");

router.post("/", validator.addProduct, auth.verify, controller.addProduct);
router.get("/", controller.listProduct)

module.exports = router;
