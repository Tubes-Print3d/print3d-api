const { body, param, Result } = require("express-validator");
const Produk = require("../models/produk.model");
const { wrap } = require("../utils/validator");

const addProduct = [
  body("nama").isString().exists(),
  body("royalty").isFloat(),
  body("visibility").optional().isBoolean(),
];

const editProduct = [
  param("id").custom((id, { req }) => {
    return Produk.exists({ _id: id }).then((exists) => {
      if (!exists) {
        return Promise.reject("Cannot find product");
      }
    });
  }),
];

const deleteProduct = [
  param("id").custom((id, { req }) => {
    return Produk.exists({ _id: id }).then((exists) => {
      if (!exists) {
        return Promise.reject("Cannot find product");
      }
    });
  }),
];
module.exports = wrap({ addProduct, editProduct, deleteProduct });
