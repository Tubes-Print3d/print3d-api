const { body } = require("express-validator");
const { wrap } = require("../utils/validator");
const Pengguna = require("../models/pengguna/pengguna.model");

const register = [
  body("nama").isString().exists(),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const pengguna = await Pengguna.exists({ email: value });
      if (pengguna) return Promise.reject("Email already exist");
    }),
  body("password")
    .isStrongPassword({ minSymbols: 0 })
    .withMessage("weak password"),
  body("kontak").optional().isArray(),
  body("roles").custom((roles, { req }) => {
    if (roles.includes("pencetak")) {
      if (!req.body.alamat) throw new Error("Field alamat dibutuhkan");
    }
    return true;
  }),
];

const login = [
  body("email").isEmail(),
  body("password").isStrongPassword({ minSymbols: 0 }),
];

const addRole = [
  body("newRoles")
    .exists()
    .isIn(["desainer", "pencetak"])
    .bail() // tidak perlu lanjut jika roles bukan salah satu diatas
    .custom((role, { req }) => {
      if (role === "pencetak") {
        // TODO: harus ada field alamat
        return true;
      }
    }),
];

const addToCart = [
  body("productId").isMongoId().withMessage("Must be valid MongoID"),
];

module.exports = wrap({ register, login, addRole, addToCart });
