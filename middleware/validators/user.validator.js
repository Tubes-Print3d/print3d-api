const { body, validationResult } = require("express-validator");
const { wrap } = require("../../utils/validator");
const Pengguna = require("../../models/pengguna/pengguna.model");

const register = [
  body("nama").isString().exists(),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const pengguna = await Pengguna.exists({ email: value });
      if (pengguna) return Promise.reject("Email already exist");
    }),
  body("password").isStrongPassword(),
  body("kontak").optional().isArray(),
];

module.exports = wrap({ register });
