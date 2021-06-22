const { body, param, Result } = require("express-validator");
const service = require("../services/product");
const { wrap } = require("../utils/validator");

const addProduct = [
  body("nama").isString().exists(),
  body("royalty").isFloat(),
  body("visibility").optional().isBoolean(),
];

const editProduct = [
  param("id").custom((id, { req }) => {
    return service.exists(id).then((exists) => {
      if (!exists) {
        return Promise.reject("Cannot find product");
      }
    });
  }),
];

const deleteProduct = [
  param("id").custom((id, { req }) => {
    return service.exists(id).then((exists) => {
      if (!exists) {
        return Promise.reject("Cannot find product");
      }
    });
  }),
];
module.exports = wrap({ addProduct, editProduct, deleteProduct });
