const { StatusCodes } = require("http-status-codes");

const sendResponse = (res, status, options = {}) => {
  res.status(status).send({ status, ...options });
};

const responser = (
  res,
  payload = null,
  status = StatusCodes.OK,
  options = {}
) => {
  sendResponse(res, status, { payload, ...options });
};

const ResError = (error, status = StatusCodes.BAD_REQUEST) => ({
  status,
  error,
});

module.exports = { sendResponse, responser, ResError };
