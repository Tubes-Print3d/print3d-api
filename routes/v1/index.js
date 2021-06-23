const express = require("express");
const router = express.Router();
const resp = require("../../utils/responser");
const userRouter = require("./user.router");
const productRouter = require("./product.router");
const machineRouter = require("./machine.router");

router.get("/", (req, res) => {
  resp(res, { version: "v1" }, 200);
  res.end();
});

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/machines", machineRouter);
module.exports = router;
