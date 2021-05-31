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
router.put(
  "/:id",
  validator.editProduct,
  auth.verify,
  auth.roleCheck(["desainer"]),
  controller.editProduct
);
router.delete(
  "/:id",
  validator.deleteProduct,
  auth.verify,
  auth.roleCheck(["desainer"]),
  controller.deleteProduct
);

module.exports = router;
