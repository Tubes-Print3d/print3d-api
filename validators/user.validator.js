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
    const validators = [];
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

module.exports = wrap({ register, login });
