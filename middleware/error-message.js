const resp = require("../utils/responser");

module.exports = (error, req, res, next) => {
  resp(res, error, error.status || 500);
  next();
};
