const express = require("express");
const router = express.Router();
const controller = require("../../controllers/product.controller");
const validator = require("../../validators/product.validator");
const auth = require("../../middleware/auth");
const notImplemented = require("../../middleware/not-implemented");

router.post(
  "/",
  validator.addProduct,
  auth.verify,
  auth.roleCheck(["desainer"]),
  controller.addProduct
);
router.get("/", controller.listProduct);
router.get("/:id", notImplemented);
router.put("/:id", notImplemented);
router.delete("/:id", notImplemented);

module.exports = router;
