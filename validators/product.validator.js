const { body } = require("express-validator");
const { wrap } = require("../utils/validator");

const addProduct = [
  body("nama").isString().exists(),
  body("royalty").isFloat() ,
  body("visibility").optional().isBoolean()
];

module.exports = wrap({ addProduct });
