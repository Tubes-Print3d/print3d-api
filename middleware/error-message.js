const { sendResponse } = require("../utils/responser");

module.exports = (error, req, res, next) => {
  const status = error.status || 500;
  if (error.status) {
    delete error.status
  }
  sendResponse(res, status, { error: error.error || error });
  next();
};
