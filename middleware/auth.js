const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
const Pengguna = require("../models/pengguna/pengguna.model");

const verify = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw "missing authorization header";
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, JWT_KEY);
    res.locals.auth = payload.data;
    next();
  } catch (error) {
    if (error === "missing authorization header") {
      next({ status: 401, error });
    } else if (error.name && error.name === "TokenExpiredError") {
      next({ status: StatusCodes.UNAUTHORIZED, error });
    } else next(error);
  }
};
/** Roles bisa berupa string atau array */
const roleCheck = (roles) => async (req, res, next) => {
  if (!res.locals.auth) {
    next({ status: 401, error });
  }
  roles = Array.isArray(roles) ? roles : [roles];
  try {
    const pengguna = await Pengguna.findById(res.locals.auth);
    let benar = false;
    if (pengguna.roles) {
      for (const role of roles) {
        if (pengguna.roles.includes(role)) {
          benar = true;
          break;
        }
      }
    }
    if (!benar) {
      next({ status: 403, error: `Mismatch role ${roles}` });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const auth = {
  verify,
  roleCheck,
};

module.exports = auth;
