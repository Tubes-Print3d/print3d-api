const { sendResponse } = require("../utils/responser");

module.exports = (error, req, res, next) => {
  const status = error.status || 500;
  if (status === 500) {
    console.error("internal server error : ");
    console.error(error);
  }

  if (error.status) {
    delete error.status;
  }
  sendResponse(res, status, { error: error.error || error });
  next();
};
