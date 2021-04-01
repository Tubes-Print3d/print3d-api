const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const verify = (req, res, next) => {
  if (!req.headers.authorization) {
    throw "missing authorization header";
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, JWT_KEY);
    res.locals.auth = payload.data;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  verify,
};
